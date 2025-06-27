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

  const toogleMobileNav = (open: boolean) => {
    mobileNav.style.display = open ? "flex" : "none";
    document.body.style.overflowY = open ? "hidden" : "auto";
  };

  headerBars.addEventListener("click", () => {
    // isMobileNavOpen = !isMobileNavOpen;
    // if (isMobileNavOpen) {
    //   mobileNav.style.display = "flex";
    //   document.body.style.overflowY = "hidden";
    // } else {
    //   mobileNav.style.display = "none";
    //   document.body.style.overflowY = "hidden";
    // }
    toogleMobileNav(!isMobileNavOpen);
  });

  headerExit.addEventListener("click", () => {
    toogleMobileNav(false);
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toogleMobileNav(false);
    });
  });
};

export default mobileNav;
