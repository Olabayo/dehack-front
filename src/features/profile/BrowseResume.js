import React, {useState, useEffect } from 'react';

import ProfileApi from './ProfileApi';

import ResumeSummary from './ResumeSummary';

import avatar from '../../assets/img/jobs/avatar-1.jpg'

let BrowseResume = () =>{

  const [resumelistloaded, setResumelistLoaded] = useState(false);
  const [resumeList, setResumeList] = useState([]);

  function browseResumes(token){
    ProfileApi
        .browseResumes(token, 1, 10)
          .then(response => response)
          .then(json => {
            console.log(json);
            setResumeList(json.resumes)
          })
          .catch(message => { });
  }

  useEffect(() => {

    if(!resumelistloaded){
      var userObj = localStorage.getItem('userObj', '');
        if(userObj !== null ){
          var userObjJson = JSON.parse(userObj);
          console.log("Json User Obj", userObjJson);
          let token = "JWT " + userObjJson.access_token
          setResumelistLoaded(true)
          browseResumes(token)
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
              <h3>Browse Resumes</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Page Header End */}

    {/* Start Content */}
    <div id="content">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-6 col-xs-12">
            <div className="manager-resumes-item">
              <div className="manager-content">
                <a href="resume.html"><img className="resume-thumb" src={avatar} alt=""/></a>
                <div className="manager-info">
                  <div className="manager-name">
                    <h4><a href="#">Zane Joyner</a></h4>
                    <h5>Front-end developer</h5>
                  </div>
                  <div className="manager-meta">
                    <span className="location"><i className="ti-location-pin"></i> Cupertino, CA, USA</span>
                    <span className="rate"><i className="ti-time"></i> $55 per hour</span>
                  </div>
                </div>
              </div>
              <div className="item-body">
                <div className="content">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, qui aspernatur acs ipsam.</p>
                </div>
                <div className="resume-skills">
                  <div className="tag-list float-left">
                    <span>HTML5</span>
                    <span>CSS3</span>
                    <span>Bootstrap</span>
                    <span>Wordpress</span>
                  </div>
                  <div className="resume-exp float-right">
                    <a href="#" className="btn btn-common btn-xs">Exp. 4 Year</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
            { resumeList.length > 0 &&
              resumeList.map((resume, index) => (
                    <ResumeSummary resume={resume} />
                ))
            }
        </div>
      </div>
    </div>
    {/* End Content */}
    </>
  );
}

export default BrowseResume;
