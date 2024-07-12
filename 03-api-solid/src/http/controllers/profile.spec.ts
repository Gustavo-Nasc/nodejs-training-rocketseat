import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { agent } from 'supertest'
import { app } from '@/app'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    await agent(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    const authResponse = await agent(app.server).post('/sessions').send({
      email: 'john.doe@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const profileResponse = await agent(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toBe(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'john.doe@example.com',
      }),
    )
  })
})
