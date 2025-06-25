const mobileNav = () => {
  const headerBars: HTMLElement = document.querySelector(
    ".header__bars"
  ) as HTMLElement;
  const mobileNav: HTMLElement = document.querySelector(
    ".mobile-nav"
  ) as HTMLElement;
  const mobileLinks: NodeListOf<HTMLElement> =
    document.querySelectorAll(".mobile-nav__item");
  const headerExit = document.querySelector(".mobile-nav__exit") as HTMLElement;

  let isMobileNavOpen: boolean = false;

  headerBars.addEventListener("click", () => {
    isMobileNavOpen = !isMobileNavOpen;
    if (isMobileNavOpen) {
      mobileNav.style.display = "flex";
      document.body.style.overflowY = "hidden";
    } else {
      mobileNav.style.display = "none";
      document.body.style.overflowY = "hidden";
    }
  });

  headerExit.addEventListener("click", () => {
    isMobileNavOpen = !isMobileNavOpen;
    mobileNav.style.display = "none";
    document.body.style.overflowY = "hidden";
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      isMobileNavOpen = !isMobileNavOpen;
      mobileNav.style.display = "none";
      document.body.style.overflowY = "hidden";
    });
  });
};

export default mobileNav;
