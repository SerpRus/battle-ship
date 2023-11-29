import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupSchema } from './yupSchema';

export const yupObject = yup.object(yupSchema).required();
export const resolver = { resolver: yupResolver(yupObject) };
