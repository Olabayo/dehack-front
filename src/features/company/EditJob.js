import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';

import  { requestProfile, cancelProfileRequest } from './companySlice';

import CompanyApi from './CompanyApi';

import './company.css';

const mapDispatch = { requestProfile, cancelProfileRequest }

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    isLoading: state.company.fetching
  }
}

let EditJob = ({isLoading, requestProfile, cancelProfileRequest}) => {

  const [errorExists, setError] = useState(false);
  const [responseSucces, setSuccess] = useState(false);
  const [jobloaded, setLoaded] = useState(false);
  const [jobResult, setResultLoaded] = useState({});

  let { id } = useParams();

  const { register: register, handleSubmit: handleSubmit,  reset: reset, errors: errors } = useForm();

  function postAction(token, data){

    CompanyApi
        .putJob(token, data, id)
          .then(response => response)
          .then(json => {
            console.log(json);
            cancelProfileRequest();
            setSuccess(true)
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

  function getJob(token, id){
    CompanyApi
        .getJob(token, id)
          .then(response => response)
          .then(json => {
            console.log(json);
            setResultLoaded(json.job)
          })
          .catch(message => { });
  }

  useEffect(() => {

    if(!jobloaded){
      var userObj = localStorage.getItem('userObj', '');
        if(userObj !== null ){
          var userObjJson = JSON.parse(userObj);
          console.log("Json User Obj", userObjJson);
          let token = "JWT " + userObjJson.access_token
          setLoaded(true)
          getJob(token, id)
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
                <input type="text" name="title" defaultValue={jobResult.title} ref={register({ required: true })} className="form-control" placeholder="Job title" />
                {errors.title && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Description</label>
                <textarea className="form-control"name="description" defaultValue={jobResult.description} ref={register({ required: true })} rows="7" placeholder="Job description"></textarea>
                {errors.description && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Requirements</label>
                <textarea className="form-control"name="requirements" defaultValue={jobResult.requirements} ref={register({ required: true })} rows="7" placeholder="Job requirements"></textarea>
                {errors.requirements && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Skills (comma seperated)</label>
                <input type="text" className="form-control" name="skills" defaultValue={jobResult.skills} ref={register({ required: false })}  placeholder="Skills (engineer, project manager, marketer)"/>
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

EditJob = connect(mapStateToProps, mapDispatch)(EditJob)

export default EditJob;
