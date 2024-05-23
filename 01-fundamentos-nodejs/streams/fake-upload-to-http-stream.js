import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 5) {
        this.push(null)
      } else {
        const buffer = Buffer.from(String(i))
  
        this.push(buffer)
      }
    }, 1000)
  }
}

// Uma API nativa do Node utilizada para as requisições HTTP
fetch('http://localhost:3334', {
  // Estaremos simulando que estamos enviando uma informação aos poucos
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half' // Adicionamos essa linha a partir da versão 19 do Node para
  // permitir que Streams sejam usadas em requisições
}).then((response) => {
  return response.text()
}).then((data) => {
  console.log(data)
}) // Passamos o 'then' pois agora estamos trabalhando com respostas e funções
// assíncronas do Backend