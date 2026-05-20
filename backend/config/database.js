import { Sequelize } from 'sequelize';
import configFile from '../config/config.js';

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const sequelize = new Sequelize(
  config.database,      // имя базы данных
  config.username,      // пользователь
  config.password,  // пароль
  {
    host: config.host,
    port: config.port || 5432,
    dialect: config.dialect,
    logging: true,         // отключить вывод SQL-запросов в консоль (можно true для отладки)
  }
);

export default sequelize;