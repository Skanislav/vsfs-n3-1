// translations

export const appText = {
  header: {
    mainPage: 'mainPage',
    about: 'about',
    contact: 'contact'
  },
  main: {
    title: 'mainTitle',
    content: 'mainContent',
    button: 'mainButton',
    inputPlaceholder: 'mainInputPlaceholder'
  },
  about: {
    title: 'aboutTitle',
    content: {
      statement: 'aboutContentStatement',
      problem: 'aboutContentProblem',
      problemListElements: 'aboutContentProblemListElements',
      solution: 'aboutContentSolution'
    }
  },
  why: {
    title: 'whyTitle',
    content: 'whyContent'
  }
}

export const english = {
  [appText.header.mainPage]: 'N3 + 1',
  [appText.header.about]: 'What is it?',
  [appText.header.contact]: 'Why?',

  [appText.main.title]: '3n + 1 problem',
  [appText.main.content]: `
    This is the visual representation of the Collatz Conjecture.
    Please enter a number and see how it behaves.
  `,
  [appText.main.button]: 'Calculate',
  [appText.main.inputPlaceholder]: 'Enter a number',

  [appText.about.title]: 'What is it?',
  [appText.about.content.statement]: `
    This problem is also known as the Collatz Conjecture.
    It is a mathematical problem that has not been solved yet.
  `,
  [appText.about.content.problem]: `
    The problem is as follows:
  `,
  [appText.about.content.problemListElements]: [
    'Take any positive integer n.',
    'If n is even, divide it by 2.',
    'If n is odd, multiply it by 3 and add 1.',
    'Repeat the process indefinitely.'
  ],
  [appText.about.content.solution]: `
    The conjecture is that no matter what number you start with, you will always reach 1.
  `,

  [appText.why.title]: 'Why?',
  [appText.why.content]: 'The problem is simple to understand, but it is not known why it works. It is a great example of a simple problem that is easy to understand but hard to solve.'
}

export const czech = {
  [appText.header.mainPage]: 'N3 + 1',
  [appText.header.about]: 'Co to je?',
  [appText.header.contact]: 'Proč?',

  [appText.main.title]: '3n + 1 problém',
  [appText.main.content]: `
    Toto je vizuální reprezentace Collatzovy domněnky.
    Zadejte prosím číslo a podívejte se, jak se chová.
  `,
  [appText.main.inputPlaceholder]: 'Zadejte číslo',

  [appText.main.button]: 'Vypočítat',

  [appText.about.title]: 'Co to je?',
    [appText.about.content.statement]: `
    Tento problém je známý také jako Collatzova domněnka.
    Jedná se o matematický problém, který dosud nebyl vyřešen.
  `,
  [appText.about.content.problem]: `
    Problém je následující:
  `,
  [appText.about.content.problemListElements]: [
    'Vezměte libovolné kladné celé číslo n.',
    'Pokud je n sudé, vydělte jej 2.',
    'Pokud je n liché, vynásobte jej 3 a přičtěte 1.',
    'Opakujte proces do nekonečna.'
    ],
  [appText.about.content.solution]: `
    Domněnka je, že bez ohledu na to, s jakým číslem začnete, vždy se dostanete na 1.
  `,

  [appText.why.title]: 'Proč?',
  [appText.why.content]: 'Problém je snadné pochopit, ale není známo, proč funguje. Je to skvělý příklad jednoduchého problému, který je snadné pochopit, ale obtížné vyřešit.'
}

export const AvailableLanguages = {
  en: english,
  cz: czech
}

export const DefaultLanguage = 'en'
export const AvailableLanguagesKeys = Object.keys(AvailableLanguages)
export const getCurrentLanguage = () => localStorage.getItem("language") || DefaultLanguage;
export const setCurrentLanguage = (language) => localStorage.setItem("language", language);




