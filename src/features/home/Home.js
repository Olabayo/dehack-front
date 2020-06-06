import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
//import images
import intrologo from '../../assets/img/intro.png'

import CompanyApi from '../company/CompanyApi';

import BrowseJob from '../company/BrowseJob';

let Homepage = () => {

  const [jobloaded, setJobLoaded] = useState(false);
  const [jobList, setJobList] = useState([]);
  const mountedRef = useRef(true)

  let history = useHistory();

  function handleSubmit(){
    history.push("/browse/jobs")
  }

  function getJobs(){
    CompanyApi
        .browseJobs(1, 10)
          .then(response => response)
          .then(json => {
            //if (!mountedRef.current) return null
            console.log(json);
            setJobList(json.jobs)
          })
          .catch(message => { });
  }

  useEffect(() => {

    if(!jobloaded){
      setJobLoaded(true)
      getJobs()
    }

    return function cleanup() {
      mountedRef.current = false
    };
  });

  return (
    <>
    <div className="App">
      <header id="home" className="hero-area">
        <div className="container">
          <div className="row space-100">
            <div className="col-lg-7 col-md-12 col-xs-12">
              <div className="contents">
                <h2 className="head-title">Find the  <br /> job that fits your life</h2>
                <p>Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac condimentum. Vestibulum congue posuere lacus, id tincidunt nisi porta sit amet. Suspendisse et sapien varius, pellentesque dui non.</p>
                <div className="job-search-form">
                  <form>
                    <div className="row">
                      <div className="col-lg-5 col-md-5 col-xs-12">
                        <div className="form-group">
                          <input className="form-control" type="text" placeholder="Job Title or Company Name" />
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-5 col-xs-12">
                        <div className="form-group">
                          <div className="search-category-container">
                            <label className="styled-select">
                              <select>
                                <option value="none">Locations</option>
                                <option value="none">New York</option>
                                <option value="none">California</option>
                                <option value="none">Washington</option>
                                <option value="none">Birmingham</option>
                                <option value="none">Chicago</option>
                                <option value="none">Phoenix</option>
                              </select>
                            </label>
                          </div>
                          <i className="lni-map-marker"></i>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2 col-xs-12">
                        <button onClick={handleSubmit} ype="submit" className="button"><i className="lni-search"></i></button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-xs-12">
              <div className="intro-img">
                <img src={intrologo} alt="" />
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Header Section End */}

      {/* Category Section Start */}
      {/*
      <section className="category section bg-gray">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Browse Categories</h2>
            <p>Most popular categories of portal, sorted by popularity</p>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-xs-12 f-category">
              <a href="browse-jobs.html">
                <div className="icon bg-color-1">
                  <i className="lni-home"></i>
                </div>
                <h3>Finance</h3>
                <p>(4286 jobs)</p>
              </a>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12 f-category">
              <a href="browse-jobs.html">
                <div className="icon bg-color-2">
                  <i className="lni-world"></i>
                </div>
                <h3>Sale/Markting</h3>
                <p>(2000 jobs)</p>
              </a>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12 f-category">
              <a href="browse-jobs.html">
                <div className="icon bg-color-3">
                  <i className="lni-book"></i>
                </div>
                <h3>Education/Training</h3>
                <p>(1450 jobs)</p>
              </a>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12 f-category">
              <a href="browse-jobs.html">
                <div className="icon bg-color-4">
                  <i className="lni-display"></i>
                </div>
                <h3>Technologies</h3>
                <p>(5100 jobs)</p>
              </a>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12 f-category">
              <a href="browse-jobs.html">
                <div className="icon bg-color-5">
                  <i className="lni-brush"></i>
                </div>
                <h3>Art/Design</h3>
                <p>(5079 jobs)</p>
              </a>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12 f-category">
              <a href="browse-jobs.html">
                <div className="icon bg-color-6">
                  <i className="lni-heart"></i>
                </div>
                <h3>Healthcare</h3>
                <p>(3235 jobs)</p>
              </a>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12 f-category">
              <a href="browse-jobs.html">
                <div className="icon bg-color-7">
                  <i className="lni-funnel"></i>
                </div>
                <h3>Science</h3>
                <p>(1800 jobs)</p>
              </a>
            </div>
            <div className="col-lg-3 col-md-6 col-xs-12 f-category">
              <a href="browse-jobs.html">
                <div className="icon bg-color-8">
                  <i className="lni-cup"></i>
                </div>
                <h3>Food Services</h3>
                <p>(4286 jobs)</p>
              </a>
            </div>
          </div>
        </div>
      </section>
      */}
      {/* Category Section End */}

      {/* Featured Section Start */}
      <section id="featured" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Jobs</h2>
            <p>Hand-picked jobs featured depending on popularity and benifits</p>
          </div>
          <div className="row">
            { jobList.length > 0 &&
                  jobList.map((job, index) => (
                    <div className="col-lg-4 col-md-6 col-xs-12">
                      <BrowseJob job={job} />
                    </div>
                ))

            }
            <div className="col-12 text-center mt-4">
              <Link to="/browse/jobs" className="btn btn-common">Browse All Jobs</Link>
            </div>
          </div>
        </div>
      </section>
      {/** Featured Section End */}
    </div>
    </>

  );
}

export default Homepage;
