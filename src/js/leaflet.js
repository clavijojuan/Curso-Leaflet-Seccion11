// images
import markerImg from '../assets/images/marker.png';

// css
import '../../node_modules/leaflet/dist/leaflet.css';
import '../../node_modules/leaflet.locatecontrol/dist/L.Control.Locate.css';
import '../../node_modules/leaflet-sidebar/src/L.Control.Sidebar.css';
import '../../node_modules/leaflet-easybutton/src/easy-button.css';

// js
import * as L from 'leaflet';
import 'leaflet.locatecontrol';
import 'leaflet-sidebar';
import 'leaflet.smooth_marker_bouncing';
import 'leaflet-easybutton';
import { SimpleMapScreenshoter } from 'leaflet-simple-map-screenshoter'

L.Marker.prototype.setIcon(
    L.icon({
        iconUrl:markerImg,
        shadowUrl: undefined,
        iconSize: [30, 30],
        shadowSize: [30, 30],
    })
);

export {
    L,
    SimpleMapScreenshoter
}