const ENV = {
  development: {
    type: 'sqlite',
    database: 'database/sqlite-dev.db',
    entities: ['dist/src/modules/**/*.entity.{ts,js}'],
    migrations: ['dist/src/migrations/**/*.{ts,js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  },

  test: {
    type: 'sqlite',
    database: 'database/sqlite-test.db',
    entities: ['src/modules/**/*.entity.{ts,js}'],
    migrations: ['src/migrations/**/*.{ts,js}'],
    migrationsRun: true,
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

module.exports = ENV[process.env.NODE_ENV || 'development']
