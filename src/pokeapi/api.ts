import { getLanguage, setLanguage } from "../utils/languages";
import {
  pokemonContainer,
  pokemonInfoContainer,
  showMoreResultsButton,
  ShowPokemon,
  ShowPokemonInfo,
  randomIntFromInterval,
} from "./DOM";
import type {
  Pokemon,
  PokemonInfo,
  PokemonAPIResource,
  PokemonGenerationResource,
  PokemonMove,
} from "./types";

const URL: string = import.meta.env.VITE_POKEAPI_URL;
const extraResults: number = import.meta.env.VITE_EXTRA_RESULTS;
const pokemonTotal: number = import.meta.env.VITE_TOTAL_POKEMON;

let offset = 0;
let selectedValue: string = "0";
let pokemonGenList: Pokemon[] = [];
let pokemonTypeList: Pokemon[] = [];
let isTypeSearch: boolean = false;

export function Init() {
  GetPokemonGen(1);
}

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
export async function GetAllPokemon(): Promise<void> {
  offset = 0;
  pokemonGenList = [];
  await LoadResults(pokemonGenList, true);
}
export async function GetPokemonGen(gen: number): Promise<void> {
  const res = await fetch(`${URL}/generation/${gen}`);
  const data: PokemonGenerationResource = await res.json();
  offset = 0;
  const getId = (url: string) =>
    parseInt(url.split("/").filter(Boolean).pop()!);
  const sortedGenPokemon = data.pokemon_species.sort(
    (a: PokemonAPIResource, b: PokemonAPIResource) =>
      getId(a.url) - getId(b.url)
  );

  const promise = sortedGenPokemon.map((poke: PokemonAPIResource) =>
    fetch(`${URL}/pokemon/${getId(poke.url)}`).then((r) => r.json())
  );
  pokemonGenList = await Promise.all(promise);
  await LoadResults(pokemonGenList, false);
}
export async function GetPokemonTypes(type: string): Promise<void> {
  offset = 0;
  const res = await fetch(`${URL}/type/${type}`);
  const data = await res.json();

  const promise = data.pokemon.map((poke: { pokemon: PokemonAPIResource }) =>
    fetch(poke.pokemon.url).then((r) => r.json())
  );
  pokemonTypeList = await Promise.all(promise);
  await LoadResults(pokemonTypeList, false);
}

export async function GetPokemonGenType(type: string): Promise<void> {
  offset = 0;
  pokemonTypeList = pokemonGenList.filter((poke) =>
    poke.types.some((t) => t.type.name === type)
  );
  await LoadResults(pokemonTypeList, false);
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

export async function LoadResults(list: Pokemon[], showAllPokemon: boolean) {
  let lang = getLanguage();
  if (showAllPokemon) {
    list = await GetPokemonList(offset);
    list.forEach(ShowPokemon);
  } else {
    const nextResults = list.slice(offset, offset + extraResults);
    nextResults.forEach(ShowPokemon);
  }
  offset = offset + extraResults;
  const limitReached = showAllPokemon
    ? offset >= pokemonTotal
    : offset >= list.length || list.length <= extraResults;

  // console.log(pokemonInfoBtn);

  showMoreResultsButton(limitReached);
  if (lang) setLanguage(lang);
}

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
