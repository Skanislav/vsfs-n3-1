import {getCurrentLanguage, setCurrentLanguage} from "../languages.js";

class LanguageSwitch extends HTMLElement {
  constructor() {
    super();
  }

  getNextLanguage = () => {
    return this.currentLanguage() === "en" ? "cz" : "en";
  }

  handleSwitchLanguage = (e) => {
    setCurrentLanguage(this.getNextLanguage())

    e.target.textContent = this.emojiContentByLanguage[this.currentLanguage()];
    window.dispatchEvent(new CustomEvent("language-switched",  { detail: this.currentLanguage() }))
  }

  currentLanguage = () => getCurrentLanguage()

  emojiContentByLanguage = {
    en: "🇬🇧",
    cz: "🇨🇿"
  }

  connectedCallback() {
    const shadow = this.attachShadow({mode: "open"});

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "language-switch");

    const button = document.createElement("button");
    button.textContent = this.emojiContentByLanguage[this.currentLanguage()];

    button.addEventListener("click", (e) => this.handleSwitchLanguage(e));

    const style = document.createElement("style");

    style.textContent = `
      .language-switch {

        button {
          cursor: pointer;
          background-color: transparent;
          border: none;
          font-size: 24px;
          color: var(--primary-color);
          text-decoration: underline;
          color: var(--primary-color);
        }
      }
    `

    shadow.appendChild(wrapper);
    wrapper.appendChild(button);

    wrapper.appendChild(style);
  }

}


customElements.define("language-switch", LanguageSwitch);
