import React, {
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  useMemo,
} from 'react';
import { useParams } from 'react-router-dom';
import { Card, Layout, Flex, Button, Form, Input } from 'antd';
import {
  LikeFilled,
  SendOutlined,
  NotificationOutlined,
} from '@ant-design/icons';

import { TUser } from '../../../ProfilePage/model/types';

import { UserStore } from '../../../ProfilePage/model/store';

import forumData from '../../data.json';
import { CommentCard } from '../../../../shared/ui/CommentCard/CommentCard';

import cls from './TopicPage.module.scss';

const { Content } = Layout;

type CommentsDataType = {
  id: number | string;
  topicId: number | string;
  name: string;
  comment: string;
  creationDate: Date | string;
  likesCount: number | string;
};

const onFinish = (values: unknown) => {
  /* *
   *   @todo Сделать типизацию
   * */
  console.log('Success:', values); // eslint-disable-line no-console
};

const onFinishFailed = (errorInfo: unknown) => {
  /* *
   *   @todo Сделать типизацию
   * */
  console.log('Failed:', errorInfo); // eslint-disable-line no-console
};

function notifyUser() {
  if (!('Notification' in window)) {
    // eslint-disable-next-line no-alert
    alert("don't support notifications");
  } else if (Notification.permission === 'granted') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const notify = new Notification('Thanks for enabling notifications!');
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const notify = new Notification('Thanks for enabling notifications!');
      }
    });
  }
}

export const Topic: React.FC = () => {
  const { id } = useParams();

  const topicsData = forumData.data.topics;
  const currentTopicData = topicsData.find(topic => topic.id === Number(id));
  const [commentsData, setData] = useState(forumData.data.comments);
  const [readyMadeComments, setReadyMadeItems] = useState<CommentsDataType[]>(
    []
  );
  const [inputText, setInputText] = useState('');

  const [user, setUser] = useState<TUser>({} as TUser);
  const store = useMemo(() => new UserStore(), []);

  const getUserCallback = useCallback(() => {
    store.getUser().then(userData => {
      setUser(userData);
    });
  }, [store]);

  useEffect(() => {
    const currentTopicComments = commentsData.filter(
      comment => comment.topicId === currentTopicData?.id
    );
    const sortedList = [...currentTopicComments].sort((a, b) =>
      b.creationDate.localeCompare(a.creationDate)
    );
    setReadyMadeItems(sortedList);
  }, [commentsData, currentTopicData?.id]);

  const onChange = useCallback((e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setInputText(element.value);
  }, []);

  useEffect(() => {
    getUserCallback();
  }, [getUserCallback]);

  const sendData = useCallback(() => {
    if (inputText) {
      const dataCopy = [...commentsData];
      const newCommentData = {
        id: user.id,
        topicId: Number(id),
        name: user.display_name ?? `${user.first_name} ${user.second_name}`,
        creationDate: new Date().toString(),
        likesCount: 0,
        comment: inputText,
      };
      if ('Notification' in window && Notification.permission === 'granted') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, max-len
        const notify = new Notification(
          `${currentTopicData?.name} - ${newCommentData.name}: ${newCommentData.comment}`
        );
      }

      dataCopy.push(newCommentData);
      setData(dataCopy);
      setInputText('');
    }
  }, [commentsData, inputText, id, user, currentTopicData]);

  return (
    <Layout className={cls.layout}>
      {currentTopicData && user && (
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
                <Button onClick={() => notifyUser()}>
                  <NotificationOutlined />
                </Button>
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
      )}
      {!currentTopicData && (
        <>
          <h1>404</h1>
          <h3>Not found topic/user</h3>
        </>
      )}
    </Layout>
  );
};
