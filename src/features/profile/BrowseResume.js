import React, {useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import ProfileApi from './ProfileApi';

import ResumeSummary from './ResumeSummary';

import avatar from '../../assets/img/jobs/avatar-1.jpg'

let BrowseResume = () =>{

  const [resumelistloaded, setResumelistLoaded] = useState(false);
  const [resumeList, setResumeList] = useState([]);
  const [tokenStr, setTokenStr] = useState("");
  const [resumeListPage, setResumeListPage] = useState(0);
  const [resumeListCount, setResumeListCount] = useState(0);
  const [emptyList, setEmptyList] = useState(false);

  function browseResumes(token, page, count){
    ProfileApi
        .browseResumes(token, page, count)
          .then(response => response)
          .then(json => {
            console.log(json);
            setResumeList(json.resumes);
            setResumeListCount(json.page_count)
            setResumeListPage(page);
          })
          .catch(message => {
            setEmptyList(true);
           });
  }

  function handlePageClick(data){
    var offset = data.selected + 1;
    if(resumeListPage !== offset){

      browseResumes(tokenStr, offset, 10)
    }

    /*
    this.setState({offset: offset}, () => {
      this.loadCommentsFromServer();
    });
    */
  };

  useEffect(() => {

    if(!resumelistloaded){
      var userObj = localStorage.getItem('userObj', '');
        if(userObj !== null ){
          var userObjJson = JSON.parse(userObj);
          console.log("Json User Obj", userObjJson);
          let token = "JWT " + userObjJson.access_token
          setResumelistLoaded(true)
          setTokenStr(token)
          browseResumes(token, 1, 10)
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
            {/*
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
            */}
            { resumeList.length > 0 &&
              resumeList.map((resume, index) => (
                    <ResumeSummary key={resume} resume={resume} />
                ))
            }
            <div className="col-12 text-center mt-4">
              { emptyList == true && resumelistloaded && resumeList.length == 0 &&
                <Link to="/" className="btn btn-common no-jobs-btn">No resumes</Link>
              }
            </div>
            <div className="col-lg-12 col-md-12 col-xs-12">

              {/* Start Pagination */}
              {/*
              <ul className="pagination">
                <li className="active"><a href="#" className="btn-prev" ><i className="lni-angle-left"></i> prev</a></li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li className="active"><a href="#" className="btn-next">Next <i className="lni-angle-right"></i></a></li>
              </ul>
              */}
              { resumeListCount > 0 &&
              <ReactPaginate previousLabel={"previous"}
                            nextLabel={"next"}
                            breakLabel={<a href="">...</a>}
                            breakClassName={"break-me"}
                            pageCount={ resumeListCount }
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
              }
              {/* End Pagination */}
            </div>
        </div>
      </div>
    </div>
    {/* End Content */}
    </>
  );
}

export default BrowseResume;
