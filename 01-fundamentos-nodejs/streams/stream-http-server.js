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

const server = http.createServer((req, res) => {
  // Como mencionado anteriormente, tudo no Node são Streams
  // ou seja, o req e o res são Streams, como se fossem:
  // req => semelhante a Readable Stream
  // res => semelhante Writable Stream
  return req
    .pipe(new InverseNumberStream())
    .pipe(res)
  // Relacionando com o código criado anteriormente, temos:
  // new OneToHundredStream()
  //   .pipe(new InverseNumberStream())
  //   .pipe(new MultplyByTenStream())
})

server.listen(3334)
