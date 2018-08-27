describe('Hello World test', () => {

    it('New test case Hello World', () => {
        cy.visit('/')

        cy.get('.Test-case-container .Test-case').last()
            .type('Hello World!')
            .should('have.value', 'Hello World!')

        cy.get('.Row .Row-id').last().contains(0)

        cy.get('.Row').last().within((row) => {
            cy.get('.Row-id')
                .contains(0)
        })

    })
})