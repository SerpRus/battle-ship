import { Card, Layout, Flex, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CommentOutlined, LikeFilled } from '@ant-design/icons';
import { v4 as makeUUID } from 'uuid';

import forumData from '../../data.json';
import { TopicCard } from '../../../../shared/ui/TopicCard/TopicCard';
import { dateFormat } from '../../../../widgets/game/utils/date-formatter';
import PrimaryButton from '../../../../shared/ui/PrimaryButton/PrimaryButton';

import cls from './TopicListPage.module.scss';

const { Content } = Layout;

type TopicType = {
  id: number | string;
  name: string;
  author: string;
  creationDate: Date | string;
  commentsCount: number;
  likesCount: number;
};

export const TopicList: React.FC = () => {
  const navigate = useNavigate();

  const [data] = useState(forumData.data.topics);
  const [readyMadeItems, setreadyMadeItems] = useState<TopicType[]>([]);

  useEffect(() => {
    const sortedList = data.sort((a, b) =>
      b.creationDate.localeCompare(a.creationDate)
    );
    setreadyMadeItems(sortedList);
  }, [data]);

  return (
    <Layout className={cls.forumPageLayout}>
      <Flex justify="center" className={cls.wrapper}>
        <Card className={cls.forumPageCard}>
          <Flex justify="center" vertical>
            <PrimaryButton
              onClick={() => {
                navigate('/forum/create');
              }}>
              Create new topic
            </PrimaryButton>
          </Flex>
        </Card>
        <Content
          style={{
            maxWidth: 600,
          }}>
          <Card className={cls.forumPageCard}>
            {readyMadeItems.map(item => (
              <TopicCard
                key={makeUUID()}
                itemList={[
                  <Flex
                    align="start"
                    justify="space-between"
                    vertical
                    style={{ height: '100%' }}>
                    <Link to={`/forum/${item.id}`}>{item.name}</Link>
                    <Space>
                      {item.author}·{dateFormat(new Date(item.creationDate))}
                    </Space>
                  </Flex>,
                  <Flex className={cls.LikesComments}>
                    <div>
                      <CommentOutlined />
                      {item.commentsCount}
                    </div>
                    <div>
                      <LikeFilled />
                      {item.likesCount}
                    </div>
                  </Flex>,
                  <div>info</div>,
                ]}
              />
            ))}
          </Card>
        </Content>
      </Flex>
    </Layout>
  );
};
