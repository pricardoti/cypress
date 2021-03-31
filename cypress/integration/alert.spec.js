/// <reference types="cypress" />

context('Alerts', () => {
    before(() => {
        cy.log('beforeAll => é executado antes de cada execução do contexto (class)')
        cy.visit('http://www.wcaquino.me/cypress/componentes.html');
    })

    beforeEach(() => {
        cy.log('beforeEach => é executado antes de cada teste (it)')
        cy.reload()
    })

    it('Alert', () => {
        cy.get('#alert').click()

        // 'on' trabalha com eventos do window
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Alert Simples')
        })
    })

    it('Alert with mock', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#alert')
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
            })
    })

    it('Confirm', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado')
        })
        cy.get('#confirm').click()
    })

    it('Confirm with Deny', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
            return false // dispara a ação de 'cancelar'
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')
        })
        cy.get('#confirm').click()
    })

    it.only('Prompt Success', () => {
        // see https://docs.cypress.io/api/commands/stub#Method
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('42')
        })
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Era 42?')
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D')
        })
        cy.get('#prompt').click()
    })

    it.only('Prompt Cancel', () => {
        cy.window().then(win => {
            cy.stub(win, 'prompt')
        })
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Era undefined?')
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D')
        })
        cy.get('#prompt').click()
    })
})