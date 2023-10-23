import React from 'react'
import { Card, Flex } from 'antd'
import CreateTopicForm from './Form'

const CreateTopic: React.FC = () => (
  <Flex justify="space-around">
    <Card
      style={{
        maxWidth: 1000,
        minWidth: 450,
      }}>
      <CreateTopicForm />
    </Card>
  </Flex>
)

export default CreateTopic
