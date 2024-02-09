import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";
import {handleSocketLogin} from './socket/socket'
const app = express();

const server = createServer(app);
const io = new Server(server , {
  cors : {
    origin : '*',
    methods : ['GET', 'POST', 'PUT', 'DELETE']
  }
});
app.use(cors());
app.get('/',(req, res) => {
    res.send("Hello, world!");
})
handleSocketLogin(io)

const port = 3000;
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
