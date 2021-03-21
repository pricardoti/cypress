/// <reference types="cypress" />

describe('Work with basic elements', () => {

    before(() => {
        cy.log('beforeAll => é executado antes de cada execução do contexto (class)')
        cy.visit('http://www.wcaquino.me/cypress/componentes.html');
    })

    beforeEach(() => {
        cy.log('beforeEach => é executado antes de cada teste no teste (it)')
        cy.reload()
    })


    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado'); // Busca generica
        cy.get('span').should('contain', 'Cuidado'); // Especificando o elemento
        cy.get('.facilAchar').should('contain', 'Cuidado'); // Jquery Selector

        // Irá falhar pois compara extamente o texto obtido
        // cy.get('.facilAchar').should('have.text', 'Cuidado');
    })

    it('Links', () => {
        cy.visit('http://www.wcaquino.me/cypress/componentes.html');

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

    it('textFields', () => {
        cy.get('#formNome').as('inputFormName')
        cy.get('@inputFormName').type('Cypress Test')
        cy.get('@inputFormName').should('have.value', 'Cypress Test')
    })

    it('textArea', () => {
        // exemplo de utilização do "\\" para escape de interpretação do ":"
        cy.get('#elementosForm\\:sugestoes').as('textAreElement')
        cy.get('@textAreElement')
            .type('Descrição Cypress Test')
            .should('have.value', 'Descrição Cypress Test')

        cy.get(':nth-child(3) > :nth-child(6) > input')
            .type('???')

        cy.get('[data-cy=dataSobrenome]')
            .type('teste12345{backspace}{backspace}', {
                delay: 100 // velocidade simulando tempo de digitação na tela
            })
            .should('have.value', 'teste123')

        cy.get('@textAreElement')
            .clear()
            .type('Error{selectAll}Acerto', {
                delay: 100
            })
            .should('have.value', 'Acerto')
    })

    it('RadioButton', () => {
        cy.get("[name='formSexo']")
            .should('have.length', 2)
        
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')
            
        cy.get('#formSexoMasc')
            .should('not.be.checked')
    })

    it('CheckBox', () => {
        // Interagindo com um elemento
        // cy.get('#formComidaPizza')
        //    .click()
        //    .should('be.checked')

        cy.get("[name='formComidaFavorita']")
            .should('have.length', 4)    
            .click({ multiple: true })            
    })

    it('ComboBox', () => {
        // Para selecionar a opção do combo
        // o cypress aceita o value ou o texto visivel
        // Porem para validar, aceita somente o valor do atributo 'value'
        
        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo')
            .should('have.value', '2graucomp')

        cy.get('[data-test=dataEscolaridade]')
            .select('1graucomp')
            .should('have.value', '1graucomp')

        // TODO validar opções do combo
    })

    it.only('Combo Multiplo', () => {
        // No caso do multiplo não funciona o valor visivel em tela (text)
        // somente o value
        cy.get('[data-testid=dataEsportes]')
            .select(["natacao", "Corrida", "nada"])
        // TODO validar opções selecionadas do combo multiplo 
    })
})