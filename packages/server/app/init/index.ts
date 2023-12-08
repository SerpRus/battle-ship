import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { commentModel } from '../models/comment';
import { topicModel } from '../models/topic';
import { replyModel } from '../models/reply';

// TODO: переделать на переменные окружения
const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  dialect: 'postgres', // 'mysql', 'sqlite', 'mariadb', 'mssql'
};

// Создаем инстанс Sequelize
export const sequelize = new Sequelize(sequelizeOptions);

// Инициализируем модели
export const Topic = sequelize.define('Topic', topicModel, {
  timestamps: false,
});

export const Comment = sequelize.define('Comment', commentModel, {
  timestamps: false,
});

export const Reply = sequelize.define('Reply', replyModel, {
  timestamps: false,
});

export async function dbConnect() {
  try {
    await sequelize.authenticate(); // Проверка аутентификации в БД
    await sequelize.sync(); // Синхронизация базы данных

    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  } catch (error) {
    throw new Error(`Unable to connect to the database: ${error}`);
  }
}
