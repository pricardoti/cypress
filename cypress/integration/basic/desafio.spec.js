/// <reference types="cypress" />

context('Desafio: validar mensagens', () => {
    before(() => {
        cy.visit('http://www.wcaquino.me/cypress/componentes.html');
    })

    it('Formalurio Vazio', () => {
        cy.on('window:alert', mensagem => {
            expect(mensagem).to.be.equal('Nome eh obrigatorio')
        })
        cy.get('#formCadastrar').click()
    })

    it('Nome preenchido', () => {
        cy.on('window:alert', mensagem => {
            expect(mensagem).to.be.equal('Sobrenome eh obrigatorio')
        })
        cy.get('#formNome').type('Paulo')
        cy.get('#formCadastrar').click()
        cy.get('#formNome').should('have.value', 'Paulo')
    })

    it('Sobrenome preenchido', () => {
        cy.on('window:alert', mensagem => {
            expect(mensagem).to.be.equal('Sexo eh obrigatorio')
        })
        cy.get('#formSobrenome').type('Ricardo')
        cy.get('#formCadastrar').click()
        cy.get('#formSobrenome').should('have.value', 'Ricardo')
    })

    it('Selecionar Sexo', () => {
        cy.get('#formSexoMasc')
            .click()
            .should('be.checked').and('have.value', 'M')
    })

    it('Cadastro realizado com sucesso', () => {
        cy.get('#formCadastrar').click()
        cy.get('#resultado')
            .should('be.visible')
            .find('> span')
            .should('have.text', 'Cadastrado!')
        cy.get('#descNome').should('have.text', 'Nome: Paulo')
        cy.get('#descSobrenome').should('have.text', 'Sobrenome: Ricardo')
        cy.get('#descSexo').should('have.text', 'Sexo: Masculino')
    })
})