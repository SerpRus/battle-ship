import React from 'react';
import { Layout, Button, Checkbox, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import cls from './loginPage.module.scss';
import {
  LOGIN_REGEXP,
  PASSWORD_REGEXP,
} from '../../../shared/constants/validationConstants';
import { ValidatableFormItemInput } from '../../../shared/ui/ValidatableFormItemInput/ValidatableFormItemInput';
import { useLoginUser } from '../model/hooks/useAuthUser';
import { RoutePath } from '../../../app/providers/router/routeConfig';
import { useAuth } from '../../../shared/lib/hooks/useAuth';

const { Content } = Layout;

type FieldType = {
  login: string;
  password: string;
  remember?: boolean;
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const login = useLoginUser();
  const { setIsAuth } = useAuth();

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
  // TODO: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    const isLogged = await login({
      login: values.login,
      password: values.password,
    });
    if (isLogged) {
      setIsAuth(true);
      window.location.replace(RoutePath.home);
    }
  };
  // TODO: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo); // eslint-disable-line
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
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <ValidatableFormItemInput<FieldType>
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
              validate: value =>
                LOGIN_REGEXP.test(value) ||
                'Логин должен состоять из английских букв или спецсимволов(-_)',
            }}
          />

          <ValidatableFormItemInput<FieldType>
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
              <Form.Item<FieldType>
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
