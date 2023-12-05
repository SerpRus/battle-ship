import { dbConnect, User } from './init';
import type { IUser } from './models/user';

// TODO: тестовые функции

// Создание пользователя
export async function createUser(firstName: string, lastName: string) {
  return User.create({ firstName, lastName });
}

// Обновление пользователя по ID
export async function updateUserById(id: number, data: IUser) {
  return User.update(data, { where: { id } });
}

// Удаление пользователя по ID
export async function deleteUserById(id: number) {
  return User.destroy({ where: { id } });
}

// Получение пользователя по ID
export async function getUserById(id: number) {
  return User.findOne({ where: { id } });
}

// Получение пользователей по ID
export async function getUsersByFirstName(firstName: string) {
  return User.findAll({ where: { firstName } });
}

export function startApp() {
  dbConnect().then(async () => {
    /*
     *  Запуск приложения только после старта БД
     */

    // Создаем нового пользователя
    // await createUser('Alex', 'Ivanov');
    // await createUser('Alex', 'Ivanov2');
    // await createUser('Alex3', 'Ivanov3');
    // await createUser('Alex4', 'Ivanov4');
    // Получаем пользователей с именем Alex
    const users = await getUsersByFirstName('Alex');

    // Проверяем, найдены ли пользователи
    if (!users.length) {
      throw new Error('Not found');
    }

    // Получаем id первого пользователя
    const { id } = users[0];
    // Обновляем пользователя по ID
    await updateUserById(id, { firstName: 'Ivan', lastName: 'Ivanov' });

    // Ищем обновленного пользователя по id
    const findedUser = await getUserById(id);
    // Выводим в консоль найденного пользователя
    // eslint-disable-next-line no-console
    console.log('Finded user: ', findedUser);
  });
}
