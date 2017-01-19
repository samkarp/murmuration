import React from 'react';
import Map from './Map';
import Sidebar from './Sidebar';
import axios from 'axios';

function isMarkerInsidePolygon(marker, poly) {
  // var x = marker.lat, y = marker.lng;
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

  inside(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];

      var intersect = ((yi > y) != (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }

    return inside;
  }

  updateMap(object) {

    // console.log(object);

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
    console.log(polygon);

    var filteredTgts = [];
    if(polygon != null) {
      this.state.targets.map(function (target) {

        if(isMarkerInsidePolygon(target._source.loc, polygon)){
          filteredTgts.push(target);
        }
      });
    } else {
      filteredTgts = this.state.targets;
    }

    this.setState({filteredTargets: filteredTgts});

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
