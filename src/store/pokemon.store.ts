import type { Pokemon } from "../types/pokemon.types";

export let state = {
  selectedValue: "1" as string,
  allPokemonOffset: 0 as number,
  genOffset: 0 as number,
  typeOffset: 0 as number,
  genTypeOffset: 0 as number,
  isTypeSearch: false as boolean,
  list: [] as Pokemon[],
  genList: [] as Pokemon[],
  typeList: [] as Pokemon[],
  genTypeList: [] as Pokemon[],
  nextResults: [] as Pokemon[],
};

export function setSelectedValue(value: string): void {
  state.selectedValue = value;
}

export function getSelectedValue(): string {
  return state.selectedValue;
}

export function setIsTypeSearch(value: boolean): void {
  state.isTypeSearch = value;
}

export function getIsTypeSearch(): boolean {
  return state.isTypeSearch;
}

export function resetOffsets(): void {
  state.allPokemonOffset = 0;
  state.genOffset = 0;
  state.typeOffset = 0;
  state.genTypeOffset = 0;
}

export function resetLists(): void {
  state.list = [];
  state.genList = [];
  state.genTypeList = [];
  state.typeList = [];
  state.nextResults = [];
}
