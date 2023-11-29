import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { resolver } from '@shared/validation';
import { TFormProps } from './types';
import { FormProvider } from '../context/FormContext';

export const Form: FC<TFormProps> = ({ onSubmit, ...props }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(resolver);

  return (
    <FormProvider value={{ register, errors }}>
      <form onSubmit={handleSubmit(onSubmit)} {...props} />
    </FormProvider>
  );
};
