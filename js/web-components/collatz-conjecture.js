import {appText, AvailableLanguages, getCurrentLanguage} from "../languages.js";

class CollatzConjecture extends HTMLElement {
  constructor() {
    super();
  }

  calculateTheNextNumbers = (current, results) => {
    if (current === 1) {
      return results;
    }

    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }

    results.push(current);
    return this.calculateTheNextNumbers(current, results);
  }

  updateTranslations(language, elements) {
    elements.title.textContent = AvailableLanguages[language][appText.main.title];
    elements.content.textContent = AvailableLanguages[language][appText.main.content];
    elements.button.textContent = AvailableLanguages[language][appText.main.button];
    elements.input.setAttribute("placeholder", AvailableLanguages[language][appText.main.inputPlaceholder]);
  }

  connectedCallback() {
    const shadow = this.attachShadow({mode: "open"});

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "collatz");

    const title = document.createElement("h1");
    title.textContent = "3n + 1 problém";

    const content = document.createElement("p");
    content.textContent = `
        This is the visual representation of the Collatz Conjecture.

        Please enter a number and see how it behaves.
    `;

    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("placeholder", "Enter a number");
    input.setAttribute("id", "collatz-input");

    const button = document.createElement("button");
    button.textContent = "Calculate";
    button.setAttribute("id", "collatz-button");
    button.addEventListener("click", (e) => {
      const removeResults = wrapper.querySelector(".results");
      if (removeResults) {
        removeResults.remove();
      }

      const value = input.value;
      const number = parseInt(value);

      if (isNaN(number)) {
        alert("Please enter a valid number");
        return;
      }

      const results = this.calculateTheNextNumbers(number, [number])

      let delay = 0;
      const delayIncrement = 100; // Adjust this value to control the speed of the animation

      const ul = document.createElement("ul");
      ul.setAttribute("class", "results");
      wrapper.appendChild(ul);

      results.forEach((result, index) => {
        setTimeout(() => {
          const li = document.createElement("li");

          const logaritm = Math.log(result);
          li.style.marginBottom = `${logaritm * index}px`;

          li.textContent = result;
          ul.appendChild(li);
          ul.scrollLeft = ul.scrollWidth;
        }, delay);

        delay += delayIncrement;
      });

    })

    const style = document.createElement("style");
    style.textContent = `
       @keyframes slideInFromTop {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(0);
          }
       }

      .collatz {
        margin-top: 50px;
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

        ul {
        margin: 0;
        padding: 0;

        display: flex;
        gap: 1rem;
        align-items: flex-end;

        overflow: auto;

        li {
        color: var(--primary-color);
        animation: slideInFromTop 0.5s ease;

         &::marker {
           content: "";
         }
          text-decoration: none;
        }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(title);
    wrapper.appendChild(content);

    wrapper.appendChild(input);
    wrapper.appendChild(button);

    this.updateTranslations(getCurrentLanguage(), {
      title, content, input, button
    })

    window.addEventListener('language-switched', (e) => {
      this.updateTranslations(e.detail, {
        title, content, input, button
      })
    })
  }

}

customElements.define('collatz-conjecture', CollatzConjecture);
