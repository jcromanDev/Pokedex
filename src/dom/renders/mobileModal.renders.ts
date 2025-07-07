import { modalAnimationsModels } from "../elements.dom";

export const renderMobileModal = () => {
  const div = document.createElement("div");
  div.id = "modalAnimationMobile";
  div.classList.add("modal__animationContentMobile");
  div.innerHTML = `
    <img
    class="modal__pokemonArrow"
    src="/pokemon_arrow.png"
    alt="Pokemon arrow image"
    />
    <img
    class="modal__pokemonArrow"
    src="/pokemon_arrow.png"
    alt="Pokemon arrow image"
    />
    <div class="modal__animationContentMobile-wrapper">
        <img
        src="/pokeball_BW.png"
        class="modal__pokeballImg img-bn"
        alt="Pokeball grayscale"
        />
        <img
        src="/pokeball.png"
        class="modal__pokeballImg img-color"
        alt="Pokeball color"
        />
    </div>
    <img
    class="modal__pokemonArrow"
    src="/pokemon_arrow.png"
    alt="Pokemon arrow image"
    />
    <img
    class="modal__pokemonArrow"
    src="/pokemon_arrow.png"
    alt="Pokemon arrow image"
    />
    `;
  modalAnimationsModels.innerHTML = ``;
  modalAnimationsModels.appendChild(div);
};
