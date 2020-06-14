import React,  { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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


let EditEducation = ({isLoading, profileOverview, currentUser, requestOverview, cancelOverviewRequest}) => {

  const { register: register, handleSubmit: handleSubmit,  errors: errors } = useForm();

  const [educationloaded, setLoaded] = useState(false);
  const [educationResult, setResultLoaded] = useState({});
  const [editBtnText, setEditBtnText] = useState('Submit');

  let { id } = useParams();

  function postAction(token, data){

    ProfileApi
        .putEducation(token, data, id)
          .then(response => response)
          .then(json => {
            console.log(json);
            cancelOverviewRequest();
            toast("Request successful");
            setEditBtnText("Submit");
          })
          .catch(message => {
              cancelOverviewRequest();
              toast("Request error");
              setEditBtnText("Submit");
           });
    }

  function onSubmit(data){
    requestOverview();
    var userObj = localStorage.getItem('userObj', '');
    if(userObj !== null ){
      var userObjJson = JSON.parse(userObj);
      console.log("Json User Obj", userObjJson);
      let token = "JWT " + userObjJson.access_token
      setEditBtnText("Submitting please wait...");
      postAction(token, data);
    }
  }

  function getEducation(token, id){
    ProfileApi
        .getEducation(token, id)
          .then(response => response)
          .then(json => {
            console.log(json);
            setResultLoaded(json.education)
          })
          .catch(message => { });
  }

  useEffect(() => {

    if(!educationloaded){
      var userObj = localStorage.getItem('userObj', '');
        if(userObj !== null ){
          var userObjJson = JSON.parse(userObj);
          console.log("Json User Obj", userObjJson);
          let token = "JWT " + userObjJson.access_token
          setLoaded(true)
          getEducation(token, id)
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
            <h3>Edit Education</h3>
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
                <label className="control-label">Institution</label>
                <input type="text" name="institution" defaultValue={educationResult.institution} ref={register({ required: true })} className="form-control" placeholder="learning institution" />
                {errors.institution && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Industry</label>
                <input type="text" className="form-control" name="industry" defaultValue={educationResult.industry} ref={register({ required: false })}  placeholder="Industry (e.g. technology, finance)"/>
                {errors.industry && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Program length</label>
                <input type="number" className="form-control" name="program_length" defaultValue={educationResult.program_length} ref={register({ required: false })}  placeholder="program length in months"/>
                {errors.program_length && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Award</label>
                <input type="text" className="form-control" name="award" defaultValue={educationResult.award} ref={register({ required: false })}  placeholder="Award (e.g. Bsc, Certificate of completion)"/>
                {errors.award && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Start date</label>
                <input type="text" className="form-control" name="date_from" defaultValue={educationResult.date_from} ref={register({ required: false })}  placeholder="Start date (05/12/2008)"/>
                {errors.date_from && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">End date</label>
                <input type="text" className="form-control" name="date_to" defaultValue={educationResult.date_to} ref={register({ required: false })}  placeholder="End  date (05/12/2010)"/>
                {errors.date_to && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Skills (comma seperated)</label>
                <input type="text" className="form-control" name="skills" defaultValue={educationResult.skills} ref={register({ required: false })}  placeholder="Skills (engineer, project manager, marketer)"/>
                {errors.skills && <span>This field is required</span>}
              </div>
              <div className="form-group">
                <label className="control-label">Education Type</label>
                <select className="form-control" name="education_type_id" defaultValue={educationResult.education_type_id} ref={register({ required: false })}>
                  <option value="1">Traditional</option>
                  <option value="2">Freelance</option>
                  <option value="3">Hobby</option>
                </select>
              </div>
              <button className="btn btn-common">{editBtnText}</button>
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

EditEducation = connect(mapStateToProps, mapDispatch)(EditEducation)

export default EditEducation;
