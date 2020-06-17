import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CompanyApi from './CompanyApi';

import BrowseJob from './BrowseJob';

let JobDetail = () => {

  const [jobloaded, setLoaded] = useState(false);
  const [jobResult, setResultLoaded] = useState({"company": {}});
  const [joblistloaded, setJoblistLoaded] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [requestFetching, setRequestFetching] = useState(false);
  const [applyBtnText, setApplyBtnText] = useState('Apply Now');
  const [enrollStatus, setEnrollStatus] = useState(false)
  let { id } = useParams();

  function getJob(id){
    let token = "";
    var userObj = localStorage.getItem('userObj', '');
    if(userObj !== null){
      var userObjJson = JSON.parse(userObj);
      token = "JWT " + userObjJson.access_token
    }
    CompanyApi
        .getGuestJob(id, token)
          .then(response => response)
          .then(json => {
            console.log(json);
            setResultLoaded(json.job)
            if(json.apply_status){
              setApplyBtnText('Enrolled');
              setEnrollStatus(true);
            }
          })
          .catch(message => {
           });
  }

  function getJobs(){
    CompanyApi
        .browseJobs(1, 3)
          .then(response => response)
          .then(json => {
            console.log(json);
            setJobList(json.jobs)
          })
          .catch(message => { });
  }

  function postApplication(token){
    CompanyApi
        .postApplication(token, id)
          .then(response => response)
          .then(json => {
            console.log(json);
            setRequestFetching(false);
            setApplyBtnText("Enrolled")
            toast("Application successful");
            setEnrollStatus(true);
          })
          .catch(message => {
            setRequestFetching(false);
            setApplyBtnText("Apply Now");
            toast("Application error!");
           });
  }

  function handleApply(event){
    event.preventDefault();
    let token = "";
    var userObj = localStorage.getItem('userObj', '');
    if(userObj !== null){
      var userObjJson = JSON.parse(userObj);
      token = "JWT " + userObjJson.access_token;
      if(requestFetching === false){
        if(enrollStatus === false){
        setRequestFetching(true);
        setApplyBtnText("Applying please wait...");
        postApplication(token);
      }else{
        alert("You are enrolled");
      }

      }else{
        alert("Please wait")
      }
    }else{
      alert("You need to be logged in");
    }
  }

  useEffect(() => {

    if(!joblistloaded){
      setJoblistLoaded(true)
      getJobs()
    }

    if(!jobloaded){
      setLoaded(true)
      getJob(id)
    }
  }, [joblistloaded, jobloaded, id]);

  return(
    <>
    {/* Page Header Start */}
    <div className="page-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-6 col-xs-12">
            <div className="breadcrumb-wrapper">
              <div className="img-wrapper">
                {/*<img src={companyLogo} alt=""/>*/}
              </div>
              <ToastContainer position="bottom-left" />
              <div className="content">
                <h3 className="product-title">{ jobResult.title }</h3>
                <p className="brand">{ jobResult.company.name }</p>
                <div className="tags">
                  <span><i className="lni-map-marker"></i> New York</span>
                  <span><i className="lni-calendar"></i> Posted 26 June, 2020</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-xs-12">
            <div className="month-price">
              <span className="year">Yearly</span>
              <div className="price">$65,000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Page Header End */}

    {/* Job Detail Section Start */}
    <section className="job-detail section">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-8 col-md-12 col-xs-12">
            <div className="content-area">
              <h4>Job Description</h4>
              <p>{ jobResult.description }</p>
              <p>{ jobResult.requirements }</p>
              <h5>What You Need for this Position</h5>
              <ul>
                <li>- Objective-C</li>
                <li>- iOS SDK</li>
                <li>- XCode</li>
                <li>- Cocoa</li>
                <li>- ClojureScript</li>
              </ul>
              <h5>How To Apply</h5>
              <p>Create an account upload a profile and apply here</p>
              <a href="!#" onClick={handleApply} className="btn btn-common">
                {applyBtnText}
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-xs-12">
            <div className="sideber">
              <div className="widghet">
                <h3>Job Location</h3>
                <div className="maps">
                  <div id="map" class="map-full">
                    <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d405691.57240383344!2d-122.3212843181106!3d37.40247298383319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb68ad0cfc739%3A0x7eb356b66bd4b50e!2sSilicon+Valley%2C+CA%2C+USA!5e0!3m2!1sen!2sbd!4v1538319316724" allowfullscreen=""></iframe>
                  </div>
                </div>
              </div>
              <div className="widghet">
                <h3>Share This Job</h3>
                <div className="share-job">
                  <form method="post" className="subscribe-form">
                    <div className="form-group">
                      <input type="email" name="Email" className="form-control" placeholder="https://joburl.com" required=""/>
                      <button type="submit" name="subscribe" className="btn btn-common sub-btn"><i class="lni-files"></i></button>
                      <div className="clearfix"></div>
                    </div>
                  </form>
                  <ul className="mt-4 footer-social">
                    <li><a className="facebook" href="!#"><i className="lni-facebook-filled"></i></a></li>
                    <li><a className="twitter" href="!#"><i className="lni-twitter-filled"></i></a></li>
                    <li><a className="linkedin" href="!#"><i className="lni-linkedin-fill"></i></a></li>
                    <li><a className="google-plus" href="!#"><i className="lni-google-plus"></i></a></li>
                  </ul>
                  <div className="meta-tag">
                    <span class="meta-part"><a href="!#"><i className="lni-star"></i> Write a Review</a></span>
                    <span class="meta-part"><a href="!#"><i className="lni-warning"></i> Reports</a></span>
                    <span class="meta-part"><a href="!#"><i className="lni-share"></i> Share</a></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Job Detail Section End */}

    {/* Featured Section Start */}
    <section id="featured" className="section bg-gray pb-45">
      <div className="container">
        <h4 className="small-title text-left">Similar Jobs</h4>
        <div className="row">
        { jobList.length > 0 &&
              jobList.map((job, index) => (
                <div className="col-lg-4 col-md-6 col-xs-12">
                  <BrowseJob job={job} />
                </div>
            ))

        }
        </div>
      </div>
    </section>
    {/* Featured Section End */}
    </>
  );
}

export default JobDetail;
