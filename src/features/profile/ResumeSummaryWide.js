import React from 'react';
import {Link} from 'react-router-dom';
import avatar from '../../assets/img/jobs/avatar-1.jpg'

let ResumeSummaryWide = ({ resume}) => {

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

  return(
    <>
    <div className="col-lg-12 col-md-6 col-xs-12">
      <div className="manager-resumes-item">
        <div className="manager-content">
          <a href="resume.html"><img className="resume-thumb" src={avatar} alt=""/></a>
          <div className="manager-info">
            <div className="manager-name">
              <h4><Link to={`/viewprofile/${resume.id}`}>{resume.user.first_name} {resume.user.last_name}</Link></h4>
              <h5>.Net developer</h5>
            </div>
            <div className="manager-meta">
              <span className="location"><i className="ti-location-pin"></i> { resume.street }, USA</span>
              <span className="rate"><i className="ti-time"></i> $55 per hour</span>
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
              <a href="!#" className="btn btn-common btn-xs">
                Rank: {ranking.rank} ({ranking.rank_text})
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ResumeSummaryWide;
