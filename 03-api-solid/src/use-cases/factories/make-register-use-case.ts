// Note que o nome dessa Factory soa algo como: "Fazer casos de uso de registros",
// ou seja, iremos criar os nossos casos de uso aqui
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

// Como dito, futuramente, nossos use-cases podem ter mais de uma dependência,
// e caso não existisse essa Factory, eu teria que ir em cada arquivo que utiliza
// desse use-case e mudar manualmente. Aqui, basta eu adicionar as dependências
// que já será aplicado aos arquivos que utiliza desse use-case
export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
