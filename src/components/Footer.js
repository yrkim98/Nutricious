import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer font-small mdb-color lighten-3 pt-4">
        <div className="container text-center text-md-left">
          <div className="row">
            <div className="col-4 mx-auto my-md-4 my-0 mt-4 mb-1">
              <h5 className="font-weight-bold text-uppercase mb-4">About This Site</h5>
              <p>This site was created by Drew Gallardo and Brian Kim for a project in their INFO 340 class at the University of Washington.</p>
            </div>
          <hr className="clearfix w-100 d-md-none"></hr>
          <div className="col-4 mx-auto my-md-4 my-0 mt-4 mb-1">
            <h5 className="font-weight-bold text-uppercase mb-4">Our team</h5>
            <ul className="list-unstyled">
              <li>
                <p>
                  <a href="mailto:imgeru@gmail.com">Drew Gallardo: imgeru@gmail.com</a>
                </p>
              </li>
              <li>
                <p>
                  <a href="mailto:yrkim1998@gmail.com">Brian Kim: yrkim1998@gmail.com</a>
                </p>
              </li>
              <li>
                <p>
                  <a href="mailto:alarjos@uw.edu">Jose Santos: alarjos@uw.edu</a>
                </p>
              </li>
              <li>
                <p>
                  <a href="mailto:ibrar24@uw.edu">Ibrar: ibrar24@uw.edu</a>
                </p>
              </li>
            </ul>
          </div>
      </div>
    </div>

    <div className="footer-copyright text-center py-3">© 2018 Copyright:
     Brian Kim and Drew Gallardo
    </div>
  </footer>
    );
  }
}

export default Footer;