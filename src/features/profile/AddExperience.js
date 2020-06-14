import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { requestOverview, cancelOverviewRequest,
  receiveOverview } from './profileSlice';

import ProfileApi from './ProfileApi';

import './profile.css';

const mapDispatch = { requestOverview, cancelOverviewRequest, receiveOverview }

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    isLoading: state.profile.fetching,
    profileOverview: state.profile.profileOverview,
    currentUser: state.auth.currentUser
  }
}

let AddExperience = ({isLoading, profileOverview, currentUser, requestOverview, cancelOverviewRequest, receiveOverview}) => {

  const { register: register, handleSubmit: handleSubmit,  errors: errors } = useForm();
  const [postBtnText, setPostBtnText] = useState('Submit');

  function postAction(token, data){

    ProfileApi
        .postExperience(token, data)
          .then(response => response)
          .then(json => {
            console.log(json);
            cancelOverviewRequest();
            toast("Request successful");
            setPostBtnText("Submit");
          })
          .catch(message => {
              cancelOverviewRequest();
              toast("Request error");
              setPostBtnText("Submit");
           });
    }

  function onSubmit(data){
    requestOverview();
    var userObj = localStorage.getItem('userObj', '');
    if(userObj !== null ){
      var userObjJson = JSON.parse(userObj);
      console.log("Json User Obj", userObjJson);
      let token = "JWT " + userObjJson.access_token;
      setPostBtnText("Submitting please wait...");
      postAction(token, data);
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
            <h3>Create Experience</h3>
            <span>
              <Link to="/">Home</Link> /
            </span>
            <span>
              <Link to="/profile">Profile</Link> /
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Page Header End */}
  <ToastContainer position="bottom-left" />
  {/* Content section Start */}
  { isLoading
     ?   <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
     :  <div class="not-lds-ring"><div></div><div></div><div></div><div></div></div>
  }
  <section id="content">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-9 col-md-12 col-xs-12">
          <div className="add-resume box">
            <form className="form-ad" onSubmit={handleSubmit(onSubmit)}>
              <h3>Basic information</h3>
              <div className="form-group">
                <label className="control-label"></label>
                <label className="control-label">Company</label>
                <input type="text" name="company" ref={register({ required: true })} className="form-control" placeholder="Company you worked with" />
                {errors.company && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Role</label>
                <input type="text" className="form-control" name="role" ref={register({ required: false })}  placeholder="Role (e.g. Front-end developer)"/>
                {errors.role && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Description</label>
                <textarea className="form-control"name="description" ref={register({ required: true })} rows="7" placeholder="Job description"></textarea>
                {errors.description && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Skills (comma seperated)</label>
                <input type="text" className="form-control" name="skills" ref={register({ required: false })}  placeholder="Skills (engineer, project manager, marketer)"/>
                {errors.skills && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Experience Type</label>
                <select className="form-control" name="experience_type_id" ref={register({ required: false })}>
                  <option value="1">Traditional</option>
                  <option value="2">Freelance</option>
                  <option value="3">Hobby</option>
                </select>
              </div>
              <button className="btn btn-common">{ postBtnText }</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Content section End */}
      </>
  );
}

AddExperience = connect(mapStateToProps, mapDispatch)(AddExperience)

export default AddExperience;
