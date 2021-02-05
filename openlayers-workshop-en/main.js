// alert('Hello Workshop');
import 'ol/ol.css';
import DragAndDrop from 'ol/interaction/DragAndDrop';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Modify from 'ol/interaction/Modify';
// import TileLayer from 'ol/layer/Tile';
// import XYZSource from 'ol/source/XYZ';
// import {fromLonLat} from 'ol/proj';
import View from 'ol/View';
import sync from 'ol-hashed';

const map = new Map({
  target: 'map-container',
  view: new View({
    center: [36, 0],
    zoom: 2
  })
});

sync(map);

//! [source]
const source = new VectorSource();
//! [source]

//! [layers]
const layer = new VectorLayer({
  source: source
});
map.addLayer(layer);
//! [layers]

//! [interaction]
//! [DragAndDrop]
map.addInteraction(new DragAndDrop({
  source: source,
  formatConstructors: [GeoJSON]
}));
//! [DragAndDrop]

//! [Modify]
map.addInteraction(new Modify({
  source: source
}));
//! [Modify]