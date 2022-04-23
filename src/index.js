// import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
// const myTheme = {
//   background: '',
//   violet: '',
//   shadow: '',
// };

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ThemeProvider theme={myTheme}> */}
    <App />
    {/* </ThemeProvider> */}
  </React.StrictMode>,
);
