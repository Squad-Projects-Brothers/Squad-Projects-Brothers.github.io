const net = require('net')

const handleConnection = socket =>{
    console.log('Alguem se conectou.')
    socket.on('end',()=>{
        console.log('desconectou')
    })
    socket.on('data', data =>{
        const str = data.toString()
        if(str === 'end'){
            socket.end()
        }
        console.log(str)
    })
}
const server = net.createServer(handleConnection)
server.listen(3000, '127.0.0.1')