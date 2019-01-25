import { blankTestCase, TestCase } from '../../client/src/modules/TestCase'
import { addTestCase, updateTestCase } from '../../client/src/actions/testcase-actions'

const dispatch = action => {
    cy.window().its('store').invoke('dispatch', action)
}

it('has expected state on load', () => {
    cy.visit('/')

    cy.window().its('store').invoke('getState').should('deep.equal', {
        testCases: [blankTestCase],
        selectedTestCase: blankTestCase,
        loading: false,
        saving: false,
        error: null
    })
})

it('adds new test case', () => {
    cy.visit('/');

    const toAdd = new TestCase(
        '1',
        'Test',
        'Description to be added',
        ['first', 'second'],
        ['tag', 'v1']
    )

    const updated = new TestCase(
        '1',
        'Test-update',
        'Description has been updated',
        ['first', 'second', 'third'],
        ['v2']
    )
    
    dispatch(addTestCase(toAdd));
    dispatch(updateTestCase(updated));
})