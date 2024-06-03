import { beforeAll, afterAll, describe, it, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../app'
import { execSync } from 'child_process'

// describe => Uma forma de categorização dos testes
// Ao executar os testes que estão no 'describe', eles serão exibidos com a categoria
describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run migrate:rollback --all')
    execSync('npm run migrate:run')
  })

  // it => tem a exata mesma função do 'test()', o que muda é a semântica
  // Deve('ser possível criar uma nova transação')
  it('should be able create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'Teste',
        amount: 100,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Teste',
        amount: 100,
        type: 'credit',
      })

    const cookie = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookie!)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'Teste',
        amount: 100,
      }),
    ])
  })
})
