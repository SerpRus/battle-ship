import React from 'react'
import { Button, Form, Input } from 'antd'

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const { TextArea } = Input

const CreateTopicForm: React.FC = () => (
  <Form
    name="basic"
    labelCol={{
      span: 16,
      offset: 4,
    }}
    wrapperCol={{
      span: 16,
      offset: 4,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    layout="vertical">
    <Form.Item
      label="В двух словах опишите, о чем ваша тема"
      name="theme"
      rules={[
        {
          required: true,
          message: 'Введите название темы',
        },
      ]}>
      <Input />
    </Form.Item>

    <Form.Item
      name="description"
      rules={[
        {
          required: true,
          message: 'Введите описание темы',
        },
      ]}>
      <TextArea
        rows={7}
        placeholder="лимит 1000 символов"
        minLength={20}
        maxLength={1000}
      />
    </Form.Item>

    <Form.Item
      label="Несколько тегов могут быть разделены запятыми"
      name="tags"
      rules={[
        {
          required: true,
          message: 'Ввод некорректен',
        },
      ]}>
      <Input />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}>
      <Button type="primary" htmlType="submit">
        Создать топик
      </Button>
    </Form.Item>
  </Form>
)

export default CreateTopicForm
