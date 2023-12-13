import { Layout, Button, Checkbox, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import cls from './loginPage.module.scss';
import { login, userActions } from '../../../store/userSlice';

import {
  LOGIN_REGEXP,
  PASSWORD_REGEXP,
} from '../../../shared/constants/validationConstants';
import { ValidatableFormItemInput } from '../../../shared/ui/ValidatableFormItemInput/ValidatableFormItemInput';

import PrimaryButton from '../../../shared/ui/PrimaryButton/PrimaryButton';

import { AppDispath } from '../../../store';
import { AuthLink } from '../../../app/providers/OAuth/ui/AuthLink';

const { Content } = Layout;

export type ILoginDataFieldType = {
  login: string;
  password: string;
  remember?: boolean;
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>();

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

  const onFinish = async (values: ILoginDataFieldType) => {
    dispatch(userActions.setOnLoading());
    dispatch(userActions.clearError());

    await dispatch(
      login({
        login: values.login,
        password: values.password,
      })
    );
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
            <PrimaryButton>Войти</PrimaryButton>
            <Button
              type="link"
              onClick={() => {
                navigate('/registration');
              }}>
              Зарегистрироваться
            </Button>
          </Form.Item>
          <AuthLink />
        </Form>
      </Content>
    </Layout>
  );
};
