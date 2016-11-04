import React from 'react';
import axios from 'axios';

const  ResourceListItem = React.createClass({

  render: function() {

    var classname = "resourceCollapse"+this.props.resource._id.trim()
    var resourceregionclassname = "resourceRegionCollapse"+this.props.resource._id.trim()
    var resourcetargetclassname = "resourceTargetCollapse"+this.props.resource._id.trim()
    var resourceobjectiveclassname = "resourceObjectiveCollapse"+this.props.resource._id.trim()

    var regions = this.props.regions

    return (
      <div className="resourceListItem">
        <div className="panel-group">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a data-toggle="collapse" href={"#"+classname}>{this.props.resource._source.name}</a>
              </h4>
            </div>
            <div id={classname} className="panel-collapse collapse">
              <ul className="list-group">
                <li className="list-group-item">
                        <div className="panel-group">
                          <div className="panel panel-default">
                            <div className="panel-heading">
                              <h4 className="panel-title">
                                <a data-toggle="collapse" href={"#"+resourceregionclassname}>Regions</a>
                              </h4>
                            </div>
                            <div id={resourceregionclassname} className="panel-collapse collapse">
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
                              <a data-toggle="collapse" href={"#"+resourcetargetclassname}>Targets</a>
                            </h4>
                          </div>
                          <div id={resourcetargetclassname} className="panel-collapse collapse">
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
                            <a data-toggle="collapse" href={"#"+resourceobjectiveclassname}>Objectives</a>
                          </h4>
                        </div>
                        <div id={resourceobjectiveclassname} className="panel-collapse collapse">
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

export default ResourceListItem
