import React from 'react';
import Map from './Map';
import Grid from 'react-bootstrap';
import Row from 'react-bootstrap';
import Col from 'react-bootstrap';

const  ViewMapItems = React.createClass({
  render: function() {

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2 col-md-2 sidebar">
            TESTING MY SIDEBAR AREA
          </div>
          <div className="col-sm-10 col-sm-offset-2 col-md-offset2 main">
            <Map size={{width: '80vw', height: '95vh'}} />
          </div>
        </div>
      </div>
    )}
});

export default ViewMapItems


// <Grid>
// <Row className="show-grid">
//   <Col sm={6} md={3}>First Column</Col>
// <Col sm={6} md={3}>First Column</Col>
// </Row>
// </Grid>
