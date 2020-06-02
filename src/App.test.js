import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';

import { BrowserRouter as Router, Route } from 'react-router-dom'

test('renders home link', () => {
  const { getByText } = render(
    <Provider store={store}>
     <Router>
        <App />
      </Router>
    </Provider>
  );

  expect(getByText(/home/i)).toBeInTheDocument();
});
