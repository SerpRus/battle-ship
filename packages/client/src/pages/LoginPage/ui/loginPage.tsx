import React from 'react';
import { Layout, Button, Checkbox, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import cls from './loginPage.module.scss';
import {
  LOGIN_REGEXP,
  PASSWORD_REGEXP,
} from '../../../shared/constants/validationConstants';
import { ValidatableFormItemInput } from '../../../shared/ui/ValidatableFormItemInput/ValidatableFormItemInput';
import { useAuth } from '../../../app/providers/AuthProvider/AuthProvider';
import { RoutePath } from '../../../app/providers/router/routeConfig';

const { Content } = Layout;

export type ILoginDataFieldType = {
  login: string;
  password: string;
  remember?: boolean;
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'all',
    defaultValues: {
      login: '',
      password: '',
      remember: true,
    },
  });
  const onFinish = (values: ILoginDataFieldType) => {
    login({
      login: values.login,
      password: values.password,
    })
      .then(res => {
        if (res) {
          navigate(RoutePath.home, { replace: true });
        }
      })
      .catch(() => {
        toast.error('Непредвиденная ошибка входа');
      });
  };

  return (
    <Layout className={cls.wrapper}>
      <Content className={cls.content}>
        <div className={cls.ship} />
        <Form
          className={cls.form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleSubmit(onFinish)}
          autoComplete="off">
          <ValidatableFormItemInput
            name="login"
            label="Логин"
            control={control}
            errors={errors}
            rules={{
              required: { value: true, message: 'Логин - обязательное поле' },
              minLength: {
                value: 3,
                message: 'Логин должен быть длиннее 3 символов',
              },
              maxLength: {
                value: 20,
                message: 'Логин должен быть короче 20 символов',
              },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              validate: (value: any) =>
                LOGIN_REGEXP.test(value) ||
                'Логин должен состоять из английских букв или спецсимволов(-_)',
            }}
          />

          <ValidatableFormItemInput
            name="password"
            label="Пароль"
            control={control}
            errors={errors}
            rules={{
              required: { value: true, message: 'Пароль - обязательное поле' },
              minLength: {
                value: 8,
                message: 'Пароль должен быть длиннее 8 символов',
              },
              maxLength: {
                value: 40,
                message: 'Пароль должен быть короче 40 символов',
              },
              validate: () =>
                PASSWORD_REGEXP.test(watch('password')) ||
                'Пароль должен содержать хотя бы одну заглавную букву или цифру, без спецсимволов',
            }}
            isPassword
          />

          <Controller
            name="remember"
            control={control}
            render={field => (
              <Form.Item<ILoginDataFieldType>
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
                {...field}>
                <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field}>Remember me</Checkbox>
                  )}
                />
              </Form.Item>
            )}
          />

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
            <Button
              type="link"
              onClick={() => {
                navigate('/registration');
              }}>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};
