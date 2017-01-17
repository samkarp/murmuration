import React from 'react';
import ResourceListItem from './ResourceListItem'
import SearchObject from './SearchObject'

const  ResourceListPanel = React.createClass({

  render: function() {

    var targets = this.props.targets;
    var regions = this.props.regions;
    var objectives = this.props.objectives;

    return (
      <div>
        <SearchObject items={this.props.resources} type={"Resources"}/>

          {this.props.resources.map(function(resource){

            //Filter the regions by seeing if this Resource contains this RegionId
            var regionsForThisResource = regions.filter(function(region){ return resource._source.regionids.includes(region._id) });
            var regionIDs = regionsForThisResource.map(function(r){return r._id});

            //Filter the targets by checking if any of the targets are within the RegionID list
            var targetsForThisResource = targets.filter(function(target){ return regionIDs.includes(target._source.regionid)});
            var targetIDs = targetsForThisResource.map(function(t){return t._id});

            //Filter the objectives by using the TargetIDs
            var objectivesForThisResource = objectives.filter(function(objective){

                  for(var i = 0; i < objective._source.targets.length; i++) {
                    if(targetIDs.includes(objective._source.targets[i])) {
                      return true;
                    }
                  }
               return false;
            });

            return(
              <ResourceListItem key={resource._id} resource={resource} regions={regionsForThisResource} targets={targetsForThisResource} objectives={objectivesForThisResource} />
            )
          })}
      </div>
    )}
});

export default ResourceListPanel
