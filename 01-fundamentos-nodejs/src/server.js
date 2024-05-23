import http from 'node:http'
import { json } from './middlewares/json.js'

const users = []

// === MiddleWares
// Um conceito bastante utilizado no Node
// É um interceptador, uma função que irá pegar a nossa requisição
// Eles sempre recebem o 'req' e 'res', podendo transformá-los, executá-los etc.

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  // Criamos primeiro o Middlaware responsável pelo corpo da requisição
  await json(req, res)

  // Com isso, podemos desestruturar o body e criar um usuário com os dados
  // inseridos no corpo de requisição
  if (method === 'POST' && url === '/usuarios') {
    if (req.body) {
      const { name, email } = req.body
      users.push({
        id: 1,
        name, // Equivalente a name: name
        email, // Equivalente a email: email
      })

      return res.writeHead(201).end()
    } else {
      return res.writeHead(500).end(JSON.stringify({
        messageError: "Insira os dados do usuário no 'body' da requisição"
      }))
    }

  }
  /* */

  if (method === 'GET' && url === '/usuarios') {
      return res
        .end(JSON.stringify(users))
  }

  return res.writeHead(404).end('Não encontrado')
})

server.listen(3333)
