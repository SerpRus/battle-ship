import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Layout, Flex, Button } from 'antd';
import { NotificationTwoTone } from '@ant-design/icons';

import cls from './TopicPage.module.scss';

import { TopicStore } from '../../model/topicStore';
import { TTopic } from '../../ForumItems/types';

const { Content } = Layout;

function notifyUser(
  setNotification: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (!('Notification' in window)) {
    // eslint-disable-next-line no-alert
    alert("don't support notifications");
  } else if (Notification.permission === 'granted') {
    // eslint-disable-next-line no-new
    new Notification('Thanks for enabling notifications!');
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        setNotification(true);
        // eslint-disable-next-line no-new
        new Notification('Thanks for enabling notifications!');
      }
    });
  }
}

export const Topic: React.FC = () => {
  const [notification, setNotification] = useState(
    Notification.permission === 'granted'
  );
  const { id } = useParams();

  const [currentTopicData, setCurrentTopic] = useState<TTopic>();

  const topicStoreEx = useMemo(() => new TopicStore(), []);

  useEffect(() => {
    const fetchServerData = async () => {
      topicStoreEx.getTopicById(Number(id)).then(data => {
        setCurrentTopic(data as TTopic);
      });
    };
    fetchServerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout className={cls.layout}>
      <Flex justify="space-around" className={cls.wrapper}>
        <Content
          style={{
            maxWidth: 800,
          }}>
          <Card className={cls.themeCard}>
            <h2>{currentTopicData?.title}</h2>
            <h4>{currentTopicData?.description}</h4>
            <div>
              {!notification && (
                <Button onClick={() => notifyUser(setNotification)}>
                  <NotificationTwoTone />
                </Button>
              )}
            </div>
          </Card>
        </Content>
      </Flex>
    </Layout>
  );
};
