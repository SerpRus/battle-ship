import React, {
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  useMemo,
} from 'react';
import { useParams } from 'react-router-dom';
import { Card, Layout, Flex, Button, Form, Input } from 'antd';
import { SendOutlined, NotificationTwoTone } from '@ant-design/icons';

import { CommentCard } from '../../../../shared/ui/CommentCard/CommentCard';

import cls from './TopicPage.module.scss';

import { TComment, TTopic } from '../../ForumItems/types';
import { TopicStore } from '../../model/topicStore';
import { CommentStore } from '../../model/commentStore';

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
  const [commentsData, setCommentData] = useState<TComment[]>([] as TComment[]);

  const [inputText, setInputText] = useState('');

  const topicStoreEx = useMemo(() => new TopicStore(), []);
  const commentStoreEx = useMemo(() => new CommentStore(), []);

  useEffect(() => {
    const fetchServerData = async () => {
      topicStoreEx.getTopicById(Number(id)).then(data => {
        setCurrentTopic(data as TTopic);
        commentStoreEx
          .getAllCommentsFromTopic((data as TTopic).id)
          .then(comments => {
            setCommentData(comments as TComment[]);
          });
      });
    };
    fetchServerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = useCallback((e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setInputText(element.value);
  }, []);

  const addComment = useCallback(() => {
    if (inputText && currentTopicData) {
      const fetchServerData = async () => {
        const reqObj = {
          userId: currentTopicData.user_id,
          text: inputText,
          userName: currentTopicData.user_name,
          topicId: currentTopicData.id,
        };
        commentStoreEx.createComment(reqObj).then(() => setInputText(''));
      };
      fetchServerData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsData, currentTopicData, inputText]);

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
          <CommentCard itemList={commentsData}>
            <Form autoComplete="off">
              <Flex>
                <Input value={inputText} onChange={onChange} />
                <Button onClick={() => addComment()}>
                  <SendOutlined />
                </Button>
              </Flex>
            </Form>
          </CommentCard>
        </Content>
      </Flex>
    </Layout>
  );
};
