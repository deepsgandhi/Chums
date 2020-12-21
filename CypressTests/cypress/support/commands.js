import 'cypress-wait-until';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("loginWithUI", () => {
    cy.wait(250);
    cy.visit('/');
    cy.get('#email').type(Cypress.env('email'));
    cy.get('#password').type(Cypress.env('password'));
    cy.get('#signInButton').click();
    cy.get('#searchText').should('exist');
});

Cypress.Commands.add("login", () => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('ACCESSMANAGEMENT_API_URL')}/users/login`,       
        body: {
            appName: Cypress.env('appName'),
            email: Cypress.env('email'),
            password: Cypress.env('password')
        }
    }).its('body.token').should('exist').then($token => cy.setCookie('jwt', $token));    
})

Cypress.Commands.add("loadTab", (tabId, verifyId) => {
    //cy.get('#userMenuLink').should('exist').click();
    cy.get('#' + tabId).should('exist').click();
    //cy.get('#userMenuLink').should('exist').click();
    //cy.get('#' + tabId).should('not.be.visible');
    cy.get('#' + verifyId, { timeout: 5000 }).should('exist');
});

Cypress.Commands.add("loadPerson", (name) => {
    cy.get('#searchText').type(name);
    cy.get('#searchButton').click();
    cy.get('body').should('contain', name);
    cy.get("a:contains('" + name + "')").click();
    cy.get('h2').should('contain', name);
});

Cypress.on('uncaught:exception', (err, runnable) => {
    console.warn(err);
    return false;
})