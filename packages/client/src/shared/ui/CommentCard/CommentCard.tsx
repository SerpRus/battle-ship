import { EnterOutlined } from '@ant-design/icons';
import { Flex, Card, Divider } from 'antd';
import React, { ReactNode } from 'react';
import { v4 as makeUUID } from 'uuid';
import { dateFormat } from '../../../widgets/forum/utils/date-formatter';

import { TComment } from '../../../pages/Forum/ForumItems/types';

import cls from './CommentCard.module.scss';

type ColumnType = {
  itemList: Array<TComment>;
  children: ReactNode;
};

export const CommentCard: React.FC<ColumnType> = props => {
  const { itemList, children } = props;
  return (
    <Card className={cls.commentCard}>
      {itemList.map(item => (
        <Flex vertical style={{ width: 700 }} key={makeUUID()}>
          <Flex justify="space-between">
            <Flex vertical justify="space-evenly">
              <div>{item.user_name}</div>
              <div>{item.text}</div>
              {dateFormat(new Date(item.time_stamp * 1000))}
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
