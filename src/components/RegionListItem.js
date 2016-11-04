import React from 'react';
import axios from 'axios';

const  RegionListItem = React.createClass({

  render: function() {

    var classname = "regionCollapse"+this.props.region._id
    var regiontargetclassname = "regionTargetCollapse"+this.props.region._id
    var regionresourceclassname = "regionResourceCollapse"+this.props.region._id
    var regionobjectiveclassname = "regionObjectiveCollapse"+this.props.region._id

    var targets = this.props.targets

    return (
      <div className="regionListItem">
        <div className="panel-group">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a data-toggle="collapse" href={"#"+classname}>{this.props.region._source.description}</a>
              </h4>
            </div>
            <div id={classname} className="panel-collapse collapse">
              <ul className="list-group">
                <li className="list-group-item">
                        <div className="panel-group">
                          <div className="panel panel-default">
                            <div className="panel-heading">
                              <h4 className="panel-title">
                                <a data-toggle="collapse" href={"#"+regiontargetclassname}>Targets</a>
                              </h4>
                            </div>
                            <div id={regiontargetclassname} className="panel-collapse collapse">
                              <ul className="list-group">
                                {this.props.targets.map(function(target){

                                  return ( <li key={target._id} className="list-group-item"><a href="#">{target._source.description}</a></li> )

                                })}


                              </ul>
                            </div>
                          </div>
                        </div>
                </li>
                <li className="list-group-item">
                <div className="panel-group">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <h4 className="panel-title">
                              <a data-toggle="collapse" href={"#"+regionresourceclassname}>Resources</a>
                            </h4>
                          </div>
                          <div id={regionresourceclassname} className="panel-collapse collapse">
                            <ul className="list-group">
                              {this.props.resources.map(function(resource){

                                return ( <li key={resource._id} className="list-group-item"><a href="#">{resource._source.name}</a></li> )

                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                </li>
                <li className="list-group-item">
                <div className="panel-group">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a data-toggle="collapse" href={"#"+regionobjectiveclassname}>Objectives</a>
                          </h4>
                        </div>
                        <div id={regionobjectiveclassname} className="panel-collapse collapse">
                          <ul className="list-group">
                              {this.props.objectives.map(function(objective){

                                return ( <li key={objective._id} className="list-group-item"><a href="#">{objective._source.name}</a></li> )

                              })}
                          </ul>
                        </div>
                      </div>
                    </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )}
});

export default RegionListItem
