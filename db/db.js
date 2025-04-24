const mongoose = require('mongoose');

async function connectToDB() { 
    await mongoose.connect(process.env.DB_URL)
    .then(()=> console.log('connected to database'))
    .catch(()=> console.log('failed to connect to database'))
}

module.exports = connectToDB; //