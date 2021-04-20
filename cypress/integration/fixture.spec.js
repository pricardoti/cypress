/// <reference types="cypress" />

describe('Fixures tests', () => {
  it('Get data from fixture file', () => {
    cy.visit('http://www.wcaquino.me/cypress/componentes.html');

    cy.fixture('userData').as('usuario')
      .then(usuario => {
        cy.get('#formNome').type(usuario.nome)
        cy.get('#formSobrenome').type(usuario.sobrenome)
        cy.get(`[name=formSexo][value=${usuario.sexo}]`).click()
        
        usuario.comidas.forEach(comida => {
          cy.get(`[name=formComidaFavorita][value=${comida}]`).click()
        })
        
        cy.get('#formEscolaridade').select(usuario.escolaridade)
        cy.get('#formEsportes').select(usuario.esporte)
      })

      cy.get('#formCadastrar').click()
      cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
  })
})