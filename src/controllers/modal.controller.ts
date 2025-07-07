import { dialog } from "../dom/elements.dom";
import { renderDesktopModal } from "../dom/renders/desktopModal.renders";
import { renderMobileModal } from "../dom/renders/mobileModal.renders";
import { renderPokemonModel } from "../dom/renders/pokemonModal.renders";
import {
  setIntervalDesktopInformation,
  setIntervalMobileInformation,
} from "../modals/timmer.modal";
import { fetchSinglePokemon } from "../services/pokemon.service";

export async function showModal(): Promise<void> {
  const desktopScreen = window.innerWidth > 640;
  const data = await fetchSinglePokemon(
    window.location.hash.split("/").filter(Boolean).pop()!
  );

  if (desktopScreen) {
    renderDesktopModal();
    setIntervalDesktopInformation();
  } else {
    renderMobileModal();
    setIntervalMobileInformation();
  }
  renderPokemonModel(data);
  dialog.showModal();
}
