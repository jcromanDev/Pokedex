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
  getIsTypeSearch,
  getSelectedValue,
  setIsTypeSearch,
  setSelectedValue,
  FindPokemon,
  FindPokemonInfo,
  Init,
  ShowMoreResults,
  ShowPokemonGenType,
  ShowPokemonType,
  ShowAllPokemon,
  ShowPokemonGen,
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
import { initRouter, NavigateToHome, NavigateToInfo } from "./utils/router";

generationCmb.value = "";
typeCmb.value = "";
pokemonInput.value = "";
pokemonInfoInput.value = "";

mobileNav();
darkMode();
setLanguage(getLanguage());
initRouter();
Init();

pokemonContainer.addEventListener("click", (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const pokemonContent = target.closest(".pokemon__content") as HTMLElement;

  if (pokemonContent) {
    const id: string = pokemonContent.id!;
    NavigateToInfo(id);
  }
});

pokemonTypeBtn.forEach((button) => {
  button.addEventListener("click", (event: Event) => {
    const type = (event.currentTarget as HTMLButtonElement).id;
    const value = getSelectedValue();
    pokemonContainer.innerHTML = ``;
    pokemonInput.value = "";
    setIsTypeSearch(true);

    if (value === "0") ShowPokemonType(type);
    else ShowPokemonGenType(value, type);
  });
});

typeCmb.addEventListener("change", (event: Event) => {
  const type = (event.target as HTMLSelectElement).value;
  const value = getSelectedValue();
  if (type !== "") {
    pokemonContainer.innerHTML = ``;
    pokemonInput.value = "";
    setIsTypeSearch(true);
    ChangePokemonTypeColorButton(type);

    if (value === "0") ShowPokemonType(type);
    else ShowPokemonGenType(value, type);
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
    if (generation === "0") ShowAllPokemon();
    else ShowPokemonGen(generation);
  }
});

moreResultsBtn.addEventListener("click", () => {
  ShowMoreResults(getSelectedValue(), getIsTypeSearch());
});

pokemonInput.addEventListener("keyup", (event: KeyboardEvent) => {
  const inputData = pokemonInput.value.trim();
  if (event.key === "Enter") {
    if (inputData != "") FindPokemon(inputData);
    else Init();
  }
});

searchBtn.addEventListener("click", () => {
  const inputData = pokemonInput.value.trim();
  if (inputData != "") FindPokemon(inputData);
  else Init();
});

pokemonInfoInput.addEventListener("keyup", (event: KeyboardEvent) => {
  const inputData = pokemonInfoInput.value.trim();
  if (event.key === "Enter") {
    if (inputData != "") FindPokemonInfo(inputData);
    else Init();
  }
});

searchInfoBtn.addEventListener("click", () => {
  const inputData = pokemonInfoInput.value.trim();
  if (inputData != "") FindPokemonInfo(inputData);
  else Init();
});

btnBack.addEventListener("click", () => {
  pokemonInfoInput.value = "";
  NavigateToHome();
});
