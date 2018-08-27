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
    
    it('After entering text, text is displayed', () => {

        cy.get('@lastRow').within(() => {
            cy.get('.Test-case')
                .type('Hello World!')
                .should('have.value', 'Hello World!')
        })

    })

})