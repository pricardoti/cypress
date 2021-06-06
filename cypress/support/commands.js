// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/**
 * Comando para redefinimos a prioridade dos seletores, ou seja, a sequeência em que o cypress vai
 * dar preferência na hora de retornar o seletor na ferramenta. 
 * 
 * @see https://docs.cypress.io/guides/core-concepts/test-runner#Keyboard-Shortcuts
 * @see https://docs.cypress.io/api/cypress-api/selector-playground-api#Arguments
 */
import locators from '../support/locators';

Cypress.SelectorPlayground.defaults({
  selectorPriority: ['data-cy', 'data-test', 'data-testid', 'data-wc', 'id', 'class', 'attributes', 'tag', 'nth-child'],
})

Cypress.Commands.add('clickAlert', (locator, mensagem) => {
  cy.get(locator).click()
  cy.on('window:alert', msg => {
    expect(msg).to.be.equal(mensagem)
  })
})
