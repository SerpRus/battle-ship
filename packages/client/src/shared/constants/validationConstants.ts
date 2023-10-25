export const LOGIN_REGEXP = /^[A-Za-z][A-Za-z1-9\-_]{2,19}$/;
export const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
export const EMAIL_REGEXP = /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/;
export const PHONE_REGEXP = /^\+?\d{9,14}$/;
export const FIRST_NAME_REGEXP = /^[A-ZА-Я]{1}[a-zа-я\-ъ]{0,254}$/;
export const SECOND_NAME_REGEXP = /^[A-ZА-Я]{1}[a-zа-я\-ъ]{0,254}$/;
export const DISPLAY_NAME_REGEXP = /^[1-9A-ZА-Яa-zа-я\-ъ]{0,254}$/;
