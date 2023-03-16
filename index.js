const express = require("express");
const SocketServer = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(cors('*'));

//socket configuration
const server = http.createServer(app);

const io = SocketServer(server, {
    cors:{
        origin:'*'
    }
});



io.on('connection', (socket)=>{

    console.log("connected : " + socket.id);
    socket.on('message_sent', (message)=>{
        console.log(message);

        socket.emit("receive_message", message);
    })
});


app.set('port', process.env.PORT || 5000);
app.use(express.json());


server.listen(app.get('port'), ()=>{
    console.log('server available at : ', app.get('port'));
})
