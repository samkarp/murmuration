import React from 'react';
import TargetListItem from './TargetListItem'
import SearchObject from './SearchObject'

class TargetListPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      targets: []
    }
  }

  componentWillReceiveProps(nextProps) {

    if(this.props != nextProps) {
      this.setState({targets: nextProps.targets})
    }
  }


  handleClick(selection) {
    this.props.onClick(selection);
  }

  handleSearch(vals){
    console.log("Handling Search");

    var idArr = [vals.value];

    if(vals.value.indexOf(",") != -1){
      idArr = vals.value.split(",")
    }

    var tgts = [];

    this.props.targets.map(function(target){
      if(idArr.indexOf(target._id) != -1) {
        tgts.push(target);
      }
    });

    if(tgts.length == 0) {
      this.setState({targets: this.props.targets})

    } else {
      this.setState({targets: tgts})
    }
  }

  render() {

    var regions = this.props.regions;
    var resources = this.props.resources;
    var objectives = this.props.objectives;

    var functionToCall = this.handleClick;

    return (
      <div>
        <SearchObject items={this.props.targets} type={"Targets"} onChange={ (val) => this.handleSearch(val)}/>

        {this.state.targets.map(function (target) {

          //Filter the regions by using the RegionId of the target
          var regionsForThisTarget = regions.filter(function (region) {
            return region._id == target._source.regionid
          });
          var regionIDs = regionsForThisTarget.map(function (r) {
            return r._id
          });

          //Filter the resources by checking the previously found RegionIds
          var resourcesForThisTarget = resources.filter(function (resource) {

            for (var i = 0; i < resource._source.regionids.length; i++) {
              if (regionIDs.includes(resource._source.regionids[i])) {
                return true;
              }
            }
            return false;
          });

          //Filter the objectives by seeing if any of them contain the current TargetId
          var objectivesForThisTarget = objectives.filter(function (objective) {
            return objective._source.targets.includes(target._id)
          });

          return (
            <TargetListItem key={target._id} target={target} regions={regionsForThisTarget}
                            resources={resourcesForThisTarget} objectives={objectivesForThisTarget}
                            onClick={(e) => functionToCall(e)}/>
          )
        })}
      </div>
    )
  }
}

export default TargetListPanel
