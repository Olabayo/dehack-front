import React from 'react';
import { Link } from 'react-router-dom';

let Education = ({education}) => {

  return(
    <>
    <h4>{ education.institution }</h4>
    <p>{ education.award }</p>
    <span className="date">2010-2014</span>
    <p><Link to={`/editeducation/${education.id}`}>Edit</Link></p>
    <br/>
    </>
  );
}

export default Education
