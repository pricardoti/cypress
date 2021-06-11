Cypress.Commands.add("createToken", (user, password) => {
  cy.request({
    method: "POST",
    url: "/signin",
    body: {
      email: user,
      senha: password,
      redirecionar: false,
    },
  })
    .its("body.token")
    .should("not.be.empty")
    .then((token) => {
      return token;
    });
});

Cypress.Commands.add("resetRest", (token) => {
  cy.request({
    method: "GET",
    url: "/reset",
    headers: { Authorization: `JWT ${token}` },
  })
    .its("status")
    .should("equal", 200);
});
