import {appText, AvailableLanguages, getCurrentLanguage} from "../languages.js";

class About extends HTMLElement {
  constructor() {
    super();
  }

  updateTranslations(currentLanguage, {
                       title,
                       content
                     }) {

    title.textContent = AvailableLanguages[currentLanguage][appText.about.title];

    content.innerHTML = "";

    const statement = document.createElement("p")
    statement.textContent = AvailableLanguages[currentLanguage][appText.about.content.statement];

    const problem = document.createElement("p")
    problem.textContent = AvailableLanguages[currentLanguage][appText.about.content.problem];

    const problemList = document.createElement("ul");

    const problems = AvailableLanguages[currentLanguage][appText.about.content.problemListElements]

    problems.forEach(problem => {
      const li = document.createElement("li");
      li.textContent = problem;
      problemList.appendChild(li);
    })

    const solution = document.createElement("p")
    solution.textContent = AvailableLanguages[currentLanguage][appText.about.content.solution];


    content.appendChild(statement);
    content.appendChild(problem);
    content.appendChild(problemList);
    content.appendChild(solution);
  }

  connectedCallback() {
    const shadow = this.attachShadow({mode: "open"});

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "about");

    const title = document.createElement("h1");

    const content = document.createElement("div");
    content.setAttribute("class", "content");

    const style = document.createElement("style");
    style.textContent = `
      .about {
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
        li {
        font-size: 16px;
        line-height: 1.5;
        color: var(--secondary-color);
        text-decoration: none;
        }
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(title);
    wrapper.appendChild(content);


    this.updateTranslations(getCurrentLanguage(), {
      title, content
    })

    window.addEventListener('language-switched', (e) => {
      this.updateTranslations(e.detail, {
        title, content
      })
    })
  }

}

customElements.define("about-section", About);
