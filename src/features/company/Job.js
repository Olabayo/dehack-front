import React from 'react';
import { Link } from 'react-router-dom';

let Job = ({job}) => {

  return(
    <>
    <h4>{ job.title }</h4>
    <p>{ job.description }</p>
    <span className="date">2010-2014</span>
    <p><Link to={`/editjob/${job.id}`}>Edit</Link></p>
    <br/>
    </>
  );
}

export default Job
