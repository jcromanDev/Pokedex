import {
  resetLists,
  resetOffsets,
  setIsTypeSearch,
  setSelectedValue,
} from "../store/pokemon.store";
import { updateTypeButtonColor } from "../store/ui.store";
import { changeStateDescriptionContainer } from "../utils/description-container";
import {
  generationCmb,
  pokemonContainer,
  pokemonInfoInput,
  pokemonInfoMovesContent,
  pokemonInput,
  PokemonTypesContainer,
  typeCmb,
} from "./elements.dom";

function clearContainer() {
  pokemonContainer.innerHTML = ``;
  pokemonInfoMovesContent.innerHTML = ``;
  PokemonTypesContainer.innerHTML = ``;
}

function resetInputs() {
  typeCmb.value = "";
  generationCmb.value = "";
  pokemonInput.value = "";
  pokemonInfoInput.value = "";
  setSelectedValue("1");
  setIsTypeSearch(false);
}

function hideDescriptionContainer() {
  changeStateDescriptionContainer(true);
}

export function resetUI() {
  resetOffsets();
  resetLists();
  clearContainer();
  resetInputs();
  updateTypeButtonColor("");
  hideDescriptionContainer();
}
