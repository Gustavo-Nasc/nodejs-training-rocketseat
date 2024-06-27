import fastify from 'fastify'

export const app = fastify()

// Criando um Database com Docker e PostreSQL

// === COMANDO PADRÃO PARA CRIAÇÃO DE CONTAINER DOCKER COM POSTGRESQL

// docker run --name api-solid-pg bitnami/postgresql
// Após --name passa-se o nome que queremos dar a esse container. E, em seguida,
// qual a imagem que queremos usar para a criação desse container

// =============================================================================
// === PRINCIPAIS POSSÍVEIS VARIÁVEIS

// -e POSTGREQL_USERAME=
// default: postgres
// O Username que poderá acessar o Container

// -e POSTGREQL_PASSWORD=
// default: nil
// A senha para acessar o Container

// -e POSTGRESQL_DATABASE=
// default: postgres
// O nome do Database que queremos criar

// -p 5432:5432
// Indica que queremos direcionar a porta do Container (5432) para a porta do Host
// que deseja entrar no Container, ou seja, quando formos acessar o Container,
// podemos ir pelo localhost:5432
