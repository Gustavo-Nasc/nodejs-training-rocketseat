import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  // JWT => JSON Web Token
  // O usuário realiza o Login, enviando email e senha.
  // O back-end cria um Token Único, não modificado e STATELESS

  // STATELESS => Sem estado, ou seja, não armazenado em nenhuma estrutura de
  // persistência de dados (Banco de Dados)

  // Quando o back-end cria o Token, ele utiliza uma palavra chave, podendo ser
  // uma String
  // Exemplo: asldijg19o723ey9d78gh129d0wydihaskgd0128eyw1uqdg012e89dgu
  // Quanto mais difícil a palavra chave, mais difícil será de outro usuário criar
  // um novo Token

  // Quando o back-end receber o e-mail e senha e validar que são informações reais,
  // ele utilizará a Palavra-Chave para criar a informação do Token JWT

  // Geralmente, o JWT é formado por 3 informações:
  // header -> qual algoritmo utilizamos para criar o token (HS256, RSA256 etc.)
  // payload -> as informações para gerar o Token (ex: sub (id), email, senha)
  // signature -> verificação da integridade do payload (ex: HMAC SHA256)
  // sendo separados por ".": header.payload.signature
  return reply.status(200).send()
}
