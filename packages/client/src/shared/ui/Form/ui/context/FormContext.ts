import { createContext } from 'react';
import { TFormContext } from './types';

export const FormContext = createContext<TFormContext>({} as TFormContext);
export const FormProvider = FormContext.Provider;
