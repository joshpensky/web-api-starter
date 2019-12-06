import React from 'react';
import { Provider } from 'store/lib';
import store from 'store';
import Router from 'router';
import { Page } from 'components';
import 'style/index.scss';

const App = () => (
  <Provider store={store}>
    <Router>{content => <Page>{content}</Page>}</Router>
  </Provider>
);

export default App;
