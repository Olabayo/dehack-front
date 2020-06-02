import React from 'react';
import { unmountComponentAtNode } from "react-dom";
import { screen } from '@testing-library/dom'
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history'
import { act } from "react-dom/test-utils";
import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter, Router  } from "react-router-dom";
import store from '../../app/store';
import App from '../../App';

import fetchMock from 'jest-fetch-mock';



let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  //container = document.createElement("div");
  //document.body.appendChild(container);
  const fakeResponse = {
     access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODk4MjAzMzEsImlhdC",
     first_name: "Firstname",
     company_id: "8df6d407-db68-48d1-be41-fbde68709d5e",
     last_name: "Lastname"

  };
  fetchMock.mockIf(/^http?:\/\/10.0.0.51:5000.*$/, req => {
    if (req.url.endsWith('/auth')) {
      return {
        body: fakeResponse,
        headers: {
          'X-Some-Response-Header': 'Some header value'
        }
      }
    } else {
      return {
        status: 404,
        body: 'Not Found'
      }
    }
  })
});

afterEach(() => {
  // cleanup on exiting
  //unmountComponentAtNode(container);
  //container.remove();
  //container = null;
});

test('navigates home when you click the logo', () => {
  const { container } = render (
    <Provider store={store}>
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    </Provider>
  );
});

test('test login action', () => {
  const history = createMemoryHistory()
  const route = '/login'
  history.push(route)
    act(() => {
  const { container, getByPlaceholderText } = render(
    <Provider store={store}>
       <Router history={history}>
        <App />
      </Router>
    </Provider>
  );

  //expect(container.innerHTML).toHaveTextContent('404 Not Found');
  expect(getByPlaceholderText('Password')).toBeInTheDocument();
});



  //const button = container.querySelector(".log-btn");

  /*
  await act(async () => {
    //document.getElementById("login-btn").click();
    //button.click();
    const input = screen.getByPlaceholderText('Password')
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  */
});
