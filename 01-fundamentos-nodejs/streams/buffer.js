// === Buffer
// É uma representação de um espaço da memória do computador, usado para transferir
// informações de forma rápido. É uma forma de ler e gravar dados de forma performática
// Foi criado para que o JavaScript possa trabalhar com dados binários de maneira
// eficiente

const buf = Buffer.from('ok')

console.log(buf)
// Ao executar, ele retorna uma classe <Buffer '6f 6b'>
// 6f e 6b são hexadecimais que representam as letras do conteúdo passado
// ok => 6f6b em hexadecimal

// Podemos também transformá-los em decimal utilizando o JSON
console.log(buf.toJSON())