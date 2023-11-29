import { makeYupSchema } from '../helpers/makeYupSchema';
import { validationRuleList } from './validationRuleList';

export const yupSchema = makeYupSchema(validationRuleList);
