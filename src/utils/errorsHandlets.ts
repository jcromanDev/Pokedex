import {
  all,
  allError,
  btnBack,
  errorMessage,
  pokemonInfo,
} from "../dom/elements.dom";

export const initializeErrorHandler = () => {
  btnBack
    ? (pokemonInfo.style.display = "block")
    : (all.style.display = "block");
  allError.style.display = "none";
  errorMessage.textContent = "";
};

export const errorHandler = (message: string) => {
  all.style.display = "none";
  pokemonInfo.style.display = " none";
  allError.style.display = "flex";
  errorMessage.textContent = message;

  allError.scrollIntoView({ behavior: "smooth", block: "center" });
};
