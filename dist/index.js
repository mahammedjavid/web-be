"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const node_http_1 = require("node:http");
const cors_1 = __importDefault(require("cors"));
const socket_1 = require("./socket/socket");
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send("Hello, world!");
});
(0, socket_1.handleSocketLogin)(io);
const port = 3000;
server.listen(port, () => {
    console.log(`listening on port ${port}`);
});
