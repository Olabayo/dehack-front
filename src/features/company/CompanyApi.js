import {configSettings} from '../../config/config';

const _company = configSettings.apiEndPoint + '/companies';
const _job = configSettings.apiEndPoint + '/jobs';
const _guestJob = configSettings.apiEndPoint + '/guestjobs';
const _browseJob = configSettings.apiEndPoint + '/browse/jobs';
const _jobApplication = configSettings.apiEndPoint + '/jobapplications';

export default {

  getCompany: (token, compId) => {
    return new Promise( (resolve, reject) => {
      fetch(_company + "/" + compId, {
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

  postJob: (token, params) => {
    return new Promise( (resolve, reject) => {
      fetch(_job, {
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

  putJob: (token, params, jobId) => {
    return new Promise( (resolve, reject) => {
      fetch(_job + "/" + jobId, {
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

  getJob: (token, jobId) => {
    return new Promise( (resolve, reject) => {
      fetch(_job + "/" + jobId, {
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

  getGuestJob: (jobId, token="") => {
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    if(token != ""){
      headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
      }
    }
    return new Promise( (resolve, reject) => {
      fetch(_guestJob + "/" + jobId, {
          method: 'get',
          headers: headers
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

  browseJobs: (page, count) => {
    return new Promise( (resolve, reject) => {
      fetch(_browseJob + `?c=${count}&p=${page}`, {
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

  getJobs: (token, page, count) => {
    return new Promise( (resolve, reject) => {
      fetch(_job + `?c=${count}&p=${page}`, {
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
  postApplication: (token, job_id) => {
    return new Promise( (resolve, reject) => {
      fetch(_jobApplication, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({job_id: job_id})
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
  getApplications: (token, page, count, job_id) => {
    return new Promise( (resolve, reject) => {
      fetch(_jobApplication + `?job_id=${job_id}&c=${count}&p=${page}`, {
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
}
