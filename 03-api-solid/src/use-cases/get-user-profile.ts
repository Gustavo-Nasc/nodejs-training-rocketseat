import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { RecourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileUseCaseRequest {
  id: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new RecourceNotFoundError()
    }

    return { user }
  }
}
