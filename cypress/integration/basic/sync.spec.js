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
        // cy.get('#buttonList').click()
        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

        cy.get('#lista li span')
            // como já havia executado 'cy.get('#lista li')'
            // Já tem o escopo reduzido, netes caso passar a arvore completa
            // .find('span')
            .should('contain', 'Item 2')
    })

    it('Click Retry', () => {
        cy.get('#buttonCount')
            .click()
            .should('have.value', '1')
    })

    it('Uso do timeout', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('exist')

        // TODO: Configuração especifica para um cenário
        // cy.get('#novoCampo', {
        //     timeout: 1000
        // }).should('exist')

        // TODO: configuração global
        // Configuração geral da aplicação
        // Adicionar: "defaultCommandTimeout": 10000
        // no arquivo cypress.json

        cy.get('#buttonListDOM').click()
        // para a execução e espera o tempo definido
        // cy.wait(5000)

        cy.get('#lista li span')
            .should('have.length', 1)
            .should('contain', 'Item 1')

        cy.get('#lista li span')
            .should('have.length', 2)
            .should('contain', 'Item 2')
    })

    it.only('Should vs Then', () => {
        cy.get('#buttonListDOM').click()
        // TODO: O then aguarda a conclusão da execução
        // o should tem o processo de sincronização do cypress e realiza verificações com frequencia;
        // Obs.: fica executando o retry;
        cy.get('#lista li span').then($el => {
            expect($el).to.have.length(1)
        })

        // TODO: o Should ignora o retorno da função;
        // o Then se não informar o return ele retornar o mesmo objeto, caso informe será considerado o return;
        cy.get('#buttonListDOM')
            .then($el => {
                expect($el).to.have.length(1)
                return 2;
            })
            .and('eq', 2)
        cy.get('#buttonListDOM')
            .then($el => {
                expect($el).to.have.length(1)
            })
            .and('have.id', 'buttonListDOM')

        // TODO: diferença should vs then em busca aninhadas de elementos
        // should com o retry fica em loop - ou seja use o 'then'
        cy.get('#buttonListDOM')
            .then($el => {
                expect($el).to.have.length(1)
                cy.get('#buttonList')
            })
            
        // --- CUIDADO NESTES CENARIOS ---
        // cy.get('#buttonListDOM')
        //     .should($el => {
        //         expect($el).to.have.length(1)
        //         cy.get('#buttonList')
        //     })
    })
})