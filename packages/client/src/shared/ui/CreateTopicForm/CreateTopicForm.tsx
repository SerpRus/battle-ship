import React, { useMemo } from 'react';
import { Form, Input } from 'antd';
import cls from './CreateTopicForm.module.scss';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { TopicStore } from '../../../pages/Forum/model/topicStore';
import { UserStore } from '../../../pages/ProfilePage/model/store';

const { TextArea } = Input;

const CreateTopicForm: React.FC = () => {
  const topicStoreEx = useMemo(() => new TopicStore(), []);
  const userStoreEx = useMemo(() => new UserStore(), []);

  const onFinish = (formData: {
    description: string;
    tags: string;
    theme: string;
  }) => {
    const fetchServerData = async () => {
      userStoreEx.getUser().then(userData => {
        const reqData = {
          title: formData.theme,
          description: formData.description,
          userId: userData.id,
          userName: userData.first_name,
        };
        topicStoreEx.createTopic(reqData).then();
      });
    };

    fetchServerData();
  };

  const onFinishFailed = (errorInfo: unknown) => {
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
        <PrimaryButton>Создать топик</PrimaryButton>
      </Form.Item>
    </Form>
  );
};

export default CreateTopicForm;
