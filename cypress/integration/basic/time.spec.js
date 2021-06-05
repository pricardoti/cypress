/// <reference types="cypress" />

context('Alerts', () => {
  before(() => {
    cy.log('beforeAll => é executado antes de cada execução do contexto (class)')
    cy.visit('http://www.wcaquino.me/cypress/componentes.html');
  })

  it('Going back to the past', () => {
    // assim que virar o dia e/ou hora, o teste será inválido.
    // cy.get('#buttonNow').click()
    // cy.get('#resultado > span').should('contain', '05/06/2021')

    // reseta a hora do sistema, ignorando a data e hora atual.
    // valor settado default 31/12/1969 21:00:00 - 3 horas a menos por conta do fuso.
    // 31/12/1969 21:00:00 -3 hora => 01/01/1970 18:00:00

    // cy.clock()
    // cy.get('#buttonNow').click()
    // cy.get('#resultado > span').should('contain', '05/06/2021')

    const date = new Date(2021, 9, 28, 18, 0, 0);
    cy.clock(date)
    cy.get('#buttonNow').click()
    cy.get('#resultado > span').should('have.text', '28/10/2021 18:00:00')
  })

  it('Goes to the future', () => {
    cy.clock()

    // adiciona 5000 no timestamp apartir do resultado do clock()
    cy.tick(5000)
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span')
      .should('have.text', 5000)

    // adiciona 2500 no timestamp apartir do ultimo valor
    cy.tick(2500)
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span')
      .should('have.text', 7500)
  })
})