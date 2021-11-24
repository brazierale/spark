it('mock single test case', () => {
  cy.mockGetTestCases('single-test-case');
  cy.visit('/');
  cy.wait('@getTestCases');

  cy.selectTestCase('first test');
  cy.getBySel('description').contains('first test description');
  cy.getBySel('step').first().contains('step one');
  cy.getBySel('step-input').contains('step two');
  cy.getBySel('tag').first().contains('one');
  cy.getBySel('tag').contains('test');
})
