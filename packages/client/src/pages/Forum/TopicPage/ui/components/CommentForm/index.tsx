import type { ChangeEvent, FC } from 'react';
import { useCallback, useState } from 'react';
import { Flex, Button, Form, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { TCommentForm } from './types';

export const CommentForm: FC<TCommentForm> = props => {
  const { onSubmit } = props;
  const [inputText, setInputText] = useState('');

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

  const handleAddComment = () => {
    onSubmit(inputText);
    setInputText('');
  };

  const handleChange = useCallback((e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setInputText(element.value);
  }, []);

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Flex>
        <Input value={inputText} onChange={handleChange} />
        <Button onClick={handleAddComment}>
          <SendOutlined />
        </Button>
      </Flex>
    </Form>
  );
};
