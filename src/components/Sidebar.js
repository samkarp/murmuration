import React from 'react';
import TargetListPanel from './TargetPanel';
import RegionListPanel from './RegionPanel';
import ResourceListPanel from './ResourcePanel';
import ObjectiveListPanel from './ObjectivePanel';
import axios from 'axios';

const  Sidebar = React.createClass({

  getInitialState: function() {
    return {
      targets: [],
      regions: [],
      resources: [],
      objectives: []
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
    this.serverRequest =
          axios
            .get("http://localhost:9200/murmuration_region/_search")
            .then(function(result) {
              _this.setState({
                regions: result.data.hits.hits
              });
            })
    this.serverRequest =
          axios
            .get("http://localhost:9200/murmuration_resource/_search")
            .then(function(result) {
              _this.setState({
                resources: result.data.hits.hits
              });
            })
    this.serverRequest =
          axios
            .get("http://localhost:9200/murmuration_objective/_search")
            .then(function(result) {
              _this.setState({
                objectives: result.data.hits.hits
              });
            })
  },

  componentWillUnmount: function() {
  },

  render: function() {

//Tabbed pane of Target, Region, Resource, Objective

    return (
      <div className="container-fluid" style={{textAlign: "center"}}>
        <div className="row">
          <h3>Select Item</h3>
        </div>
        <div className="row">

        <ul className="nav nav-tabs">
            <li className="active">
              <a  href="#1" data-toggle="tab">Targets</a>
            </li>
            <li>
              <a href="#2" data-toggle="tab">Regions</a>
            </li>
            <li>
              <a href="#3" data-toggle="tab">Objectives</a>
            </li>
            <li>
              <a href="#4" data-toggle="tab">Resources</a>
            </li>
          </ul>

          <div className="tab-content clearfix">
            <div className="tab-pane active" id="1">
              <TargetListPanel targets={this.state.targets} regions={this.state.regions} resources={this.state.resources} objectives={this.state.objectives} />
            </div>
            <div className="tab-pane" id="2">
              <RegionListPanel targets={this.state.targets} regions={this.state.regions} resources={this.state.resources} objectives={this.state.objectives} />
            </div>
            <div className="tab-pane" id="3">
              <ObjectiveListPanel targets={this.state.targets} regions={this.state.regions} resources={this.state.resources} objectives={this.state.objectives} />
            </div>
              <div className="tab-pane" id="4">
              <ResourceListPanel targets={this.state.targets} regions={this.state.regions} resources={this.state.resources} objectives={this.state.objectives} />
            </div>
          </div>
        </div>
      </div>
    )}
});

export default Sidebar
