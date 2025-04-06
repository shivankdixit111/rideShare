const http = require('http')
const app = require('./app')
const express = require('express')
const path = require('path')
const { initializeSocket } = require('./socket')
const port = process.env.PORT || 3000

const server = http.createServer(app);

initializeSocket(server)


if(process.env.NODE_ENV === "production") {
    const dirPath = path.resolve();
    app.use(express.static(path.join(dirPath, "/frontend/dist")))
    app.get("*", (req, res)=>{
        res.sendFile(path.join(dirPath, "./frontend/dist" , "index.html"))
    })
}

server.listen(port, ()=>{
    console.log('server is listening on port ', port)
})