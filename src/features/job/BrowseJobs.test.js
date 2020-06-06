import React from 'react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history'
import { act } from "react-dom/test-utils";
import { render, wait, fireEvent } from '@testing-library/react'
import { Router  } from "react-router-dom";
import store from '../../app/store';
import App from '../../App';
import SlimJob from './SlimJob';

require('jest-fetch-mock').enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
  // setup a DOM element as a render target
  //container = document.createElement("div");
  //document.body.appendChild(container);
  const fakeResponse = {
    count: 20,
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
        id: 1,
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
        id: 2,
        requirements: "At least one app on the play stay\nPassion for building software\nSelf starter",
        skills: "TDD, Kotlin, Java, Android Api",
        skills_array: [
          "TDD",
          " Kotlin",
          " Java",
          " Android Api"
        ],
        title: "Android Developer II B"
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
        id: 3,
        requirements: "At least one app on the play stay\nPassion for building software\nSelf starter",
        skills: "TDD, Kotlin, Java, Android Api",
        skills_array: [
          "TDD",
          " Kotlin",
          " Java",
          " Android Api"
        ],
        title: "Android Developer II C"
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
        id: 4,
        requirements: "At least one app on the play stay\nPassion for building software\nSelf starter",
        skills: "TDD, Kotlin, Java, Android Api",
        skills_array: [
          "TDD",
          " Kotlin",
          " Java",
          " Android Api"
        ],
        title: "Android Developer II D"
      }
    ],
    msg: "jobs result",
    next: null,
    page_count:  2,
    prev: null
  };

  const fakeResponseB = {
    count: 20,
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
        id: 7,
        requirements: "At least one app on the play stay\nPassion for building software\nSelf starter",
        skills: "TDD, Kotlin, Java, Android Api",
        skills_array: [
          "TDD",
          " Kotlin",
          " Java",
          " Android Api"
        ],
        title: "Android Developer II C"
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
        id: 8,
        requirements: "At least one app on the play stay\nPassion for building software\nSelf starter",
        skills: "TDD, Kotlin, Java, Android Api",
        skills_array: [
          "TDD",
          " Kotlin",
          " Java",
          " Android Api"
        ],
        title: "Android Developer II D"
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
        id: 9,
        requirements: "At least one app on the play stay\nPassion for building software\nSelf starter",
        skills: "TDD, Kotlin, Java, Android Api",
        skills_array: [
          "TDD",
          " Kotlin",
          " Java",
          " Android Api"
        ],
        title: "Android Developer II A"
      }
    ],
    msg: "jobs result",
    next: null,
    page_count:  2,
    prev: null
  };

  fetchMock.mockIf(/^http?:\/\/10.0.0.51?:5000.*$/, req => {
    if (req.url.includes('jobs?c=10&p=1')) {
      return Promise.resolve({ body: JSON.stringify(fakeResponse),  status: 200, statusText: 'OK' });
    } else if (req.url.includes('jobs?c=10&p=2')) {
      return Promise.resolve({ body: JSON.stringify(fakeResponseB),  status: 200, statusText: 'OK' })
    }else {
      return Promise.resolve({ body: 'Not Found',  status: 404 })
    }
  })
});

test('test browse jobs loads', async () => {
  const history = createMemoryHistory()
  const route = '/browse/jobs'
  history.push(route)
  await act(async () => {
  const { container, getByText, getByLabelText } = render(
    <Provider store={store}>
       <Router history={history}>
        <App />
      </Router>
    </Provider>
  );

 await wait(() => {
   expect(getByText('Browse Jobs')).toBeInTheDocument();
   expect(getByLabelText('Page 1 is your current page')).toBeInTheDocument();
   expect(getByLabelText('Page 2')).toBeInTheDocument();
   expect(container.querySelectorAll('.previous').length).toEqual(1);
   expect(container.querySelectorAll('.pagination').length).toEqual(1);
   expect(container.querySelectorAll('.job-details').length).toEqual(4);
 });
  //expect(getByText('Browse Jobs')).toBeInTheDocument();
  //expect(container.querySelectorAll('.job-details').length).toEqual(1);
});

});

test('test browse jobs loads page 2', async () => {
  const history = createMemoryHistory()
  const route = '/browse/jobs'
  history.push(route)
  await act(async () => {
  const { container, getByText, getByLabelText } = render(
    <Provider store={store}>
       <Router history={history}>
        <App />
      </Router>
    </Provider>
  );

 await wait(() => {
   /*
   expect(getByText('Browse Jobs')).toBeInTheDocument();
   expect(getByLabelText('Page 1 is your current page')).toBeInTheDocument();
   expect(getByLabelText('Page 2')).toBeInTheDocument();
   expect(container.querySelectorAll('.previous').length).toEqual(1);
   expect(container.querySelectorAll('.pagination').length).toEqual(1);
   expect(container.querySelectorAll('.job-details').length).toEqual(4);
   */
   fireEvent.click(getByLabelText('Page 2'));

 });
 await wait(() => {
    expect(container.querySelectorAll('.job-details').length).toEqual(5);
  });
  //expect(getByText('Browse Jobs')).toBeInTheDocument();
  //expect(container.querySelectorAll('.job-details').length).toEqual(1);
});

});
