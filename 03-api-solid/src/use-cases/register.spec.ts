import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it('should hash a password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      // Ao invés de passarmos um Repository, como o Prisma, criamos um Repository
      // fictício para simular um e que possamos utilizá-lo para o teste unitário
      async create(data) {
        return {
          id: '1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
      async findByEmail(email) {
        return null
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
