import "./style/modern-normalize.css";
import "./style/style.css";
import "./style/index_components/header.css";
import "./style/index_components/pokemon.css";
import "./style/index_components/footer.css";
import "./style/index_components/mobile-nav.css";

import "./style/pokemonInfo_components/header__pokemonInfo__controls.css";
import "./style/pokemonInfo_components/pokemonInfo.css";
import "./style/pokemonInfo_components/description.css";

import "./style/error_components/error.css";
import "./style/modal_components/modal.css";
import "./style/modal_components/animations.css";
import "./style/modal_components/mobileAnimation.css";

import "./style/utils.css";
import { init } from "./controllers/pokemon.controller";

init();

// import {
//   getIsTypeSearch,
//   getSelectedValue,
//   setIsTypeSearch,
//   setSelectedValue,
//   FindPokemon,
//   FindPokemonInfo,
//   Init,
//   ShowMoreResults,
//   ShowPokemonGenType,
//   ShowPokemonType,
//   ShowAllPokemon,
//   ShowPokemonGen,
//   FindPokemonInfoMove,
// } from "./pokeapi/api";
// import {
//   btnBack,
//   ChangePokemonTypeColorButton,
//   generationCmb,
//   moreResultsBtn,
//   pokemonContainer,
//   pokemonInfoBtnCloseDescription,
//   pokemonInfoInput,
//   pokemonInfoMovesContent,
//   pokemonInput,
//   pokemonLogoBtn,
//   pokemonTypeBtn,
//   searchBtn,
//   searchInfoBtn,
//   typeCmb,
// } from "./pokeapi/DOM";

// import mobileNav from "./utils/mobile-nav";
// import darkMode from "./utils/dark-mode";
// import { getLanguage, setLanguage } from "./utils/languages";
// import { initRouter, NavigateToHome, NavigateToInfo } from "./utils/router";
// import headerObserver from "./utils/observers";
// import {
//   changeStateDescriptionContainer,
//   getDescriptionContainerState,
// } from "./utils/description-container";

// mobileNav();
// darkMode();
// headerObserver();
// setLanguage(getLanguage());
// initRouter();
// Init();

//pokemonLogoBtn.forEach((button) => {
//   button.addEventListener("click", () => {
//     pokemonContainer.innerHTML = ``;
//     NavigateToHome();
//     Init();
//   });
// });

// pokemonContainer.addEventListener("click", (event: MouseEvent) => {
//   const target = event.target as HTMLElement;
//   const pokemonContent = target.closest(".pokemon__content") as HTMLElement;

//   if (pokemonContent) {
//     const id: string = pokemonContent.id!;
//     NavigateToInfo(id);
//   }
// });

// pokemonInfoMovesContent.addEventListener("click", (event: MouseEvent) => {
//   const target = event.target as HTMLElement;
//   const pokemonMove = target.closest(".pokemonInfo__moves-type") as HTMLElement;

//   if (pokemonMove) {
//     const id: string = pokemonMove.id;
//     FindPokemonInfoMove(parseInt(id));
//     changeStateDescriptionContainer(false);
//   }
// });

// pokemonTypeBtn.forEach((button) => {
//   button.addEventListener("click", (event: Event) => {
//     const type = (event.currentTarget as HTMLButtonElement).id;
//     const value = getSelectedValue();
//     pokemonContainer.innerHTML = ``;
//     pokemonInput.value = "";
//     setIsTypeSearch(true);

//     if (value === "0") ShowPokemonType(type);
//     else ShowPokemonGenType(value, type);
//   });
// });

// typeCmb.addEventListener("change", (event: Event) => {
//   const type = (event.target as HTMLSelectElement).value;
//   const value = getSelectedValue();
//   if (type !== "") {
//     pokemonContainer.innerHTML = ``;
//     pokemonInput.value = "";
//     setIsTypeSearch(true);
//     ChangePokemonTypeColorButton(type);

//     if (value === "0") ShowPokemonType(type);
//     else ShowPokemonGenType(value, type);
//   }
// });

// generationCmb.addEventListener("change", (event: Event) => {
//   const generation = (event.target as HTMLSelectElement).value;
//   if (generation !== "") {
//     setSelectedValue(generation);
//     setIsTypeSearch(false);
//     ChangePokemonTypeColorButton("");
//     pokemonInput.value = "";
//     typeCmb.value = "";
//     pokemonContainer.innerHTML = ``;
//     if (generation === "0") ShowAllPokemon();
//     else ShowPokemonGen(generation);
//   }
// });

// moreResultsBtn.addEventListener("click", () => {
//   ShowMoreResults(getSelectedValue(), getIsTypeSearch());
// });

// pokemonInput.addEventListener("keyup", (event: KeyboardEvent) => {
//   const inputData = pokemonInput.value.trim();
//   if (event.key === "Enter") {
//     if (inputData != "") FindPokemon(inputData);
//     else Init();
//   }
// });

// searchBtn.addEventListener("click", () => {
//   const inputData = pokemonInput.value.trim();
//   if (inputData != "") FindPokemon(inputData);
//   else Init();
// });

// pokemonInfoInput.addEventListener("keyup", (event: KeyboardEvent) => {
//   const inputData = pokemonInfoInput.value.trim();
//   if (event.key === "Enter") {
//     if (inputData != "") FindPokemonInfo(inputData);
//     else Init();
//   }
// });

// searchInfoBtn.addEventListener("click", () => {
//   const inputData = pokemonInfoInput.value.trim();
//   if (inputData != "") FindPokemonInfo(inputData);
//   else Init();
// });

// btnBack.addEventListener("click", () => {
//   pokemonInfoInput.value = "";
//   NavigateToHome();
//   changeStateDescriptionContainer(true);
// });

// pokemonInfoBtnCloseDescription.forEach((button) =>
//   button.addEventListener("click", () => changeStateDescriptionContainer(true))
// );

// window.addEventListener("resize", () => {
//   const descriptionContainerState = getDescriptionContainerState();
//   if (descriptionContainerState) changeStateDescriptionContainer(false);
// });
