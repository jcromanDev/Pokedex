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
  ShowAllPokemon,
  getIsTypeSearch,
  getSelectedValue,
  setIsTypeSearch,
  setSelectedValue,
  FindPokemon,
  Init,
  ShowMoreResults,
  ShowPokemonGen,
  ShowPokemonType,
  ShowPokemonGenType,
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
import { showPokemonInfo } from "./utils/router";

generationCmb.value = "";
typeCmb.value = "";
pokemonInput.value = "";

mobileNav();
darkMode();
setLanguage(getLanguage());
Init();
showPokemonInfo(false);

pokemonTypeBtn.forEach((button) => {
  button.addEventListener("click", (event: Event) => {
    const type = (event.currentTarget as HTMLButtonElement).id;
    pokemonContainer.innerHTML = ``;
    pokemonInput.value = "";
    setIsTypeSearch(true);

    if (getSelectedValue() === "0") ShowPokemonType(type);
    else ShowPokemonGenType(getSelectedValue(), type);
  });
});

typeCmb.addEventListener("change", (event: Event) => {
  const type = (event.target as HTMLSelectElement).value;
  if (type !== "") {
    pokemonContainer.innerHTML = ``;
    pokemonInput.value = "";
    setIsTypeSearch(true);
    ChangePokemonTypeColorButton(type);

    if (getSelectedValue() === "0") ShowPokemonType(type);
    else ShowPokemonGenType(getSelectedValue(), type);
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
  const selectedValue: string = getSelectedValue();
  const isTypeSearch: boolean = getIsTypeSearch();
  ShowMoreResults(selectedValue, isTypeSearch);
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
    if (inputData != "") FindPokemon(inputData);
    else Init();
  }
});

searchInfoBtn.addEventListener("click", () => {
  const inputData = pokemonInfoInput.value;
  if (inputData != "") FindPokemon(inputData);
  else Init();
});

btnBack.addEventListener("click", () => {
  showPokemonInfo(false);
});
