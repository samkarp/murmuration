import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';

let config = {};
config.params = {
  center: [39.745,-104.99],
  zoom: 14,
  minZoom: 2,
  maxZoom: 20,
  zoomControl: true,
  attributionControl: false
};

config.tileLayer = {
  uri: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
  params: {}
};

export class Map extends  React.Component{

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      tileLayer: null,
      geojsonLayer: null,
      geojson: null,
      subwayLinesFilter: '*',
      numEntrances: null
    };
    this._mapNode = null;
    this.updateMap = this.updateMap.bind(this);
    // this.onEachFeature = this.onEachFeature.bind(this);
    this.pointToLayer = this.pointToLayer.bind(this);
    this.filterFeatures = this.filterFeatures.bind(this);
    this.filterGeoJSONLayer = this.filterGeoJSONLayer.bind(this);
  }

  componentDidMount(){

    if(!this.state.map) this.init(this._mapNode);
  }

  componentWillUnmount() {
    // code to run just before unmounting the component
    // this destroys the Leaflet map object & related event listeners
    this.state.map.remove();
  }

  init(id) {
    if (this.state.map) return;
    // this function creates the Leaflet map object and is called after the Map component mounts
    let map = L.map(id, config.params);

    // a TileLayer is used as the "basemap"
    const tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);

    // set our state to include the tile layer
    this.setState({ map, tileLayer });
  }

  getData() {
    // could also be an AJAX request that results in setting state with the geojson data
    // for simplicity sake we are just importing the geojson data using webpack's json loader
    this.setState({
      numEntrances: geojson.features.length,
      geojson
    });
  }

  updateMap(e) {
    let subwayLine = e.target.value;
    // change the subway line filter
    if (subwayLine === "All lines") {
      subwayLine = "*";
    }
    // update our state with the new filter value
    this.setState({
      subwayLinesFilter: subwayLine
    });
  }

  addGeoJSONLayer(geojson) {
    // create a native Leaflet GeoJSON SVG Layer to add as an interactive overlay to the map
    // an options object is passed to define functions for customizing the layer
    const geojsonLayer = L.geoJson(geojson, {
      onEachFeature: this.onEachFeature,
      pointToLayer: this.pointToLayer,
      filter: this.filterFeatures
    });
    // add our GeoJSON layer to the Leaflet map object
    geojsonLayer.addTo(this.state.map);
    // store the Leaflet GeoJSON layer in our component state for use later
    this.setState({ geojsonLayer });
    // fit the geographic extent of the GeoJSON layer within the map's bounds / viewport
    this.zoomToFeature(geojsonLayer);
  }

  filterGeoJSONLayer() {
    // clear the geojson layer of its data
    this.state.geojsonLayer.clearLayers();
    // re-add the geojson so that it filters out subway lines which do not match state.filter
    this.state.geojsonLayer.addData(geojson);
    // fit the map to the new geojson layer's geographic extent
    this.zoomToFeature(this.state.geojsonLayer);
  }

  zoomToFeature(target) {
    // pad fitBounds() so features aren't hidden under the Filter UI element
    var fitBoundsParams = {
      paddingTopLeft: [200,10],
      paddingBottomRight: [10,10]
    };
    // set the map's center & zoom so that it fits the geographic extent of the layer
    this.state.map.fitBounds(target.getBounds(), fitBoundsParams);
  }

  filterFeatures(feature, layer) {
    // filter the subway entrances based on the map's current search filter
    // returns true only if the filter value matches the value of feature.properties.LINE
    const test = feature.properties.LINE.split('-').indexOf(this.state.subwayLinesFilter);
    if (this.state.subwayLinesFilter === '*' || test !== -1) {
      return true;
    }
  }

  pointToLayer(feature, latlng) {
    // renders our GeoJSON points as circle markers, rather than Leaflet's default image markers
    // parameters to style the GeoJSON markers
    var markerParams = {
      radius: 4,
      fillColor: 'orange',
      color: '#fff',
      weight: 1,
      opacity: 0.5,
      fillOpacity: 0.8
    };

    return L.circleMarker(latlng, markerParams);
  }

  componentDidUpdate(prevProps, prevState) {
    // code to run when the component receives new props or state
    // check to see if geojson is stored, map is created, and geojson overlay needs to be added
    if (this.state.geojson && this.state.map && !this.state.geojsonLayer) {
      // add the geojson overlay
      this.addGeoJSONLayer(this.state.geojson);
    }

    // check to see if the subway lines filter has changed
    if (this.state.subwayLinesFilter !== prevState.subwayLinesFilter) {
      // filter / re-render the geojson overlay
      this.filterGeoJSONLayer();
    }
  }

  render(){
    return (
      <div ref={(node) => this._mapNode = node } id='map' style={this.props.size}>Loading Map...</div>
    )
  }
}

