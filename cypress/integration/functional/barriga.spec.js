/// <reference types="cypress" />

import '../../support/applicationCommands'
import '../../support/accountCommands'

import locators from '../../support/locators';

describe('Should test at a functional level', () => {
  before(() => {
    cy.visit('http://barrigareact.wcaquino.me/')
    cy.login('pricardo.ti@gmail.com', 'abc123') // TODO: adicionar fixture
    cy.clearAccount()
  })

  beforeEach(() => {
    cy.get('[data-test=menu-home]').click()
    cy.clearAccount()
  })

  it('Should create an account', () => {
    // Acessando a pagina de contas
    // given
    cy.accessAccount()

    // Preenchimento das informações
    // when
    cy.saveAccount('Conta de teste')

    // validações
    // then
    cy.validMessage('Conta inserida com sucesso!')
    cy.xpath(locators.ACCOUNT.XPATH_ROW_SAVE)
  })

  it('Should update an account', () => {
    cy.accessAccount()
    cy.xpath("//table//td[contains(., 'Conta para alterar')]/..//i[@class='far fa-edit']")
      .click()

      cy.saveAccount(' atualizada')
    cy.validMessage('Conta atualizada com sucesso!')

    cy.xpath("//table//td[contains(., 'Conta para alterar atualizada')]")
  })

  it('Should not create an account with same name', () => {
    cy.accessAccount()
    cy.get(locators.ACCOUNT.NAME)
      .clear()
    cy.saveAccount('Conta mesmo nome')
    cy.validMessage('Request failed with status code 400')
  })

})