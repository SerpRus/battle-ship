import { useContext } from 'react';
import { FormContext } from '../context/FormContext';

export const useFormContext = () => useContext(FormContext);
