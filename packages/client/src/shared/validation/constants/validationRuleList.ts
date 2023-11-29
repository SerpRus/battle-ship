import * as yup from 'yup';
import { validationRegex as regEx } from './validationRegex';
import { TVlidationRule } from '../types';

export const validationRuleList: TVlidationRule[] = [
  {
    fieldName: 'display_name',
    ruleList: [
      {
        method: 'required',
        message: 'Введите никнейм',
      },
    ],
  },
  {
    fieldName: 'first_name',
    ruleList: [
      {
        method: 'required',
        message: 'Введите имя',
      },
      {
        method: 'matches',
        regEx: regEx.latinOrCyrillic,
        message: 'Используйте латиницу или кириллицу',
      },
      {
        method: 'matches',
        regEx: regEx.capitalCase,
        message: 'Первая буква должна быть заглавной',
      },
      {
        method: 'matches',
        regEx: regEx.noSpaceOrNumbers,
        message: 'Уберите пробелы или цифры',
      },
      {
        method: 'matches',
        regEx: regEx.noSpecialChars,
        message: 'Уберите спецсимволы кроме дефиса',
      },
    ],
  },
  {
    fieldName: 'second_name',
    ruleList: [
      {
        method: 'required',
        message: 'Введите фамилию',
      },
      {
        method: 'matches',
        regEx: regEx.latinOrCyrillic,
        message: 'Используйте латиницу или кириллицу',
      },
      {
        method: 'matches',
        regEx: regEx.capitalCase,
        message: 'Первая буква должна быть заглавной',
      },
      {
        method: 'matches',
        regEx: regEx.noSpaceOrNumbers,
        message: 'Уберите пробелы или цифры',
      },
      {
        method: 'matches',
        regEx: regEx.noSpecialChars,
        message: 'Уберите спецсимволы кроме дефиса',
      },
    ],
  },
  {
    fieldName: 'phone',
    ruleList: [
      {
        method: 'required',
        message: 'Введите телефон',
      },
      {
        method: 'matches',
        regEx: regEx.maskedPhone,
        message: 'Введите оставшиеся цифры',
      },
    ],
  },
  {
    fieldName: 'email',
    ruleList: [
      {
        method: 'required',
        message: 'Введите телефон',
      },
      {
        method: 'email',
        message: 'Введите корректный имейл',
      },
    ],
  },
  {
    fieldName: 'login',
    ruleList: [
      {
        method: 'required',
        message: 'Введите логин',
      },
      {
        method: 'min',
        number: 3,
        message: 'Введите минимум 3 символа',
      },
      {
        method: 'max',
        number: 20,
        message: 'Сократите до 20 символов',
      },

      {
        method: 'matches',
        regEx: regEx.onlyLatin,
        message: 'Используйте только латиницу',
      },
      {
        method: 'matches',
        regEx: regEx.notAllNubmers,
        message: 'Добавьте буквы латинского алфавита',
      },
      {
        method: 'matches',
        regEx: regEx.noSpecialCharsInLogin,
        message: 'Уберите спецсимволы кроме дефиса и нижнего подчеркивания',
      },
    ],
  },
  {
    fieldName: 'password',
    ruleList: [
      {
        method: 'required',
        message: 'Введите пароль',
      },
      {
        method: 'min',
        number: 8,
        message: 'Введите минимум 8 символов',
      },
      {
        method: 'max',
        number: 40,
        message: 'Сократите до 40 символов',
      },
      {
        method: 'matches',
        regEx: regEx.capitalAndNumber,
        message: 'Обязательна одна заглавная буква и цифра',
      },
    ],
  },
  {
    fieldName: 'newPassword',
    ruleList: [
      {
        method: 'required',
        message: 'Введите пароль',
      },
      {
        method: 'min',
        number: 8,
        message: 'Введите минимум 8 символов',
      },
      {
        method: 'max',
        number: 40,
        message: 'Сократите до 40 символов',
      },
      {
        method: 'matches',
        regEx: regEx.capitalAndNumber,
        message: 'Обязательна одна заглавная буква и цифра',
      },
      {
        method: 'notOneOf',
        ref: [yup.ref('password')],
        message: 'Новый пароль должен отличаться от старого',
      },
    ],
  },
  {
    fieldName: 'confirm_password',
    ruleList: [
      {
        method: 'required',
        message: 'Введите пароль',
      },
      {
        method: 'min',
        number: 8,
        message: 'Введите минимум 8 символов',
      },
      {
        method: 'max',
        number: 40,
        message: 'Сократите до 40 символов',
      },
      {
        method: 'matches',
        regEx: regEx.capitalAndNumber,
        message: 'Обязательна одна заглавная буква и цифра',
      },
      {
        method: 'oneOf',
        ref: [yup.ref('newPassword')],
        message: 'Пароли должны совпадать',
      },
    ],
  },
];
