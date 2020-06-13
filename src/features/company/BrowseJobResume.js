import React, {useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, useParams } from 'react-router-dom';
import CompanyApi from './CompanyApi';

import ResumeSummaryWide from '../profile/ResumeSummaryWide';

import avatar from '../../assets/img/jobs/avatar-1.jpg'

let BrowseJobResume = () =>{

  const [resumelistloaded, setResumelistLoaded] = useState(false);
  const [resumeList, setResumeList] = useState([]);
  const [tokenStr, setTokenStr] = useState("");
  const [resumeListPage, setResumeListPage] = useState(0);
  const [resumeListCount, setResumeListCount] = useState(0);
  const [emptyList, setEmptyList] = useState(false);
  let { id } = useParams();

  function getApplications(token, page){
    CompanyApi
        .getApplications(token, id)
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

      getApplications(tokenStr, offset)
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
          getApplications(token, 1)
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

           { resumeList.length > 0 &&
              resumeList.map((resume, index) => (
                <ResumeSummaryWide key={resume} resume={resume} />
            ))
            }
            <div className="col-12 text-center mt-4">
              { emptyList == true && resumelistloaded && resumeList.length == 0 &&
                <Link to="/" className="btn btn-common no-jobs-btn">No resumes</Link>
              }
            </div>
            <div className="col-lg-12 col-md-12 col-xs-12">
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

export default BrowseJobResume;
