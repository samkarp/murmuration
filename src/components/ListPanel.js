import React from 'react';
import ListItem from './ListItem'
import axios from 'axios';

const  ListPanel = React.createClass({

  getInitialState: function() {
    return {
      targets: []
    }
  },

  componentDidMount: function() {
    var _this = this;
    this.serverRequest =
      axios
        .get("http://localhost:9200/murmuration_target/_search")
        .then(function(result) {
          _this.setState({
            targets: result.data.hits.hits
          });
        })
  },

  componentWillUnmount: function() {
  },

  render: function() {

    return (
      <div>
        <h4 style={{color: "red"}}>Targets</h4>
          {this.state.targets.map(function(target){
            return(
              <ListItem key={target._id} target={target} />
            )
          })}
      </div>
    )}
});

export default ListPanel
