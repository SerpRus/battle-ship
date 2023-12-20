import { EnterOutlined, SendOutlined } from '@ant-design/icons';
import { Flex, Card, Divider, Button, Input, Form } from 'antd';
import React, {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { v4 as makeUUID } from 'uuid';
import { dateFormat } from '../../../widgets/forum/utils/date-formatter';

import { TComment, TReply } from '../../../pages/Forum/ForumItems/types';
import { ReplyStore } from '../../../pages/Forum/model/replyStore';

import cls from './CommentCard.module.scss';

type ColumnType = {
  commentList: Array<TComment>;
  children: ReactNode;
};

export const CommentCard: React.FC<ColumnType> = props => {
  const { commentList, children } = props;
  // eslint-disable-next-line no-console
  console.log(commentList);

  const [allReplyData, setReplyData] = useState<{ [index: string]: TReply[] }>(
    {} as { [index: string]: TReply[] }
  );
  const replyStoreEx = useMemo(() => new ReplyStore(), []);

  useEffect(() => {
    const fetchServerData = async () => {
      const allData: { [index: string]: TReply[] } = {} as {
        [index: string]: TReply[];
      };
      await commentList.forEach(async comment => {
        const [commentId, topicId] = [comment.id, comment.topic_id];
        await replyStoreEx
          .getAllReplyInComment({ topicId, commentId })
          .then(replysInComment => {
            allData[commentId] = replysInComment as TReply[];
          });
        await setReplyData(allData);
      });
    };

    fetchServerData();
  }, [commentList, replyStoreEx]);

  const [inputRepText, setInputRep] = useState('');
  const onChange = useCallback((e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setInputRep(element.value);
  }, []);

  const [isRep, setIsRep] = useState<number>(0);
  const addReply = useCallback(
    async (commentObj: TComment) => {
      const reqData = {
        text: inputRepText,
        userName: commentObj.user_name,
        topicId: commentObj.topic_id,
        commentId: commentObj.id,
        parentReplyId: null,
      };

      await replyStoreEx.addReplyToComment(reqData).then(async () => {
        const allData = { ...allReplyData };

        const replysInComment = await replyStoreEx.getAllReplyInComment({
          topicId: reqData.topicId,
          commentId: reqData.commentId,
        });

        allData[reqData.commentId] = replysInComment as TReply[];

        setReplyData(allData);
        setInputRep('');
        setIsRep(0);
      });
    },
    [inputRepText, replyStoreEx, allReplyData]
  );

  return (
    <Card className={cls.commentCard}>
      {commentList.map(comment => (
        <Flex vertical style={{ width: 700 }} key={comment.id}>
          <Flex justify="space-between">
            <Flex vertical justify="space-evenly">
              <div>{comment.user_name}</div>
              <div>{comment.text}</div>
              {dateFormat(new Date(comment.time_stamp * 1000))}
            </Flex>
            <Flex align="center">
              <div>id: {comment.id}</div>
              <Button onClick={() => setIsRep(comment.id)}>
                <EnterOutlined />
              </Button>
            </Flex>
          </Flex>
          {isRep === comment.id && (
            <Form autoComplete="off">
              <Flex>
                <Input value={inputRepText} onChange={onChange} />
                <Button onClick={() => addReply(comment)}>
                  <SendOutlined />
                </Button>
              </Flex>
            </Form>
          )}
          <Divider />
          {allReplyData[comment.id] &&
            allReplyData[comment.id].map(reply => (
              <Flex vertical style={{ width: 700 }} key={makeUUID()}>
                <Flex justify="space-between">
                  <Flex vertical justify="space-evenly">
                    <div>{reply.user_name}</div>
                    <div>{reply.text}</div>
                    {dateFormat(new Date(reply.time_stamp * 1000))}
                  </Flex>
                  <Flex align="center">
                    <div>reply to comment with id: {comment.id}</div>
                  </Flex>
                </Flex>
                <Divider />
              </Flex>
            ))}
        </Flex>
      ))}
      {children}
    </Card>
  );
};
