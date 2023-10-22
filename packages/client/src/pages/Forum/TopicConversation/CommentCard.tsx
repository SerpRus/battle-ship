import { LikeFilled } from '@ant-design/icons'
import { Flex, Card, Divider } from 'antd'
import React, { ReactNode } from 'react'
import { v4 as makeUUID } from 'uuid'

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
    <Card>
      {itemList.map(item => (
        <Flex vertical style={{ width: 700 }} key={makeUUID()}>
          <Flex justify="space-around">
            <Flex vertical justify="space-between">
              <div>{item.name}</div>
              <div>{item.comment}</div>
              {new Date(item.creationDate).toString().substring(0, 24)}
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
