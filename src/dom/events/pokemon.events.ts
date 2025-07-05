import {
  initializePokemonData,
  showAllPokemon,
  showMoreResults,
  showPokemon,
  showPokemonByGeneration,
  showPokemonByGenType,
  showPokemonByType,
  showPokemonDetails,
  showPokemonMove,
} from "../../controllers/pokemon.controller";
import {
  btnBack,
  generationCmb,
  pokemonInfoBtnCloseDescription,
  pokemonInfoDescriptionDesktopContainer,
  pokemonInfoInput,
  pokemonInfoMovesContent,
  pokemonInfoMovesDescription,
  pokemonInput,
  pokemonLogoBtn,
  pokemonTypeBtn,
  searchBtn,
  searchInfoBtn,
  typeCmb,
} from "../elements.dom";
import {
  getSelectedValue,
  setIsTypeSearch,
  setSelectedValue,
} from "../../store/pokemon.store";
import {
  moreResultsBtn,
  pokemonContainer,
  updateTypeButtonColor,
} from "../../store/ui.store";
import { changeStateDescriptionContainer } from "../../utils/description-container";
import { NavigateToHome, NavigateToInfo } from "../../utils/router";

const setupEventListeners = () => {
  if (generationCmb && typeCmb) {
    generationCmb.addEventListener("change", () => {
      const gen = generationCmb.value;
      if (gen) {
        pokemonInput.value = "";
        typeCmb.value = "";
        setSelectedValue(gen);
        setIsTypeSearch(false);
        updateTypeButtonColor("");
        if (gen === "0") showAllPokemon();
        else showPokemonByGeneration(gen);
      }
    });

    typeCmb.addEventListener("change", () => {
      const type = typeCmb.value;
      if (type) {
        const gen = getSelectedValue();
        pokemonInput.value = "";
        setIsTypeSearch(true);
        updateTypeButtonColor(type);

        if (gen === "0") showPokemonByType(type);
        else showPokemonByGenType(gen, type);
      }
    });
  }

  pokemonTypeBtn.forEach((button) => {
    button.addEventListener("click", (e: Event) => {
      const type = (e.currentTarget as HTMLButtonElement).id;
      const gen = getSelectedValue();
      pokemonInput.value = "";
      setIsTypeSearch(true);
      updateTypeButtonColor(type);

      if (gen === "0") showPokemonByType(type);
      else showPokemonByGenType(gen, type);
    });
  });

  if (searchBtn && pokemonInput) {
    searchBtn.addEventListener("click", () => {
      const input = pokemonInput.value.trim();
      if (input) showPokemon(input);
    });
  }

  if (searchInfoBtn && pokemonInfoInput) {
    searchInfoBtn.addEventListener("click", () => {
      const input = pokemonInfoInput.value.trim();
      if (input) showPokemonDetails(input);
    });
  }

  pokemonContainer.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const pokemonContent = target.closest(".pokemon__content") as HTMLElement;

    if (pokemonContent) {
      const id: string = pokemonContent.id;
      NavigateToInfo(id);
    }
  });

  pokemonInfoMovesContent.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const container =
      window.innerWidth > 640
        ? pokemonInfoDescriptionDesktopContainer
        : pokemonInfoMovesDescription;
    const pokemonContent = target.closest(
      ".pokemonInfo__moves-type"
    ) as HTMLElement;
    if (pokemonContent) {
      const id = target.id;
      showPokemonMove(parseInt(id));
      changeStateDescriptionContainer(false);
      container.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  });

  if (moreResultsBtn) {
    moreResultsBtn.addEventListener("click", showMoreResults);
  }

  pokemonLogoBtn.forEach((button) =>
    button.addEventListener("click", () => {
      initializePokemonData();
    })
  );

  btnBack.addEventListener("click", () => {
    pokemonInfoInput.value = "";
    NavigateToHome();
    changeStateDescriptionContainer(true);
  });

  pokemonInfoBtnCloseDescription.forEach((button) => {
    button.addEventListener("click", () => {
      changeStateDescriptionContainer(true);
    });
  });
};

export default setupEventListeners;
