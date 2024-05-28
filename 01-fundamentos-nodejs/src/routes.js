
import { randomUUID } from 'node:crypto'
import { Database } from './database.js'

const database = new Database()

// Para a criação das rotas da nossa aplicação, criamos um Vetor de Rotas, onde
// cada rota é um objeto, composto do Método, URL e a função que será executada
export const routes = [
  {
    method: 'GET',
    url: '/users',
    handler: (req, res) => {
      const users = database.select('users')
      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    url: '/users',
    handler: (req, res) => {
      if (req.body) {
        const { name, email } = req.body
  
        const user = {
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
  },
  // Para trabalharmos com a Route Param, criamos uma nova rota, que deleta um usuário
  // específico
  {
    method: 'DELETE',
    url: '/users/', // Porém, precisamos pegar o ID que irá vir na URL
    handler: (req, res) => {
      return res.end()
    }
  }
]
