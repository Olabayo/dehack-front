import React from 'react';
import { render, wait, screen, cleanup, act, waitForElement } from '@testing-library/react';
import { Provider } from 'react-redux';
//import { act } from "react-dom/test-utils";
import store from '../../app/store';
import App from '../../App';

import { BrowserRouter as Router, Route } from 'react-router-dom';

require('jest-fetch-mock').enableMocks();
//jest.setTimeout(10000);
const fakeResponse = {
  count: 1,
  jobs: [
    {
      company: {
        email: "coolcompany@email.com",
        id: "8df6d407-db68-48d1-be41-fbde68709d5e",
        name: "Cool Company",
        phone: "8574563456",
        user_id: "2da6144e-2f13-47a8-892a-105c5e008031"
      },
      company_id: "8df6d407-db68-48d1-be41-fbde68709d5e",
      created_at: "2020-05-29 13:11",
      description: "You will be responsible for adding new features to our native android eCommerce application.",
      id: 5,
      requirements: "At least one app on the play stay\nPassion for building software\nSelf starter",
      skills: "TDD, Kotlin, Java, Android Api",
      skills_array: [
        "TDD",
        " Kotlin",
        " Java",
        " Android Api"
      ],
      title: "Android Developer II A"
    },
    {
      company: {
        email: "coolcompany@email.com",
        id: "8df6d407-db68-48d1-be41-fbde68709d5e",
        name: "Cool Company",
        phone: "8574563456",
        user_id: "2da6144e-2f13-47a8-892a-105c5e008031"
      },
      company_id: "8df6d407-db68-48d1-be41-fbde68709d5e",
      created_at: "2020-05-29 13:11",
      description: "You will be responsible for adding new features to our native android eCommerce application.",
      id: 6,
      requirements: "At least one app on the play stay\nPassion for building software\nSelf starter",
      skills: "TDD, Kotlin, Java, Android Api",
      skills_array: [
        "TDD",
        " Kotlin",
        " Java",
        " Android Api"
      ],
      title: "Android Developer II B"
    }
  ],
  msg: "jobs result",
  next: null,
  page_count:  1,
  prev: null
};

const fakeResponseEmpty = {
  count: 0,
  jobs: [],
  msg: "jobs result",
  next: null,
  page_count: 0,
  prev: null
};

beforeEach(() => {
  fetchMock.resetMocks();
});

afterEach(cleanup)

test('renders browse all jobs button', async (done) => {
  /*
  fetchMock.mockIf(/^http?:\/\/10.0.0.51?:5000.*$/, req => {
    if (req.url.includes('jobs?c=10&p=1')) {
      return Promise.resolve({ body: JSON.stringify(fakeResponse),  status: 200, statusText: 'OK' });
    } else {
      return Promise.resolve({ body: 'Not Found',  status: 404 })
    }
  });
  */
    fetch.mockResponseOnce(
      () =>
        Promise.resolve({ body: JSON.stringify(fakeResponse),  status: 200, statusText: 'OK' })
    )

    const {getByText} = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
        </Provider>
      );
      //await wait(() => expect(getByText(/browse all jobs/i)).toBeInTheDocument());
      //expect(getByText(/browse all jobs/i)).toBeInTheDocument();
    await waitForElement(() => screen.getByText(/browse all jobs/i));
    expect(screen.getByText(/browse all jobs/i)).toBeInTheDocument();
    done();
});


test('renders hide browse all jobs button', async (done) => {
  /*
  fetchMock.mockIf(/^http?:\/\/10.0.0.51?:5000.*$/, req => {
    if (req.url.includes('jobs?c=10&p=1')) {
      return Promise.resolve({ body: JSON.stringify(fakeResponseEmpty),  status: 200, statusText: 'OK' });
    } else {
      return Promise.resolve({ body: 'Not Found',  status: 404 })
    }
  });
  */
  fetch.mockResponseOnce(
    () =>
      Promise.resolve({ body: JSON.stringify(fakeResponseEmpty),  status: 200, statusText: 'OK' })
   )

    const {container} = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>);

    await waitForElement(() => screen.getByText(/No open jobs/i));
    expect(screen.getByText(/No open jobs/i)).toBeInTheDocument();
    done();
});
