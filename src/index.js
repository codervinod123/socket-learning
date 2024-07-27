import express from 'express';
import {createServer} from "http";
import {PORT} from './config/serverConfig.js';
import {dirname,join} from "path"
import { fileURLToPath } from 'url';
import {Server} from "socket.io"


const app=express();
const server=createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
   res.sendFile(join(__dirname, '../public/index.html'));
});


 server.listen(PORT,()=>{
 
       io.on('connection', (socket) => {
         console.log("Connected to the server")

         socket.on('chat message', (msg) => {
             io.emit('Send mess',msg);
        });

       });

     
        
     console.log("Server is up and running on port no",PORT);

 })
