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

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  // Copiando o código da última aula, nós podemos aplicar o conceito e obter o
  // corpo da requisição que está sendo feita, transformando o Buffer em JSON
  // Com isso, acessando os dados do objeto individualmente
  /* */
  const buffers = []
  for await (const chunk of req) {
    buffers.push(chunk)
  }
  // const body = JSON.parse(Buffer.concat(buffers).toString())
  // Ao executar somente com a linha acima, será exibido um erro, pois o código
  // é exutado até quando não há nenhuma informação no corpo da requisição...
  // Para consertar, podemos utilizar um 'try/catch'
  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

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
        .setHeader('Content-Type', 'application/json')
        .end(JSON.stringify(users))
  }

  return res.writeHead(404).end('Não encontrado')
})

server.listen(3333)
