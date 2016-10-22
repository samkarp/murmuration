import React from 'react';
import ListPanel from './ListPanel';
import axios from 'axios';

const  Sidebar = React.createClass({

  render: function() {

    return (
      <div className="container-fluid" style={{textAlign: "center"}}>
        <div className="row">
          <h3>Select Item</h3>
        </div>
        <div className="row">
          <ListPanel />
        </div>
      </div>
    )}
});

export default Sidebar
