import React from 'react';
import axios from 'axios';

const  TargetListItem = React.createClass({

  render: function() {

    var classname = "targetCollapse"+this.props.target._id
    var targetregionclassname = "targetRegionCollapse"+this.props.target._id
    var targetresourceclassname = "targetResourceCollapse"+this.props.target._id
    var targetobjectiveclassname = "targetObjectiveCollapse"+this.props.target._id

    var regions = this.props.regions

    return (
      <div className="targetListItem">
        <div className="panel-group">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a data-toggle="collapse" href={"#"+classname}>{this.props.target._source.description}</a>
              </h4>
            </div>
            <div id={classname} className="panel-collapse collapse">
              <ul className="list-group">
                <li className="list-group-item">
                        <div className="panel-group">
                          <div className="panel panel-default">
                            <div className="panel-heading">
                              <h4 className="panel-title">
                                <a data-toggle="collapse" href={"#"+targetregionclassname}>Region</a>
                              </h4>
                            </div>
                            <div id={targetregionclassname} className="panel-collapse collapse">
                              <ul className="list-group">
                                {this.props.regions.map(function(region){

                                  return ( <li key={region._id} className="list-group-item"><a href="#">{region._source.description}</a></li> )

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
                              <a data-toggle="collapse" href={"#"+targetresourceclassname}>Resources</a>
                            </h4>
                          </div>
                          <div id={targetresourceclassname} className="panel-collapse collapse">
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
                            <a data-toggle="collapse" href={"#"+targetobjectiveclassname}>Objectives</a>
                          </h4>
                        </div>
                        <div id={targetobjectiveclassname} className="panel-collapse collapse">
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

export default TargetListItem
