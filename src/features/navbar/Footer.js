import React from 'react';
import logoFooter from '../../assets/img/logo-footer.png';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/line-icons.css';
import '../../assets/css/slicknav.min.css';
import '../../assets/css/animate.css';
import '../../assets/css/main.css';
import '../../assets/css/responsive.css';

function Footer() {

    return (
        <>
            <footer>
                <section className="footer-Content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-xs-12">
                                <div className="widget">
                                    <div className="footer-logo">{/*<a href="/"><img src={logoFooter} alt=""/></a>*/}</div>
                                    <div className="textwidget">
                                        <p>Sed consequat sapien faus quam bibendum convallis quis in nulla. Pellentesque volutpat odio eget diam cursus semper.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-4 col-xs-12">
                                <div className="widget">
                                    <h3 className="block-title">Quick Links</h3>
                                    <ul className="menu">
                                        <li><a href="#">About Us</a></li>
                                        <li><a href="#">Support</a></li>
                                        <li><a href="#">License</a></li>
                                        <li><a href="/contact">Contact</a></li>
                                    </ul>
                                    <ul className="menu">
                                        <li><a href="#">Terms & Conditions</a></li>
                                        <li><a href="#">Privacy</a></li>
                                        <li><a href="#">Refferal Terms</a></li>
                                        <li><a href="#">Product License</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-xs-12">
                                <div className="widget">
                                    <h3 className="block-title">Subscribe Now</h3>
                                    <p>Sed consequat sapien faus quam bibendum convallis.</p>
                                    <form method="post" id="subscribe-form" name="subscribe-form" className="validate">
                                        <div className="form-group is-empty">
                                            <input type="email" name="Email" className="form-control" id="EMAIL" placeholder="Enter Email..." required="" />
                                            <button type="submit" name="subscribe" id="subscribes" className="btn btn-common sub-btn"><i className="lni-envelope"></i></button>
                                            <div className="clearfix"></div>
                                        </div>
                                    </form>
                                    <ul className="mt-3 footer-social">
                                        <li><a className="facebook" href="#"><i className="lni-facebook-filled"></i></a></li>
                                        <li><a className="twitter" href="#"><i className="lni-twitter-filled"></i></a></li>
                                        <li><a className="linkedin" href="#"><i className="lni-linkedin-fill"></i></a></li>
                                        <li><a className="google-plus" href="#"><i className="lni-google-plus"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Footer area End */}

                {/* Copyright Start  */}
                <div id="copyright">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="site-info text-center">
                                    {/* <p>Designed and Developed by <a href="https://uideck.com" rel="nofollow">UIdeck</a></p> and reformatted by Yelsin S for Hack.Diversity project */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Copyright End */}
            </footer>
        </>
    );
}

export default Footer;
