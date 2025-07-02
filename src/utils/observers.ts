const headerObserver = () => {
  const header = document.getElementById("header") as HTMLElement;
  const backTopTopBtn = document.getElementById(
    "backToTop"
  ) as HTMLButtonElement;

  if (header && backTopTopBtn) {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) backTopTopBtn.style.display = "block";
        else backTopTopBtn.style.display = "none";
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      }
    );

    headerObserver.observe(header);

    backTopTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
};

export default headerObserver;
