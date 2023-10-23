import { Card, Layout, Flex, Button } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CommentOutlined, LikeFilled } from '@ant-design/icons'
import { v4 as makeUUID } from 'uuid'

import forumData from '../data.json'

import { TopicCard } from '../../../shared/ui/TopicCard/TopicCard'

const { Content } = Layout

type TopicType = {
  id: number | string
  name: string
  author: string
  creationDate: Date | string
  commentsCount: number
  likesCount: number
}

const titleItemList = ['Themes', 'Date', 'Comments', 'Likes']

const TopicList: React.FC = () => {
  const [data] = useState(forumData.data.topics)
  const [readyMadeItems, setreadyMadeItems] = useState<TopicType[]>([])

  useEffect(() => {
    const sortedList = [...data].sort((a, b) =>
      b.creationDate.localeCompare(a.creationDate)
    )
    setreadyMadeItems(sortedList)
  }, [data])

  return (
    <Layout>
      <Flex justify="space-around">
        <Card>
          <Flex justify="center" vertical>
            <Button type="primary">Create new topic</Button>
          </Flex>
        </Card>
        <Content
          style={{
            maxWidth: 600,
          }}>
          <Card>
            <div>
              <TopicCard itemList={titleItemList} />
            </div>
            {readyMadeItems.map(item => (
              <TopicCard
                key={makeUUID()}
                itemList={[
                  <Flex align="center" vertical>
                    <Link to={`/forum/${item.id}`}>{item.name}</Link>
                    {item.author}
                  </Flex>,
                  <Flex>
                    {new Date(item.creationDate).toString().substring(0, 24)}
                    {/* dateutil */}
                  </Flex>,
                  <Flex>
                    <CommentOutlined />
                    {item.commentsCount}
                  </Flex>,
                  <Flex>
                    <LikeFilled />
                    {item.likesCount}
                  </Flex>,
                ]}
              />
            ))}
          </Card>
        </Content>
      </Flex>
    </Layout>
  )
}

export default TopicList
