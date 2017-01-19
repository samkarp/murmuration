import React from 'react';
import ResourceListItem from './ResourceListItem'
import SearchObject from './SearchObject'

class ResourceListPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      resources: []
    }
  }

  componentWillReceiveProps(nextProps) {

    if(this.props != nextProps) {
      this.setState({resources: nextProps.resources})
    }
  }

  handleClick(selection) {
    this.props.onClick(selection);
  }
  
  handleSearch(vals){
    console.log("Handling Objectives Search");
    console.log(vals);

    var idArr = [vals.value];

    if(vals.value.indexOf(",") != -1){
      idArr = vals.value.split(",")
    }

    var rsrs = [];

    this.props.resources.map(function(target){
      if(idArr.indexOf(target._id) != -1) {
        rsrs.push(target);
      }
    });

    if(rsrs.length == 0) {
      this.setState({resources: this.props.resources})

    } else {
      this.setState({resources: rsrs})
    }
  }

  render() {

    var targets = this.props.targets;
    var regions = this.props.regions;
    var objectives = this.props.objectives;

    return (
      <div>
        <SearchObject items={this.props.resources} type={"Resources"} onChange={ (val) => this.handleSearch(val)} />

          {this.state.resources.map(function(resource){

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
}

export default ResourceListPanel