export default Map


// this.getDataFromServer('http://localhost:9200/murmuration_region/_search');

// showResult(geos) {
//   //console.log(response.hits.hits);
//   this.setState({
//     data: geos
//   });
// }
//
// //making ajax call to get data from server
// getDataFromServer(URL) {
//
//   console.log("Getting Data from Server");
//
//   $.ajax({
//     type:"GET",
//     dataType:"json",
//     url:URL,
//     success: function(response) {
//       var geometriesArray = [];
//       response.hits.hits.forEach( function(s) {
//         geometriesArray.push(s._source.loc.coordinates[0]);
//       });
//
//       console.log(geometriesArray);
//
//       this.showResult(geometriesArray);
//
//     }.bind(this),
//     error: function(xhr, status, err) {
//       console.error(this.props.url, status, err.toString());
//     }.bind(this)
//   });
// }

// var geojson = {
//   "type": "Feature",
//   "properties": {
//     "name": "Coors Field",
//     "amenity": "Baseball Stadium",
//     "popupContent": "This is where the Rockies play!"
//   },
//   "geometry": {
//     "type": "Polygon",
//     "coordinates": [[[-104.991653, 39.752262], [-105.000386, 39.745597], [-104.998498, 39.740053], [-104.987437, 39.740152], [-104.987383, 39.748987], [-104.991653, 39.752262]]]
//   }
// };
//
// const GetData = React.createClass({
//   //setting up initial state
//   getInitialState:function(){
//     return{
//       data:[]
//     };
//   },
//   componentDidMount(){
//     this.getDataFromServer('http://localhost:9200/murmuration_region/_search');
//   },
//   //showResult Method
//   showResult: function(geos) {
//     //console.log(response.hits.hits);
//     this.setState({
//       data: geos
//     });
//   },
//   //making ajax call to get data from server
//   getDataFromServer:function(URL){
//
//     $.ajax({
//       type:"GET",
//       dataType:"json",
//       url:URL,
//       success: function(response) {
//         var geometriesArray = [];
//         response.hits.hits.forEach( function(s) {
//           geometriesArray.push(s._source.loc.coordinates[0]);
//         });
//
//         this.showResult(geometriesArray);
//
//       }.bind(this),
//       error: function(xhr, status, err) {
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });
//   },
//   render:function(){
//     console.log(this.state.data)
//     return(
//       <div>
//         <RootMap result={this.state.data}/>
//       </div>
//     );
//   }
// });
//
// var RootMap = React.createClass({
//
//   getInitialState:function(){
//     return{
//       geos: []
//     };
//   },
//
//   componentDidMount: function() {
//
//     // console.log(this.state);
//
//     var map = this.map = L.map(ReactDOM.findDOMNode(this), {
//       minZoom: 2,
//       maxZoom: 20,
//       layers: [
//         L.tileLayer(
//           'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png')
//       ],
//       attributionControl: false
//     });
//
//     // console.log(this.state);
//
//     map.on('click', this.onMapClick);
//     map.setView([39.745,-104.99], 14);
//     // L.geoJSON(geojson).addTo(map);
//     console.log("adding to map")
//     console.log(this.props)
//     L.polygon(this.props).addTo(map);
//
//   },
//   componentWillUnmount: function() {
//     this.map.off('click', this.onMapClick);
//     this.map = null;
//   },
//   render: function() {
//     // console.log(this.props);
//     return (
//       <div className='map'></div>
//     );
//   }
// });
//
// export default GetData;
