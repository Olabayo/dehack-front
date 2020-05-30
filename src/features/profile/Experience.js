import React from 'react';
import { Link } from 'react-router-dom';

let Experience = ({experience}) => {

  return(
    <>
    <h4>{experience.role}</h4>
    <h5>{experience.company}</h5>
    <span className="date">Fab 2017-Present</span>
    <p>{experience.description}</p>
    <p><Link to={`/editexperience/${experience.id}`}>Edit</Link></p>
    <br/>
    </>
  );
}

export default Experience
