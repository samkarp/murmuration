import React from 'react';
import ObjectiveListItem from './ObjectiveListItem'
import SearchObject from './SearchObject'

class ObjectiveListPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      objectives: []
    }
  }

  handleClick(selection) {
    this.props.onClick(selection);
  }

  componentWillReceiveProps(nextProps) {

    if(this.props != nextProps) {
      this.setState({objectives: nextProps.objectives})
    }
  }


  handleSearch(vals){
    console.log("Handling Objectives Search");
    console.log(vals);

    var idArr = [vals.value];

    if(vals.value.indexOf(",") != -1){
      idArr = vals.value.split(",")
    }

    var objs = [];

    this.props.objectives.map(function(target){
      if(idArr.indexOf(target._id) != -1) {
        objs.push(target);
      }
    });

    if(objs.length == 0) {
      this.setState({objectives: this.props.objectives})

    } else {
      this.setState({objectives: objs})
    }
  }

  render() {

    var targets = this.props.targets;
    var regions = this.props.regions;
    var resources = this.props.resources;

    return (
      <div>

        <SearchObject items={this.props.objectives} type={"Objectives"} onChange={ (val) => this.handleSearch(val)} />

          {this.state.objectives.map(function(objective){

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
}

export default ObjectiveListPanel
