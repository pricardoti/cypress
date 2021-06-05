/// <reference types="cypress" />

describe('Should test at a functional level', () => {
  before(() => {
    cy.visit('http://barrigareact.wcaquino.me/');
  })

  it('Login success', () => {
    // TODO: adicionar fixture
    cy.get('.input-group > .form-control').type('pricardo.ti@gmail.com');
    cy.get(':nth-child(2) > .form-control').type('abc123')

    cy.get('.btn.btn-block.btn-primary').click()
    cy.get('.toast-message').should('exist')
    cy.get('.toast-message')
      .should('exist')
      .should('have.text', 'Bem vindo, Paulo Ricardo!')
  })

  it('Should create an account', () => {
    // Acessando a pagina de contas
    // given
    cy.get('[data-test=menu-settings]').click()
    cy.get('[href="/reset"]').click()

    cy.get('[data-test=menu-settings]').click()
    cy.get('[href="/contas"]').click()

    // Preenchimento das informações
    // when
    cy.get('[data-test=nome]').type('Conta de teste')
    cy.get('.btn.btn-primary.btn-block').click()

    // validações
    // then
    cy.get('.toast-success')
      .should('exist')
      .should('contain', 'Conta inserida com sucesso!')
    cy.xpath('//table//td[contains(., "Conta de teste")]')
  })

  it('Should update an account', () => {
    cy.xpath("//table//td[contains(., 'Conta de teste')]/..//i[@class='far fa-edit']")
      .click()

    cy.get('[data-test=nome]')
      .clear()
    cy.get('[data-test=nome]')
      .type('Conta de teste atualizada')
    cy.get('.btn.btn-primary.btn-block').click()

    cy.get('.toast-success')
      .should('exist')
      .should('contain', 'Conta atualizada com sucesso!')
    cy.xpath("//table//td[contains(., 'Conta de teste atualizada')]")
  })

})