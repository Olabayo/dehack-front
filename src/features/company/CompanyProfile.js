import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import  { requestProfile, cancelProfileRequest,  receiveProfile, clearProfile } from './companySlice';
import Job from './Job';
import CompanyApi from './CompanyApi';

import resumeImage from '../../assets/img/resume/img-1.png';

const mapDispatch =  { requestProfile, cancelProfileRequest,  receiveProfile, clearProfile }

const mapStateToProps = (state/*, ownProps*/ ) =>{
  return {
    isLoading: state.company.fetching,
    companyProfileObj: state.company.companyProfile
  }

}

let CompanyProfile = ({ isLoading, companyProfileObj, requestProfile, cancelProfileRequest,  receiveProfile, clearProfile }) => {

    const [profileloaded, setLoaded] = useState(false);
    const [jobloaded, setJobLoaded] = useState(false);
    const [jobList, setJobList] = useState([]);

    let history = useHistory();

    function handleClick(event){
      event.preventDefault();
      history.goBack();
    }

    function getJobs(token){
      CompanyApi
          .getJobs(token, 1, 10)
            .then(response => response)
            .then(json => {
              console.log(json);
              setJobList(json.jobs)
            })
            .catch(message => { });
    }

    useEffect(() => {

      function getProfile(token, compId){
        CompanyApi
            .getCompany(token, compId)
              .then(response => response)
              .then(json => {
                console.log(json);
                receiveProfile(json.company)
              })
              .catch(message => { });
      }

      if(!profileloaded){
        let userObj = localStorage.getItem('userObj', '');
          if(userObj !== null ){
            let userObjJson = JSON.parse(userObj);
            console.log("Json User Obj", userObjJson);
            let token = "JWT " + userObjJson.access_token
            setLoaded(true)
            getProfile(token, userObjJson.company_id)
          }
      }
      if(!jobloaded){
        let userObj = localStorage.getItem('userObj', '');
          if(userObj !== null ){
            let userObjJson = JSON.parse(userObj);
            console.log("Json User Obj", userObjJson);
            let token = "JWT " + userObjJson.access_token
            setJobLoaded(true)
            getJobs(token)
          }
      }
    }, [profileloaded, jobloaded, receiveProfile]);

    return(
        <>
        {/* Page Header Start */}
    <div className="page-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="inner-header">
              <h3>Company profile</h3>
              <div>
              <span>
              <a href="!#" className="no-href" onClick={handleClick}>Back</a> /
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Page Header End */}

    {/* Start Content */}
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-xs-12">
            <div className="right-sideabr">
              <h4>Manage Account</h4>
              <ul className="list-item">
                <li><a className="active" href="/companyprofile">Profile</a></li>
                <li><a href="/">Logout</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-xs-12">
            <div className="inner-box my-resume">
              <div className="author-resume">
                <div className="thumb">
                  <img src={resumeImage} alt=""/>
                </div>
                <div className="author-info">
                  <h3>
                    { companyProfileObj.name }
                  </h3>
                  <p className="sub-title">Industry</p>
                  <p><span className="address"><i className="lni-map-marker"></i>Mahattan, NYC, USA</span> <span><i className="ti-phone"></i>(+01) 211-123-5678</span></p>
                  <div className="social-link">
                    <a href="!#" className="Twitter"><i className="lni-twitter-filled"></i></a>
                    <a href="!#" className="facebook"><i className="lni-facebook-filled"></i></a>
                    <a href="!#" className="google"><i className="lni-google-plus"></i></a>
                    <a href="!#" className="linkedin"><i className="lni-linkedin-fill"></i></a>
                  </div>
                </div>
              </div>
              <div className="about-me item">
                <h3>Profile</h3>
                <p>

                </p>
                <Link to="!#">Manage profile</Link>
              </div>
              <div className="work-experence item">
                <h3>Jobs</h3>
                { jobList.length > 0 &&
                      jobList.map((job, index) => (
                          <Job job={job} />
                    ))

                }
                  <Link className="btn btn-common" to="/addjob"> Add Job</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* End Content */}
        </>
    );
}

CompanyProfile = connect(mapStateToProps, mapDispatch)(CompanyProfile)
export default CompanyProfile;
