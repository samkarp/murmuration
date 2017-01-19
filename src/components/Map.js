import React from 'react';
import L from 'leaflet';
import Draw from 'leaflet-draw';


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
      targetGroupLayer: null,
      regionGroupLayer: null,
      filterRegion: null,
      editableLayers: null
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

    const editableLayers = L.featureGroup();
    map.addLayer(editableLayers);

    // L.drawLocal.draw.toolbar.buttons.polygon = 'Draw a polygon';
    // L.drawLocal.draw.handlers.rectangle.tooltip.start = 'Not telling...';
    var options = {
      position: 'topright',
      draw: {
        polyline: false,
        polygon: {
          allowIntersection: false, // Restricts shapes to simple polygons
          drawError: {
            color: '#e1e100', // Color the shape will turn when intersects
            message: '<strong>Nope!<strong> You can\'t intersect yourself!' // Message that will show when intersect
          },
          shapeOptions: {
            color: '#bada55'
          }
        },
        circle: false, // Turns off this drawing tool
        marker: false,
        rectangle: {
          shapeOptions: {
            clickable: false
          }
        }
      },
      edit: {
        featureGroup: editableLayers, //REQUIRED!!
        remove: true
      }
    };

    var drawControl = new L.Control.Draw(options);
    map.addControl(drawControl);

    var _this = this;
    //Add the layer and fire the layer state
    map.on(L.Draw.Event.CREATED, function (e) {
      var type = e.layerType,
        layer = e.layer;

      console.log(layer.getLatLngs());
      //Clear the layers so that there is only one drawn item at a time
      editableLayers.clearLayers();

      editableLayers.addLayer(layer);

      _this.setState({filterRegion: layer.getLatLngs()[0]});
    });

    //Remove the layers and modify the layer state
    map.on(L.Draw.Event.DELETED, function (e) {
      //Clear the layers so that there is only one drawn item at a time
      editableLayers.clearLayers();

      _this.setState({filterRegion: null});

    });


    // set our state to include the tile layer
    this.setState({map, tileLayer});
  }

  addRegionLayer(regionsARL) {

    if(regionsARL.length > 0) {
      //Clear the existing markers only if there already are some
      if (this.state.regionGroupLayer) {
        console.log("Clearning Regions Layers");
        this.state.regionGroupLayer.clearLayers();
      }

      var geojsonArray = [];

      //Add a new marker for each target
      for (var i = 0; i < regionsARL.length; i++) {
        geojsonArray.push(new L.geoJSON((regionsARL[i]._source.loc)));
      }

      const regionGroupLayer = L.featureGroup(geojsonArray);
      this.setState({regionGroupLayer: regionGroupLayer});

      regionGroupLayer.addTo(this.state.map);

    } else {
      this.state.regionGroupLayer.clearLayers();
    }
  }

  addTargetLayer(targetsATL) {

    //Add the markers to the map if we have any selected targets
    if (targetsATL.length > 0) {

      //Clear the existing markers only if there already are some
      if (this.state.targetGroupLayer) {
        this.state.targetGroupLayer.clearLayers();
      }

      var markerArray = [];

      //Add a new marker for each target
      for (var i = 0; i < targetsATL.length; i++) {
        markerArray.push(new L.marker([targetsATL[i]._source.loc[1], targetsATL[i]._source.loc[0]]));
      }

      //Add the markers to a featureGroup
      const targetGroupLayer = L.featureGroup(markerArray);
      this.setState({targetGroupLayer: targetGroupLayer});

      //Add the group to the map
      targetGroupLayer.addTo(this.state.map);

      //Zoom to the group
      this.zoomToFeature(targetGroupLayer);

    } else { //If the current marker array is empty
      this.state.targetGroupLayer.clearLayers();
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

  // handleMapPolygonFilter(obj){
  //
  // }

  handleMapPolygonFilter(item) {
    this.props.onClick(item);
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
    console.log("Updating with updated items:"+new Date());

    // if(Object.keys(this.state.editableLayers._layers).length > 0) {
      if(prevState.filterRegion != this.state.filterRegion) {
        this.handleMapPolygonFilter(this.state.filterRegion);
      }


    function isTarget(entry) {
      return entry._type == "target"
    }

    function isRegion(entry) {
      return entry._type == "region"
    }

    var prevTgtArray = prevProps.items.filter(isTarget);
    var prevRgnArray = prevProps.items.filter(isRegion);
    var targetArray = this.props.items.filter(isTarget);
    var regionArray = this.props.items.filter(isRegion);

    // if (this.state.map && !this.state.targetGroupLayer ) {
    if (prevTgtArray.length !== targetArray.length) {
      this.addTargetLayer(targetArray);
    }
    if (prevRgnArray.length !== regionArray.length) {
      this.addRegionLayer(regionArray);
    }

  }

  render() {
    return (
      <div ref={(node) => this._mapNode = node } id='map' style={this.props.size}>Loading Map...</div>
    )
  }
}

export default Map
