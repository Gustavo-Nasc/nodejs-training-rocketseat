import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlradyExistsError } from '@/use-cases/errors/user-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  // Note que, agora, com o princípio da Inversão de Dependência, o arquivo que
  // precisar do Caso de Uso é o que vai enviar as dependências por parâmetro
  try {
    const usersRepository = new PrismaUsersRepository()

    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlradyExistsError)
      return reply.status(409).send({ message: err.message })

    return reply.status(500).send() // TODO: fix
  }

  return reply.status(201).send()
}
