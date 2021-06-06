import locators from './locators';

Cypress.Commands.add('accessAccount', () => {
  cy.get(locators.MENU.SETTINGS.CLICK).click()
  cy.get(locators.MENU.SETTINGS.OPTIONS.ACCOUNT).click()
})

Cypress.Commands.add('saveAccount', account => {
  cy.get(locators.ACCOUNT.NAME).type(account)
  cy.get(locators.ACCOUNT.ACTION_SUBMIT).click()
})

// quando colocado apenas 'clear' entra em conflito com o comando 'clear' do 'text'
Cypress.Commands.add('clearAccount', () => {
  cy.get(locators.MENU.SETTINGS.CLICK).click()
  cy.get(locators.MENU.SETTINGS.OPTIONS.RESET).click()
})