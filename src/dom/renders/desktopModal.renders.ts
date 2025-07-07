import { modalAnimationsModels } from "../elements.dom";

export const renderDesktopModal = () => {
  const div = document.createElement("div");
  div.id = "modalAnimation";
  div.classList.add("modal__animationContentDesktop");
  div.innerHTML = `
    <img
      src="/pokeball2.jpg"
      alt="Pokeball image"
      class="modal__pokeball"
    />
    <img
    src="/pokeball2.jpg"
      alt="Pokeball image"
      class="modal__pokeball"
    />
    <img
      src="/pokeball2.jpg"
      alt="Pokeball image"
      class="modal__pokeball"
    />
    <img
      src="/pokeball2.jpg"
      alt="Pokeball image"
      class="modal__pokeball"
      />
    <img
    src="/pokeball2.jpg"
      alt="Pokeball image"
      class="modal__pokeball"
      />
      `;
  modalAnimationsModels.innerHTML = ``;
  modalAnimationsModels.appendChild(div);
};
