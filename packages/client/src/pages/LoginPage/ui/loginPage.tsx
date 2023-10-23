import React from 'react'
import { Layout, Button, Checkbox, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import cls from './loginPage.module.scss'

const { Content } = Layout

type FieldType = {
  login?: string
  password?: string
  remember?: string
}

export const LoginPage = () => {
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log('Success:', values) // eslint-disable-line no-console
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo) // eslint-disable-line no-console
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
            label="Логин"
            name="login"
            rules={[{ required: true, message: 'Введите ваш логин' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
            <Button
              type="link"
              onClick={() => {
                navigate('/registration')
              }}>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  )
}
