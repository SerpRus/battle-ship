import { FC, useState } from 'react';
import * as yup from 'yup';
import { useController, useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToggle } from '../../../../shared/lib/hooks/useToggle';
import css from './styes.module.scss';
import { Input } from '../../../../shared/ui/Input';
import { Password } from '../../../../shared/ui/Password';
import { Button } from '../../../../shared/ui/Button';
import { yupSchema } from '../../../../shared/constants/yupSchema';
import type { TPasswordChangeFieldsetProps, TPasswordData } from './types';
import { useTimedState } from '../SingleChangeFieldset/hooks/useTimedState';
import { UX_TIMED_BASE } from '../../../../shared/constants/ux';
import { StateIcon } from '../Avatar/StateIcon';

export const PasswordChangeFieldset: FC<TPasswordChangeFieldsetProps> = ({
  handler,
}) => {
  const [open, toggleOpen] = useToggle(false);
  const [isLoading, setLoading] = useState(false);
  const [success, setTimedSuccess] = useTimedState(UX_TIMED_BASE);
  const [changeError, setTimedChangeError] = useTimedState(UX_TIMED_BASE);

  const schema = yup.object({
    oldPassword: yupSchema.password,
    newPassword: yupSchema.newPassword,
    confirmPassword: yupSchema.confirmPassword,
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { field: passwordField } = useController({
    control,
    name: 'oldPassword',
  });
  const { field: newPassword } = useController({
    control,
    name: 'newPassword',
  });
  const { field: confirmPassword } = useController({
    control,
    name: 'confirmPassword',
  });

  const onSubmit: SubmitHandler<TPasswordData> = async data => {
    toggleOpen();
    setLoading(true);
    const isSuccess = await handler(data);
    setLoading(false);

    if (isSuccess) {
      setTimedSuccess();
    }

    if (!isSuccess) {
      setTimedChangeError();
    }
  };

  const handleReset = () => {
    toggleOpen();
  };
  const isNoActivity = !isLoading && !success && !changeError;
  return (
    <>
      {!open && (
        <Input
          className={css.fakeInput}
          type="password"
          label="Пароль"
          defaultValue="111111"
          disabled>
          {isNoActivity && (
            <button
              className={css.fakeInputButton}
              type="button"
              onClick={toggleOpen}>
              Изменить
            </button>
          )}
          <StateIcon
            isLoading={isLoading}
            success={success}
            changeError={changeError}
          />
        </Input>
      )}
      {open && (
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <Password
            label="Старый пароль"
            {...register('oldPassword')}
            error={errors.oldPassword?.message?.toString()}
            {...passwordField}
            ref={null}
          />
          <Password
            label="Новый пароль"
            {...register('newPassword')}
            error={errors.newPassword?.message?.toString()}
            {...newPassword}
            ref={null}
          />
          <Password
            label="Повторите пароль"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message as string}
            {...confirmPassword}
            ref={null}
          />
          <Button className={css.button} type="submit">
            Сохранить
          </Button>
          <Button onClick={handleReset} ternary>
            Отменить
          </Button>
        </form>
      )}
    </>
  );
};
