import {appText, AvailableLanguages, getCurrentLanguage} from "../languages.js";

class WhySection extends HTMLElement {
  constructor() {
    super();
  }

  /**
   * @param {'en' | 'cz'} language
   * @param {Object} elements
   */
  updateTranslations(language, elements) {
    elements.title.innerHTML = AvailableLanguages[language][appText.why.title];
    elements.description.innerHTML = AvailableLanguages[language][appText.why.content];
  }

  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'why-section');

    const title = document.createElement('h1');

    const description = document.createElement('p');

    const elements = {
      title,
      description,
    }

    const style = document.createElement('style');
    style.textContent = `
      .why-section {
        margin: 0 auto;
        max-width: 800px;
        padding: 20px;

        h1 {
          font-size: 24px;
          margin-bottom: 20px;
          color: var(--primary-color);
        }

        p {
          font-size: 16px;
          line-height: 1.5;
          color: var(--secondary-color);
        }
    `;

    shadow.appendChild(wrapper);
    shadow.appendChild(style);
    wrapper.appendChild(title);
    wrapper.appendChild(description);

    this.updateTranslations(getCurrentLanguage(), elements);

    window.addEventListener('language-switched', (e) => {
      this.updateTranslations(e.detail, elements)
    })
  }
}

customElements.define('why-section', WhySection)
