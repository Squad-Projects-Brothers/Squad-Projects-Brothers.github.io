const net = require('net')
const readline = require('readline')

const cliente = new net.Socket()
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
cliente.connect(3000,'127.0.0.1',()=>{
    console.log('conectou')
    rl.addListener('line', line =>{
        cliente.write(line)
    })
    cliente.write('ola')
})