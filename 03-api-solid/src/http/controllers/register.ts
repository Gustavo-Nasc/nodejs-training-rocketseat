import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlradyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    // Nesse primeiro momento, nossos casos de uso estão utilizando apenas uma
    // Dependência. Mas, futuramente, um caso de uso nosso pode usar muito mais
    // do que somente uma dependência. Por isso, iremos aplicar, a partir de agora
    // o === FACTORY PATTERN
    // É como uma fábrica de coisas comuns, ou seja, todo um mesmo código que será
    // utilizado diversas vezes na aplicação e esse código possui diversas dependências,
    // nós podemos utilizar esse Pattern
    // const usersRepository = new PrismaUsersRepository()
    // const registerUseCase = new RegisterUseCase(usersRepository)

    // Note que agora, sempre que eu precisar do registerUseCase, eu posso
    // importá-lo diretamente pela nossa Factory
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlradyExistsError)
      return reply.status(409).send({ message: err.message })

    throw err
  }

  return reply.status(201).send()
}
