export const moreResultsBtn = document.getElementById(
  "moreResultsBtn"
) as HTMLButtonElement;
export const pokemonContainer = document.getElementById(
  "pokemonContainer"
) as HTMLElement;

export function showMoreResultsButton(hidden: boolean) {
  moreResultsBtn.style.display = hidden ? "none" : "block";
}

export function updateTypeButtonColor(type: string): void {
  const pokemonTypeBtn = document.getElementById(
    "pokemonTypeColor"
  ) as HTMLButtonElement;
  const colors: Record<string, string> = {
    normal: "var(--type-normal)",
    fire: "var(--type-fire)",
    water: "var(--type-water)",
    grass: "var(--type-grass)",
    electric: "var(--type-electric)",
    ice: "var(--type-ice)",
    fighting: "var(--type-fighting)",
    poison: "var(--type-poison)",
    ground: "var(--type-ground)",
    flying: "var(--type-flying)",
    psychic: "var(--type-psychic)",
    bug: "var(--type-bug)",
    rock: "var(--type-rock)",
    ghost: "var(--type-ghost)",
    dark: "var(--type-dark)",
    dragon: "var(--type-dragon)",
    steel: "var(--type-steel)",
    fairy: "var(--type-fairy)",
  };
  pokemonTypeBtn.style.backgroundColor = colors[type] || "var(--clr-gray)";
  pokemonTypeBtn.style.color = [
    "water",
    "electric",
    "ground",
    "flying",
    "fairy",
  ].includes(type)
    ? "var(--clr-white)"
    : "var(--clr-black)";
}

export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function resetContainer() {
  pokemonContainer.innerHTML = ``;
}
