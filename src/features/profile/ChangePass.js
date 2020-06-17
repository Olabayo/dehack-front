import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

import { requestChangePass, cancelChangePassRequest} from './profileSlice';
import ProfileApi from './ProfileApi';

import './profile.css';

const mapDispatch = { requestChangePass, cancelChangePassRequest }

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    isLoading: state.profile.fetching
  }
}


let ChangePass = ({ isLoading, requestChangePass, cancelChangePassRequest }) => {

  const [errorExists, setError] = useState(false);
  const [responseSucces, setSuccess] = useState(false);

  const { register, handleSubmit,  reset, errors } = useForm();

  function postAction(token, data){

    ProfileApi
        .changePassword(token, data)
          .then(response => response)
          .then(json => {
            console.log(json);
            cancelChangePassRequest();
            setSuccess(true)
            reset()
          })
          .catch(message => {
              setError(true)
              cancelChangePassRequest();
           });
    }

  function onSubmit(data){
    requestChangePass();
    setError(false);
    setSuccess(false)
    var userObj = localStorage.getItem('userObj', '');
    if(userObj !== null ){
      var userObjJson = JSON.parse(userObj);
      console.log("Json User Obj", userObjJson);
      let token = "JWT " + userObjJson.access_token
      postAction(token, data);
    }
  }

  return (
    <>
      {/* Page Header Start */}
      <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-header">
                <h3>Change Password</h3>
                <span>
                  <Link to="/profile">Profile</Link> /
                </span>
                <span>
                  <Link to="/companyprofile">Company profile</Link> /
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Start Content */}
      { isLoading
         ?   <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
         :  <div class="not-lds-ring"><div></div><div></div><div></div><div></div></div>
      }
      <div id="content">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-4 col-xs-12">
              <div className="right-sideabr">
                <h4>Manage Account</h4>
                <ul className="list-item">
                  <li><a href="/profile">My Resume</a></li>
                  <li><a href="/notifications">Notifications </a></li>
                  <li><a className="active" href="/changePass">Change Password</a></li>
                  <li><a href="/">Logout</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-8 col-sm-8 col-xs-12">
              <div className="job-alerts-item">
                { errorExists === true &&
                  <div class="alert alert-danger">Error occured please try again</div>
                }
                { responseSucces === true &&
                  <div class="alert alert-success">Your password was changed</div>
                }
                <h3 className="alerts-title">Change Password</h3>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>

                  <div className="form-group is-empty">
                    <label className="control-label">Old Password*</label>
                    <input className="form-control" name="current_password" autoComplete="new-password" ref={register({ required: true })} type="password" />
                      {errors.current_password && <span>This field is required</span>}
                    <span className="material-input"></span>
                  </div>
                  <div className="form-group is-empty">
                    <label className="control-label">New Password*</label>
                    <input className="form-control" name="password" autoComplete="new-password" ref={register({ required: true })} type="password" />
                      {errors.password && <span>This field is required</span>}
                    <span className="material-input"></span>
                  </div>
                  <button className="btn btn-common">Save Change</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Content */}
    </>
  );
}

ChangePass = connect(mapStateToProps, mapDispatch)(ChangePass);

export default ChangePass;
