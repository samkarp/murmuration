import React from 'react';
import axios from 'axios';

const  ObjectivesListItem = React.createClass({

  render: function() {

    var classname = "objectiveCollapse"+this.props.objective._id.trim()
    var objectiveregionclassname = "objectiveRegionCollapse"+this.props.objective._id.trim()
    var objectivetargetclassname = "objectiveTargetCollapse"+this.props.objective._id.trim()
    var objectiveresourceclassname = "objectiveResourceCollapse"+this.props.objective._id.trim()

    var objectives = this.props.objectives

    return (
      <div className="objectiveListItem">
        <div className="panel-group">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a data-toggle="collapse" href={"#"+classname}>{this.props.objective._source.name}</a>
              </h4>
            </div>
            <div id={classname} className="panel-collapse collapse">
              <ul className="list-group">
                <li className="list-group-item">
                        <div className="panel-group">
                          <div className="panel panel-default">
                            <div className="panel-heading">
                              <h4 className="panel-title">
                                <a data-toggle="collapse" href={"#"+objectiveregionclassname}>Regions</a>
                              </h4>
                            </div>
                            <div id={objectiveregionclassname} className="panel-collapse collapse">
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
                              <a data-toggle="collapse" href={"#"+objectivetargetclassname}>Targets</a>
                            </h4>
                          </div>
                          <div id={objectivetargetclassname} className="panel-collapse collapse">
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
                            <a data-toggle="collapse" href={"#"+objectiveresourceclassname}>Resources</a>
                          </h4>
                        </div>
                        <div id={objectiveresourceclassname} className="panel-collapse collapse">
                          <ul className="list-group">
                              {this.props.resources.map(function(resource){

                                return ( <li key={resource._id} className="list-group-item"><a href="#">{resource._source.name}</a></li> )

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

export default ObjectivesListItem
