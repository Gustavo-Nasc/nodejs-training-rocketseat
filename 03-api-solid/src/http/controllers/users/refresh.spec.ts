import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { agent } from 'supertest'
import { app } from '@/app'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await agent(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    const authResponse = await agent(app.server).post('/sessions').send({
      email: 'john.doe@example.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await agent(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies!)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ token: expect.any(String) })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
