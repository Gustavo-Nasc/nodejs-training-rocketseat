import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

// Ao invés de passarmos um Repository, como o Prisma, criamos um Repository
// fictício para simular um e que possamos utilizá-lo para o teste unitário
export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: '1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
