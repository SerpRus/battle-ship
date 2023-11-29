import * as yup from 'yup';
import type { TRule } from '../types';

export const yupCall = function (methodArray: TRule[]) {
  let result = yup.string();

  methodArray.forEach(({ method, ...args }) => {
    const argList = Object.values(args);
    /// @ts-ignore
    result = yup.string.prototype[method].apply(result, argList);
  });

  return result;
};
