import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

// Exitem três formas do Frontend enviar informações para a API
// === Query Parameters
// São usadas quando precisamos de uma URL Stateful, quando precisamos enviar
// informações que servem para modificar a resposta que o Backend vai nos enviar,
// não sendo obrigatórios, mas servindo como filtros
// São parâmetros que são enviados na url da requisição, seperado por '?' após o fim da URL
// http://localhost:3333/users?id=1&name=Gustavo
// O 'id' é um Query Parameter, um 'chave=valor', 'id=1'. O '&' serve para separar
// os campos

// === Route Parameters
// Parâmetros que também são enviados na URL da requisição, mas não são nomeados
// http://localhost:3333/users/1
// Note que aqui o '1' se assemelha muito com o 'id'
// Geralmente usado para identificação de recurso, no exemplo acima, identificar
// o usuário com o ID 1

// === Request Body
// O mais diferente dos três
// Usado para envio de informações de um formulário, por exemplo, por meio do
// HTTPS, sendo mais difíceis de serem descriptografados
// Pode ser enviado como um JSON, por exemplo

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  // Como temos acesso ao method e url da requisição, podemos verificar se alguma
  // rota daquelas de foram criadas é igual a requisição
  const route = routes.find(route => {
    // Agora que temos a verificação com o Regex, podemos substituir a
    // verificação pelo Regex
    return route.method === method && route.url.test(url)
  })

  // Caso a rota exista, executaremos a função 'handler()' dessa rota
  if (route) {
    // E agora podemos pegar os parâmetros da rota também com o Regex
    const routeParams = req.url.match(route.url)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end('Não encontrado')
})

server.listen(3333)
