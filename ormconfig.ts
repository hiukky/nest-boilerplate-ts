const ENV = {
  test: {
    type: 'sqlite',
    database: 'database/sqlite-test.db',
    entities: ['src/modules/**/*.entity.{ts,js}'],
    migrations: ['src/migrations/**/*.{ts,js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  },

  development: {
    type: 'sqlite',
    database: 'database/sqlite-dev.db',
    entities: ['dist/src/modules/**/*.entity.{ts,js}'],
    migrations: ['dist/src/migrations/**/*.{ts,js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  },

  production: {
    type: 'sqlite',
    database: 'database/sqlite-prod.db',
    entities: ['dist/src/modules/**/*.entity.{ts,js}'],
    migrations: ['dist/src/migrations/**/*.{ts,js}'],
    cli: {
      migrationsDir: 'dist/src/migrations',
    },
  },
}

if (!process.env.NODE_ENV) new Error('NODE_ENV no defined.')

module.exports = ENV[process.env.NODE_ENV]
