import type { Pokemon, PokemonMove } from "../../types/pokemon.types";

export const PokemonImg = document.getElementById(
  "pokemonInfoImg"
) as HTMLImageElement;
export const PokemonId = document.getElementById(
  "pokemonInfoId"
) as HTMLElement;
export const PokemonName = document.getElementById(
  "pokemonInfoName"
) as HTMLElement;
export const PokemonHP = document.getElementById(
  "pokemonInfoHP"
) as HTMLElement;
export const PokemonXP = document.getElementById(
  "pokemonInfoXP"
) as HTMLElement;
export const PokemonTypesContainer = document.getElementById(
  "pokemonInfoTypesContainer"
) as HTMLElement;
export const PokemonWeight = document.getElementById(
  "pokemonInfoWeight"
) as HTMLElement;
export const PokemonHeight = document.getElementById(
  "pokemonInfoHeight"
) as HTMLElement;
export const PokemonMovesContent = document.getElementById(
  "pokemonInfoMovesContent"
) as HTMLElement;

export function renderPokemonDetails(
  data: Pokemon,
  moves: PokemonMove[]
): void {
  const types = data.types
    .map(
      (type) => `
      <div class="pokemon__type ${type.type.name}" data-section="types" data-value="${type.type.name}">${type.type.name}</div>
    `
    )
    .join("");

  const pokemonMoves = moves
    .map(
      (moveData) => `
      <button class="btn pokemonInfo__moves-type ${moveData.type.name}" id="${moveData.id}">${moveData.name}</button>
    `
    )
    .join("");

  PokemonImg.src = data.sprites.other["official-artwork"].front_default ?? "";
  PokemonId.textContent = data.id.toString().padStart(3, "0");
  PokemonName.textContent = data.name.toUpperCase();
  PokemonHP.innerHTML = `HP ${Math.floor(
    Math.random() * data.stats[0].base_stat + 1
  )} <strong>/</strong> ${data.stats[0].base_stat}`;
  PokemonXP.textContent = `XP ${
    Math.floor(Math.random() * data.base_experience) + 1
  }/${data.base_experience}`;
  PokemonWeight.textContent = `${data.weight / 10}kg`;
  PokemonHeight.textContent = `${data.height / 10}m`;
  PokemonTypesContainer.innerHTML = ``;
  PokemonMovesContent.innerHTML = ``;
  PokemonTypesContainer.innerHTML = types;
  PokemonMovesContent.innerHTML = pokemonMoves;
}
