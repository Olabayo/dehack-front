import React, { useState} from 'react';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";

import  { requestProfile, cancelProfileRequest } from './companySlice';

import CompanyApi from './CompanyApi';

import './company.css';

const mapDispatch = { requestProfile, cancelProfileRequest }

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    isLoading: state.company.fetching
  }
}

let AddJob = ({isLoading, requestProfile, cancelProfileRequest}) => {

  const [errorExists, setError] = useState(false);
  const [responseSucces, setSuccess] = useState(false);

  const { register: register, handleSubmit: handleSubmit,  reset: reset, errors: errors } = useForm();

  function postAction(token, data){

    CompanyApi
        .postJob(token, data)
          .then(response => response)
          .then(json => {
            console.log(json);
            cancelProfileRequest();
            setSuccess(true)
            reset()
          })
          .catch(message => {
              cancelProfileRequest();
              setError(true)
           });

    }

  function onSubmit(data){
    requestProfile();
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

  return(
      <>
      {/* Page Header Start */}
  <div className="page-header">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="inner-header">
            <h3>Create A Job</h3>
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
          { errorExists == true &&
            <div class="alert alert-danger">Error occured please try again</div>
          }
          { responseSucces == true &&
            <div class="alert alert-success">Your job was posted</div>
          }
            <form className="form-ad" onSubmit={handleSubmit(onSubmit)}>
              <h3>Details</h3>
              <div className="form-group">
                <label className="control-label"></label>
                <label className="control-label">Title</label>
                <input type="text" name="title" ref={register({ required: true })} className="form-control" placeholder="Job title" />
                {errors.title && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Description</label>
                <textarea className="form-control"name="description" ref={register({ required: true })} rows="7" placeholder="Job description"></textarea>
                {errors.description && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Requirements</label>
                <textarea className="form-control"name="requirements" ref={register({ required: true })} rows="7" placeholder="Job requirements"></textarea>
                {errors.requirements && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Skills (comma seperated)</label>
                <input type="text" className="form-control" name="skills" ref={register({ required: false })}  placeholder="Skills (engineer, project manager, marketer)"/>
                {errors.skills && <span>This field is required</span>}
              </div>
              <button disabled={isLoading} className="btn btn-common">Submit</button>
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

AddJob = connect(mapStateToProps, mapDispatch)(AddJob)

export default AddJob;
