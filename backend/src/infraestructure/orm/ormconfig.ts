import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'localhost',
  synchronize: true,
  migrationsTableName: 'migration',
  entities: [
    'src/domain/model/**/*.ts',
  ],
  migrations: ['src/infraestructure/orm/migration/*.js'],
  cli: {
    migrationsDir: 'src/infraestructure/orm/migration',
  },
} as ConnectionOptions;
