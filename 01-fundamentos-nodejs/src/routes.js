
import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

// Para a criação das rotas da nossa aplicação, criamos um Vetor de Rotas, onde
// cada rota é um objeto, composto do Método, URL e a função que será executada
export const routes = [
  {
    method: 'GET',
    url: buildRoutePath('/users'),
    handler: (req, res) => {
      const users = database.select('users')
      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    url: buildRoutePath('/users'),
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
    // Para identificarmos os parâmetros na rota, geralmente, na maioria das Techs,
    // utilizamos o símbolo de ':', seguido do nome do parâmetro (users/:id)
    url: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params

      database.delete('users', id)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PUT',
    // Para identificarmos os parâmetros na rota, geralmente, na maioria das Techs,
    // utilizamos o símbolo de ':', seguido do nome do parâmetro (users/:id)
    url: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { name, email } = req.body

      database.update('users', id, {
        name,
        email,
      })

      return res.writeHead(204).end()
    }
  }
]
