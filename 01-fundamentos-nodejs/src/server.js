// O prefixo 'node' implica que o módulo pertente ao Node.js
import http from 'node:http'

// === Rotas Diferentes Operações
// Criar usuário
// Remover usuário
// Editar usuário
// ...

// === HTTP
// - Método (GET, POST, PUT, PATCH e DELETE são os mais famosos)
// - URL (/, /usuarios etc.)

// GET => Buscar um recurso no Backend
// POST => Criar um recurso no Backend
// PUT => Atualizar um recurso no Backend
// PATCH => Atualizar uma informação única e específica de um recurso no Backend
// DELETE => Deletar um recurso no Backend

// Ou seja, podemos ter a mesma rota, para diferentes Métodos
// GET usuarios/ => Buscar usuários no Backend
// POST usuarios/ => Criar um usuários no Backend


// === Aplication Types
// Stateful - Sempre terá alguma informação armazenada em memória
// (depende da memória para que ela funcione)

// Stateless - Não salva nada em memória, salva em externos
// (banco de dados, por exemplo) e não depende da memória para funcionar

// Inicialmente teremos uma aplicação Stateful

// === JSON
// JavaScript Object Notation
// Estrutura de dados comumente utilizada da transição de dados entre
// Backend e Frontend e vice-versa

// Para que o Frontend entenda que o Backend está enviando uma reposta em JSON?
// Para isso, utilizamos os 'Headers' (Cabeçalhos)

// === Headers
// São metadados para que a aplicação saiba qual a melhor forma de lidar com aquela informação
// São informações adicionais que não estão relacionadas ao retorno, mas sim, como o dado pode
// ser interpretado: https://en.wikipedia.org/wiki/List_of_HTTP_header_fields

const users = []

// Criação do servidor localmente
const server = http.createServer((req, res) => {
  // req => request => requisição
  // res => response => resposta
  const { method, url } = req


  if (method === 'GET' && url === '/usuarios') {
    // Early return => Caso esse 'return' seja executado, nenhum outro abaixo será executado
    
    // return res.end(users)
    // Ao executar o método acima, o servidor retornará um erro, pois quando estamos
    // trabalhando com servidores, ela não pode ser um Vetor (Array)
    // Por isso, precisamos retornar um JSON

    // return res.end(JSON.stringify(users))
    // Ao executar o método acima, o servidor retornará sem erros, em formato de texto.
    // Para melhorar a exibição da informação, podemos setar um Header para esse retorno:
    return res
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users))
    // Note que, ao executar o método, a exibição do mesmo mudará, estando mais formatado na exibição
  }

  // Criação de um usuário como um objeto
  if (method === 'POST' && url === '/usuarios') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    })
    return res.end('Criação de um usuário')
  }

  return res.end('Hello Dev!')
})

// Definindo o número da porta do localhost onde o servidor será executado
server.listen(3333)
