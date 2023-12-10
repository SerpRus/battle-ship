import { EnterOutlined } from '@ant-design/icons';
import { Flex, Card, Divider } from 'antd';
import React, { ReactNode } from 'react';
import { v4 as makeUUID } from 'uuid';
import { dateFormat } from '../../../widgets/forum/utils/date-formatter';

import cls from './ReplyCard.module.scss';

type ReplyDataType = {
  likesCount: ReactNode;
  id: number | string;
  topicId?: number | string;
  commentId: number | string;
  name: string;
  comment: string;
  creationDate: Date | string;
};

type ColumnType = {
  itemList: Array<ReplyDataType>;
  children: ReactNode;
};

export const ReplyCard: React.FC<ColumnType> = props => {
  const { itemList, children } = props;
  return (
    <Card className={cls.replyCard}>
      {itemList.map(item => (
        <Flex vertical style={{ width: 700 }} key={makeUUID()}>
          <Flex justify="space-between">
            <Flex vertical justify="space-evenly">
              <div>{item.name}</div>
              <div>{item.comment}</div>
              {dateFormat(new Date(item.creationDate))}
            </Flex>
            <Flex align="center">
              <EnterOutlined />
            </Flex>
          </Flex>
          <Divider />
        </Flex>
      ))}
      {children}
    </Card>
  );
};
