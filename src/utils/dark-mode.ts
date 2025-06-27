const darkMode = () => {
  const themeToogleBtns: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll("#theme-toggle");

  //state
  const theme = localStorage.getItem("theme");

  //On mount
  theme && document.body.classList.add(theme);

  //Handlers
  const handleThemeToggle = () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode"))
      localStorage.setItem("theme", "dark-mode");
    else {
      localStorage.removeItem("theme");
      document.body.removeAttribute("class");
    }
  };

  //Events
  themeToogleBtns.forEach((btn) =>
    btn.addEventListener("click", handleThemeToggle)
  );
};

export default darkMode;
