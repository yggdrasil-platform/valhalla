import { resolve } from 'path';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  database: process.env.NODE_ENV,
  entities: [resolve(__dirname, '..', 'models', '*.{ts,js}')],
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  synchronize: true,
  type: 'postgres',
  username: process.env.DB_USER,
};

export default config;
