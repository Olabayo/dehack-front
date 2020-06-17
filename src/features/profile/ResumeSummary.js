import React from 'react';

import avatar from '../../assets/img/jobs/avatar-1.jpg'

let ResumeSummary = ({ resume}) => {

  return(
    <>
    <div className="col-lg-12 col-md-6 col-xs-12">
      <div className="manager-resumes-item">
        <div className="manager-content">
          <a href="resume.html"><img className="resume-thumb" src={avatar} alt=""/></a>
          <div className="manager-info">
            <div className="manager-name">
              <h4><a href="!#">{resume.user.first_name} {resume.user.last_name}</a></h4>
              <h5>.Net developer</h5>
            </div>
            <div className="manager-meta">
              <span className="location"><i className="ti-location-pin"></i> { resume.street }, USA</span>
              <span className="rate"><i className="ti-time"></i> $0 per hour</span>
            </div>
          </div>
        </div>
        <div className="item-body">
          <div className="content">
            <p>{ resume.cover_story }</p>
          </div>
          <div className="resume-skills">
            <div className="tag-list float-left">
              <span>HTML5</span>
              <span>CSS3</span>
              <span>Bootstrap</span>
              <span>Wordpress</span>
            </div>
            <div className="resume-exp float-right">
              <a href="!#" className="btn btn-common btn-xs">Exp. 4 Year</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ResumeSummary;
