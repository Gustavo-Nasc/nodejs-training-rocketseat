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
import { Readable } from 'node:stream'

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

// Ao criar uma nova classe dessa Stream e executá-la para exibir no terminal
// A saída serão os números de 1 a 100
new OneToHundredStream()
  .pipe(process.stdout)