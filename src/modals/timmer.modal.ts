import { randomIntFromInterval } from "../store/ui.store";
import { getLanguage } from "../utils/languages";
import { transferenceCompletedTextLabels } from "./renderLabels.modal";

const modalControls = document.getElementById("modalControls") as HTMLElement;
const modalTitle = document.getElementById("modalTitle") as HTMLElement;

let timer = {
  desktopInterval: 0 as number,
  desktopTimeout: 0 as number,
  mobileInterval: 0 as number,
  mobileTimeout: 0 as number,
  mobileArrowInterval: 0 as number,
};

export function setIntervalDesktopInformation() {
  const pokeballs: NodeListOf<HTMLImageElement> =
    document.querySelectorAll(".modal__pokeball");
  let index: number = 0;
  setTimeout(() => {
    timer.desktopInterval = window.setInterval(() => {
      pokeballs.forEach((pokeball) => (pokeball.style.opacity = "0.3"));
      pokeballs[index].style.opacity = "1";
      index = (index + 1) % pokeballs.length;
    }, randomIntFromInterval(300, 800));
  }, 30);

  timer.desktopTimeout = window.setTimeout(() => {
    clearInterval(timer.desktopInterval);
    pokeballs.forEach((pokeball) => (pokeball.style.opacity = "0.3"));
    transferenceCompletedTextLabels();
  }, randomIntFromInterval(3000, 10000));
}

export function setIntervalMobileInformation() {
  const colorImg = document.querySelector(".img-color") as HTMLImageElement;
  const arrows: NodeListOf<HTMLImageElement> = document.querySelectorAll(
    ".modal__pokemonArrow"
  );
  let index: number = 0;
  let progress: number = 0;
  timer.mobileTimeout = window.setTimeout(() => {
    timer.mobileInterval = window.setInterval(() => {
      progress += 2;
      colorImg.style.clipPath = `inset(0 0 ${100 - progress}% 0)`;

      if (progress >= 100) {
        clearInterval(timer.mobileInterval);
        clearInterval(timer.mobileArrowInterval);
        arrows.forEach((arrow) => (arrow.style.display = "none"));
        transferenceCompletedTextLabels();
      }
    }, randomIntFromInterval(100, 300));

    timer.mobileArrowInterval = setInterval(() => {
      arrows.forEach((arrow) => (arrow.style.opacity = "0.3"));
      arrows[index].style.opacity = "1";
      index = (index + 1) % arrows.length;
    }, 400);
  }, 30);
}

export function resetTimers() {
  const pokeballs: NodeListOf<HTMLImageElement> =
    document.querySelectorAll("#pokeball");
  const colorImg = document.querySelector(".img-color") as HTMLImageElement;
  const arrows: NodeListOf<HTMLImageElement> = document.querySelectorAll(
    ".modal__pokemonArrow"
  );

  const desktopScreen = window.innerWidth > 640;
  const lang = getLanguage();

  clearInterval(timer.desktopInterval);
  clearInterval(timer.mobileInterval);
  clearTimeout(timer.desktopTimeout);
  clearTimeout(timer.mobileTimeout);
  modalControls.style.display = "none";
  modalTitle.textContent = lang
    ? lang === "en"
      ? "Transference in progress"
      : "Transferencia en proceso"
    : "Transference in progress";
  modalTitle.style.color = "var(--clr-modal-title)";

  if (desktopScreen)
    pokeballs.forEach((pokeball) => (pokeball.style.opacity = "0.3"));
  else {
    arrows.forEach((arrow) => (arrow.style.display = "block"));
    colorImg.style.clipPath = "inset(0 0 100% 0)";
  }
}
