/// <reference types="cypress" />

describe('Cypress Basic', () => {
    it('Should visit a page and assert title', () => {
        cy.visit('http://www.wcaquino.me/cypress/componentes.html');

        // retorna uma Promisse
        cy.title()
            .should('to.be.not.empty', 'title')
            .and('to.be.equal', 'Campo de Treinamento');

        cy.title().then(title => {
            cy.log(`Then: ${title}`)
        });

        cy.title().should(title => {
            cy.log(`Should: ${title}`)
        });

        cy.title().then($title => {
            cy.get('#formNome').type($title)
        })

    })

    it('Should find and interact with an element', () => {
        cy.visit('http://www.wcaquino.me/cypress/componentes.html');
        cy.get('#buttonSimple')
            .click().should('have.value', 'Obrigado!');
    })
})