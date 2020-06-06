import React from 'react';
import { useDispatch, connect } from 'react-redux';

import {
  requestAuth,
  cancelRequestAuth,
  receiveAuth,
  clearAuth,
} from './authSlice';
import styles from './Auth.module.css';
import AccountApi from './AccountApi';

const mapDispatch = { requestAuth,  cancelRequestAuth, receiveAuth, clearAuth}

//const mapStateToProps = state => ({ isLoading: state.auth.fetching })

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    isLoading: state.auth.fetching,
    currentUser: state.auth.currentUser
  }
}

let Auth = ({ isLoading, currentUser, requestAuth, cancelRequestAuth, receiveAuth, clearAuth }) => {
  //const isLoading = useSelector(selectState);
  //const dispatch = useDispatch();

  function loginAction(){

    AccountApi
        .authLogin({username: 'dehack2@yahoo.com', password: 'dehack'})
          .then(response => response)
          .then(json => {
            receiveAuth(json)
            cancelRequestAuth();
          })
          .catch(message => { });
  }

  function logoutAction(){
    localStorage.removeItem('userObj');
    clearAuth();
  }

  return (
    <div>
      <div className={styles.row}>
        <span className={styles.value}>
          { currentUser
            ? <span>Welcome { currentUser.first_name }</span>
            :  <span>Guest</span>
          }
        </span>
      </div>
      <div className={styles.row}>
        { isLoading
           ? <span>Loading</span>
           :  <span>Not Loading</span>
        }
      </div>
      <div className={styles.row}>
      { JSON.stringify(currentUser) === '{}'
          ? <button id="login-btn"
          className={styles.button}
          aria-label="Start request"
          onClick={() => {
              requestAuth();
              loginAction();
          }
          }
        >
          Login
        </button>


        : <button
          className={styles.button}
          aria-label="Stop request"
          onClick={() => {
              logoutAction();
            }
          }
        >
          Logout
        </button>
      }
      </div>
    </div>
  );
}

Auth = connect(mapStateToProps, mapDispatch)(Auth)

export default Auth
