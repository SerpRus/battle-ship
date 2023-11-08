import React from 'react';
import { Card, Flex } from 'antd';
import CreateTopicForm from '../../../../shared/ui/CreateTopicForm/CreateTopicForm';

import cls from './CreateTopicPage.module.scss';

export const CreateTopic: React.FC = () => (
  <Flex justify="space-around">
    <Card
      style={{
        maxWidth: 1000,
        minWidth: 450,
      }}
      bodyStyle={{ width: '100%' }}
      className={cls.ctCard}>
      <CreateTopicForm />
    </Card>
  </Flex>
);
