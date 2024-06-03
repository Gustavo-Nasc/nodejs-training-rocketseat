import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSectionIdExists(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const sectionId = req.cookies.sectionId

  if (!sectionId) {
    return reply.status(401).send({
      error: 'Unauthorized',
    })
  }
}
