/// <reference types="cypress" />

describe('Helpers...', () => {

    it('Wrap', () => {
        const obj = {
            nome: 'User',
            idade: 20
        };

        expect(obj).to.have.property('nome');
        expect(obj).to.have.property('idade');

        cy.wrap(obj)
            .should('have.property', 'nome')
            .and('eq', 'User')

        cy.wrap(obj)
            .should('have.property', 'idade')
            .and('eq', 20)

        cy.visit('http://www.wcaquino.me/cypress/componentes.html');
        cy.get('#formNome').then($el => {
            // TODO: via Jquery não aparece no histórico
            // $el.val('Funciona via Jquery.')
            cy.wrap($el).type('Funciona via Cypress.')
        })

        cy.reload()

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Executando \'resolve\' da promise...')
            }, 1000)
        })

        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botão...'))

        // TODO: tratando a promise manualmente, não garante a ordem de execução
        // promise.then(resultado => console.log(resultado))

        // TODO: com o comando 'wrap' ele torna a promise gerenciacel pelo cypress
        cy.wrap(promise).then(resultado => console.log(resultado))

        cy.get('#buttonList').then(() => console.log('Encontrei o segundo botão...'))
    })

    it('Its', () => {
        const obj = {
            nome: 'User',
            idade: 20
        };

        cy.wrap(obj).should('have.property', 'nome', 'User') // comparando o valor no terceiro parametro
        cy.wrap(obj).its('nome').should('be.equal', 'User') // diretamente na propriedade

        const obj2 = {
            nome: 'User',
            idade: 20,
            endereco: {
                rua: 'R. onde o vento faz a curva.',
                bairro: 'dos milagres'
            }
        };

        cy.wrap(obj2).its('endereco').should('have.property', 'rua')
        cy.wrap(obj2).its('endereco').its('rua').should('eq', 'R. onde o vento faz a curva.')
        cy.wrap(obj2).its('endereco.rua').should('eq', 'R. onde o vento faz a curva.')
    })

    it('Invoke', () => {
        cy.log('funcao sem parametro')
        cy.wrap({
                numero: () => 1
            })
            .invoke('numero')
            .should('be.equal', 1);

        cy.log('funcao com parametro')
        cy.wrap({
                soma: (a, b) => a + b
            })
            .invoke('soma', 2, 5)
            .should('be.equal', 7);

        cy.visit('http://www.wcaquino.me/cypress/componentes.html');
        cy.get('#formNome').invoke('val', 'Texto via Invoke')

        cy.window()
            .invoke('alert', 'disparado pelo invoke!')
        cy.get('#resultado')
            .invoke('html', `<input type="button" value="hackeado!" onclick="alert('alert disparado pelo invoke!')">`)
    })

})