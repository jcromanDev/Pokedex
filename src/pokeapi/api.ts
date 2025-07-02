import { getLanguage, setLanguage } from "../utils/languages";
import { getLimitReach, PaginateList } from "../utils/pagination";
import {
  pokemonContainer,
  pokemonInfoContainer,
  showMoreResultsButton,
  ShowPokemon,
  ShowPokemonInfo,
  randomIntFromInterval,
  generationCmb,
  pokemonInfoInput,
  pokemonInput,
  typeCmb,
  ShowPokemonInfoMove,
} from "./DOM";
import type {
  Pokemon,
  PokemonInfo,
  PokemonAPIResource,
  PokemonGenerationResource,
  PokemonMove,
} from "./types";

const URL: string = import.meta.env.VITE_POKEAPI_URL;
const extraResults: number = Number(import.meta.env.VITE_EXTRA_RESULTS);
const pokemonTotal: number = Number(import.meta.env.VITE_TOTAL_POKEMON);

let selectedValue: string = "1";
let allPokemonOffset: number = 0;
let pokemonGenOffset: number = 0;
let pokemonTypeOffset: number = 0;
let pokemonGenTypeOffset: number = 0;
let pokemonAllGenerationsList: Pokemon[] = [];
let pokemonGenList: Pokemon[] = [];
let pokemonGenTypeList: Pokemon[] = [];
let pokemonTypeList: Pokemon[] = [];
let nextResults: Pokemon[] = [];
let isTypeSearch: boolean = false;

export function Init() {
  generationCmb.value = "";
  typeCmb.value = "";
  pokemonInput.value = "";
  pokemonInfoInput.value = "";
  ShowPokemonGen("1");
}

//#region [Function handlers]
export async function ShowAllPokemon(): Promise<void> {
  allPokemonOffset = 0;
  pokemonAllGenerationsList = [];
  await ShowResults(true, false, "", "");
}

export async function ShowPokemonGen(gen: string): Promise<void> {
  pokemonGenOffset = 0;
  pokemonGenList = [];
  await ShowResults(false, false, gen, "");
}

export async function ShowPokemonType(type: string) {
  pokemonTypeOffset = 0;
  await ShowResults(true, true, "", type);
}

export async function ShowPokemonGenType(gen: string, type: string) {
  pokemonGenTypeOffset = 0;
  pokemonGenTypeList = [];
  await ShowResults(false, true, gen, type);
}

//#endregion

//#region [API callbacks]
export async function GetPokemonList(offset: number): Promise<Pokemon[]> {
  const res = await fetch(
    `${URL}/pokemon/?offset=${offset}&limit=${extraResults}`
  );
  const data = await res.json();
  const promise = data.results.map((poke: PokemonAPIResource) =>
    fetch(poke.url).then((r) => r.json())
  );
  return await Promise.all(promise);
}

export async function GetPokemonGen(gen: number): Promise<Pokemon[]> {
  pokemonGenTypeOffset = 0;
  const res = await fetch(`${URL}/generation/${gen}`);
  const data: PokemonGenerationResource = await res.json();
  const getId = (url: string) =>
    parseInt(url.split("/").filter(Boolean).pop()!);
  const sortedGenPokemon = data.pokemon_species.sort(
    (a: PokemonAPIResource, b: PokemonAPIResource) =>
      getId(a.url) - getId(b.url)
  );

  const promise = sortedGenPokemon.map((poke: PokemonAPIResource) =>
    fetch(`${URL}/pokemon/${getId(poke.url)}`).then((r) => r.json())
  );
  return await Promise.all(promise);
}

export async function GetPokemonTypes(type: string): Promise<Pokemon[]> {
  pokemonTypeOffset = 0;
  const res = await fetch(`${URL}/type/${type}`);
  const data = await res.json();

  const promise = data.pokemon.map((poke: { pokemon: PokemonAPIResource }) =>
    fetch(poke.pokemon.url).then((r) => r.json())
  );
  return await Promise.all(promise);
}

export async function GetPokemonGenType(
  gen: number,
  type: string
): Promise<Pokemon[]> {
  pokemonGenTypeOffset = 0;
  const pokemonList: Pokemon[] = await GetPokemonGen(gen);
  return pokemonList.filter((poke) =>
    poke.types.some((t) => t.type.name === type)
  );
}

export async function FindPokemon(inputData: string): Promise<void> {
  try {
    const res = await fetch(`${URL}/pokemon/${inputData.toLowerCase()}`);
    const data: Pokemon = await res.json();
    pokemonContainer.innerHTML = "";
    showMoreResultsButton(true);
    ShowPokemon(data);
  } catch {
    pokemonContainer.innerHTML = `<h4>Pokemon name/ID not found, please try another pokemon.</h4>`;
    showMoreResultsButton(false);
  }
}

