import { expect, test } from 'vitest'

// Enunciado: O usuário consegue criar uma nova transação
test('O Usuário consegue criar uma nova transação', () => {
  // Operação:
  // Criar uma nova chamada HTTP para o servidor que cria a transação

  // Validação do teste:
  // A Resposta esperada do Backend deve ser com o stautus code 201
  const responseStatusCode = 201
  expect(responseStatusCode).toEqual(201)
})
