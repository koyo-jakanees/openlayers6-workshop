// alert('Hello Workshop');
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import GeometryType from 'ol/geom/GeometryType';
import {DragAndDrop, Draw, Modify, Snap} from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import sync from 'ol-hashed';
// import Snap from 'ol/interaction/Snap';
// import TileLayer from 'ol/layer/Tile';
// import XYZSource from 'ol/source/XYZ';
// import {fromLonLat} from 'ol/proj';
import {Fill, Stroke, Style} from 'ol/style';
import {getArea} from 'ol/sphere';
import colormap from 'colormap';

const min = 1e8; // smallest area
const max = 2e13; // largest area
const steps = 75;
const colorramp = colormap({
  colormap: 'blackbody',
  nshades: steps
});

function clamp(value, low, high) {
  return Math.max(low, Math.min(value, high));
}

function getColor(feature) {
  const area = getArea(feature.getGeometry());
  const f = Math.pow(clamp((area - min) / (max - min), 0, 1), 1 / 2);
  const index = Math.round(f * (steps - 1));
  return colorramp[index];
}

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
/**
 * const layer = new VectorLayer({
 *  source: source,
 *  style: function(feature, resolution) {
 *  const name = feature.get('name').toUpperCase();
 *   return name < "N" ? style1 : style2; // assuming these are created elsewhere
 *  }
 * });
 */
const layer = new VectorLayer({
  source: source,
  style: function(feature) {
    return new Style({
      fill: new Fill({
        color: getColor(feature)
      }),
      stroke: new Stroke({
        color: 'rgba(255,255,255,0.8)'
      })
    });
  }
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

//! [Draw]
map.addInteraction(new Draw({
  source: source,
  type: GeometryType.POLYGON
}));
//! [Draw]
//! [Snap]
map.addInteraction(new Snap({
  source: source
}));
//! [Snap]
//! [interaction]

//! [Clear]
const clear = document.getElementById('clear');
clear.addEventListener('click', function() {
  source.clear();
});
//! [Clear]

//! [Download]
const format = new GeoJSON({featureProjection: 'EPSG:3857'});
const download = document.getElementById('download');
source.on('change', function() {
  const features = source.getFeatures();
  const json = format.writeFeatures(features);
  download.href = 'data:text/json;charset=utf-8,' + json;
});
//! [Download]
