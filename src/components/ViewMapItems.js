import React from 'react';
import Map from './Map';
import Sidebar from './Sidebar';
import axios from 'axios';


function isPointInsidePolygon(marker, poly) {
  // ray-casting algorithm
  var x = marker[1], y = marker[0];

  var inside = false;
  for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    var xi = poly[i].lat, yi = poly[i].lng;
    var xj = poly[j].lat, yj = poly[j].lng;

    var intersect = ((yi > y) != (yj > y))
      && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }

  return inside;
}

//Check if any points in a Region are within the Search polygon
function doesPolygonIntersectPolygon(regionPoly, searchPoly) {
  //For each point
  for(var i = 0; i < regionPoly.length; i++) {
    if(isPointInsidePolygon(regionPoly[i], searchPoly)){
      return true;
    }
  }
  return false;

}


class ViewMapItems extends React.Component {

  constructor(props) {
    super(props);
    this.updateMap = this.updateMap.bind(this);
    this.state = {
      selectedItems: [],
      targets: [],
      regions: [],
      resources: [],
      objectives: [],
      filteredTargets: [],
      filteredRegions: [],
      filteredResources: [],
      filteredObjectives: [],
      polygonBounds: null
    }
  }

  componentDidMount() {
    var _this = this;
    this.serverRequest =
      axios
        .get("http://localhost:9200/murmuration_target/_search")
        .then(function (result) {
          _this.setState({
            targets: result.data.hits.hits,
            filteredTargets: result.data.hits.hits
          });
        });
    this.serverRequest =
      axios
        .get("http://localhost:9200/murmuration_region/_search")
        .then(function (result) {
          _this.setState({
            regions: result.data.hits.hits,
            filteredRegions: result.data.hits.hits
          });
        });
    this.serverRequest =
      axios
        .get("http://localhost:9200/murmuration_resource/_search")
        .then(function (result) {
          _this.setState({
            resources: result.data.hits.hits,
            filteredResources: result.data.hits.hits
          });
        });
    this.serverRequest =
      axios
        .get("http://localhost:9200/murmuration_objective/_search")
        .then(function (result) {
          _this.setState({
            objectives: result.data.hits.hits,
            filteredObjectives: result.data.hits.hits
          });
        });
  }

  updateMap(object) {

    var newArray = this.state.selectedItems.slice();
    if (!newArray.includes(object)) {
      newArray.push(object);
    } else {
      newArray.splice(newArray.indexOf(object), 1)
    }

    this.setState({selectedItems: newArray});

  }

  filterItems(polygon) {
    console.log("Filtering Items");

    var filteredTgts = [];
    var targetIds = [];
    var filteredRgns = [];
    var regionIds = [];
    var filteredObjs = [];
    var filteredRsrs = [];
    console.log(this.state.objectives);
    console.log(this.state.resources);

    if(polygon != null) {
      this.state.targets.map(function (target) {

        if(isPointInsidePolygon(target._source.loc, polygon)){
          filteredTgts.push(target);
          targetIds.push(target._id);
        }
      });

      this.state.regions.map(function (region) {

        if(doesPolygonIntersectPolygon(region._source.loc.coordinates[0], polygon)){
          filteredRgns.push(region);
          regionIds.push(region._id)
        }
      });

      this.state.objectives.map(function (objective) {

        if(targetIds.some(tId=> objective._source.targets.includes(tId))) {
          filteredObjs.push(objective);
        }
      });

      this.state.resources.map(function (resource) {
        if(regionIds.some(rId=> resource._source.regionids.includes(rId))) {
          filteredRsrs.push(resource);
        }
      });

    } else {
      filteredTgts = this.state.targets;
      filteredRgns = this.state.regions;
      filteredObjs = this.state.objectives;
      filteredRsrs = this.state.resources;
    }

    this.setState({filteredTargets: filteredTgts, filteredRegions: filteredRgns,
                  filteredObjectives: filteredObjs, filteredResources: filteredRsrs});

  }

  render() {

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 sidebar">
            <Sidebar onClick={(e) => this.updateMap(e)} targets={this.state.targets}
                     regions={this.state.regions} objectives={this.state.objectives}
                     resources={this.state.resources} filteredTargets={this.state.filteredTargets}
                     filteredRegions={this.state.filteredRegions} filteredObjectives={this.state.filteredObjectives}
                     filteredResources={this.state.filteredResources}/>
          </div>
          <div className="col-md-9 map">
            <Map size={{width: '72vw', height: '85vh'}} items={this.state.selectedItems} onClick={(e) => this.filterItems(e)}/>
          </div>
        </div>
      </div>
    )
  }
}

export default ViewMapItems
