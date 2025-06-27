import "./style/modern-normalize.css";
import "./style/style.css";
import "./style/components/header.css";
import "./style/components/pokemon.css";
import "./style/components/footer.css";
import "./style/components/mobile-nav.css";
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
  Init,
} from "./pokeapi/api";
import {
  ChangePokemonTypeColorButton,
  generationCmb,
  moreResultsBtn,
  pokemonContainer,
  pokemonInput,
  pokemonTypeBtn,
  searchBtn,
  typeCmb,
} from "./pokeapi/DOM";

import mobileNav from "./utils/mobile-nav";
import darkMode from "./utils/dark-mode";
import { getLanguage, setLanguage } from "./utils/languages";

generationCmb.value = "";
typeCmb.value = "";
pokemonInput.value = "";

mobileNav();
darkMode();
setLanguage("en");
Init();

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
  let lang = getLanguage();
  if (getSelectedValue() === "0") {
    if (getIsTypeSearch()) LoadResults(getGetPokemonTypeList(), false);
    else LoadResults(getPokemonGenList(), true);
  } else LoadResults(getPokemonGenList(), false);
  if (lang) setLanguage(lang);
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
