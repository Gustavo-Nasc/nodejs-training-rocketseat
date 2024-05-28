// users/:id
export function buildRoutePath(url) {
  // Iremos criar uma regex que irá identificar os parâmetros
  const routeParametersRegex = /:([a-zA-Z]+)/g

  console.log(Array.from(url.matchAll(routeParametersRegex)))
}
