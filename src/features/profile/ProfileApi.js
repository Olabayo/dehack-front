import {configSettings} from '../../config/config';

const _profileOverviewUrl = configSettings.apiEndPoint + '/profileoverview';
const _viewProfileOverviewUrl = configSettings.apiEndPoint + '/viewprofileoverview';
const _postProfile = configSettings.apiEndPoint + '/profiles';
const _postEducation = configSettings.apiEndPoint + '/education';
const _postExperience = configSettings.apiEndPoint + '/experiences';
const _getProfile = configSettings.apiEndPoint + '/profiles';
const _getExperience = configSettings.apiEndPoint + '/experiences';
const _getEducation = configSettings.apiEndPoint + '/education';
const _putExperience = configSettings.apiEndPoint + '/experiences';
const _putEducation = configSettings.apiEndPoint + '/education';
const _changePass = configSettings.apiEndPoint + '/changepassword';
const _browseResumes = configSettings.apiEndPoint + '/browse/resumes';
const _getCities = configSettings.apiEndPoint + '/cities';

export default {

  getOverview: (token) => {
    return new Promise( (resolve, reject) => {
      fetch(_profileOverviewUrl, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
          }
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

  viewOverview: (token, profile_id) => {
    return new Promise( (resolve, reject) => {
      fetch(_viewProfileOverviewUrl + `?profile_id=${profile_id}`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
          }
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

  postProfile: (token, params) => {
    return new Promise( (resolve, reject) => {
      fetch(_postProfile, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
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

  postEducation: (token, params) => {
    return new Promise( (resolve, reject) => {
      fetch(_postEducation, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
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

  postExperience: (token, params) => {
    return new Promise( (resolve, reject) => {
      fetch(_postExperience, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
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

  getExperience: (token, expId) => {
    return new Promise( (resolve, reject) => {
      fetch(_getExperience + "/" + expId, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
          }
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

  getEducation: (token, eduId) => {
    return new Promise( (resolve, reject) => {
      fetch(_getEducation + "/" + eduId, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
          }
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

  putExperience: (token, params, expId) => {
    return new Promise( (resolve, reject) => {
      fetch(_putExperience + "/" + expId, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
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

  changePassword: (token, params) => {
    return new Promise( (resolve, reject) => {
      fetch(_changePass, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
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

  getProfile: (token) => {
    return new Promise( (resolve, reject) => {
      fetch(_getProfile, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
          }
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

  putProfile: (token, params) => {
    return new Promise( (resolve, reject) => {
      fetch(_postProfile, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
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

  browseResumes: (token, page, count) => {
    return new Promise( (resolve, reject) => {
      fetch(_browseResumes + `?c=${count}&p=${page}`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
          }
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

  getCities: (state_id) => {
    return new Promise( (resolve, reject) => {
      fetch(_getCities + `?state_id=${state_id}`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
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
}
