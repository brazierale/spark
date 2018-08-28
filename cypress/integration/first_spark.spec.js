describe('Hello World test', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.get('.Row').last().as('lastRow')
    })

    it('Last row is the new row', () => {

        cy.get('@lastRow').within(() => {
            cy.get('.Row-id')
                .contains(0)
        })
       
    })
    
    it('Detail pane displays entered text after creating a new test', () => {

        cy.get('@lastRow').within(() => {
            cy.get('.Test-case')
                .type('Hello World!')
                .type('{Enter}')
        })

        cy.get('.Test-case[value="Hello World!"]')
            .click()

        cy.get('.Detail-pane-header h1')
            .contains('Hello World!')

        // get the detail pane summary and check it matches the entered text

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