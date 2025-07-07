import type { PokemonMove } from "../../types/pokemon.types";

export const pokemonInfoMovesContainer = document.getElementById(
  "pokemonInfoMovesContainer"
) as HTMLSpanElement;
export const pokemonInfoMovesDescription = document.querySelectorAll(
  "#pokemonInfoMovesDescription"
) as NodeListOf<HTMLElement>;
export const pokemonInfoDescriptionDesktopContainer = document.getElementById(
  "pokemonInfoDescriptionDesktopContainer"
) as HTMLElement;

export function renderPokemonMoveDetail(move: PokemonMove): void {
  pokemonInfoMovesContainer.innerHTML = ``;
  pokemonInfoMovesContainer.innerHTML = `
    <h4 class="pokemonInfo__moves-name ${move.type.name}">
      ${move.name}
      <span class="pokemonInfo__moves-name-type">(${move.type.name})</span>
    </h4>
    <div class="pokemonInfo__moves-description-stats">
      <div><h5 data-section="description" data-value="target">Target: </h5><h4>${
        move.target.name
      }</h4></div>
      <div><h5 data-section="description" data-value="power">Power: </h5><h4>${
        move.power ?? 0
      }</h4></div>
      <div><h5 data-section="description" data-value="priority">Priority: </h5><h4>${
        move.priority
      }</h4></div>
    </div>`;

  pokemonInfoMovesDescription.forEach(
    (description) =>
      (description.textContent = move.effect_entries[0].effect.trim())
  );

  pokemonInfoDescriptionDesktopContainer.innerHTML = ``;
  pokemonInfoDescriptionDesktopContainer.innerHTML = `
    <div class="pokemonInfo__moves-description-stats">
      <h3 data-section="description" data-value="moveName">Move name: </h3>
      <h4 class="pokemonInfo__moves-name ${move.type.name}">
        ${move.target.name}
        <span class="pokemonInfo__moves-name-type">(${move.type.name})</span>
      </h4>
    </div>
    <div class="pokemonInfo__moves-description-stats">
      <h5 data-section="description" data-value="target">Target: </h5><h4>${
        move.name
      }</h4>
      <h5 data-section="description" data-value="power">Power: </h5><h4>${
        move.power ?? 0
      }</h4>
      <h5 data-section="description" data-value="priority">Priority: </h5><h4>${
        move.priority
      }</h4>
    </div>`;
}
