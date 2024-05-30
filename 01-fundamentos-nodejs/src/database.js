// Para persistir o banco de dados localmente, utilizaremos o 'fs', um módulo do Node
import fs from 'node:fs'

// Para suprir a necessidade inicial dos dados estarem sendo armazenado em memória
// podemos criar um banco de dados simples baseado em arquivos físicos

// Podemos criar uma URL padrão onde o arquivo será salvo com a classe global
// URL, que pode nos retornar a URL atual no dispositivo
const databasePath = new URL('../db.json', import.meta.url)
export class Database {
  // Embora nós iniciamos o vetor de 'users' como um vetor, nós iniciamos o DB
  // como um objeto para que possamos salvar mais informações e não apenas um vetor
  #database = {} // A '#' indica que esse é um campo privado da classe Database

  // Construtor que será executado assim que o Database ser carregado
  constructor() {
    fs.readFile(databasePath, 'utf-8', (err, data) => {
      if(err) {
        // Caso o arquivo não exista, ele é criado automaticamente
        this.#persist()
      } else {
        // Caso o arquivo exista, ele é convertido para um JSON
        this.#database = JSON.parse(data)
      }
    })
  }

  #persist() {
    // Utilizamos o 'fs' para persistir os dados num arquivo localmente salvo
    // E pedimos para o JSON transformar os dados numa string
    // Quando executei apenas com o 'writeFileSync', no Node 20
    fs.writeFileSync('db.json', JSON.stringify(this.#database))
  }

  // Função para busca dos dados, onde recebemos o nome da tabela
  select(table, search) {
    // Criamos a informação a ser exibida passando a tabela como chave para ser buscada
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }

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

    this.#persist()

    return data
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data }
      this.#persist()
    }
  }
}
