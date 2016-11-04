import React from 'react';
import ObjectiveListItem from './ObjectiveListItem'
import axios from 'axios';

const  ObjectiveListPanel = React.createClass({

  render: function() {

    var targets = this.props.targets;
    var regions = this.props.regions;
    var resources = this.props.resources;

    return (
      <div>
        <h4 style={{color: "red"}}>SEARCH</h4>
          {this.props.objectives.map(function(objective){

            //Filter the targets by checking the objective's TargetID list
            var targetsForThisObjective = targets.filter(function(target){ return objective._source.targets.includes(target._id)});
            var targetIDs = targetsForThisObjective.map(function(t){return t._id});

            //Get all of the region ids from the previously found targets
            var regionIDs = targetsForThisObjective.map(function(t){return t._source.regionid});
            //Filter the regions by using the RegionID
            var regionsForThisObjective = regions.filter(function(region){ return regionIDs.includes(region._id) });

            //Filter the resources checking if the previously found regionIds are included with this resource
            var resourcesForThisObjective = resources.filter(function(resource){

                  for(var i = 0; i < resource._source.regionids.length; i++) {
                    if(regionIDs.includes(resource._source.regionids[i])) {
                      return true;
                    }
                  }
               return false;
            });

            return(
              <ObjectiveListItem key={objective._id} objective={objective} regions={regionsForThisObjective} targets={targetsForThisObjective} resources={resourcesForThisObjective} />
            )
          })}
      </div>
    )}
});

export default ObjectiveListPanel
