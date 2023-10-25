import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import cls from './ErrorPageWrapper.module.scss';
import { ErrorPageWrapperProps } from './types';

const { Content } = Layout;

export const ErrorPageWrapper = ({
  title,
  description,
}: ErrorPageWrapperProps) => {
  const navigate = useNavigate();

  return (
    <Layout className={cls.wrapper}>
      <Content className={cls.content}>
        <h1 className={cls.title}>{title}</h1>
        <h2 className={cls.description}>{description}</h2>
        <Button
          type="link"
          className={cls.link}
          onClick={() => {
            navigate(-1);
          }}>
          Вернуться назад
        </Button>
      </Content>
    </Layout>
  );
};
