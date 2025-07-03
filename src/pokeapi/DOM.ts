import type { Pokemon, PokemonInfo, PokemonMove } from "./types";

export const pokemonContainer = document.getElementById(
  "pokemonContainer"
) as HTMLElement;
export const pokemonTypeBtn: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".pokemonType");
export const pokemonLogoBtn: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll("#pokemonLogo");
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
export const pokemonInfoInput = document.getElementById(
  "pokemonInfoInput"
) as HTMLInputElement;
export const searchInfoBtn = document.getElementById(
  "pokemonInfoSearchBtn"
) as HTMLButtonElement;
export const btnBack = document.getElementById(
  "pokemonInfoBtnBack"
) as HTMLButtonElement;
export const pokemonInfoContainer = document.getElementById(
  "pokemonInfoContainer"
) as HTMLElement;
export const pokemonInfoImg = document.getElementById(
  "pokemonInfoImg"
) as HTMLImageElement;
export const pokemonInfoId = document.getElementById(
  "pokemonInfoId"
) as HTMLElement;
export const pokemonInfoName = document.getElementById(
  "pokemonInfoName"
) as HTMLElement;
export const pokemonInfoHP = document.getElementById(
  "pokemonInfoHP"
) as HTMLElement;
export const pokemonInfoXP = document.getElementById(
  "pokemonInfoXP"
) as HTMLElement;
export const pokemonInfoBtnTransfer = document.getElementById(
  "pokemonInfoBtnTransfer"
) as HTMLButtonElement;
export const pokemonInfoTypesContainer = document.getElementById(
  "pokemonInfoTypesContainer"
) as HTMLElement;
export const pokemonInfoWeight = document.getElementById(
  "pokemonInfoWeight"
) as HTMLElement;
export const pokemonInfoHeight = document.getElementById(
  "pokemonInfoHeight"
) as HTMLElement;
export const pokemonInfoMovesContent = document.getElementById(
  "pokemonInfoMovesContent"
) as HTMLElement;
export const pokemonInfoDescription = document.getElementById(
  "pokemonInfoDescription"
) as HTMLElement;
export const pokemonInfoBtnCloseDescription: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll("#pokemonInfoBtnCloseDescription");
export const pokemonInfoMovesDescription: NodeListOf<HTMLElement> =
  document.querySelectorAll("#pokemonInfoMovesDescription");
export const pokemonInfoDescriptionDesktop = document.getElementById(
  "pokemonInfoDescriptionDesktop"
) as HTMLElement;
export const pokemonInfoMovesNameTypeColor = document.getElementById(
  "pokemonInfoMovesNameTypeColor"
) as HTMLSpanElement;
export const pokemonInfoMovesContainer = document.getElementById(
  "pokemonInfoMovesContainer"
) as HTMLSpanElement;
export const pokemonInfoDescriptionDesktopContainer = document.getElementById(
  "pokemonInfoDescriptionDesktopContainer"
) as HTMLElement;

export function ShowPokemon(data: Pokemon): void {
  const types = data.types
    .map(
      (type) => `<p class="pokemon__type ${type.type.name}"
      data-section="types" data-value="${type.type.name}">${type.type.name}`
    )
    .join("");

  const div = document.createElement("div");
  div.id = `${data.id}`;
  div.classList.add("pokemon__content");
  div.innerHTML = `
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
      </div>
    `;
  pokemonContainer.appendChild(div);
}

