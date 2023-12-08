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
  // eslint-disable-next-line
  const baseUrl = `http://localhost:${__SERVER_PORT__}`;
  // const { checkIsAuth } = useAuth();

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}/api`;
      const response = await fetch(url);
      const data = await response.json();
      // eslint-disable-next-line no-console
      console.log(data);

      // Примеры запросов к api форума
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
      //   data: {title: 'НОВЫЙ!', description: 'Описание200', userName: 'userName200' },
      // };
      // const result = await axios(config);
      //
      // // eslint-disable-next-line no-console
      // console.log(result.data);

      // Комментарии
      // const config: AxiosRequestConfig = {
      //   url: `${baseUrl}/api/topic`,
      //   method: 'POST',
      //   data: {title: 'Название200', description: 'Описание200', userName: 'userName200' },
      // };
      // const result = await axios(config);
      //
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
