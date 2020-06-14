import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Experience from './Experience';
import Education from'./Education';

import { requestOverview, cancelOverviewRequest,
  receiveOverview } from './profileSlice';

import ProfileApi from './ProfileApi';

import resumeImage from '../../assets/img/resume/img-1.png';

const mapDispatch = { requestOverview, cancelOverviewRequest, receiveOverview }

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    isLoading: state.profile.fetching,
    profileOverview: state.profile.profileOverview,
    currentUser: state.auth.currentUser
  }
}

let Profile = ({isLoading, profileOverview, currentUser, requestOverview, cancelOverviewRequest, receiveOverview}) => {

  function genSkill(){
    var min=1;
    var max=10;
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    var rank_text = "Highly skilled";
    if(random >= 8){
      rank_text = "Highly skilled";
    }else if (random === 7) {
      rank_text = "Moderately skilled";
    }else if (random >= 5 && random < 7) {
      rank_text = "Averagly skilled";
    }else{
      rank_text = "Below Averagly skilled";
    }
    return {"rank": random, "rank_text": rank_text};
  }

  const ranking = genSkill();

  const [profileloaded, setLoaded] = useState(false);

  function getOverview(token){
    ProfileApi
        .getOverview(token)
          .then(response => response)
          .then(json => {
            console.log(json);
            receiveOverview(json.overview)
          })
          .catch(message => { });
  }

  useEffect(() => {

    if(!profileloaded){
      var userObj = localStorage.getItem('userObj', '');
        if(userObj !== null ){
          var userObjJson = JSON.parse(userObj);
          console.log("Json User Obj", userObjJson);
          let token = "JWT " + userObjJson.access_token
          setLoaded(true)
          getOverview(token)
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
              <h3>Resume</h3>
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
                <li><a className="active" href="/profile">Profile</a></li>
                <li><a href="/notifications">Notifications </a></li>
                <li><a href="/changePass">Change Password</a></li>
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
                    { JSON.stringify(currentUser) !== '{}' &&
                    <>
                      {currentUser["first_name"]}  {currentUser["last_name"]}
                    </>
                    }
                  </h3>
                  { JSON.stringify(profileOverview) !== '{}' && JSON.stringify(profileOverview.profile) !== '{}'
                  ? <>
                  <p className="sub-title">UI/UX Designer</p>
                  <p><span className="address"><i className="lni-map-marker"></i>Mahattan, NYC, USA</span> <span><i className="ti-phone"></i>(+01) 211-123-5678</span></p>
                  <div className="social-link">
                    <a href="#" className="Twitter"><i className="lni-twitter-filled"></i></a>
                    <a href="#" className="facebook"><i className="lni-facebook-filled"></i></a>
                    <a href="#" className="google"><i className="lni-google-plus"></i></a>
                    <a href="#" className="linkedin"><i className="lni-linkedin-fill"></i></a>
                  </div>
                  </>
                  :
                  <>
                  <p className="sub-title">Your title goes here</p>
                  <p><span className="address"><i className="lni-map-marker"></i> Your address goes here</span></p>

                  </>
                 }
                </div>
                <div className="resume-exp float-right">
                  <a href="#" className="btn btn-common btn-xs">
                    Rank: {ranking.rank} ({ranking.rank_text})
                  </a>
                </div>
              </div>
              <div className="about-me item">
                <h3>About Me</h3>
                <p>
                  { JSON.stringify(profileOverview) !== '{}' && JSON.stringify(profileOverview.profile) !== '{}'
                  ? <>{profileOverview.profile.cover_story}</>
                  :<>Pending</>
                  }
                </p>
                <Link to="/manageprofile">Manage Info</Link>
              </div>
              <div className="work-experence item">
                <h3>Work Experience</h3>
                  { JSON.stringify(profileOverview) !== '{}' && JSON.stringify(profileOverview.experience.length) > 0 &&


                        profileOverview.experience.map((experience, index) => (
                            <Experience experience={experience} />
                      ))

                  }
                  <Link className="btn btn-common" to="/addexperience"> Add Experience</Link>
              </div>
              <div className="education item">
                <h3>Education</h3>
                { JSON.stringify(profileOverview) !== '{}' && JSON.stringify(profileOverview.education.length) > 0 &&
                    profileOverview.education.map((education, index) => (
                        <Education education={education} />
                    ))
                }
                <Link className="btn btn-common" to="/addeducation"> Add Education</Link>
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
Profile = connect(mapStateToProps, mapDispatch)(Profile)
export default Profile;
