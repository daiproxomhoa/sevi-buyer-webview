import { MuiThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import smoothscroll from 'smoothscroll-polyfill';
import App from './App';
import { MUI_THEME } from './configs/setupTheme';
import './index.css';
import ConnectedIntlProvider from './modules/intl/component/ConnectedIntlProvider';
import { setLocale } from './modules/intl/redux/intlReducer';
import configureStore, { history } from './redux/configureStore';
import reportWebVitals from './reportWebVitals';
import './scss/stylesheet.scss';

smoothscroll.polyfill();

const { store, persistor } = configureStore({});

store.dispatch(setLocale('vi'));

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <ConnectedIntlProvider>
          <MuiThemeProvider theme={MUI_THEME}>
            <SnackbarProvider maxSnack={1}>
              <App />
            </SnackbarProvider>
          </MuiThemeProvider>
        </ConnectedIntlProvider>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
