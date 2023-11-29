import * as yup from 'yup';
import { yupSchema } from './yupSchema';

export const yupObject = yup.object(yupSchema).required();