export function ShowPokemonInfo(data: PokemonInfo, moves: PokemonMove[]): void {
  const types = data.types
    .map(
      (type) => `
      <div class="pokemonInfo__type ${type.type.name}"
      data-section="types" data-value="${type.type.name}">
        ${type.type.name}
      </div>
    `
    )
    .join("");
  const pokemonMoves = moves
    .map(
      (moveData) =>
        `
      <button class="btn pokemonInfo__moves-type ${moveData.type.name}"
      id="${moveData.id}">
        ${moveData.name}
      </button>
  `
    )
    .join("");

  //add pokemon data to HTML elements
  pokemonInfoImg.src =
    data.sprites.other["official-artwork"].front_default?.toString()!;
  pokemonInfoId.textContent = data.id.toString().padStart(3, "0");
  pokemonInfoName.textContent = data.name.toString().toUpperCase();
  pokemonInfoHP.innerHTML = `HP ${Math.floor(
    Math.random() * data.stats[0].base_stat + 1
  )} <strong>/</strong> ${data.stats[0].base_stat}`;
  pokemonInfoXP.textContent = `XP ${
    Math.floor(Math.random() * data.base_experience) + 1
  }/${data.base_experience}`;
  pokemonInfoWeight.textContent = `${data.weight / 10}kg`;
  pokemonInfoHeight.textContent = `${data.height / 10}m`;
  pokemonInfoTypesContainer.innerHTML = ``;
  pokemonInfoTypesContainer.innerHTML = types;
  pokemonInfoMovesContent.innerHTML = ``;
  pokemonInfoMovesContent.innerHTML = pokemonMoves;
}

export function ShowPokemonInfoMove(move: PokemonMove): void {
  pokemonInfoMovesContainer.innerHTML = ``;
  pokemonInfoMovesContainer.innerHTML = `
    <h4
      class="pokemonInfo__moves-name ${move.type.name}">
      ${move.name}
      <span        
        class="pokemonInfo__moves-name-type"
        >(${move.type.name})</span
      >
    </h4>
     <div class="pokemonInfo__moves-description-stats">
      <div class="pokemonInfo__moves-description-stats">
        <h5 class="pokemonInfo__moves-titles"
          data-section="description" data-value="target">Target: </h5>
        <h4 class="pokemonInfo__moves-name">
        ${move.target.name}
        </h4>
      </div>
      <div class="pokemonInfo__moves-description-stats">
        <h5 class="pokemonInfo__moves-titles"
          data-section="description" data-value="power">Power: </h5>
        <h4 class="pokemonInfo__moves-name">
        ${move.power != null ? move.power : 0}
        </h4>
      </div>
      <div class="pokemonInfo__moves-description-stats">
      <h5 class="pokemonInfo__moves-titles"
          data-section="description" data-value="priority">Priority: </h5>
        <h4 class="pokemonInfo__moves-name">
        ${move.priority}
        </h4>
      </div>
    </div>
  `;

  pokemonInfoMovesDescription.forEach(
    (description) =>
      (description.textContent = move.effect_entries[0].effect.trim())
  );
  pokemonInfoDescriptionDesktopContainer.innerHTML = ``;
  pokemonInfoDescriptionDesktopContainer.innerHTML = `
    <div class="pokemonInfo__moves-description-stats">
      <h3 class="pokemonInfo__moves-name-header"
      data-section="description"
      data-value="moveName">Move name: </h3>
        <h4 class="pokemonInfo__moves-name ${move.type.name}">
            ${move.name}
            <span        
              class="pokemonInfo__moves-name-type"
              >(${move.type.name})</span
            >            
        </h4>    
    
    </div>
    <div class="pokemonInfo__moves-description-stats">
      <h5 class="pokemonInfo__moves-titles"
        data-section="description" data-value="target">Target: </h5>
      <h4 class="pokemonInfo__moves-name">
      ${move.target.name}
      </h4>
      <h5 class="pokemonInfo__moves-titles"
        data-section="description" data-value="power">Power: </h5>
      <h4 class="pokemonInfo__moves-name">
      ${move.power != null ? move.power : 0}
      </h4>
      <h5 class="pokemonInfo__moves-titles"
        data-section="description" data-value="priority">Priority: </h5>
      <h4 class="pokemonInfo__moves-name">
      ${move.priority}
      </h4>
    </div>
    `;
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

// export function ShowDescriptionContainer(hidden: boolean) {
//   if (hidden) {
//     pokemonInfoDescriptionDesktop.style.display = "none";
//     pokemonInfoDescription.style.display = "none";
//   } else {
//     const desktopScreen = window.innerWidth > 640;
//     if (desktopScreen) {
//       pokemonInfoDescriptionDesktop.style.display = "block";
//       pokemonInfoDescription.style.display = "none";
//     } else {
//       pokemonInfoDescriptionDesktop.style.display = "none";
//       pokemonInfoDescription.style.display = "block";
//     }
//   }
// }

export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
