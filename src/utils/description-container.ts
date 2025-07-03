const pokemonInfoDescriptionDesktop = document.getElementById(
  "pokemonInfoDescriptionDesktop"
) as HTMLElement;
const pokemonInfoDescription = document.getElementById(
  "pokemonInfoDescription"
) as HTMLElement;
let isDescriptionContainerOpen: boolean = false;

export function changeStateDescriptionContainer(hidden: boolean) {
  if (hidden) {
    pokemonInfoDescription.style.display = "none";
    pokemonInfoDescriptionDesktop.style.display = "none";
    isDescriptionContainerOpen = false;
  } else {
    const desktopScreen: boolean = window.innerWidth > 640;
    if (desktopScreen) {
      pokemonInfoDescription.style.display = "none";
      pokemonInfoDescriptionDesktop.style.display = "block";
    } else {
      pokemonInfoDescription.style.display = "block";
      pokemonInfoDescriptionDesktop.style.display = "none";
    }
    isDescriptionContainerOpen = true;
  }
}

export function getDescriptionContainerState(): boolean {
  return isDescriptionContainerOpen;
}