export async function FindPokemonInfo(inputData: string): Promise<void> {
  try {
    const min: number = randomIntFromInterval(0, 14);
    const max: number = randomIntFromInterval(15, 30);
    const res = await fetch(`${URL}/pokemon/${inputData.toLowerCase()}`);
    const data: PokemonInfo = await res.json();
    const pokemonMoves = data.moves.slice(min, max);
    const moves = await FindPokemonInfoMoves(pokemonMoves);
    showMoreResultsButton(true);
    ShowPokemonInfo(data, moves);
  } catch {
    pokemonInfoContainer.innerHTML = `<h4>Pokemon name/ID not found, please try another pokemon.</h4>`;
    showMoreResultsButton(false);
  }
}

export async function FindPokemonInfoMoves(
  moves: PokemonInfo["moves"]
): Promise<PokemonMove[]> {
  const results = await Promise.all(
    moves.map(({ move }) =>
      fetch(move.url)
        .then((r) => r.json())
        .catch(() => null)
    )
  );

  return results.filter(Boolean);
}

export async function FindPokemonInfoMove(id: number) {
  const res = await fetch(`${URL}/move/${id}}`);
  const move: PokemonMove = await res.json();
  console.log(move);

  ShowPokemonInfoMove(move);
}

//#endregion

async function ShowAllPokemonResults() {
  pokemonAllGenerationsList = await GetPokemonList(allPokemonOffset);
  pokemonAllGenerationsList.forEach(ShowPokemon);
  allPokemonOffset += extraResults;
  const limitReached = allPokemonOffset >= pokemonTotal;
  showMoreResultsButton(limitReached);
}

export async function ShowMoreResults(
  selectedValue: string,
  isTypeSearch: boolean
) {
  const allPokemon: boolean = selectedValue === "0";
  MoreResults(allPokemon, isTypeSearch);
}

async function MoreResults(showAllPokemon: boolean, isTypeSearch: boolean) {
  let limitReached: boolean = false;
  if (showAllPokemon) {
    if (isTypeSearch) {
      nextResults = PaginateList(
        pokemonTypeList,
        pokemonTypeOffset,
        extraResults
      );
      nextResults.forEach(ShowPokemon);
      pokemonTypeOffset += extraResults;
      limitReached = getLimitReach(
        pokemonTypeList,
        pokemonTypeOffset,
        extraResults
      );
    } else {
      ShowAllPokemonResults();
    }
  } else {
    if (isTypeSearch) {
      nextResults = PaginateList(
        pokemonGenTypeList,
        pokemonGenTypeOffset,
        extraResults
      );
      pokemonGenTypeList.forEach(ShowPokemon);
      pokemonGenTypeOffset += extraResults;
      limitReached = getLimitReach(
        pokemonGenTypeList,
        pokemonGenTypeOffset,
        extraResults
      );
    } else {
      nextResults = PaginateList(
        pokemonGenList,
        pokemonGenOffset,
        extraResults
      );
      nextResults.forEach(ShowPokemon);
      pokemonGenOffset += extraResults;
      limitReached = getLimitReach(
        pokemonGenList,
        pokemonGenOffset,
        extraResults
      );
    }
  }
  showMoreResultsButton(limitReached);
}

export async function ShowResults(
  showAllPokemon: boolean,
  isTypeSearch: boolean,
  gen: string,
  type: string
) {
  let lang = getLanguage();
  let limitReached: boolean = false;
  nextResults = [];
  if (showAllPokemon) {
    if (isTypeSearch) {
      pokemonTypeList = await GetPokemonTypes(type);
      nextResults = PaginateList(
        pokemonTypeList,
        pokemonTypeOffset,
        extraResults
      );
      nextResults.forEach(ShowPokemon);
      pokemonTypeOffset += extraResults;
      limitReached = getLimitReach(
        pokemonTypeList,
        pokemonTypeOffset,
        extraResults
      );
    } else {
      ShowAllPokemonResults();
    }
  } else {
    if (isTypeSearch) {
      pokemonGenTypeList = await GetPokemonGenType(parseInt(gen), type);
      nextResults = PaginateList(
        pokemonGenTypeList,
        pokemonGenTypeOffset,
        extraResults
      );
      nextResults.forEach(ShowPokemon);
      pokemonGenTypeOffset += extraResults;
      limitReached = getLimitReach(
        pokemonGenTypeList,
        pokemonGenTypeOffset,
        extraResults
      );
    } else {
      pokemonGenList = await GetPokemonGen(parseInt(gen));
      nextResults = PaginateList(
        pokemonGenList,
        pokemonGenOffset,
        extraResults
      );
      nextResults.forEach(ShowPokemon);
      pokemonGenOffset += extraResults;
      limitReached = getLimitReach(
        pokemonGenList,
        pokemonGenOffset,
        extraResults
      );
    }
  }
  showMoreResultsButton(limitReached);
  if (lang) setLanguage(lang);
}

//#region [get, set section]
export function setSelectedValue(value: string) {
  selectedValue = value;
}

export function getSelectedValue() {
  return selectedValue;
}

export function setIsTypeSearch(value: boolean) {
  isTypeSearch = value;
}

export function getIsTypeSearch() {
  return isTypeSearch;
}

export function getPokemonGenList() {
  return pokemonGenList;
}

export function getGetPokemonTypeList() {
  return pokemonTypeList;
}
//#endregion
