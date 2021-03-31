/// <reference types="cypress" />

context('Work with iFrames', () => {
    it('Deve preencher o campo de texto', () => {
        cy.visit('http://www.wcaquino.me/cypress/componentes.html');
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body)
                .find('#tfield')
                .type('funciona?')
                .should('have.value', 'funciona?')

            // TODO: o cypress não consegue gerencia o alert por conta do iFrame
            // cy.on('window:alert', mensagem => {
            //     expect(mensagem).to.be.equal('Click OK!')
            // })
            // cy.wrap(body).find('#otherButton').click()
        })
    })

    it('Deve testar frame diretamente', () => {
        cy.visit('http://www.wcaquino.me/cypress/frame.html');
        cy.on('window:alert', mensagem => {
            expect(mensagem).to.be.equal('Click OK!')
        })
        cy.get('#otherButton').click()
    })
})