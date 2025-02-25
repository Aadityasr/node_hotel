const mongoose = require('mongoose');

const MongoURL = "mongodb://localhost:27017/library"; // Fixed MongoDB Port

mongoose.connect(MongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to MongoDB ✅");
});

db.on('disconnected', () => { // ✅ Fixed syntax
    console.log("Disconnected from MongoDB ❌");
});

db.on('error', (err) => { // ✅ Fixed syntax & added `err`
    console.error("Error occurred ❗", err);
});

module.exports = db;
