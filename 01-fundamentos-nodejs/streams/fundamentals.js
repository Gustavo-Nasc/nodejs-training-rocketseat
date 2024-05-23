// No Node, toda porta de entrada e saída é uma Stream
// Ou seja, a 'req' e a 'res' são streams

// No Node é comum realizarmos conexões entre as Streams
// Por exemplo, ter uma Stream que irá realizar a leitura dos dados e essa
// Envia, aos poucos, os dados para outra Stream que irá realizar o tratamento
// Desses dados

// Ao executar o código abaixo, tudo que você digitar no terminar e confirmar
// O envio, essa digitação será escrita novamente no terminal
// Esse código está dizendo:
// Tudo que eu receber como entrada (Stream stdin), está sendo encaminhado (pipe)
// Para uma saída (Stream stdout)
// process.stdin
//   .pipe(process.stdout)

// Para construir uma Stream no zero, podemos iniciar criando uma do tipo 'Readable'
import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
  // Toda Stream Readable tem uma função obrigatória, que é a '_read', que retorna
  // quais os dados dessa Stream
  
  index = 1

  _read() {
    const i = this.index++
    // if (i > 100) {
    //   // A função 'push' é utilizada para a Stream fornecer informações para
    //   // quem estiver utilizando-a
    //   this.push(null) // Quando enviamos 'null', estamos dizendo que não há informações
    // } else {
    //   // Precisamos enviar ao terminal um tipo de informação legível que ele entenda
    //   // Por isso, criamos aqui um 'Buffer', um tipo de dado específico do Node
    //   const buffer = Buffer.from(String(i))

    //   this.push(buffer)
    // }
    // Para tornar mais interessante, podemos setar um 'timeout'
    setTimeout(() => {
      if (i > 100) {
        // A função 'push' é utilizada para a Stream fornecer informações para
        // quem estiver utilizando-a
        this.push(null) // Quando enviamos 'null', estamos dizendo que não há informações
      } else {
        // Precisamos enviar ao terminal um tipo de informação legível que ele entenda
        // Por isso, criamos aqui um 'Buffer', um tipo de dado específico do Node
        const buffer = Buffer.from(String(i))
  
        this.push(buffer)
      }
    }, 1000)
    // Note que, ao executar dessa forma, a cada segundo um número é exibido
    // Mesmo enquanto o código está sendo executado
    // Fazendo uma analogia, seria o arquivo CSV que estamos fazendo o upload e já
    // estaria sendo salvo aos poucos
    // Estamos trabalhando com dados enquanto eles estão sendo lidos
  }
}

// Agora vamos criar uma Stream de escrita, que irá receber dados de uma Stream
// De leitura e irá multiplicar os números da Stream de Leitura por 10
class MultplyByTenStream extends Writable {
  // Assim como a Readable Stream, essa recebe um método obrigatório, que é o
  // _write.
  // Esse método recebe 3 parâmetros:
  // chunk => o pedaço que lemos da Stream de leitura, o que está sendo enviado
  // para o push de uma Stream de leitura
  // encoding => a codificação que está sendo utilizada
  // callback => a função que será executada quando o processo de escrita
  // terminou o que era preciso ser feito com aquela informação
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback() // Encerra tudo que está sendo executado
  }
}

// Agora vamos criar uma Stream de Transformação, que irá receber dados de uma Stream
// E transformá-los em números negativos
class InverseNumberStream extends Transform {
  // Assim como a Writable Streams, essa recebe um método obrigatório,
  // que é o transform
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    // Aqui no callback enviaremos dois parâmetros:
    // o erro, no caso, enviamos nulo pois não há erro
    // e o segundo parâmetro, que é a transformação que está sendo realizada
    callback(null, Buffer.from(String(transformed)))
  }
}

// Ao criar uma nova classe dessa Stream de Escrita e inserir a mesma dentro do
// pipe, note que todos os números serão multiplicados por 10 e já formatados
// para exibição
// new OneToHundredStream()
//   .pipe(new MultplyByTenStream())

new OneToHundredStream()
  // Precisa obrigatoriamente da leitura dos dados e a escrita dos dados para
  // outra Stream, servindo como uma intermediária entre a Leitura e Escrita
  .pipe(new InverseNumberStream())
  .pipe(new MultplyByTenStream()) // Só é feita a escrita dos números multiplicados por 10