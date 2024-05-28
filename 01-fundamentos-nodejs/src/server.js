import http from 'node:http'
import { json } from './middlewares/json.js'
import { Database } from './database.js'
// Utilizaremos o UUID para gerar um ID único para para usuário criado
// === UUID => Universally Unique IDentifier
// É um ID único, ou seja, toda vez que um código for gerado, ele será único
import { randomUUID } from 'node:crypto'

// Com o banco de dados criado, podemos criar uma nova instância do mesmo
const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (method === 'POST' && url === '/usuarios') {
    if (req.body) {
      const { name, email } = req.body

      const user = {
        // E no lugar do valor do 'id: 1', subistituímos por 'id: randomUUI()'
        id: randomUUID(),
        name,
        email,
      }

      database.insert('users', user)

      return res.writeHead(201).end()
    } else {
      return res.writeHead(500).end(JSON.stringify({
        messageError: "Insira os dados do usuário no 'body' da requisição"
      }))
    }

  }

  if (method === 'GET' && url === '/usuarios') {
    const users = database.select('users')

      return res.end(JSON.stringify(users))
  }

  return res.writeHead(404).end('Não encontrado')
})

server.listen(3333)
