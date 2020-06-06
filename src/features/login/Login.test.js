import React from 'react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history'
import { act } from "react-dom/test-utils";
import { render, fireEvent } from '@testing-library/react'
import { Router  } from "react-router-dom";
import store from '../../app/store';
import App from '../../App';

require('jest-fetch-mock').enableMocks();

beforeEach(() => {
  fetchMock.resetMocks()
  // setup a DOM element as a render target
  //container = document.createElement("div");
  //document.body.appendChild(container);
  const fakeResponse = {
     access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODk4MjAzMzEsImlhdC",
     first_name: "Firstname",
     company_id: "8df6d407-db68-48d1-be41-fbde68709d5e",
     last_name: "Lastname"

  };

  fetchMock.mockIf(/^http?:\/\/10.0.0.51?:5000.*$/, req => {
    if (req.url.endsWith('/auth')) {
      return Promise.resolve({ body: JSON.stringify(fakeResponse),  status: 200, statusText: 'OK' })
    } else {
      return Promise.resolve({ body: 'Not Found',  status: 404 })
    }
  })
});

afterEach(() => {
  // cleanup on exiting
  //unmountComponentAtNode(container);
  //container.remove();
  //container = null;
});

test('test login action', async () => {
  const history = createMemoryHistory()
  const route = '/login'
  history.push(route)

  const { container, getByPlaceholderText, getByText } = render(
    <Provider store={store}>
       <Router history={history}>
        <App />
      </Router>
    </Provider>
   );

  //expect(container.innerHTML).toHaveTextContent('404 Not Found');
  expect(getByPlaceholderText('Password')).toBeInTheDocument();
  expect(getByPlaceholderText('Username')).toBeInTheDocument();

  await act(async () => {
        fireEvent.change(getByPlaceholderText("Password"), {
          target: { value: 'dehack' },
        });
        fireEvent.change(getByPlaceholderText("Username"), {
          target: { value: 'dehack222@yahoo.com' },
        });
        fireEvent.submit(container.querySelector('.login-form'));
  });

  //expect(container.querySelectorAll('input.form-control')[0].value).toEqual('dehack222@yahoo.com');
  expect(getByText(/job that fits your life/i)).toBeInTheDocument();

});
