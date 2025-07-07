const langBtns: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll("[data-language]");
type languageData = {
  [section: string]: {
    [key: string]: string;
  };
};

const applyLanguage = (lang: string) => {
  const textsToChange: NodeListOf<HTMLElement> =
    document.querySelectorAll("[data-section]");
  // const url = new URL(window.location.href);
  // url.searchParams.set("lang", lang);
  // history.replaceState({}, url.toString());
  fetch(`/languages/${lang}.json`)
    .then((res) => res.json())
    .then((data: languageData) => {
      textsToChange.forEach((element) => {
        const section: string = element.dataset.section as string;
        const value: string = element.dataset.value as string;
        const translatedText = data[section][value];

        if (element instanceof HTMLInputElement)
          element.setAttribute("placeholder", translatedText);
        else element.textContent = translatedText;
      });
    });
};

langBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.language as string;
    localStorage.setItem("lang", lang);
    if (lang) applyLanguage(lang);
  });
});

export function setLanguage(lang: string | null) {
  if (lang) {
    localStorage.setItem("lang", lang);
    applyLanguage(lang);
  } else {
    localStorage.setItem("lang", "en");
    applyLanguage("en");
  }
}

export function getLanguage() {
  return localStorage.getItem("lang");
}

export function updateLanguage() {
  const lang = getLanguage();

  if (lang) setLanguage(lang);
}
