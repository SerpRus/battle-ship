export const validationRegex = {
  latinOrCyrillic: /[A-zЁёА-я]/g,
  capitalCase: /[A-ZЁА-Я]{1}/g,
  noSpaceOrNumbers: /^[^\s\d]+$/g,
  noSpecialChars: /^[A-zЁёА-я0-9-]+$/g,
  onlyLatin: /[A-z]/g,
  notAllNubmers: /[\D]{1}/g,
  noSpecialCharsInLogin: /^[A-zЁёА-я0-9-_]+$/g,
  capitalAndNumber: /(.*[A-Z].*)(.*[0-9].*)|(.*[0-9].*)(.*[A-Z].*)/g,
  maskedPhone: /\+7 \d\d\d \d\d\d-\d\d-\d\d/g,
};
