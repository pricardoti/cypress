/// <reference types="cypress" />

describe('Dinamic tests', () => {
  before(() => {
    cy.visit('http://www.wcaquino.me/cypress/componentes.html');
  })

  beforeEach(() => {
    cy.reload()
  })


  const foods = ["Carne", "Frango", "Pizza", "Vegetariano"]
  foods.forEach(food => {
    it(`Cadastro com comida variada: ${food}`, () => {
      cy.fixture('userData').as('usuario')
        .then(usuario => {
          cy.get('#formNome').type(usuario.nome)
          cy.get('#formSobrenome').type(usuario.sobrenome)
          cy.get(`[name=formSexo][value=${usuario.sexo}]`).click()

          // cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`)
          cy.xpath(`//label[contains(., '${food}')]/../input`).click()

          cy.get('#formEscolaridade').select(usuario.escolaridade)
          cy.get('#formEsportes').select(usuario.esporte)
        })

      cy.get('#formCadastrar').click()
      cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    })
  })

  it.only("Deve selecioar todos", () => {
    cy.fixture('userData').as('usuario')
      .then(usuario => {
        cy.get('#formNome').type(usuario.nome)
        cy.get('#formSobrenome').type(usuario.sobrenome)
        cy.get(`[name=formSexo][value=${usuario.sexo}]`).click()

        // cy.get(`[name=formComidaFavorita]`).click({
        //   multiple: true
        // })

        cy.get(`[name=formComidaFavorita]`).each($elment => {
          if ($elment.val() !== 'vegetariano')
            cy.wrap($elment).click()
        })

        cy.get('#formEscolaridade').select(usuario.escolaridade)
        cy.get('#formEsportes').select(usuario.esporte)

        // cy.get('#formCadastrar').click()
        // cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
      })
  })
})