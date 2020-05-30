import React, {useState, useEffect } from 'react';

import SlimJob from './SlimJob';

import JobApi from './JobApi';

let BrowseJobs = () =>{

  const [joblistloaded, setJoblistLoaded] = useState(false);
  const [jobList, setJobList] = useState([]);

  function getJobs(){
    JobApi
        .browseJobs(1, 10)
          .then(response => response)
          .then(json => {
            console.log(json);
            setJobList(json.jobs)
          })
          .catch(message => { });
  }

  useEffect(() => {

    if(!joblistloaded){
      setJoblistLoaded(true)
      getJobs()
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
                    <SlimJob job={job} />
              ))

            }

            {/* Start Pagination */}
            <ul className="pagination">
              <li class="active"><a href="#" className="btn-prev" ><i className="lni-angle-left"></i> prev</a></li>
              <li><a href="#">1</a></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">4</a></li>
              <li><a href="#">5</a></li>
              <li className="active"><a href="#" className="btn-next">Next <i className="lni-angle-right"></i></a></li>
            </ul>
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
