const mongoose = require("mongoose");

// this is our MongoDB database
const dbRoute = 'mongodb+srv://alex:dpAFhp9Or8o0ZKKQ@mongo-mvqti.mongodb.net/spark?retryWrites=true';

// connect, drop, then disconnect
mongoose.connect( dbRoute, function() {
    mongoose.connection.db.dropCollection('testcases', function() {
            mongoose.disconnect();
        });
});