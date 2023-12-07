import React, { useEffect, useRef } from 'react';
import './app/styles/App.scss';
import { ToastContainer } from 'react-toastify';
import { AppRouter } from './app/providers/router/AppRouter';
// import { useAuth } from './app/providers/AuthProvider/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import { getUser } from './store/userSlice';
import { ThemeProvider } from './shared/ui/Theme';

function App() {
  const __INIT__ = useRef(false);

  // const { checkIsAuth } = useAuth();

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}/api`;
      const response = await fetch(url);
      const data = await response.json();
      // eslint-disable-next-line no-console
      console.log(data);
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
      <ThemeProvider>
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
      </ThemeProvider>
    </div>
  );
}

export default App;
