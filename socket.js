const socketIo = require('socket.io');
// socketIo is the Socket.IO library that enables real-time, bidirectional communication between the client and the server. It provides WebSocket-like functionality, allowing you to send and receive events instantly.
const User = require('./models/user-model');
const Captain = require('./models/captain-model');
const { map } = require('./app');

let io;

let activeCaptains = new Map(); // Map to store active captains and their socket IDs
// activeCaptains is a Map object that stores the active captains and their socket IDs. This allows you to keep track of which captains are currently connected to the WebSocket server.
// This is useful for sending messages to specific captains based on their socket IDs.
// The Map object holds key-value pairs, where the key is the captain's ID and the value is the socket ID.

function initializeSocket(server) {
    // io is an instance of socket.io that represents the WebSocket server.
    io = socketIo(server , {
        cors: {
            origin: process.env.FRONTEND_URL, // Allow requests from this origin
            methods: ['GET', 'POST'], // Allowed HTTP methods
            credentials: true, // Allow credentials (cookies, authorization headers)
        },
    })

    io.on('connection', (socket)=> {
        // console.log(`client connected ${socket.id}`)

        // socket.on('join', callback) is used inside io.on('connection'), meaning it listens for the 'join' event
        //  only for the connected client.
        // Each connected client has its own socket instance, so we use socket.on(...) to listen to events only from 
        // that client.

        socket.on('join', async(data) => {
            const {userId, userType} = data;
 
            if(userType === "User") {
                await User.findByIdAndUpdate(userId, {socketId: socket.id})
            } else if(userType === "Captain"){
                activeCaptains.set(userId, socket.id);
                await Captain.findByIdAndUpdate(userId, 
                    {
                        socketId: socket.id,
                        online: true,
                        lastActive: new Date(),
                    }
                )
            }
        })

        socket.on("update-location", async(data)=> {
            const {userId, location} = data;

            // console.log('socket-location ', userId, location)
            await Captain.findByIdAndUpdate( userId, {
                location: {
                    type: 'Point',  // Add GeoJSON type
                    coordinates: [location.lng, location.ltd]  // Ensure it's in [lng, lat] order
                }, 
            })
        })

        socket.on('disconnect', async() => {
             for(const [userId, socketId] of activeCaptains) {
                if(socketId === socket.id) {
                    activeCaptains.delete(userId);
                    await Captain.findByIdAndUpdate(userId, { 
                        online: false,
                        lastActive: new Date(),
                    })

                    console.log(`Captain ${userId} disconnectd`)
                    break;
                }
             }
        })
    })
}

function sendMessageToSocketId(socketId, msgObj) {   
    if(io) { 
        io.to(socketId).emit(msgObj.event, msgObj.data)
    } else {
        console.log('SocketIo is not initialized')
    }
}

module.exports = {initializeSocket, sendMessageToSocketId}