const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();


const io = new Server(httpServer, {

    cors: {
        origin: 'http://localhost:5173',
    }
});



let messages = [];
let rooms = [];

/* This code snippet is setting up a socket.io event listener for when a client connects to the server.
When a client connects, it listens for a "message" event from that client. When a "message" event is
received, the message is pushed into the `messages` array. */
io.on('connection', (socket) => {
    socket.on("message", (message) => {

        if (message && message.value) {
            messages.push(message);
            console.log(messages);
            io.emit("message", messages);
        }


    socket.on("clear-message" , () => {
        messages = [];
        io.emit("message", messages);

    }) ;


    });


});













httpServer.listen(3000, () => {
    console.log('listening on :3000');

});