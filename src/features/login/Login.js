import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
  useHistory
} from "react-router-dom";
import { useForm } from "react-hook-form";

import './login.css';

import {
  requestAuth,
  cancelRequestAuth,
  receiveAuth,
  clearAuth
} from '../auth/authSlice';

import AccountApi from '../auth/AccountApi';

const mapDispatch = { requestAuth,  cancelRequestAuth, receiveAuth, clearAuth}

//const mapStateToProps = state => ({ isLoading: state.auth.fetching })

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    isLoading: state.auth.fetching,
    currentUser: state.auth.currentUser
  }
}


let Login = ({ isLoading, currentUser, requestAuth, cancelRequestAuth, receiveAuth, clearAuth }) => {

  const [errorExists, setError] = useState(false);
  const { register, handleSubmit, errors} = useForm();
  const mountedRef = useRef(true);

  let history = useHistory();

  useEffect(() => {

    var userObj = localStorage.getItem('userObj', '');
    if(userObj !== null){
      //var userObjJson = JSON.parse(userObj);
      //if (!mountedRef.current) return null
      history.push("/")
    }
    return function cleanup() {
      mountedRef.current = false
    };
  });

  function loginAction(data){

    AccountApi
        .authLogin({username: data.email, password: data.password})
          .then(response => response)
          .then(json => {
            //if (!mountedRef.current) return null
            console.log(json);
            localStorage.setItem('userObj', JSON.stringify(json));
            receiveAuth(json)
            cancelRequestAuth();
            history.push("/");
          })
          .catch(message => {
            console.log(message);
            //if (!mountedRef.current) return null
              setError(true)
              cancelRequestAuth();
           });
    }

    function onSubmit(data){
        setError(false)
        requestAuth();
        loginAction(data);
    }


    return (
        <>
        {/* Page Header Start */}
    <div className="page-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="inner-header">
              <h3>Login</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Page Header End */}

    {/* Content section Start */}
    { isLoading
       ?   <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
       :  <div className="not-lds-ring"><div></div><div></div><div></div><div></div></div>
    }
    <section id="content" className="section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6 col-xs-12">
            <div className="page-login-form box">
            { errorExists === true &&
              <div className="alert alert-danger">Error occured please try again</div>
            }
              <h3>
                Login
              </h3>
              <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <div className="input-icon">
                    <i className="lni-user"></i>
                    <input type="text" id="sender-email" className="form-control" name="email" ref={register({ required: true })} placeholder="Username"/>
                    {errors.email && <span>This field is required</span>}
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-icon">
                    <i className="lni-lock"></i>
                    <input type="password" name="password" ref={register({ required: true })} className="form-control" placeholder="Password"/>
                    {errors.password && <span>This field is required</span>}
                  </div>
                </div>
                <div className="form-group form-check">
                  <input type="checkbox" className="form-check-input" id="Check"/>
                  <label className="form-check-label" htmlFor="Check">Keep Me Signed In</label>
                </div>
                <button className="btn btn-common log-btn">Submit</button>
              </form>
              <ul className="form-links">
                <li className="text-center"><a href="/signup">Don't have an account?</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Content section End */}
        </>
    );
}

Login = connect(mapStateToProps, mapDispatch)(Login)

export default Login
