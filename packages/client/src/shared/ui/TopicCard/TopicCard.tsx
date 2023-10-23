import { Col, Row, Card } from 'antd'
import React, { ReactNode } from 'react'
import { v4 as makeUUID } from 'uuid'

type ColumnType = {
  itemList: Array<string | ReactNode>
}

export const TopicCard: React.FC<ColumnType> = ({ itemList }) => {
  const spanList = [8, 6, 5, 5]
  return (
    <Card>
      <Row>
        {itemList.map((item, index) => (
          <Col key={makeUUID()} span={spanList[index]}>
            {item}
          </Col>
        ))}
      </Row>
    </Card>
  )
}
