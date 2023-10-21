import React from 'react'
import { Layout, Button, Checkbox, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import cls from './registrationPage.module.scss'

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
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item<FieldType>
            label="Почта"
            name="email"
            rules={[{ required: true, message: 'Введите вашу почту' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Логин"
            name="login"
            rules={[{ required: true, message: 'Введите ваш логин' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Имя"
            name="first_name"
            rules={[{ required: true, message: 'Введите ваше имя' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Фамилия"
            name="second_name"
            rules={[{ required: true, message: 'Введите вашу фамилию' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Телефон"
            name="phone"
            rules={[{ required: true, message: 'Введите ваш телефон' }]}>
            <Input type="phone" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="Повторите пароль"
            name="confirm_password"
            rules={[{ required: true, message: 'Повторите пароль' }]}>
            <Input.Password />
          </Form.Item>

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
