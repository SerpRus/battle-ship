import { Card, Layout, Flex, Space } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CommentOutlined } from '@ant-design/icons';
import { v4 as makeUUID } from 'uuid';

// import forumData from '../../data.json';
import { TopicCard } from '../../../../shared/ui/TopicCard/TopicCard';
import { dateFormat } from '../../../../widgets/forum/utils/date-formatter';
import PrimaryButton from '../../../../shared/ui/PrimaryButton/PrimaryButton';

import cls from './TopicListPage.module.scss';
import { TopicStore } from '../../model/topicStore';

const { Content } = Layout;

/* type TopicType = {
  id: number | string;
  name: string;
  author: string;
  creationDate: Date | string;
  commentsCount: number;
  likesCount: number;
}; */

type TTopic = {
  id: number;
  title: string;
  description: string;
  user_name: string;
  time_stamp: number;
};

export const TopicList: React.FC = () => {
  const navigate = useNavigate();

  // const [data] = useState(forumData.data.topics);
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
      store.getAllTopics().then(data => {
        setTopics(data as unknown as TTopic[]);
      });
      /* const url = `http://localhost:${__SERVER_PORT__}/api`;
      const response = await fetch(url);
      const data = await response.json();
      // eslint-disable-next-line no-console
      console.log(data);
      store.getAllTopics().then((userData) => {
        setTopics(userData);
        console.log(userData); 
      }); */
    };
    fetchServerData();
    /* store.getAllTopics().then((userData) => {
      setTopics(userData);
    }); */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}/api`;
      const response = await fetch(url);
      const data = await response.json();
      // eslint-disable-next-line no-console
      console.log(data);
      TopicStore.getAllTopics()
    }
    fetchServerData();
  }); */

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
                      {/* item.commentsCount */}
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
