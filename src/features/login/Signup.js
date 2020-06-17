import React from 'react';
import { connect } from 'react-redux';
import {
  useHistory
} from "react-router-dom";
import { useForm } from "react-hook-form";

import './login.css';

import {
  requestAuth,
  cancelRequestAuth
} from '../auth/authSlice';

import AccountApi from '../auth/AccountApi';

const mapDispatch = { requestAuth, cancelRequestAuth }

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    isLoading: state.auth.fetching
  }
}

let Signup  = ({isLoading, requestAuth, cancelRequestAuth}) =>{

  const { register, handleSubmit, errors } = useForm();

  let history = useHistory();

  function signupAction(data){
    AccountApi
        .userSignup(data)
          .then(response => response)
          .then(json => {
            console.log(json);
            cancelRequestAuth();
            history.push("/authstatus");
          })
          .catch(message => { });
    }

    function onSubmit(data){
        if(data.password === data.confirm_password){


          requestAuth();
          signupAction(data);
        }else{
          alert("Passwords do not match");
        }
    }

return(

   <>
   {/* Page Header Start */}
    <div className="page-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="inner-header">
              <h3>Get Ready To Be Discovered !</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
   {/* Page Header End */}

  {/* Content section Start */}
  { isLoading
     ?   <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
     :  <div class="not-lds-ring"><div></div><div></div><div></div><div></div></div>
  }
    <section id="content" className="section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6 col-xs-12">
            <div className="page-login-form box">
              <h3>
                Create Your account
              </h3>
              <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <div className="input-icon">
                    <i className="lni-user"></i>
                    <input type="text" className="form-control" name="first_name" ref={register({ required: true })} placeholder="Firstname"/>
                    {errors.first_name && <span>This field is required</span>}
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-icon">
                    <i className="lni-user"></i>
                    <input type="text" className="form-control" name="last_name" ref={register({ required: true })} placeholder="Lastname"/>
                    {errors.last_name && <span>This field is required</span>}
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-icon">
                    <i className="lni-envelope"></i>
                    <input type="text" className="form-control" name="email" ref={register({ required: true })} placeholder="Email Address"/>
                    {errors.email && <span>This field is required</span>}
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-icon">
                    <i className="lni-lock"></i>
                    <input type="password" className="form-control" name="password" ref={register({ required: true })} placeholder="Password"/>
                    {errors.password && <span>This field is required</span>}
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-icon">
                    <i className="lni-unlock"></i>
                    <input type="password" className="form-control" name="confirm_password" ref={register({ required: true })} placeholder="Retype Password"/>
                    {errors.confirm_password && <span>This field is required</span>}
                  </div>
                </div>
                <button className="btn btn-common log-btn mt-3">Register</button>
                <p className="text-center">Already have an account?<a href="/login"> Sign In</a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Content section End */}

    {/*Go To Top Link */}
    <a href="!#" className="back-to-top">
      <i className="lni-arrow-up"></i>
    </a>



    </>
  );
  }
  Signup = connect(mapStateToProps, mapDispatch)(Signup)
  export default Signup;
