import React, {useState, useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import SlimJob from './SlimJob';
import JobApi from './JobApi';

import {configSettings} from '../../config/config';

let BrowseJobs = () =>{

  const [joblistloaded, setJoblistLoaded] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [jobListCount, setJobListCount] = useState(0);
  const [jobListPage, setJobListPage] = useState(0);
  const mountedRef = useRef(true);

  function handlePageClick(data){
    var offset = data.selected + 1;
    if(jobListPage !== offset){
      var url = configSettings.apiEndPoint + "/browse/jobs?c=10&p=" + offset
      getJobs(url, offset)
    }

    /*
    this.setState({offset: offset}, () => {
      this.loadCommentsFromServer();
    });
    */
  };

  function getJobs(url, offset){
    JobApi
        .browseJobsV2(url)
          .then(response => response)
          .then(json => {
            //if (!mountedRef.current) return null
            console.log(json.page_count);
            setJobList(json.jobs)
            setJobListCount(json.page_count)
            setJobListPage(offset);
          })
          .catch(message => {
                console.log(message);
           });
  }

  useEffect(() => {

    if(!joblistloaded){
      setJoblistLoaded(true)
      let url = configSettings.apiEndPoint + '/browse/jobs?c=10&p=1'
      getJobs(url, 1)
    }
    return function cleanup() {
      mountedRef.current = false
    };
  });

  return(
    <>
    {/* Page Header Start */}
    <div className="page-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="inner-header">
              <h3>Browse Jobs</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Page Header End */}

    {/* Job Browse Section Start */}
    <section className="job-browse section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xs-12">
            <div className="wrap-search-filter row">
              <div className="col-lg-5 col-md-5 col-xs-12">
                <input type="text" className="form-control" placeholder="Keyword: Name, Tag" />
              </div>
              <div className="col-lg-5 col-md-5 col-xs-12">
                <input type="text" className="form-control" placeholder="Location: City, State, Zip" />
              </div>
              <div className="col-lg-2 col-md-2 col-xs-12">
                <button type="submit" className="btn btn-common float-right">Filter</button>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-xs-12">
            { jobList.length > 0 &&
                jobList.map((job, index) => (
                    <SlimJob key={job.id} job={job} />
              ))

            }

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
            { jobListCount > 0 &&
            <ReactPaginate previousLabel={"previous"}
                          nextLabel={"next"}
                          breakLabel={<a href="">...</a>}
                          breakClassName={"break-me"}
                          pageCount={ jobListCount }
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
    </section>
    {/* Job Browse Section End */}
    </>
  );
}

export default BrowseJobs;
