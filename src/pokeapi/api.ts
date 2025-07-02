import { getLanguage, setLanguage } from "../utils/languages";
import { pokemonContainer, showMoreResultsButton, ShowPokemon } from "./DOM";
import type {
  Pokemon,
  PokemonAPIResource,
  PokemonGenerationResource,
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
  ShowPokemonGen(selectedValue);
}

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
  const res = await fetch(`${URL}/generation/${gen}`);
  const data: PokemonGenerationResource = await res.json();
  pokemonGenOffset = 0;
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
  //await LoadResults(pokemonGenList, false);
}
export async function GetPokemonTypes(type: string): Promise<Pokemon[]> {
  pokemonTypeOffset = 0;
  const res = await fetch(`${URL}/type/${type}`);
  const data = await res.json();

  const promise = data.pokemon.map((poke: { pokemon: PokemonAPIResource }) =>
    fetch(poke.pokemon.url).then((r) => r.json())
  );
  return await Promise.all(promise);
  //await LoadResults(pokemonTypeList, false);
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
  //await LoadResults(pokemonTypeList, false);
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
    showMoreResultsButton(true);
  }
}

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
      nextResults = pokemonTypeList.slice(
        pokemonTypeOffset,
        pokemonTypeOffset + extraResults
      );
      nextResults.forEach(ShowPokemon);
      pokemonTypeOffset += extraResults;
      limitReached =
        pokemonTypeOffset >= pokemonTypeList.length ||
        pokemonTypeList.length <= extraResults;
    } else {
      ShowAllPokemonResults();
    }
  } else {
    if (isTypeSearch) {
      nextResults = pokemonGenTypeList.slice(
        pokemonGenTypeOffset,
        pokemonGenTypeOffset + extraResults
      );
      pokemonGenTypeOffset += extraResults;
      limitReached = pokemonGenTypeOffset >= pokemonGenTypeList.length;
    } else {
      nextResults = pokemonGenList.slice(
        pokemonGenOffset,
        pokemonGenOffset + extraResults
      );
      nextResults.forEach(ShowPokemon);
      pokemonGenOffset += extraResults;

      limitReached =
        pokemonGenOffset >= pokemonGenList.length ||
        pokemonGenList.length <= extraResults;
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
      nextResults = pokemonTypeList.slice(
        pokemonTypeOffset,
        pokemonTypeOffset + extraResults
      );
      nextResults.forEach(ShowPokemon);
      pokemonTypeOffset += extraResults;
      limitReached = pokemonTypeOffset >= pokemonTypeList.length;
    } else {
      ShowAllPokemonResults();
    }
  } else {
    if (isTypeSearch) {
      pokemonGenTypeList = await GetPokemonGenType(parseInt(gen), type);
      nextResults = pokemonGenTypeList.slice(
        pokemonGenTypeOffset,
        pokemonGenTypeOffset + extraResults
      );
      nextResults.forEach(ShowPokemon);
      pokemonGenTypeOffset += extraResults;
      limitReached = pokemonGenTypeOffset >= pokemonGenTypeList.length;
    } else {
      pokemonGenList = await GetPokemonGen(parseInt(gen));
      nextResults = pokemonGenList.slice(
        pokemonGenOffset,
        pokemonGenOffset + extraResults
      );
      nextResults.forEach(ShowPokemon);
      pokemonGenOffset += extraResults;

      limitReached = pokemonGenOffset >= pokemonGenList.length;
    }
  }
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

// export function getPokemonGenList() {
//   return pokemonGenList;
// }

// export function getGetPokemonTypeList() {
//   return pokemonTypeList;
// }
