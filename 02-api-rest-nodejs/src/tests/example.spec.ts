import { test, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../app'

// beforeAll => todo código que deve ser executado antes de todos os teste
// beforeEach => todo códugo que deve ser executado antes de cada teste
beforeAll(async () => {
  app.ready()
})

// afterAll => todo código que deve ser executado depois de todos os testes
// afterEach => todo códugo que deve ser executado depois de cada teste
afterAll(async () => {
  app.close()
})

test('User can create a new Transaction', async () => {
  // Operação:
  // Criar uma nova chamada HTTP para o servidor que cria a transação
  await request(app.server)
    .post('/transactions')
    .send({
      title: 'Teste',
      amount: 100,
      type: 'credit',
    })
    .expect(201) // Espera-se que a resposta seja 201
})
