import React from 'react';
import { Link } from 'react-router-dom';

import featuredImg4 from '../../assets/img/features/img4.png';

let SlimJob = ({ job }) =>{

  return(
    <>
    <Link className="job-listings" to={`/job/${job.id}`}>
      <div className="row">
        <div className="col-lg-4 col-md-4 col-xs-12">
          <div className="job-company-logo">
            <img src={featuredImg4} alt="" />
          </div>
          <div className="job-details">
            <h3>{ job.title }</h3>
            <span className="company-neme">
              { job.company.name}
            </span>
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-xs-12 text-center">
          <span className="btn-open">
            7 Open Jobs
          </span>
        </div>
        <div className="col-lg-2 col-md-2 col-xs-12 text-right">
         <div className="location">
           <i className="lni-map-marker"></i> New Yourk, US
         </div>
        </div>
        <div className="col-lg-2 col-md-2 col-xs-12 text-right">
          <span className="btn-full-time">Full Time</span>
        </div>
        <div className="col-lg-2 col-md-2 col-xs-12 text-right">
          <span className="btn-apply">Apply Now</span>
        </div>
      </div>
    </Link>
    </>
  );
}

export default SlimJob;
