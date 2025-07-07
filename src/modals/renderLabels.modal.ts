import { getLanguage } from "../utils/languages";

const modalContainer = document.getElementById("modalContainer") as HTMLElement;
const modalTitle = document.getElementById("modalTitle") as HTMLElement;

const modalControls = document.getElementById("modalControls") as HTMLElement;
const modalDescription = document.querySelector(
  ".modal__description"
) as HTMLElement;

export function transferenceCompletedTextLabels() {
  const lang = getLanguage();
  modalControls.style.display = "flex";
  modalTitle.textContent = lang
    ? lang === "en"
      ? "Transference completed"
      : "Transferencia completada"
    : "Transference completed";
  modalTitle.style.color = "var(--type-grass)";
  modalContainer.style.cursor = "default";
  modalDescription.textContent = lang
    ? lang === "en"
      ? "Your pokemon has been send correctly, now you can send another one. Try another pokemon."
      : "Tú pokemon ha sido enviado correctamente, ahora puedes mandar otro. Intenta mandar otro pokemon."
    : "Your pokemon has been send correctly, now you can send another one. Try another pokemon.";
}
