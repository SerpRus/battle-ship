import { Card, Layout, Flex, Space } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CommentOutlined } from '@ant-design/icons';
import { v4 as makeUUID } from 'uuid';

import { TopicCard } from '../../../../shared/ui/TopicCard/TopicCard';
import { dateFormat } from '../../../../widgets/forum/utils/date-formatter';
import PrimaryButton from '../../../../shared/ui/PrimaryButton/PrimaryButton';

import cls from './TopicListPage.module.scss';
import { TTopic } from '../../ForumItems/types';
import { TopicStore } from '../../model/topicStore';

const { Content } = Layout;

export const TopicList: React.FC = () => {
  const navigate = useNavigate();

  const [readyMadeItems, setreadyMadeItems] = useState<TTopic[]>([]);

  const [topicsData, setTopics] = useState<TTopic[]>([] as TTopic[]);
  const store = useMemo(() => new TopicStore(), []);

  useEffect(() => {
    const sortedList = topicsData.sort(
      (a: TTopic, b: TTopic) => a.time_stamp - b.time_stamp
    );
    setreadyMadeItems(sortedList);
  }, [topicsData]);

  useEffect(() => {
    const fetchServerData = async () => {
      const allTopicsData = await store.getAllTopics();
      setTopics(allTopicsData as unknown as TTopic[]);
    };
    fetchServerData();
  }, [store]);

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
                    <Link to={`/forum/${item.id}`}>{item.title}</Link>
                    <Space>
                      {item.user_name}·
                      {dateFormat(new Date(item.time_stamp * 1000))}
                    </Space>
                  </Flex>,
                  <Flex className={cls.LikesComments}>
                    <div>
                      <CommentOutlined />
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
