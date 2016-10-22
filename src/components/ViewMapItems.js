import React from 'react';
import Map from './Map';
import Sidebar from './Sidebar';

const  ViewMapItems = React.createClass({
  render: function() {

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 sidebar">
            <Sidebar />
          </div>
          <div className="col-md-10 map">
            <Map size={{width: '80vw', height: '85vh'}} />
          </div>
        </div>
      </div>
    )}
});

export default ViewMapItems
