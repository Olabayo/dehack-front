import {configSettings} from '../../config/config';

const _browseJob = configSettings.apiEndPoint + '/browse/jobs';
const _searchJobTitle = configSettings.apiEndPoint + '/search/jobs';

export default {

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

  browseJobsV2: (url) => {
    return new Promise( (resolve, reject) => {
      fetch(url, {
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

  searchJobTitles: (title, count = 10) => {
    return new Promise( (resolve, reject) => {
      fetch(_searchJobTitle + `?q=${title}&c=${count}`, {
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
