import * as yup from 'yup';
import { validationRegex as regEx } from './validationRegex';

export const yupSchema: yup.AnyObject = {
  nickName: yup.string().required('Введите никнейм'),
  firstName: yup
    .string()
    .required('Введите имя')
    .matches(regEx.latinOrCyrillic, 'Используйте латиницу или кириллицу')
    .matches(regEx.capitalCase, 'Первая буква должна быть заглавной')
    .matches(regEx.noSpaceOrNumbers, 'Уберите пробелы или цифры')
    .matches(regEx.noSpecialChars, 'Уберите спецсимволы кроме дефиса'),

  secondName: yup
    .string()
    .required('Введите фамилию')
    .matches(regEx.latinOrCyrillic, 'Используйте латиницу или кириллицу')
    .matches(regEx.capitalCase, 'Первая буква должна быть заглавной')
    .matches(regEx.noSpaceOrNumbers, 'Уберите пробелы или цифры')
    .matches(regEx.noSpecialChars, 'Уберите спецсимволы кроме дефиса'),

  phone: yup
    .string()
    .required('Введите телефон')
    .matches(regEx.maskedPhone, 'Введите оставшиеся цифры'),
  email: yup
    .string()
    .required('Введите имейл')
    .email('Введите корректный имейл'),
  login: yup
    .string()
    .required('Введите логин')
    .min(3, 'Введите минимум 3 символа')
    .max(20, 'Сократите до 20 символов')
    .matches(regEx.onlyLatin, 'Используйте только латиницу')
    .matches(regEx.notAllNubmers, 'Добавьте буквы латинского алфавита')
    .matches(
      regEx.noSpecialCharsInLogin,
      'Уберите спецсимволы кроме дефиса и нижнего подчеркивания'
    ),
  password: yup
    .string()
    .required('Введите пароль')
    .min(8, 'Введите минимум 8 символов')
    .max(40, 'Сократите до 40 символов')
    .matches(
      regEx.capitalAndNumber,
      'Обязательна одна заглавная буква и цифра'
    ),
  newPassword: yup
    .string()
    .required('Введите пароль')
    .min(8, 'Введите минимум 8 символов')
    .max(40, 'Сократите до 40 символов')
    .matches(regEx.capitalAndNumber, 'Обязательна одна заглавная буква и цифра')
    .notOneOf([yup.ref('password')], 'Введен старый пароль'),
  confirmPassword: yup
    .string()
    .required('Введите пароль')
    .min(8, 'Введите минимум 8 символов')
    .max(40, 'Сократите до 40 символов')
    .matches(regEx.capitalAndNumber, 'Обязательна одна заглавная буква и цифра')
    .oneOf([yup.ref('newPassword')], 'Пароли должны совпадать'),
};
