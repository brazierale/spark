describe('stub test', function(){
    it('5 stub items', function(){
        // reset data to 1 new item
        cy.exec('yarn cleardb')
        
        cy.server()

        const data = {
            "success":true,
            "data":[{
                "_id":"1",
                "summary":"stub 1",
                "id":1,
                "__v":0
            },
            {
                "_id":"2",
                "summary":"stub 2",
                "id":2,
                "__v":0
            },
            {
                "_id":"3",
                "summary":"stub 3",
                "id":3,
                "__v":0
            },
            {
                "_id":"4",
                "summary":"stub 4",
                "id":4,
                "__v":0
            },
            {
                "_id":"5",
                "summary":"stub 5",
                "id":5,
                "__v":0
            },
        ]}
        cy.route('**/api/testCases', data)

        cy.visit('/')
    })
})