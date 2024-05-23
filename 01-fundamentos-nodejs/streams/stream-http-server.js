// Agora iremos conectar tudo que aprendemos sobre HTTP com as Streams
import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    callback(null, Buffer.from(String(transformed)))
  }
}

const server = http.createServer(async (req, res) => {
  // Existem casos onde nós precisamos ler todos os dados da Stream antes de
  // processá-los, ou seja, precisamos desses dados completos
  // Para isso, utilzamos um Array de Buffers, percorremos esses Buffers, populando-
  // -os e então, trabalhamos com um Array completo
  const buffers = []

  // O 'await', dentro de uma Stream, espera cada pedaço da Stream ser executado
  // Para cada pedaço da requisição (const chunk of req), inserimos esse peraço
  // no Array de Buffers
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  // E então populamos todos esses dados num Buffer
  const fullStreamContent = Buffer.concat(buffers).toString()

  // E exibimos no console
  console.log(fullStreamContent)

  return res.end(fullStreamContent)

  // return req
  //   .pipe(new InverseNumberStream())
  //   .pipe(res)
})

server.listen(3334)
