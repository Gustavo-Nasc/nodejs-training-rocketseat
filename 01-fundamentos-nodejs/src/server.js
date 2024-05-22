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

// Criação do servidor localmente
const server = http.createServer((req, res) => {
  // req => request => requisição
  // res => response => resposta

  const { method, url } = req

  if (method === 'GET' && url === '/usuarios')
    // Early return => Caso esse 'return' seja executado, nenhum outro abaixo será executado
    return res.end('Listagem de usuários')

  if (method === 'POST' && url === '/usuarios')
    return res.end('Criação de um usuário')

  return res.end('Hello Dev!')
})

// Definindo o número da porta do localhost onde o servidor será executado
server.listen(3333)
