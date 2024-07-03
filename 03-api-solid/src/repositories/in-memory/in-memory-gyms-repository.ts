import { Gym } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

// Ao invés de passarmos um Repository, como o Prisma, criamos um Repository
// fictício para simular um e que possamos utilizá-lo para o teste unitário
export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
