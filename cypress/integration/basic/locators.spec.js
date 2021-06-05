/// <reference types="cypress" />

describe('Work with locators', () => {
  before(() => {
    cy.visit('http://www.wcaquino.me/cypress/componentes.html');
  })

  it('using jquery selector', () => {
    /**
     * Retornado pelo console do Cypress.
     * <code>cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')<code>
     * 
     * @see https://www.w3schools.com/jquery/jquery_ref_selectors.asp
     */
    cy.get('table#tabelaUsuarios > tbody > tr:eq(0) td:nth-child(3) input').click()
    cy.get('#tabelaUsuarios tbody tr td:contains(\'Doutorado\'):first ~ td:nth-child(3) input').click()
  })

  it.only('using xpath selector', () => {
    // cy.xpath('//input')
    // cy.xpath('/html/body//input')

    // Busca mais dinamica
    cy.xpath('//input[contains(@onclick, \'Francisco\')]').click()
    cy.xpath('//input[contains(@onclick, \'Maria\')]').click()

    cy.xpath("//table[@id='tabelaUsuarios']//td[contains(., 'Doutorado')]/following-sibling::td/input[contains(@onclick,'Maria')]").click()
  })
})