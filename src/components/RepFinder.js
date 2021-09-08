import React, { Component } from 'react';
import Tables from './repfinder/Tables';
import { Container, Row, Col } from 'reactstrap';

class RepFinder extends Component {
  render() {
    return (
      <div className="py-5">
        <Container>
            <h1>Representative Finder</h1>
        </Container>
          <div className="repfindapp">
            <div className="py-3 px-0">
              <Row className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
                <Col>
                  <Tables />
                </Col>
              </Row>
            </div>
          </div>
      </div>
      
    );
  }
}

export default RepFinder;
