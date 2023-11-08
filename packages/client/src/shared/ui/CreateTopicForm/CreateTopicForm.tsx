import React from 'react';
import { Button, Form, Input } from 'antd';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import cls from './CreateTopicForm.module.scss';

const { TextArea } = Input;

const CreateTopicForm: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log('Success:', values); // eslint-disable-line no-console
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo); // eslint-disable-line no-console
  };

  return (
    <Form
      name="basic"
      wrapperCol={{
        span: 24,
      }}
      style={{
        maxWidth: 1000,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      className={cls.textColor}>
      <h2>Тема:</h2>
      <Form.Item
        label="В двух словах опишите, о чем ваша тема"
        name="theme"
        rules={[
          {
            required: true,
            message: 'Введите название темы',
          },
        ]}>
        <Input id="theme" className={cls.ctInput} />
      </Form.Item>

      <Form.Item
        name="description"
        rules={[
          {
            required: true,
            message: 'Введите описание темы',
          },
        ]}>
        <TextArea rows={7} placeholder="лимит 1000 символов" maxLength={1000} />
      </Form.Item>

      <h2>Теги:</h2>
      <Form.Item
        label="Несколько тегов могут быть разделены запятыми"
        name="tags"
        rules={[
          {
            required: true,
            message: 'Ввод некорректен',
          },
        ]}>
        <Input className={cls.ctInput} />
      </Form.Item>

      <Form.Item>
        <PrimaryButton buttonTitle="Создать топик" />
      </Form.Item>
    </Form>
  );
};

export default CreateTopicForm;
