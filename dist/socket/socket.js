"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSocketLogin = void 0;
function handleSocketLogin(io) {
    // socket middleware
    const user = true;
    io.use((socket, next) => {
        console.log("socket is-----------------------------------------------------", socket.request.headers);
        if (user)
            next();
    });
    io.on("connection", (socket) => {
        console.log(`be socket connection is done and id is ${socket.id}`);
        socket.on("send-message", (data) => {
            console.log("message is", data);
            io.to(data.roomId).emit("new-message", data.message); //send new message to room //we can user user socket id as room id
            // socket.to(data.roomId).emit('new-message', data.message) //!send new message to ---socket--- room // current user wont get mesagge if we use socket.to(roomID)
            // socket.emit('new-message', message) // to send message the only socket client (single user)
            // io.emit('new-message', message) // to send message to all
            // socket.broadcast.emit('new-message', message) //to send message to others not current user
        });
        // !Custom Room
        socket.on("room-join", (roomID) => {
            console.log(`user is ${socket.id} joined room : ${roomID}`);
            socket.join(roomID);
        });
    });
    io.on("disconnect", () => {
        console.log("be socket disconnect is done");
    });
}
exports.handleSocketLogin = handleSocketLogin;
