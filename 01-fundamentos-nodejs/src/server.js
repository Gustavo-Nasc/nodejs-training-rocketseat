import http from 'node:http'

// === HTTP Stauts Code
// É um conceito universal para aplicações
// É um código numérico de três dígitos que indica qual o código de retorno da
// requisição que está sendo executada, para que o Frontend não somente pelo texto
// qual o stauts daquela requisição (Se deu erro, se não foi encontrada,
// se deu tudo certo etc.) e qual a especificação desse status
// Tem muita importância semântica para o Frontend
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/usuarios') {
      return res
        .setHeader('Content-Type', 'application/json')
        .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/usuarios') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    })
    // return res.end('Criação de um usuário')
    // Endentendo agora sobre os Status Codes, podemos retornar ele como status
    // Ao invés de um texto simples

    return res.writeHead(201).end()
    // Status 201 é utilizado sempre que é CRIADO
    // um recurso no Backend
  }

  return res.writeHead(404).end('Não encontrado')
})

server.listen(3333)
