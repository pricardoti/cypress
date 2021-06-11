/// <reference types="cypress" />

import "../../support/apiCommands";

describe("Backend level testing", () => {
  /**
   *
   *
   */
  let token;

  before(() => {
    cy.createToken("pricardo.ti@gmail.com", "abc123").then((response) => {
      token = response;
    });
  });

  beforeEach(() => {
    cy.resetRest(token);
  });

  it("Should create an account", () => {
    const account_name = "Account via REST";

    cy.request({
      url: "/contas",
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
      },
      body: {
        nome: account_name,
      },
    }).then((res) => {
      expect(res.status).to.be.equal(201);
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("nome", account_name);
    });
  });

  it("Should update an account", () => {
    const account_name = "Account via REST (Update)";

    cy.request({
      url: "/contas",
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
      // QueryString
      QS: {
        nome: "Conta para alterar",
      },
    }).then((data) => {
      expect(data.status).to.be.equal(200);
      expect(data.body).to.be.not.empty;

      cy.request({
        url: `/contas/${data.body[0].id}`,
        method: "PUT",
        headers: {
          Authorization: `JWT ${token}`,
        },
        body: {
          nome: account_name,
        },
      }).as("response");
    });

    cy.get("@response").its("status").should("equal", 200);
    cy.get("@response").its("body").should("have.a.property", "id");

    cy.get("@response")
      .its("body")
      .should("have.a.property", "nome")
      .and("equal", account_name);
  });
});
