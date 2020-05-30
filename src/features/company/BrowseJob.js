import React from 'react';
import { Link } from 'react-router-dom';

import featuredImg4 from '../../assets/img/features/img4.png';

let BrowseJob = ({job}) => {

  return(
    <>
    <div className="job-featured">
      <div className="icon">
        <img src={featuredImg4} alt="" />
      </div>
      <div className="content">
        <h3><Link to={`/job/${job.id}`}>{ job.title }</Link></h3>
        <p className="brand">{ job.company.name }</p>
        <div className="tags">
          <span><i className="lni-map-marker"></i> New York</span>
          <span><i className="lni-user"></i>John Smith</span>
        </div>
        <span className="full-time">Full Time</span>
      </div>
    </div>
    </>
  );
}

export default BrowseJob
