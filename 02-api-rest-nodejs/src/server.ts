import fastify from 'fastify'

const app = fastify()

// Três formas mais comuns de comunicação com Banco de Dados
// === Drivers Nativos
// Bibliotecas onde não escrevemos as requisições de forma abstrata, ou seja,
// Passamos o código completo
// Como por exemplo no 'mysql2' (https://sidorares.github.io/node-mysql2/docs#first-query)

// === Query Builders
// São como formas de evitar ter que aprender tanto sobre a sintaxe SQL
// E focar na linguagem que está trabalhando, facilitando a escrita das Queries,
// Como acontece no 'knex' (https://knexjs.org/guide/query-builder.html), que
// mistura a sintaxe JavaScript com SQL

// === ORMS
// São como níveis de abstração, você praticamente não precisa se preocupar com
// a sintaxe SQL

app.get('/hello', () => {
  return 'Hello World'
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server running on port 3333')
  })
