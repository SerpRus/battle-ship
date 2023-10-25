import React, { useState, useEffect, ChangeEvent, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Layout, Flex, Button, Form, Input } from 'antd'
import { LikeFilled, SendOutlined } from '@ant-design/icons'
import { v4 as makeUUID } from 'uuid'

import forumData from '../../data.json'
import { CommentCard } from '../../../../shared/ui/CommentCard/CommentCard'

import cls from './TopicPage.module.scss'

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
  /* *
   *   @todo Сделать типизацию
   * */
  console.log('Success:', values) // eslint-disable-line no-console
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onFinishFailed = (errorInfo: any) => {
  /* *
   *   @todo Сделать типизацию
   * */
  console.log('Failed:', errorInfo) // eslint-disable-line no-console
}

export const Topic: React.FC = () => {
  const { id } = useParams()

  const topicsData = forumData.data.topics
  const currentTopicData = topicsData.find(topic => topic.id === Number(id))
  const [commentsData, setData] = useState(forumData.data.comments)
  const [readyMadeComments, setReadyMadeItems] = useState<CommentsDataType[]>(
    []
  )
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    const currentTopicComments = commentsData.filter(
      comment => comment.topicId === currentTopicData?.id
    )
    const sortedList = [...currentTopicComments].sort((a, b) =>
      b.creationDate.localeCompare(a.creationDate)
    )
    setReadyMadeItems(sortedList)
  }, [commentsData, currentTopicData?.id])

  const onChange = useCallback((e: ChangeEvent) => {
    const element = e.target as HTMLInputElement
    setInputText(element.value)
  }, [])

  const sendData = useCallback(() => {
    if (inputText) {
      const dataCopy = [...commentsData]

      dataCopy.push({
        id: makeUUID(),
        topicId: Number(id),
        name: `User-${makeUUID()}`,
        creationDate: new Date().toString(),
        likesCount: 0,
        comment: inputText,
      })
      setData(dataCopy)
      setInputText('')
    }
  }, [commentsData, inputText, id])

  return (
    <Layout className={cls.layout}>
      <Flex justify="space-around" className={cls.wrapper}>
        <Content
          style={{
            maxWidth: 800,
          }}>
          <Card className={cls.themeCard}>
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
                <Input value={inputText} onChange={onChange} />
                <Button onClick={sendData}>
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
