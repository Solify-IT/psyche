require('dotenv').config();

export interface AppConfiguration {
  dbHost: string,
  dbUser: string,
  dbPassword: string,
}

const config : AppConfiguration = {
  dbHost: process.env.DB_NAME || 'localhost',
  dbUser: process.env.DB_USER || 'postgres',
  dbPassword: process.env.DB_PASS || '',
};

export default config;
