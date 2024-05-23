// Para suprir a necessidade inicial dos dados estarem sendo armazenado em memória
// podemos criar um banco de dados simples baseado em arquivos físicos
export class Database {
  // Embora nós iniciamos o vetor de 'users' como um vetor, nós iniciamos o DB
  // como um objeto para que possamos salvar mais informações e não apenas um vetor
  #database = {} // A '#' indica que esse é um campo privado da classe Database

  // Função para busca dos dados, onde recebemos o nome da tabela
  select(table) {
    // Criamos a informação a ser exibida passando a tabela como chave para ser buscada
    const data = this.#database[table] ?? []

    return data
  }

  // Função para inserção dos dados, onde recebemos os dados para inserção e para
  // qual tabela estaremos inseridos
  insert(table, data) {
    // Verificamos se já existe algum registro na tabela, caso exista, apenas inserimos
    // Caso contrário, precisaremos criar um Vetor para a inserção dos dados
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    return data
  }
}
