import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';

import { requestOverview, cancelOverviewRequest } from './profileSlice';

import ProfileApi from './ProfileApi';

import './profile.css';

const mapDispatch = { requestOverview, cancelOverviewRequest }

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    isLoading: state.profile.fetching,
    profileOverview: state.profile.profileOverview,
    currentUser: state.auth.currentUser
  }
}

let EditExperience = ({isLoading, profileOverview, currentUser, requestOverview, cancelOverviewRequest}) => {

  const { register: register, handleSubmit: handleSubmit,  errors: errors } = useForm();

  const [experienceloaded, setLoaded] = useState(false);
    const [experienceResult, setResultLoaded] = useState({});

    let { id } = useParams();

  function postAction(token, data){

    ProfileApi
        .putExperience(token, data, id)
          .then(response => response)
          .then(json => {
            console.log(json);
            cancelOverviewRequest();
          })
          .catch(message => {
              cancelOverviewRequest();
           });
    }

  function onSubmit(data){
    requestOverview();
    var userObj = localStorage.getItem('userObj', '');
    if(userObj !== null ){
      var userObjJson = JSON.parse(userObj);
      console.log("Json User Obj", userObjJson);
      let token = "JWT " + userObjJson.access_token
      postAction(token, data);
    }
  }

  function getExperience(token, id){
    ProfileApi
        .getExperience(token, id)
          .then(response => response)
          .then(json => {
            console.log(json);
            setResultLoaded(json.experience)
          })
          .catch(message => { });
  }

  useEffect(() => {

    if(!experienceloaded){
      var userObj = localStorage.getItem('userObj', '');
        if(userObj !== null ){
          var userObjJson = JSON.parse(userObj);
          console.log("Json User Obj", userObjJson);
          let token = "JWT " + userObjJson.access_token
          setLoaded(true)
          getExperience(token, id)
        }
    }
  });

  return(
      <>
      {/* Page Header Start */}
  <div className="page-header">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="inner-header">
            <h3>Edit Experience</h3>
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
                <input type="text" name="company" defaultValue={experienceResult.company} ref={register({ required: true })} className="form-control" placeholder="Company you worked with" />
                {errors.company && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Role</label>
                <input type="text" className="form-control" name="role" defaultValue={experienceResult.role} ref={register({ required: false })}  placeholder="Role (e.g. Front-end developer)"/>
                {errors.role && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Description</label>
                <textarea className="form-control"name="description" defaultValue={ experienceResult.description } ref={register({ required: true })} rows="7" placeholder="Job description"></textarea>
                {errors.description && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Skills (comma seperated)</label>
                <input type="text" className="form-control" name="skills" defaultValue={experienceResult.skills} ref={register({ required: false })}  placeholder="Skills (engineer, project manager, marketer)"/>
                {errors.skills && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Experience Type</label>
                <select className="form-control" name="experience_type_id" defaultValue={experienceResult.experience_type_id} ref={register({ required: false })}>
                  <option value="1">Traditional</option>
                  <option value="2">Freelance</option>
                  <option value="3">Hobby</option>
                </select>
              </div>
              <button className="btn btn-common">Submit</button>
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

EditExperience = connect(mapStateToProps, mapDispatch)(EditExperience)

export default EditExperience;
