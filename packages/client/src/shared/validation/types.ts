import { Reference } from 'yup';

type TRuleBase = {
  message: string;
};

type TRuleRequired = {
  method: 'required';
};

type TRuleEmail = {
  method: 'email';
};

type TRuleMatches = {
  method: 'matches';
  regEx?: RegExp;
};

type TRuleMinMax = {
  method: 'min' | 'max';
  number?: number;
};

type TRuleOneOfOrNot = {
  method: 'notOneOf' | 'oneOf';
  ref: Reference<string>[];
};

export type TRule = TRuleBase &
  (TRuleRequired | TRuleEmail | TRuleMatches | TRuleMinMax | TRuleOneOfOrNot);

export type TVlidationRule = {
  fieldName: string;
  ruleList: TRule[];
};
