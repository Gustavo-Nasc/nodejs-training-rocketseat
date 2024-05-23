export async function json(req, res) {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  // Podemos fazer com que todo o 'Content-Type' da aplicação seja JSON
  res.setHeader('Content-Type', 'application/json')
  // Pode ser visualizado nos Headers da requisição pelo Insomnia ou pelo httpie
}