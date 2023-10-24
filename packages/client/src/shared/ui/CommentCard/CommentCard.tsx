import { LikeFilled } from '@ant-design/icons'
import { Flex, Card, Divider } from 'antd'
import React, { ReactNode } from 'react'
import { v4 as makeUUID } from 'uuid'
import { dateFormat } from '../../../pages/Forum/TopicListPage/utils/dateFormatter'

import cls from './CommentCard.module.scss'

type CommentsDataType = {
  /* types */ likesCount: ReactNode
  id: number | string
  topicId: number | string
  name: string
  comment: string
  creationDate: Date | string
}

type ColumnType = {
  itemList: Array<CommentsDataType>
  children: ReactNode
}

export const CommentCard: React.FC<ColumnType> = props => {
  const { itemList, children } = props
  return (
    <Card className={cls.commentCard}>
      {itemList.map(item => (
        <Flex vertical style={{ width: 700 }} key={makeUUID()}>
          <Flex justify="space-between">
            <Flex vertical justify="space-evenly">
              <div>{item.name}</div>
              <div>{item.comment}</div>
              {dateFormat(new Date(item.creationDate))}
              {/* dateutil */}
            </Flex>
            <Flex align="center">
              <LikeFilled />
              <span>{item.likesCount}</span>
            </Flex>
          </Flex>
          <Divider />
        </Flex>
      ))}
      {children}
    </Card>
  )
}
