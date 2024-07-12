import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { agent } from 'supertest'
import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await agent(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    const response = await agent(app.server).post('/sessions').send({
      email: 'john.doe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
