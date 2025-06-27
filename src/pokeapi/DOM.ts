import type { Pokemon } from "./types";

export const pokemonContainer = document.getElementById(
  "pokemonContainer"
) as HTMLElement;
export const pokemonTypeBtn: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".pokemonType");
export const generationCmb = document.getElementById(
  "pokemonGenCmb"
) as HTMLSelectElement;
export const typeCmb = document.getElementById(
  "pokemonTypeCmb"
) as HTMLSelectElement;
export const moreResultsBtn = document.getElementById(
  "moreResultsBtn"
) as HTMLButtonElement;
export const pokemonInput = document.getElementById(
  "pokemonInput"
) as HTMLInputElement;
export const searchBtn = document.getElementById(
  "pokemonSearchBtn"
) as HTMLButtonElement;

export function ShowPokemon(data: Pokemon): void {
  const types = data.types
    .map(
      (type) => `<p class="pokemon__type ${type.type.name}"
      data-section="types" data-value="${type.type.name}">${type.type.name}`
    )
    .join("");

  const div = document.createElement("div");
  div.classList.add("pokemon__content");
  div.innerHTML = `
    <a hred= "#">
        <p class="pokemon__id-background">${data.id
          .toString()
          .padStart(3, "0")}</p>
        <div class="pokemon__img">
            <img src="${
              data.sprites.other["official-artwork"].front_default
            }" alt="${data.name} image">
        </div>
        <div class="pokemon__info">
            <div class="pokemon__name-container">
                <p class="pokemon__id">#${data.id
                  .toString()
                  .padStart(3, "0")}</p>
                <h2 class="pokemon__name">${data.name}</h2>
            </div>
            <div class="pokemon__types">
                ${types}
            </div>
            <div class="pokemon__stats-container">
                <p class="pokemon__stat">${data.height / 10}m</p>
                <p class="pokemon__stat">${data.weight / 10}kg</p>
            </div>
        </div>
    </a>`;
  pokemonContainer.appendChild(div);
}

export function ChangePokemonTypeColorButton(type: string): void {
  const pokemonTypeBtn = document.getElementById(
    "pokemonTypeColor"
  ) as HTMLButtonElement;

  switch (type) {
    case "":
      pokemonTypeBtn.style.backgroundColor = "var(--clr-gray)";
      pokemonTypeBtn.style.color = "var(--clr-black)";
      break;
    case "normal":
      pokemonTypeBtn.style.backgroundColor = "var(--type-normal)";
      pokemonTypeBtn.style.color = "var(--clr-black)";
      break;
    case "fire":
      pokemonTypeBtn.style.backgroundColor = "var(--type-fire)";
      pokemonTypeBtn.style.color = "var(--clr-black)";
      break;
    case "water":
      pokemonTypeBtn.style.backgroundColor = "var(--type-water)";
      pokemonTypeBtn.style.color = "var(--clr-white)";
      break;
    case "grass":
      pokemonTypeBtn.style.backgroundColor = "var(--type-grass)";
      pokemonTypeBtn.style.color = "var(--clr-black)";
      break;
    case "electric":
      pokemonTypeBtn.style.backgroundColor = "var(--type-electric)";
      pokemonTypeBtn.style.color = "var(--clr-white)";
      break;
    case "ice":
      pokemonTypeBtn.style.backgroundColor = "var(--type-ice)";
      pokemonTypeBtn.style.color = "var(--clr-black)";
      break;
    case "fighting":
      pokemonTypeBtn.style.backgroundColor = "var(--type-fighting)";
      pokemonTypeBtn.style.color = "var(--clr-black)";
      break;
    case "poison":
      pokemonTypeBtn.style.backgroundColor = "var(--type-poison)";
      pokemonTypeBtn.style.color = "var(--clr-black)";
      break;
    case "ground":
      pokemonTypeBtn.style.backgroundColor = "var(--type-ground)";
      pokemonTypeBtn.style.color = "var(--clr-white)";
      break;
    case "flying":
      pokemonTypeBtn.style.backgroundColor = "var(--type-flying)";
      pokemonTypeBtn.style.color = "var(--clr-white)";
      break;
    case "psychic":
      pokemonTypeBtn.style.backgroundColor = "var(--type-psychic)";
      pokemonTypeBtn.style.color = "var(--clr-black)";
      break;
    case "bug":
      pokemonTypeBtn.style.backgroundColor = "var(--type-bug)";
      pokemonTypeBtn.style.color = "var(--clr-black)";
      break;
    case "rock":
      pokemonTypeBtn.style.backgroundColor = "var(--type-rock)";
      pokemonTypeBtn.style.color = "var(--clr-black)";
      break;
    case "ghost":
      pokemonTypeBtn.style.backgroundColor = "var(--type-ghost)";
      pokemonTypeBtn.style.color = "var(--clr-black)";
      break;
    case "dark":
      pokemonTypeBtn.style.backgroundColor = "var(--type-dark)";
      pokemonTypeBtn.style.color = "var(--clr-black)";
      break;
    case "dragon":
      pokemonTypeBtn.style.backgroundColor = "var(--type-dragon)";
      pokemonTypeBtn.style.color = "var(--clr-black)";
      break;
    case "steel":
      pokemonTypeBtn.style.backgroundColor = "var(--type-steel)";
      pokemonTypeBtn.style.color = "var(--clr-black)";
      break;
    case "fairy":
      pokemonTypeBtn.style.backgroundColor = "var(--type-fairy)";
      pokemonTypeBtn.style.color = "var(--clr-white)";
      break;
    default:
      pokemonTypeBtn.style.backgroundColor = "var(--clr-gray)";
      pokemonTypeBtn.style.color = "var(--clr-black)";
      break;
  }
}

export function showMoreResultsButton(hidden: boolean) {
  if (hidden) moreResultsBtn.style.display = "none";
  else moreResultsBtn.style.display = "block";
}
