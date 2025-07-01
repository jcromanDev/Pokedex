const headerControls = document.querySelector(
  ".header__controls"
) as HTMLElement;
const headerType = document.querySelector(".header__type") as HTMLElement;
const headerPokemonInfo = document.querySelector(
  ".header__pokemonInfo__controls"
) as HTMLElement;
const headerBtnBack = document.getElementById(
  "pokemonInfoBtnBack"
) as HTMLButtonElement;
const pokemonAll = document.getElementById("all") as HTMLElement;
const pokemonInfoContainer = document.getElementById(
  "pokemonInfo"
) as HTMLElement;

export const ShowSelectedPokemonInfo = (show: boolean) => {
  if (show) {
    headerControls.style.display = "none";
    headerType.style.display = "none";
    pokemonAll.style.display = "none";

    headerPokemonInfo.style.display = "flex";
    pokemonInfoContainer.style.display = "block";
    headerBtnBack.style.display = "block";
  } else {
    headerControls.style.display = "flex";
    headerType.style.display = "flex";
    pokemonAll.style.display = "block";

    headerPokemonInfo.style.display = "none";
    pokemonInfoContainer.style.display = "none";
    headerBtnBack.style.display = "none";
  }
};
