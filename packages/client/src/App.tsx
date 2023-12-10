import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line
import axios, { AxiosRequestConfig } from 'axios';
import './app/styles/App.scss';
import { ToastContainer } from 'react-toastify';
import { AppRouter } from './app/providers/router/AppRouter';
// import { useAuth } from './app/providers/AuthProvider/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import { getUser } from './store/userSlice';

function App() {
  const __INIT__ = useRef(false);
  // const { checkIsAuth } = useAuth();

  useEffect(() => {
    // eslint-disable-next-line
    const baseUrl = `http://localhost:${__SERVER_PORT__}`;

    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}/api`;
      const response = await fetch(url);
      const data = await response.json();
      // eslint-disable-next-line no-console
      console.log(data);

      // Примеры запросов к api форума
      // Топик
      // Получение всех топиков
      // const config: AxiosRequestConfig = {
      //   url: `${baseUrl}/api/topic`,
      //   method: 'GET',
      // };
      // const result = await axios(config);
      //
      // // eslint-disable-next-line no-console
      // console.log(result.data);

      // Создание топика
      // const config: AxiosRequestConfig = {
      //   url: `${baseUrl}/api/topic`,
      //   method: 'POST',
      //   data: {title: 'Название1', description: 'Описание1', userName: 'userName1' },
      // };
      // const result = await axios(config);
      //
      // // eslint-disable-next-line no-console
      // console.log(result.data);

      // Комментарии
      // Создание комментария
      // const config: AxiosRequestConfig = {
      //   url: `${baseUrl}/api/comment`,
      //   method: 'POST',
      //   data: {text: 'Сообщение2', userName: 'userName2', topicId: 2 },
      // };
      // const result = await axios(config);
      // // eslint-disable-next-line no-console
      // console.log(result.data);

      // Получение всех комментариев топика
      // const config: AxiosRequestConfig = {
      //   url: `${baseUrl}/api/comment/2`,
      //   method: 'GET',
      // };
      // const result = await axios(config);
      // // eslint-disable-next-line no-console
      // console.log(result.data);

      // Подписка
      // Подписка на топик
      // const config: AxiosRequestConfig = {
      //   url: `${baseUrl}/api/subscription/1`,
      //   method: 'POST',
      //   data: {
      //     userId: 3,
      //   }
      // };
      // const result = await axios(config);
      // // eslint-disable-next-line no-console
      // console.log(result.data);

      // Получение id пользователей, подписавшихся на топик
      // const config: AxiosRequestConfig = {
      //   url: `${baseUrl}/api/subscription/2`,
      //   method: 'GET',
      // };
      // const result = await axios(config);
      // // eslint-disable-next-line no-console
      // console.log(result.data);

      // Ответ на комментарий
      // Добавить ответ на комментарий
      // const config: AxiosRequestConfig = {
      //   url: `${baseUrl}/api/reply/1`,
      //   method: 'POST',
      //   data: {
      //     text: 'Ответ на коммент',
      //     userName: 'user1',
      //     commentId: 1,
      //     parentReplyId: 3,
      //   }
      // };
      // const result = await axios(config);
      // // eslint-disable-next-line no-console
      // console.log(result.data);

      // Получить все ответы внутри комментария
      // const config: AxiosRequestConfig = {
      //   url: `${baseUrl}/api/reply/1?commentId=1`,
      //   method: 'GET',
      // };
      // const result = await axios(config);
      // // eslint-disable-next-line no-console
      // console.log(result.data);
    };

    fetchServerData();
  }, []);

  useEffect(() => {
    if (!__INIT__.current) {
      __INIT__.current = true;
      // checkIsAuth();
      getUser();
    }
  }, []);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        hideProgressBar={false}
        pauseOnFocusLoss={false}
        rtl={false}
        draggable
        pauseOnHover
        theme="colored"
      />
      <AppRouter />
    </div>
  );
}

export default App;
