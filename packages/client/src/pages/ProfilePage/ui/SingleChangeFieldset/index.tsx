import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import { TSingleChangeFieldsetProps } from './types';
import css from './styes.module.scss';
import { SaveButton } from './components/SaveButton';
import { yupSchema } from '../../../../shared/constants/yupSchema';
import { useTimedState } from './hooks/useTimedState';
import { StateIcon } from '../Avatar/StateIcon';
import { UX_TIMED_BASE } from '../../../../shared/constants/ux';

export const SingleChangeFieldset: FC<TSingleChangeFieldsetProps> = ({
  label,
  defaultValue = '',
  handler,
  placeholder = '',
  yupSchemaItem,
}) => {
  const [focus, setFocus] = useState(false);
  const [savedValue, setSavedValue] = useState(defaultValue);
  const [isLoading, setLoading] = useState(false);
  const [success, setTimedSuccess] = useTimedState(UX_TIMED_BASE);
  const [changeError, setTimedChangeError] = useTimedState(UX_TIMED_BASE);

  const inputRef = useRef(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const schema = yup.object({
    [yupSchemaItem]: yupSchema[yupSchemaItem],
  });

  const { control, register, handleSubmit, setValue, resetField } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      [yupSchemaItem]: savedValue,
    },
  });

  const { field, fieldState } = useController({
    control,
    name: yupSchemaItem,
  });

  const { isDirty, error, invalid } = fieldState;

  const hangleFocus = () => {
    setFocus(true);
  };

  const resetToDefault = useCallback(() => {
    setFocus(false);
    setValue(yupSchemaItem, savedValue);
    resetField(yupSchemaItem, { defaultValue: savedValue });
  }, [resetField, savedValue, setValue, yupSchemaItem]);

  useEffect(() => {
    resetToDefault();
  }, [savedValue, resetToDefault]);

  const handleHandler = async (data: Record<string, string>) => {
    setFocus(false);
    setLoading(true);
    const isSuccess = await handler(data[yupSchemaItem]);
    setLoading(false);

    if (isSuccess) {
      setTimedSuccess();
      setSavedValue(data[yupSchemaItem]);
    }

    if (!isSuccess) {
      setTimedChangeError();
      resetToDefault();
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (e.relatedTarget === buttonRef.current) {
      e.preventDefault();
      handleSubmit(handleHandler)();
    } else {
      resetToDefault();
    }
  };

  const handleButtonBlur = (e: React.FocusEvent) => {
    if (e.relatedTarget === inputRef.current) {
      e.preventDefault();
    } else {
      resetToDefault();
    }
  };

  const isPhone = yupSchemaItem === 'phone';
  const initialClass = !focus ? css.initial : '';
  const hasButtonClass = focus ? css.hasButton : '';
  const successClass = success ? css.success : '';
  const changeErrorClass = changeError ? css.changeError : '';
  return (
    <fieldset
      className={[
        css.fieldset,
        initialClass,
        hasButtonClass,
        successClass,
        changeErrorClass,
      ].join(' ')}>
      {isPhone && (
        <InputMask
          {...register(yupSchemaItem)}
          {...field}
          mask="+7 999 999-99-99"
          maskChar=" "
          className={css.input}
          placeholder={placeholder}
          onFocus={hangleFocus}
          onBlur={handleBlur}
          ref={inputRef}
        />
      )}
      {!isPhone && (
        <input
          {...register(yupSchemaItem)}
          {...field}
          className={css.input}
          placeholder={placeholder}
          onFocus={hangleFocus}
          onBlur={handleBlur}
          ref={inputRef}
        />
      )}
      <label htmlFor={yupSchemaItem} className={css.label}>
        {label}
      </label>
      {focus && (
        <SaveButton
          innerRef={buttonRef}
          isDisabled={!isDirty || invalid}
          onBlur={handleButtonBlur}
        />
      )}
      {error && <span className={css.errorMessage}>{error.message}</span>}
      <StateIcon
        isLoading={isLoading}
        success={success}
        changeError={changeError}
      />
    </fieldset>
  );
};
