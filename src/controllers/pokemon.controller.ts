import {
  fetchPokemonByGen,
  fetchPokemonByGenAndType,
  fetchPokemonByTypes,
  fetchPokemonList,
  fetchPokemonMoveList,
  fetchSingleMove,
  fetchSinglePokemon,
} from "../services/pokemon.service";
import { renderPokemonCard } from "../dom/renders/card.renders";
import {
  state,
  resetOffsets,
  getIsTypeSearch,
  getSelectedValue,
  setCurrentList,
  setCurrentOffset,
  getCurrentList,
  getCurrentOffset,
} from "../store/pokemon.store";
import {
  randomIntFromInterval,
  resetContainer,
  showMoreResultsButton,
} from "../store/ui.store";
import { getLimitReach, PaginateList } from "../utils/pagination";
import type { Pokemon } from "../types/pokemon.types";
import { renderPokemonDetails } from "../dom/renders/details.renders";
import { renderPokemonMoveDetail } from "../dom/renders/pokemonMoves.renders";
import { resetUI } from "../dom/utils";
import setupEventListeners from "../dom/events/pokemon.events";
import { setupReziseHandler } from "../dom/events/UI.events";
import mobileNav from "../utils/mobile-nav";
import darkMode from "../utils/dark-mode";
import headerObserver from "../utils/observers";
import { getLanguage, setLanguage, updateLanguage } from "../utils/languages";
import { initRouter } from "../utils/router";
import { initializeErrorHandler } from "../utils/errorsHandlets";

const EXTRA_RESULTS = Number(import.meta.env.VITE_EXTRA_RESULTS);
const POKEMON_TOTAL = Number(import.meta.env.VITE_TOTAL_POKEMON);

export function init() {
  mobileNav();
  darkMode();
  headerObserver();
  setLanguage(getLanguage());
  initRouter();
  setupEventListeners();
  setupReziseHandler();
  initializePokemonData();
  showMoreResultsButton(true);
}

export async function initializePokemonData(): Promise<void> {
  resetUI();
  initializeErrorHandler();
  await showPokemonByGeneration("1");
}

export async function showAllPokemon(): Promise<void> {
  resetOffsets();
  resetContainer();
  initializeErrorHandler();
  state.list = await fetchPokemonList(0, EXTRA_RESULTS);
  state.list.forEach(renderPokemonCard);
  state.allPokemonOffset += EXTRA_RESULTS;
  setCurrentList(state.list);
  setCurrentOffset(state.allPokemonOffset);
  showMoreResultsButton(state.list.length >= POKEMON_TOTAL);
  updateLanguage();
}

export async function showPokemonByGeneration(gen: string): Promise<void> {
  resetOffsets();
  resetContainer();
  initializeErrorHandler();
  state.genList = await fetchPokemonByGen(parseInt(gen));
  const results = PaginateList(state.genList, 0, EXTRA_RESULTS);
  results.forEach(renderPokemonCard);
  state.genOffset += EXTRA_RESULTS;
  setCurrentList(state.genList);
  setCurrentOffset(state.genOffset);
  showMoreResultsButton(
    getLimitReach(state.genList, state.genOffset, EXTRA_RESULTS)
  );
  updateLanguage();
}

export async function showPokemonByType(type: string): Promise<void> {
  resetOffsets();
  resetContainer();
  initializeErrorHandler();
  state.typeList = await fetchPokemonByTypes(type);
  const results = PaginateList(state.typeList, 0, EXTRA_RESULTS);
  results.forEach(renderPokemonCard);
  state.typeOffset += EXTRA_RESULTS;
  setCurrentList(state.typeList);
  setCurrentOffset(state.typeOffset);
  showMoreResultsButton(
    getLimitReach(state.typeList, state.typeOffset, EXTRA_RESULTS)
  );
  updateLanguage();
}

export async function showPokemonByGenType(
  gen: string,
  type: string
): Promise<void> {
  resetOffsets();
  resetContainer();
  initializeErrorHandler();
  state.genTypeList = await fetchPokemonByGenAndType(parseInt(gen), type);
  const results = PaginateList(state.genTypeList, 0, EXTRA_RESULTS);
  results.forEach(renderPokemonCard);
  state.genTypeOffset += EXTRA_RESULTS;
  setCurrentList(state.genTypeList);
  setCurrentOffset(state.genTypeOffset);
  showMoreResultsButton(
    getLimitReach(state.genTypeList, state.genTypeOffset, EXTRA_RESULTS)
  );
  updateLanguage();
}

export async function showPokemon(inputData: string): Promise<void> {
  resetContainer();
  initializeErrorHandler();
  const results = await fetchSinglePokemon(inputData);
  renderPokemonCard(results);
  showMoreResultsButton(true);
  updateLanguage();
}

export async function showPokemonDetails(inputData: string): Promise<void> {
  initializeErrorHandler();
  const min: number = randomIntFromInterval(0, 14);
  const max: number = randomIntFromInterval(15, 30);
  const results = await fetchSinglePokemon(inputData);
  const pokemonMoves = results.moves.slice(min, max);
  const moves = await fetchPokemonMoveList(pokemonMoves);
  showMoreResultsButton(true);
  renderPokemonDetails(results, moves);
  updateLanguage();
}

export async function showPokemonMove(id: number): Promise<void> {
  const move = await fetchSingleMove(id);
  renderPokemonMoveDetail(move);
  updateLanguage();
}

export function showMoreResults(): void {
  loadMoreResults(getSelectedValue() === "0", getIsTypeSearch());
}

export function checkMoreResultsBtn(): void {
  showMoreResultsButton(
    getLimitReach(getCurrentList(), getCurrentOffset(), EXTRA_RESULTS)
  );
}

export async function loadMoreResults(
  showAll: boolean,
  isType: boolean
): Promise<void> {
  let list: Pokemon[] = [];

  if (showAll) {
    if (isType) {
      list = PaginateList(state.typeList, state.typeOffset, EXTRA_RESULTS);
      state.typeOffset += EXTRA_RESULTS;
    } else {
      list = await fetchPokemonList(state.allPokemonOffset, EXTRA_RESULTS);
      state.allPokemonOffset += EXTRA_RESULTS;
    }
  } else {
    if (isType) {
      list = PaginateList(
        state.genTypeList,
        state.genTypeOffset,
        EXTRA_RESULTS
      );
      state.genTypeOffset += EXTRA_RESULTS;
    } else {
      list = PaginateList(state.genList, state.genOffset, EXTRA_RESULTS);
      state.genOffset += EXTRA_RESULTS;
    }
  }

  list.forEach(renderPokemonCard);

  const limitReached = showAll
    ? isType
      ? getLimitReach(state.typeList, state.typeOffset, EXTRA_RESULTS)
      : state.allPokemonOffset >= POKEMON_TOTAL
    : isType
    ? getLimitReach(state.genTypeList, state.genTypeOffset, EXTRA_RESULTS)
    : getLimitReach(state.genList, state.genOffset, EXTRA_RESULTS);
  showMoreResultsButton(limitReached);
  updateLanguage();
}
