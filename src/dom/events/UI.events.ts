import {
  changeStateDescriptionContainer,
  getDescriptionContainerState,
} from "../../utils/description-container";

export function setupReziseHandler(): void {
  window.addEventListener("resize", () => {
    const descriptionContainerState = getDescriptionContainerState();
    if (descriptionContainerState) changeStateDescriptionContainer(false);
  });
}
