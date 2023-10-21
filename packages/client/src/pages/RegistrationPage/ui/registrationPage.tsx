import React from 'react'
import { Layout, Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import cls from './registrationPage.module.scss'
import {
  EMAIL_REGEXP,
  FIRST_NAME_REGEXP,
  LOGIN_REGEXP,
  PASSWORD_REGEXP,
  PHONE_REGEXP,
  SECOND_NAME_REGEXP,
} from '../../../shared/constants/validationConstants'
import { ValidatableFormItemInput } from '../../../shared/ui/ValidatableFormItemInput/ValidatableFormItemInput'

const { Content } = Layout

type FieldType = {
  email: string
  login: string
  first_name: string
  second_name: string
  phone: string
  username?: string
  password?: string
  confirm_password?: string
}

export const RegistrationPage = () => {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      phone: '',
      username: '',
      password: '',
      confirm_password: '',
    },
  })
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
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
            label="Почта"
            name="email"
            control={control}
            errors={errors}
            rules={{
              required: { value: true, message: 'Логин - обязательное поле' },
              validate: value =>
                EMAIL_REGEXP.test(value) || 'Введите корректную почту',
            }}
          />

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
            label="Имя"
            name="first_name"
            control={control}
            errors={errors}
            rules={{
              required: { value: true, message: 'Имя - обязательное поле' },
              validate: value =>
                FIRST_NAME_REGEXP.test(value) ||
                'Поле должно состоять только из букв, первая заглавная',
            }}
          />

          <ValidatableFormItemInput<FieldType>
            label="Фамилия"
            name="second_name"
            control={control}
            errors={errors}
            rules={{
              required: { value: true, message: 'Фамилия - обязательное поле' },
              validate: value =>
                SECOND_NAME_REGEXP.test(value) ||
                'Поле должно состоять только из букв, первая заглавная',
            }}
          />

          <ValidatableFormItemInput<FieldType>
            label="Телефон"
            name="phone"
            control={control}
            errors={errors}
            rules={{
              required: { value: true, message: 'Телефон - обязательное поле' },
              minLength: {
                value: 10,
                message: 'Телефон должен быть длиннее 10 символов',
              },
              maxLength: {
                value: 15,
                message: 'Телефон должен быть короче 15 символов',
              },
              validate: value =>
                PHONE_REGEXP.test(value) ||
                'Поле должно состоять только из цифр и может начинаться с +',
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

          <ValidatableFormItemInput<FieldType>
            label="Повторите пароль"
            name="confirm_password"
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
                watch('password') === watch('confirm_password') ||
                'Пароль должен cовпадать',
            }}
            isPassword
          />

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Зарегистрироваться
            </Button>
            <Button
              type="link"
              onClick={() => {
                navigate('/login')
              }}>
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  )
}
