// alert('Hello Workshop');
import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
// import TileLayer from 'ol/layer/Tile';
// import XYZSource from 'ol/source/XYZ';
// import {fromLonLat} from 'ol/proj';
import View from 'ol/View';

new Map({
  target: 'map-container',
  layers: [
    new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: './data/countries.json'
      })
    })
  ],
  view: new View({
    center: [36, 0],
    zoom: 2
  })
});
