// user.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { Provider } from 'react-redux';
import { act } from "react-dom/test-utils";
import store from '../../app/store';
import Auth from "./Auth";
import { BrowserRouter as Router, Route } from 'react-router-dom'
//import { shallow } from 'enzyme';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("update store with current user", async () => {
  const fakeResponse = {
     access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODk4MjAzMzEsImlhdC",
     first_name: "Firstname",
     company_id: "8df6d407-db68-48d1-be41-fbde68709d5e",
     last_name: "Lastname"

  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
   Promise.resolve({
     ok: true,
     statusText: "Ok",
     json: () => Promise.resolve(fakeResponse)
    })
  );
  // Use the asynchronous version of act to apply resolved promises
  act(() => {
    render(
      <Provider store={store}>
        <Router>
        <Auth />
        </Router>
      </Provider>, container);
  });
  const button = container.querySelector("#login-btn");

  await act(async () => {
    //document.getElementById("login-btn").click();
    //button.click();
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  //expect(container.textContent).toContain(fakeResponse.first_name);
  expect(container.textContent).toContain("Firstname");

  // remove the mock to ensure tests are completely isolated  global.fetch.mockRestore();});
  global.fetch.mockRestore();
});
