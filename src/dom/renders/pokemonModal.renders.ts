import type { Pokemon } from "../../types/pokemon.types";
import { pokemonModal } from "../elements.dom";

export const renderPokemonModel = (data: Pokemon) => {
  pokemonModal.innerHTML = ``;
  pokemonModal.innerHTML = `
         <img
            src="${data.sprites.other["official-artwork"].front_default}"
            alt="Pokemon image"
            id="pokemonSpriteModal"
            class="modal__pokemon-img"
        />
        <h3 id="pokemonNameModal" 
        class="modal__pokemon-name">
            #${data.id.toString().padStart(3, "0")} ${data.name}
        </h3>
    `;
};
