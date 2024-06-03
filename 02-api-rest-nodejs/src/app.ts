import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

// Cookies  => Formas de manter contextos entre requisições
app.register(fastifyCookie)
app.register(transactionsRoutes, { prefix: '/transactions' })
