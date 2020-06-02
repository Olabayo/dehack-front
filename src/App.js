import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Login from './features/login/Login';
import Signup from './features/login/Signup';
import AuthStatus from './features/login/AuthStatus';
import SignupRecruit from './features/login/SignupRecruit';
import Navbar from './features/navbar/Navbar';
import Homepage from './features/home/Home';
import Contact from './features/contact/ContactUs';
import Profile from "./features/profile/Profile";
import CompanyProfile from "./features/company/CompanyProfile";
import ChangePass from "./features/profile/ChangePass";
import AddEditProfile from "./features/profile/AddEditProfile";
import AddEducation from "./features/profile/AddEducation";
import AddExperience from "./features/profile/AddExperience";
import EditEducation from "./features/profile/EditEducation";
import EditExperience from "./features/profile/EditExperience";
import EditJob from './features/company/EditJob';
import AddJob from "./features/company/AddJob";
import Foot from './features/navbar/Footer';
import JobDetail from './features/company/JobDetail';
import BrowseJobs from './features/job/BrowseJobs';
import BrowseResume from './features/profile/BrowseResume';

//import css
import './assets/css/bootstrap.min.css';
import './assets/css/line-icons.css';
import './assets/css/slicknav.min.css';
import './assets/css/animate.css';
import './assets/css/main.css';
import './assets/css/responsive.css';


import {
  Switch,
  Route, BrowserRouter
} from "react-router-dom";

import {
  receiveAuth
} from './features/auth/authSlice';

const mapDispatch = { receiveAuth}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    isLoading: state.auth.fetching,
    currentUser: state.auth.currentUser
  }
}

let App = ({ isLoading, currentUser, receiveAuth }) => {

const [authloaded, setAuth] = useState(false);

  useEffect(() => {

    var userObj = localStorage.getItem('userObj', '');
    if(userObj !== null && authloaded !== true ){
      var userObjJson = JSON.parse(userObj);
      console.log("Json User Obj", userObjJson);

      receiveAuth(userObjJson);
      setAuth(true);
    }
    if(currentUser && currentUser.access_token){
      console.log("Loading");
      if(authloaded !== true){
       localStorage.setItem('userObj', JSON.stringify(currentUser));
       setAuth(true);
     }
    }

    function handleScrollChange(event) {

      let scrollTop = event.srcElement.documentElement.scrollTop;
      if (scrollTop >= 100) {
        event.srcElement.body.querySelector(".scrolling-navbar").classList.add("top-nav-collapse");
      } else {
        event.srcElement.body.querySelector(".scrolling-navbar").classList.remove("top-nav-collapse");
      }
    }
    window.addEventListener('scroll', handleScrollChange, true);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener('scroll', handleScrollChange);
    };
  },  [authloaded, currentUser, receiveAuth]);


  return (
    <>

     <Navbar />

      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/signupRecruit" component={SignupRecruit} />
        <Route path="/authstatus" component={AuthStatus} />
        <Route path="/profile" component={Profile} />
        <Route path="/companyprofile" component={CompanyProfile} />
        <Route path="/manageprofile" component={AddEditProfile} />
        <Route path="/addeducation" component={AddEducation} />
        <Route path="/addexperience" component={AddExperience} />
        <Route path="/editeducation/:id" component={EditEducation} />
        <Route path="/editexperience/:id" component={EditExperience} />
        <Route path="/editjob/:id" component={EditJob} />
        <Route path="/changepass" component={ChangePass} />
        <Route path="/addjob" component={AddJob} />
        <Route path="/job/:id" component={JobDetail} />
        <Route path="/browse/jobs" component={BrowseJobs} />
        <Route path="/browse/resumes" component={BrowseResume} />
      </Switch>

      <Foot />
    
    </>
  );
}

App = connect(mapStateToProps, mapDispatch)(App)

export default App
