Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
});

Cypress.Commands.add('mockGetTestCases', (fixture) => {
  cy.intercept('/api/testCases', { fixture: fixture }).as('getTestCases');
});

Cypress.Commands.add('selectTestCase', (title) => {
  cy.get(`[data-testid="test-case-input"]:contains("${title}")`).click({force: true});
});
