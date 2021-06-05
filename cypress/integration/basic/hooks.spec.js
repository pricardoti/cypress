/// <reference types="cypress" />

describe('Work with Hooks', () => {

    // é executado uma vez antes de todos os testes no bloco
    before(() => {
        cy.log('beforeAll => é executado antes de cada execução do contexto (class)')
        cy.visit('http://www.wcaquino.me/cypress/componentes.html');
    })

    beforeEach(() => {
        cy.log('beforeEach => é executado antes de cada teste no bloco')
    })

    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado'); // Busca generica
        cy.get('span').should('contain', 'Cuidado'); // Especificando o elemento
        cy.get('.facilAchar').should('contain', 'Cuidado'); // Jquery Selector

        // Irá falhar pois compara extamente o texto obtido
        // cy.get('.facilAchar').should('have.text', 'Cuidado');
    })

    it('Links', () => {
        cy.get('a[href="#"]').click(); // Em verão anterior iria clicar no primeiro
        cy.get('#resultado')
            .should('have.text', 'Voltou!'); 
            
        cy.reload() // recarrega a pagina
    
        cy.get('#resultado')
            .should('have.not.text', 'Voltou!');
        cy.contains('Voltar').click()
        cy.get('#resultado')
            .should('have.text', 'Voltou!'); 
    })
})