import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/', async () => {
  // const transaction = await knex('transactions')
  //   .insert({
  //     id: crypto.randomUUID(),
  //     title: 'Test Transaction',
  //     amount: 1000,
  //   })
  //   .returning('*')

  const transactions = await knex('transactions').select('*')

  return transactions
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server running on port 3333')
  })
