// O prefixo 'node' implica que o módulo pertente ao Node.js
import http from 'node:http'

// Criação do servidor localmente

const server = http.createServer((req, res) => {
  // req => request => requisição
  // res => response => resposta
  res.end('Hello World')
})

// Definindo o número da porta do localhost onde o servidor será executado
server.listen(3333)
