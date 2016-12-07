import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';

let config = {};
config.params = {
  center: [39.745, -104.99],
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

export class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      tileLayer: null,
      targetGroupLayer: null
      // geojsonLayer: null,
      // geojson: null,
      // subwayLinesFilter: '*',
      // numEntrances: null
    };
    this._mapNode = null;
    this.pointToLayer = this.pointToLayer.bind(this);
  }

  componentDidMount() {

    if (!this.state.map) this.init(this._mapNode);
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

    map.on('click', function (e) {
      alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
    });
    // set our state to include the tile layer
    this.setState({map, tileLayer});
  }

  addTargetLayer(targetsATL) {

    //Add the markers to the map if we have any selected targets
    if (targetsATL.length > 0) {

      //Clear the existing markers only if there already are some
      if (this.state.targetGroupLayer) {
        console.log("Clearning Layers");
        this.state.targetGroupLayer.clearLayers();
      }

      var markerArray = [];

      //Add a new marker for each target
      for (var i = 0; i < targetsATL.length; i++) {
        // var marker = new L.marker([targetsATL[i]._source.loc[1], targetsATL[i]._source.loc[0]]);
        markerArray.push(new L.marker([targetsATL[i]._source.loc[1], targetsATL[i]._source.loc[0]]));
      }

      //Add the markers to a featureGroup
      const targetGroupLayer = L.featureGroup(markerArray);

      //Add the group to the map
      targetGroupLayer.addTo(this.state.map);

      //Set the state so that we can use it later
      this.setState({targetGroupLayer});

      //Zoom to the group
      this.zoomToFeature(targetGroupLayer);

    }

  }

  zoomToFeature(target) {
    // pad fitBounds() so features aren't hidden under the Filter UI element
    var fitBoundsParams = {
      paddingTopLeft: [200, 10],
      paddingBottomRight: [10, 10],
      maxZoom: 14
    };
    // set the map's center & zoom so that it fits the geographic extent of the layer
    this.state.map.fitBounds(target.getBounds(), fitBoundsParams);
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
    console.log("Updating with targets:");
    console.log(this.props.targets);

    // if (this.state.map && !this.state.targetGroupLayer ) {
    if (prevProps.targets !== this.props.targets) {
      this.addTargetLayer(this.props.targets);
    }

  }

  render() {
    return (
      <div ref={(node) => this._mapNode = node } id='map' style={this.props.size}>Loading Map...</div>
    )
  }
}

export default Map
