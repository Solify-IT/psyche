import { ConnectionOptions } from 'typeorm';

export = {
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  synchronize: true,
  entities: [
    'src/domain/model/**/*.ts',
  ],
  migrations: ['src/infraestructure/orm/migration/*.js'],
  cli: {
    migrationsDir: 'src/infraestructure/orm/migration',
  },
  logging: false,
} as ConnectionOptions;
