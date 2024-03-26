import {appText, AvailableLanguages, getCurrentLanguage} from "../languages.js";

class Header extends HTMLElement {
  constructor() {
    super();

  }

  updateTranslations() {
    const currentLanguage = getCurrentLanguage();

    this.menuOptions.forEach((option) => {
      const item = this.menu.querySelector(`a[href="${option.url}"]`);
      item.textContent = AvailableLanguages[currentLanguage][option.name];
    })

  }


  menuOptions = [
    {
      name: appText.header.mainPage,
      url: 'index.html'
    },
    {
      name: appText.header.about,
      url: 'about.html'
    },
    {
      name: appText.header.contact,
      url: 'why.html'
    },
  ]

  connectedCallback() {
    const currentUrl = window.location.pathname;

    const shadow = this.attachShadow({mode: "open"});

    const wrapper = document.createElement("nav");
    wrapper.setAttribute("class", "header");

    const menu = document.createElement("ul");
    menu.setAttribute("class", "menu");
    this.menu = menu

    const langSwitcher = document.createElement("language-switch");

    this.menuOptions.forEach((option) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.setAttribute("href", option.url);

      const isActive = currentUrl.endsWith(option.url);
      link.setAttribute("class", isActive ? "active" : "")


      link.textContent = option.name;
      item.appendChild(link);
      menu.appendChild(item);
    });

    this.menu.appendChild(langSwitcher)

    const style = document.createElement("style");

    style.textContent = `
      .header {
        display: flex;

        ul {
          display: flex;
          flex-flow: row nowrap;
          margin: auto;

          gap: 2rem;

          padding: 2rem 0;

          li {
            position: relative;
            font-size: 2rem;
            font-weight: 700;

            border-bottom: 2px solid transparent;

            &::marker {
              content: " ";
              color: var(--primary-color);
              margin-right: 1rem;
            }

            .active {
            font-weight: 700;
            border-bottom: 2px solid var(--primary-color);
            }

            &:after {
              content: "";
              display: block;
              width: 1px;
              height: 100%;
              background-color: var(--primary-color);
              transition: width .3s;
              position: absolute;
              top: 0;
              right: 0;

              margin-right: -1rem;
            }

            a {
              color: var(--primary-color);
              text-decoration: none;

              &:hover {
                color: var(--secondary-color);
              }

            }
          }
        }
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(menu);

    this.updateTranslations()

    window.addEventListener('language-switched', (e) => {
      this.updateTranslations()
    })
  }


}

customElements.define("my-header", Header);
