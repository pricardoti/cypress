/// <reference types="cypress" />

describe('Esperas', () => {
    before(() => {
        cy.visit('http://www.wcaquino.me/cypress/componentes.html');
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Deve aguardar elementos estar disponivel', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()

        // o cypress realizar a espera para criação do componente em tela - mas tem um limite definido.
        // retry
        cy.get('#novoCampo')
            .should('exist')
            .type('Funciona !!!')
    })

    it.skip('Deve fazer retrys', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
            // Não verá funcionar pois neste cenário ele não irá retornar o elemento
            // --- CUIDADO COM AS ASSERTIVAS / VEIRIFCAR RETORNO ---
            .should('not.exist')
            .should('exist')
            .type('Funciona !!!')
    })

    it('Uso do find', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

        cy.get('#lista li span')
            // como já havia executado 'cy.get('#lista li')'
            // Já tem o escopo reduzido, netes caso passar a arvore completa
            // .find('span')
            .should('contain', 'Item 2')
    })

    it.only('Click Retry', () => {
        cy.get('#buttonCount')
            .click()
            .should('have.value', '1')
    })
})