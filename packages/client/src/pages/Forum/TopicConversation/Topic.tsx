import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Layout, Flex, Button, Form, Input } from 'antd'
import { LikeFilled, SendOutlined } from '@ant-design/icons'

import forumData from '../data.json'
import { CommentCard } from './CommentCard'

const { Content } = Layout

type CommentsDataType = {
  id: number | string
  topicId: number | string
  name: string
  comment: string
  creationDate: Date | string
  likesCount: number | string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onFinish = (values: any) => {
  console.log('Success:', values) // eslint-disable-line no-console
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo) // eslint-disable-line no-console
}

const Topic: React.FC = () => {
  const { id } = useParams()

  const topicsData = forumData.data.topics
  const currentTopicData = topicsData.find(topic => topic.id === Number(id))
  const [commentsData] = useState(forumData.data.comments)
  const [readyMadeComments, setreadyMadeItems] = useState<CommentsDataType[]>(
    []
  )

  useEffect(() => {
    const currentTopicComments = commentsData.filter(
      comment => comment.topicId === currentTopicData?.id
    )
    const sortedList = [...currentTopicComments].sort((a, b) =>
      b.creationDate.localeCompare(a.creationDate)
    )
    setreadyMadeItems(sortedList)
  }, [commentsData, currentTopicData?.id])

  return (
    <Layout>
      <Flex justify="space-around">
        <Content
          style={{
            maxWidth: 800,
          }}>
          <Card>
            <h2>{currentTopicData?.name}</h2>
            <h4>{currentTopicData?.description}</h4>
            <div>
              <LikeFilled />
            </div>
          </Card>
          <CommentCard itemList={readyMadeComments}>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off">
              <Flex>
                <Form.Item
                  name="message"
                  rules={[
                    { required: true, message: 'Please input your message!' },
                  ]}>
                  <Input />
                </Form.Item>
                <Button>
                  <SendOutlined />
                </Button>
              </Flex>
            </Form>
          </CommentCard>
        </Content>
      </Flex>
    </Layout>
  )
}

export default Topic
