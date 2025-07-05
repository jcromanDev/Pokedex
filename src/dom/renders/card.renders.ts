import type { Pokemon } from "../../types/pokemon.types";
import { getLanguage, setLanguage } from "../../utils/languages";

export const pokemonContainer = document.getElementById(
  "pokemonContainer"
) as HTMLElement;

export function renderPokemonCard(data: Pokemon): void {
  const types = data.types
    .map(
      (type) =>
        `<p class="pokemon__type ${type.type.name}" data-section="types" data-value="${type.type.name}">${type.type.name}</p>`
    )
    .join("");
  const div = document.createElement("div");
  div.id = `${data.id}`;
  div.classList.add("pokemon__content");
  div.innerHTML = `
    <p class="pokemon__id-background">${data.id.toString().padStart(3, "0")}</p>
    <div class="pokemon__img">
        <img src="${
          data.sprites.other["official-artwork"].front_default
        }" alt="${data.name} image">
    </div>
    <div class="pokemon__info">
        <div class="pokemon__name-container">
            <p class="pokemon__id">#${data.id.toString().padStart(3, "0")}</p>
            <h2 class="pokemon__name">${data.name}</h2>
        </div>
        <div class="pokemon__types">
            ${types}
        </div>
        <div class="pokemon__stats-container">
            <p class="pokemon__stat">${data.height / 10}m</p>
            <p class="pokemon__stat">${data.weight / 10}kg</p>
        </div>
    </div>`;
  pokemonContainer.appendChild(div);
  let lang = getLanguage();
  if (lang) setLanguage(lang);
}
