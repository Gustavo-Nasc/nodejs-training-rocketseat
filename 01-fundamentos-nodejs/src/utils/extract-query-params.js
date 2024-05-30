// Função que será responsável por extratir os Query Params da Requisição
export function extractQueryParams(query) {
  return query.substring(1).split('&').reduce((queryParams, param) => {
    const [key, value] = param.split('=')

    queryParams[key] = value

    return queryParams
  }, {})
}