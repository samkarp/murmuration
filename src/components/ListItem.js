import React from 'react';
import axios from 'axios';

const  ListItem = React.createClass({

  render: function() {

    return (
      <div className="targetListItem">
        <a href={"#"}>
          {this.props.target._source.description}
        </a>
      </div>
    )}
});

export default ListItem
