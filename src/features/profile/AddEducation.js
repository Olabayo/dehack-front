import React from 'react';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";

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


let AddEducation = ({isLoading, profileOverview, currentUser, requestOverview, cancelOverviewRequest, receiveOverview}) => {

  const { register: register, handleSubmit: handleSubmit,  errors: errors } = useForm();

  function postAction(token, data){

    ProfileApi
        .postEducation(token, data)
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

  return(
      <>
      {/* Page Header Start */}
  <div className="page-header">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="inner-header">
            <h3>Create Education</h3>
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
                <label className="control-label">Institution</label>
                <input type="text" name="institution" ref={register({ required: true })} className="form-control" placeholder="learning institution" />
                {errors.institution && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Industry</label>
                <input type="text" className="form-control" name="industry" ref={register({ required: false })}  placeholder="Industry (e.g. technology, finance)"/>
                {errors.industry && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Program length</label>
                <input type="number" className="form-control" name="program_length" ref={register({ required: false })}  placeholder="program length in months"/>
                {errors.program_length && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Award</label>
                <input type="text" className="form-control" name="award" ref={register({ required: false })}  placeholder="Award (e.g. Bsc, Certificate of completion)"/>
                {errors.award && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Start date</label>
                <input type="text" className="form-control" name="date_from" ref={register({ required: false })}  placeholder="Start date (05/12/2008)"/>
                {errors.date_from && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">End date</label>
                <input type="text" className="form-control" name="date_to" ref={register({ required: false })}  placeholder="End  date (05/12/2010)"/>
                {errors.date_to && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Skills (comma seperated)</label>
                <input type="text" className="form-control" name="skills" ref={register({ required: false })}  placeholder="Skills (engineer, project manager, marketer)"/>
                {errors.skills && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Education Type</label>
                <select className="form-control" name="education_type_id" ref={register({ required: false })}>
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

AddEducation = connect(mapStateToProps, mapDispatch)(AddEducation)

export default AddEducation;
