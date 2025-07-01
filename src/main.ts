import "./style/modern-normalize.css";
import "./style/style.css";
import "./style/index_components/header.css";
import "./style/index_components/pokemon.css";
import "./style/index_components/footer.css";
import "./style/index_components/mobile-nav.css";

import "./style/pokemonInfo_components/header__pokemonInfo__controls.css";
import "./style/pokemonInfo_components/pokemonInfo.css";

import "./style/utils.css";

import {
  GetAllPokemon,
  getPokemonGenList,
  getGetPokemonTypeList,
  getIsTypeSearch,
  GetPokemonGen,
  getSelectedValue,
  GetPokemonTypes,
  LoadResults,
  setIsTypeSearch,
  setSelectedValue,
  GetPokemonGenType,
  FindPokemon,
  FindPokemonInfo,
  Init,
} from "./pokeapi/api";
import {
  btnBack,
  ChangePokemonTypeColorButton,
  generationCmb,
  moreResultsBtn,
  pokemonContainer,
  pokemonInfoInput,
  pokemonInput,
  pokemonTypeBtn,
  searchBtn,
  searchInfoBtn,
  typeCmb,
} from "./pokeapi/DOM";

import mobileNav from "./utils/mobile-nav";
import darkMode from "./utils/dark-mode";
import { getLanguage, setLanguage } from "./utils/languages";
import { ShowSelectedPokemonInfo } from "./utils/router";

generationCmb.value = "";
typeCmb.value = "";
pokemonInput.value = "";
pokemonInfoInput.value = "";

mobileNav();
darkMode();
setLanguage(getLanguage());
ShowSelectedPokemonInfo(false);
Init();

pokemonContainer.addEventListener("click", (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const pokemonContent = target.closest(".pokemon__content") as HTMLElement;

  if (pokemonContent) {
    const id: string = pokemonContent.id!;
    FindPokemonInfo(id);
  }
});

pokemonTypeBtn.forEach((button) => {
  button.addEventListener("click", (event: Event) => {
    const type = (event.currentTarget as HTMLButtonElement).id;
    pokemonContainer.innerHTML = ``;
    pokemonInput.value = "";
    setIsTypeSearch(true);

    if (getSelectedValue() === "0") GetPokemonTypes(type);
    else GetPokemonGenType(type);
  });
});

typeCmb.addEventListener("change", (event: Event) => {
  const type = (event.target as HTMLSelectElement).value;
  if (type !== "") {
    pokemonContainer.innerHTML = ``;
    pokemonInput.value = "";
    setIsTypeSearch(true);
    ChangePokemonTypeColorButton(type);

    if (getSelectedValue() === "0") GetPokemonTypes(type);
    // else if (type === "") Init();
    else GetPokemonGenType(type);
  }
});

generationCmb.addEventListener("change", (event: Event) => {
  const generation = (event.target as HTMLSelectElement).value;
  if (generation !== "") {
    setSelectedValue(generation);
    setIsTypeSearch(false);
    ChangePokemonTypeColorButton("");
    pokemonInput.value = "";
    typeCmb.value = "";
    pokemonContainer.innerHTML = ``;
    if (getSelectedValue() === "0") GetAllPokemon();
    else GetPokemonGen(parseInt(getSelectedValue()));
  }
});

moreResultsBtn.addEventListener("click", () => {
  if (getSelectedValue() === "0") {
    if (getIsTypeSearch()) LoadResults(getGetPokemonTypeList(), false);
    else LoadResults(getPokemonGenList(), true);
  } else LoadResults(getPokemonGenList(), false);
});

pokemonInput.addEventListener("keyup", (event: KeyboardEvent) => {
  const inputData = pokemonInput.value;
  if (event.key === "Enter") {
    if (inputData != "") FindPokemon(inputData);
    else Init();
  }
});

searchBtn.addEventListener("click", () => {
  const inputData = pokemonInput.value;
  if (inputData != "") FindPokemon(inputData);
  else Init();
});

pokemonInfoInput.addEventListener("keyup", (event: KeyboardEvent) => {
  const inputData = pokemonInfoInput.value;
  if (event.key === "Enter") {
    if (inputData != "") FindPokemonInfo(inputData);
    else Init();
  }
});

searchInfoBtn.addEventListener("click", () => {
  const inputData = pokemonInfoInput.value;
  if (inputData != "") FindPokemonInfo(inputData);
  else Init();
});

btnBack.addEventListener("click", () => {
  pokemonInfoInput.value = "";
  ShowSelectedPokemonInfo(false);
});
