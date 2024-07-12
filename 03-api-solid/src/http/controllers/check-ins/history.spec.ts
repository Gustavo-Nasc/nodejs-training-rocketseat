import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { agent } from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Check-in History (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the history of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const { id } = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -23.55052,
        longitude: -46.633309,
      },
    })

    const user = await prisma.user.findFirstOrThrow()

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: id,
          user_id: user.id,
        },
        {
          gym_id: id,
          user_id: user.id,
        },
      ],
    })

    const response = await agent(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: id,
        user_id: user.id,
      }),
      expect.objectContaining({
        gym_id: id,
        user_id: user.id,
      }),
    ])
  })
})
