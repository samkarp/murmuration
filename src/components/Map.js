import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';

// const Map = () => (
//   <div>
//     <h2>Map</h2>
//     <p>This is going to be where the MAP will go.</p>
//   </div>
// );

var Map = React.createClass({
  componentDidMount: function() {
    console.log("I Did Mount");

    var map = this.map = L.map(ReactDOM.findDOMNode(this), {
      minZoom: 2,
      maxZoom: 20,
      layers: [
        L.tileLayer(
          'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          {attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})
      ],
      attributionControl: false,
    });


    map.on('click', this.onMapClick);
    map.fitWorld();
  },
  componentWillUnmount: function() {
    this.map.off('click', this.onMapClick);
    this.map = null;
  },
  onMapClick: function() {
    // Do some wonderful map things...
  },
  render: function() {
    return (
      <div className='map'></div>
    );
  }
});

export default Map;
