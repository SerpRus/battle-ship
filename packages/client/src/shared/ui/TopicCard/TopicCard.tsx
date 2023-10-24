import { Col, Row, Card } from 'antd'
import React, { ReactNode } from 'react'
import { v4 as makeUUID } from 'uuid'
import cls from './TopicCard.module.scss'

type ColumnType = {
  itemList: Array<string | ReactNode>
}
export const TopicCard: React.FC<ColumnType> = ({ itemList }) => {
  const cols = [
    {
      span: 9,
      className: cls.theme,
    },
    {
      span: 7,
      className: cls.likesComments,
    },
    {
      span: 8,
      className: cls.info,
    },
  ]
  return (
    <Card className={cls.topicCard} bodyStyle={{ height: '100%' }}>
      <Row style={{ height: '100%' }}>
        {itemList.map((item, index) => (
          <Col
            key={makeUUID()}
            span={cols[index].span}
            className={cols[index].className}>
            {item}
          </Col>
        ))}
      </Row>
    </Card>
  )
}
