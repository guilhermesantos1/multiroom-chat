// importando as configurações do servidor
var app = require('./config/server');

// parametrizar a porta de escuta
var server = app.listen(80, function(){
    console.log("Server On >>> localhost:80");
});

var io = require('socket.io').listen(server);

app.set('io', io);

// criar a conexao por websocket
io.on('connection', function(socket) {
    console.log('usuario conectou');

    socket.on('disconnect', function(){
        console.log('usuario disconectou');
    });

    socket.on('msgParaServidor', function(data){
        socket.emit(
            'msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        );

        socket.broadcast.emit(
            'msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        );
    });
});
