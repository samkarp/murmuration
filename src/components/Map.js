import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';

export class Map extends  React.Component{


  componentDidMount(){
    this.loadMap();
  }

  loadMap() {
    // if(this.props) {
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      this.map = L.map(node, {
        center: [39.745,-104.99],
        zoom: 14,
        minZoom: 2,
        maxZoom: 20,
        zoomControl: true,
        layers: [
          L.tileLayer(
            'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png')
        ],
        attributionControl: false
      });

    // }
  }

  render(){
    return (
      <div ref='map' style={this.props.size}>Loading Map...</div>
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
