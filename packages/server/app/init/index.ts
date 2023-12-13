import path from 'path';
import dotenv from 'dotenv';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { commentModel } from '../models/comment';
import { topicModel } from '../models/topic';
import { subscriptionModel } from '../models/subscription';
import { replyModel } from '../models/reply';

dotenv.config({ path: path.join(__dirname, '..', '..', '..', '..', '.env') });

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
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

Topic.hasOne(Comment, {
  foreignKey: {
    name: 'topic_id',
  },
});
Comment.belongsTo(Topic, {
  foreignKey: {
    name: 'topic_id',
  },
});

export const Subscription = sequelize.define(
  'Subscription',
  subscriptionModel,
  {
    timestamps: false,
  }
);

Topic.hasOne(Subscription, {
  foreignKey: {
    name: 'topic_id',
  },
});
Subscription.belongsTo(Topic, {
  foreignKey: {
    name: 'topic_id',
  },
});

export const Reply = sequelize.define('Reply', replyModel, {
  timestamps: false,
});

Topic.hasOne(Reply, {
  foreignKey: {
    name: 'topic_id',
  },
});
Reply.belongsTo(Topic, {
  foreignKey: {
    name: 'topic_id',
  },
});

Comment.hasOne(Reply, {
  foreignKey: {
    name: 'comment_id',
  },
});
Reply.belongsTo(Comment, {
  foreignKey: {
    name: 'comment_id',
  },
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
