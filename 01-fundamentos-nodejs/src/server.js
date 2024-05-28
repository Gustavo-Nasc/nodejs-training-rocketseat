import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
// Utilizaremos o UUID para gerar um ID único para para usuário criado

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  // Como temos acesso ao method e url da requisição, podemos verificar se alguma
  // rota daquelas de foram criadas é igual a requisição
  const route = routes.find(route => {
    return route.method === method && route.url === url
  })

  // Caso a rota exista, executaremos a função 'handler()' dessa rota
  if (route) {
    return route.handler(req, res)
  }

  return res.writeHead(404).end('Não encontrado')
})

server.listen(3333)
