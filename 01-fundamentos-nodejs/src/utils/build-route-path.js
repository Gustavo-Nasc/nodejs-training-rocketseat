// users/:id
export function buildRoutePath(url) {
  // Iremos criar uma regex que irá identificar os parâmetros
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const pathWithParameters = url.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  const pathRegex = new RegExp(`^${pathWithParameters}(?<query>\\?(.*))?$`)

  return pathRegex
}
