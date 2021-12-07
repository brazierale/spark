
### Initial setup
1. Duplicate the `.env.example` files in `/client/` and `/api/` as `.env`
1. Create a MongoDB instance at `https://www.mongodb.com/cloud`
1. Select Connect > Connect your application, and copy the connection string
1. Paste this connection string into `/api/.env` under `DB_ROUTE`
1. Run `yarn install` in the base directory
1. Run `yarn install` in `/client/`

### Run the application
1. `yarn dev` will run both the client and api
1. If you want to run the client and api individually, `yarn client` and `yarn server` can be used

### Run tests
1. `yarn run cypress open` can be used to open the Cypress test GUI
