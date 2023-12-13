import React, {
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  useMemo,
} from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Card, Layout, Flex, Button, Form, Input } from 'antd';
import { SendOutlined, NotificationTwoTone } from '@ant-design/icons';

import { CommentCard } from '../../../../shared/ui/CommentCard/CommentCard';

import cls from './TopicPage.module.scss';

import { TComment, TTopic } from '../../ForumItems/types';
import { TopicStore } from '../../model/topicStore';
import { CommentStore } from '../../model/commentStore';
import { UserStore } from '../../../ProfilePage/model/store';
import { TUser } from '../../../ProfilePage/model/types';

const { Content } = Layout;

export const Topic: React.FC = () => {
  const [notification, setNotification] = useState(
    Notification.permission === 'granted'
  );
  const { id } = useParams();

  const [currentTopicData, setCurrentTopic] = useState<TTopic>();
  const [commentsData, setCommentData] = useState<TComment[]>([] as TComment[]);
  const [userData, setUserData] = useState<TUser>();

  const [inputText, setInputText] = useState('');

  const topicStoreEx = useMemo(() => new TopicStore(), []);
  const commentStoreEx = useMemo(() => new CommentStore(), []);
  const userStoreEx = useMemo(() => new UserStore(), []);

  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const currentUser = await userStoreEx.getUser();
        setUserData(currentUser);
      } catch (error) {
        toast.error('Ошибка получения данных пользователя');
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
      try {
        const currentTopic = await topicStoreEx.getTopicById(Number(id));
        setCurrentTopic(currentTopic as TTopic);
        const topicComments = await commentStoreEx.getAllCommentsFromTopic(
          (currentTopic as TTopic).id
        );
        setCommentData(topicComments as TComment[]);
      } catch (error) {
        toast.error('Ошибка получения данных топика/комментариев');
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };
    fetchServerData();
  }, [commentStoreEx, id, topicStoreEx, userStoreEx]);

  const onChange = useCallback((e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setInputText(element.value);
  }, []);

  const notifyUser = useCallback(() => {
    if (!('Notification' in window)) {
      // eslint-disable-next-line no-alert
      toast.error("don't support notifications");
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
  }, []);

  const addComment = useCallback(() => {
    if (inputText && currentTopicData) {
      const fetchServerData = async () => {
        if (userData) {
          const reqObj = {
            userId: userData.id,
            text: inputText,
            userName:
              userData.display_name ||
              `${userData.first_name} ${userData.second_name}`,
            topicId: currentTopicData.id,
          };
          try {
            await commentStoreEx.createComment(reqObj);
            setInputText('');
            const currentComments =
              await commentStoreEx.getAllCommentsFromTopic(
                (currentTopicData as TTopic).id
              );
            setCommentData(currentComments as TComment[]);
          } catch (error) {
            toast.error('Ошибка отправки/получения данных комментариев');
            if (error instanceof Error) {
              toast.error(error.message);
            }
          }
        } else {
          toast.error('Пользователь не найден');
        }
      };
      fetchServerData();
    }
  }, [commentStoreEx, currentTopicData, inputText, userData]);

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
                <Button onClick={notifyUser}>
                  <NotificationTwoTone />
                </Button>
              )}
            </div>
          </Card>
          <CommentCard itemList={commentsData}>
            <Form autoComplete="off">
              <Flex>
                <Input value={inputText} onChange={onChange} />
                <Button onClick={addComment}>
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
