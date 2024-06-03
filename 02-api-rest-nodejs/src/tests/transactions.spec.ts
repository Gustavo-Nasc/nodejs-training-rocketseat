import { beforeAll, afterAll, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '../app'

// describe => Uma forma de categorização dos testes
// Ao executar os testes que estão no 'describe', eles serão exibidos com a categoria
describe('Transactions routes', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  // it => tem a exata mesma função do 'test()', o que muda é a semântica
  // Deve('ser possível criar uma nova transação')
  it('should be possible create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'Teste',
        amount: 100,
        type: 'credit',
      })
      .expect(201)
  })
})
