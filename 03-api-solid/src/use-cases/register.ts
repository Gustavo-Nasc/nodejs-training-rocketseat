import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

// === USE CASE
// Criamos esse arquivo separado, livre de frameworks, para que, caso futuramente
// a aplicação não utilize mais Requisições HTTP, possamos reaproveitar o código
// responsável pela criação do usuário

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

// === SOLID
// Iniciando de trás pra frente 😅, vamos ver primeiro sobre o 'D'
// D => Dependency Inversion Principle

// Note que esse use-case tem uma dependência, no caso, o Repository do Prisma que
// criamos. Sem a dependência, esse caso de uso deixa de funcionar
// No princípio D, mudamos em como o use-case tem acesso a dependência
// Nesse primeiro momento, note que estamos instanciando diretamente nossa
// dependência

// Para aplicarmos o conceito, criamos uma classe e inserimos a função responsável
// pela execução dentro dessa classe
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('Email already exists')
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    // Note que agora, o código responsável pela criação do usuário não está
    // associado ao Prisma
    await this.usersRepository.create({ name, email, password_hash })
  }
}
