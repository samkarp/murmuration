import React from 'react';
import RegionListItem from './RegionListItem'
import axios from 'axios';

const  RegionListPanel = React.createClass({

  render: function() {

      var targets = this.props.targets;
      var resources = this.props.resources;
      var objectives = this.props.objectives;

    return (
      <div>
        <h4 style={{color: "red"}}>SEARCH</h4>
          {this.props.regions.map(function(region){

            //Filter targets by RegionID
            var targetsForThisRegion = targets.filter(function(target){ return target._source.regionid == region._id });
            var targetIDs = targetsForThisRegion.map(function(t){return t._id});

            //Filter Resources by RegionId
            var resourcesForThisRegion = resources.filter(function(resource) { return resource._source.regionids.includes(region._id)});

            //Filter Objectives by checking if objective contains any of the previously found TargetIds
            var objectivesForThisRegion = objectives.filter(function(objective){

                  for(var i = 0; i < objective._source.targets.length; i++) {
                    if(targetIDs.includes(objective._source.targets[i])) {
                      return true;
                    }
                  }
               return false;
            });


            return(
              <RegionListItem key={region._id} region={region} targets={targetsForThisRegion} resources={resourcesForThisRegion} objectives={objectivesForThisRegion} />
            )
          })}
      </div>
    )}
});

export default RegionListPanel
