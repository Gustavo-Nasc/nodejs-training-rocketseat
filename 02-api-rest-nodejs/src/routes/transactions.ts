import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { checkSectionIdExists } from '../middlewares/check-sectionId-exists'

export async function transactionsRoutes(app: FastifyInstance) {
  // O hook abaixo é global, porém, como estamos trabalhando no contexto
  // desse plugin, ele só será aplicado globalmente nas rotas desse plugin
  app.addHook('preHandler', async (req) => {
    console.log(`[${req.method}] ${req.url}`)
  })

  app.get(
    '/',
    {
      preHandler: [checkSectionIdExists],
    },
    async (req) => {
      const { sectionId } = req.cookies

      const transactions = await knex('transactions')
        .where('sectionId', sectionId)
        .select()

      return { transactions }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSectionIdExists],
    },
    async (req) => {
      const { sectionId } = req.cookies

      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTransactionParamsSchema.parse(req.params)

      const transaction = await knex('transactions')
        .where({ sectionId, id })
        .first() // Indica que terá só um resultado

      return { transaction }
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [checkSectionIdExists],
    },
    async (req) => {
      const { sectionId } = req.cookies

      const summary = await knex('transactions')
        .where({ sectionId })
        .sum('amount', { as: 'amount' })
        .first()

      return { summary }
    },
  )

  app.post('/', async (req, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(req.body)

    let sectionId = req.cookies.sectionId

    if (!sectionId) {
      sectionId = crypto.randomUUID()

      reply.cookie('sectionId', sectionId, {
        path: '/', // Quais rotas podem acessar o backend
        // Passa-se em segundos quanto tempo o Cookie deve durar no navegador
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      })
    }

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      sectionId,
    })

    return reply.status(201).send()
  })
}
