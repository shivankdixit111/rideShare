const express = require('express');
const connectToDB = require('./db/db');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();
const authRoute = require('./routes/auth-route');
const mapRoute = require('./routes/map-route')
const rideRoute = require('./routes/ride-route')

connectToDB();

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", authRoute)
app.use("/api/maps", mapRoute)
app.use("/api/ride", rideRoute)


app.get("/api", (req, res)=>{
   return res.send("Welcome to the rideShare App !!!");
})

module.exports = app;