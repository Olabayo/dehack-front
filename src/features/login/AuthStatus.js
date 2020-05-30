import React from 'react';

import './login.css';


let AuthStatus = () => {


    return (
        <>
        {/* Page Header Start */}
    <div className="page-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="inner-header">
              <h3>Account was created</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Page Header End */}

    {/* Content section Start */}
    <section id="content" className="section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6 col-xs-12">
            <div className="page-login-form box">
              <h3>
                StreetCred
              </h3>
              <p>
                An activation link was sent to your email, use that to complete this registration
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Content section End */}
        </>
    );
}

export default AuthStatus
