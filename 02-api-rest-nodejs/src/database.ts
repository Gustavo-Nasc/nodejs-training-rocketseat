import { Knex, knex as setupKnex } from 'knex'

export const config = {
  client: 'sqlite',
  connection: {
    filename: './src/database/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/database/migrations',
  },
} as Knex.Config

export const knex = setupKnex(config)
