const mongoose = require('mongoose');

const MongoURL = "mongodb://localhost:27017/library"

mongoose.connect(MongoURL,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const db = mongoose.connection;


db.on('connected', ()=>{
    console.log("Connected")
});

db.on('disconnected', ()=>{
    console.log("Disconnected")
});


db.on('error', ()=>{
    console.log("Error is occured")
});

module.exports = db;

