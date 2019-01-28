describe('Smoke test', function() {

    beforeEach(function() {
        // reset data to 1 new item
        cy.exec('node api/support/dropData.js')

        cy.visit('/')
        
        cy.get('.Row').last().as('lastRow')

        cy.get('@lastRow').within(() => {
            cy.get('.Test-case')
                .type('Hello World!')
                .type('{Enter}')
        })
    })

    it('Detail pane displays entered text after creating a new test', () => {

        cy.get('.Test-case[value="Hello World!"]')
            .click()

        cy.get('.Detail-pane-header h1')
            .contains('Hello World!')

        // get the detail pane summary and check it matches the entered text

    })

    it('Detail pane displays updated text after updating a test', () => {
        
        cy.get('.Test-case[value="Hello World!"')
            .click()
            .type(' Updated')
            .type('{Enter}')

        cy.get('.Test-case[value="Hello World! Updated')
            .click()
        
        cy.get('.Detail-pane-header h1')
            .contains('Hello World! Updated')

    })

    it('Delete button deletes selected test case', () => {

        cy.get('.Test-case[value="Hello World!"]').parent().parent().as('rowToDelete')

        // confirm delete icon appears on hover, doesn't work due to using CSS for styling
        // cy.get('@rowToDelete').trigger('mouseover')
        // cy.get('@rowToDelete').within(() => {
        //     cy.get('.Delete-row').should('be.visible')
        // })

        // select the delete icon, force as there is no 'hover' command in cypress
        cy.get('@rowToDelete').within(() => {
            cy.get('.Delete-row')
                .click({force:true})
        })

        cy.get('.Test-case[value="Hello World!"]').should('not.exist')

    })

    // ***TODO: edge case checking only the row delete was performed on was deleted, all other tests should remain***
})