import type { AnyObject } from 'yup';
import { yupCall } from './yupCall';
import type { TVlidationRule } from '../types';

export const makeYupSchema = function (ruleList: TVlidationRule[]): AnyObject {
  const result = {} as AnyObject;
  ruleList.forEach(rule => {
    Object.assign(result, { [rule.fieldName]: yupCall(rule.ruleList) });
  });
  return result;
};
