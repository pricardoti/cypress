import locators from './locators';

Cypress.Commands.add('login', (user, password) => {
  cy.get(locators.LOGIN.USER_EMAIL).type(user);
  cy.get(locators.LOGIN.USER_PASSWORD).type(password)
  cy.get(locators.LOGIN.ACTION_SUBMIT).click()

  cy.validMessage('Bem vindo, Paulo Ricardo!')
})

Cypress.Commands.add('validMessage', message => {
  cy.get(locators.MESSAGE)
    .should('exist')
    .and('contain', message)
})