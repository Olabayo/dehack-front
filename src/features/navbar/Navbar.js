import React from 'react';
import { connect } from 'react-redux';
import {
  Link,
  useHistory
} from "react-router-dom";

import logo from '../../assets/img/logo.png';
//import '../../App.css';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/line-icons.css';
import '../../assets/css/slicknav.min.css';
import '../../assets/css/animate.css';
import '../../assets/css//main.css';
import '../../assets/css/responsive.css';

import {
  clearAuth
} from '../auth/authSlice';

const mapDispatch = { clearAuth }

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    isLoading: state.auth.fetching,
    currentUser: state.auth.currentUser
  }
}

let Navbar = ({ isLoading, currentUser, clearAuth }) => {

    let history = useHistory();

    function logoutAction(event){
      event.preventDefault()
      localStorage.removeItem('userObj');
      clearAuth();
      history.push("/");
    }

  return(
  <>
    <nav className="navbar navbar-expand-lg fixed-top scrolling-navbar">
        <div className="container">
          <div className="theme-header clearfix">
            {/* Brand and toggle get grouped for better mobile display */}
            <div className="navbar-header">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                <span className="lni-menu"></span>
                <span className="lni-menu"></span>
                <span className="lni-menu"></span>
              </button>
              <Link className="navbar-brand" to="/"><img src={logo} alt=""/></Link>
            </div>
            <div className="collapse navbar-collapse" id="main-navbar">
              <ul className="navbar-nav mr-auto w-100 justify-content-end">
              <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/contact">Contact</Link>
                </li>
                { JSON.stringify(currentUser) === '{}' &&
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                }
                <li className="nav-item dropdown active">
                  { JSON.stringify(currentUser) !== '{}'
                    ? <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Welcome { currentUser.first_name }
                      </a>
                    : <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Sign Up
                      </a>
                  }

                  <ul className="dropdown-menu">
                  { JSON.stringify(currentUser) !== '{}'
                    ? <>
                    { 'company_id' in currentUser && currentUser.company_id !== ""
                    ? <><li>
                        <Link className="dropdown-item dropdown-toggle" to="/companyprofile">Company profile</Link>
                        <Link className="dropdown-item dropdown-toggle" to="/browse/resumes">Browse resumes</Link>
                      </li>
                    </>
                    : <>
                      <li>
                        <Link className="dropdown-item dropdown-toggle" to="/profile">Profile</Link>
                      </li>
                    </>
                    }

                    <li><a className="dropdown-item" href="#" onClick={(event) => {
                        logoutAction(event);
                      }
                    }>
                      Logout
                    </a>
                    </li>
                    </>
                    :  <>
                        <li><Link className="dropdown-item active" to="/signup">User</Link></li>
                        <li><Link className="dropdown-item" to="/signupRecruit">Recruiter</Link></li>
                      </>
                  }
                  </ul>
                </li>
                <li className="button-group">
                  <a className="button btn btn-common" href="/addjob" >Post a Job</a>
                </li>
              </ul>
            </div>
          </div>
          </div>
          <div className="mobile-menu" data-logo="assets/img/logo-mobile.png"></div>
        </nav>
        {/* Navbar End */}
        </>
);
}

Navbar = connect(mapStateToProps, mapDispatch)(Navbar)

export default Navbar;
