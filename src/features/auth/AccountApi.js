import {configSettings} from '../../config/config';

const _authUrl = configSettings.apiEndPoint + '/auth';
const _userSignupUrl = configSettings.apiEndPoint + '/users';
const _recruiterSignupUrl = configSettings.apiEndPoint + '/employers';

export default {

  authLogin: (credentials) => {
    return new Promise( (resolve, reject) => {
      fetch(_authUrl, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
        .then(function(response) {
          if (!response.ok) {
            reject(response.statusText);
          }
            return response;
          })
        .then(res => res.json())
        .then(
          (result) => {
            resolve(result)
          },
          (error) => {
            reject(error)
          }
        )
      })
  },

  userSignup: (params) => {
    return new Promise( (resolve, reject) => {
      fetch(_userSignupUrl, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(params)
        })
        .then(function(response) {
          if (!response.ok) {
            reject(response.statusText);
          }
            return response;
          })
        .then(res => res.json())
        .then(
          (result) => {
            resolve(result)
          },
          (error) => {
            reject(error)
          }
        )
      })
  },

  recruiterSignup: (params) => {
    return new Promise( (resolve, reject) => {
      fetch(_recruiterSignupUrl, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(params)
        })
        .then(function(response) {
          if (!response.ok) {
            reject(response.statusText);
          }
            return response;
          })
        .then(res => res.json())
        .then(
          (result) => {
            resolve(result)
          },
          (error) => {
            reject(error)
          }
        )
      })
  }
}
