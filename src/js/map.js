import {
    L,
    SimpleMapScreenshoter
} from './leaflet';
import {  
    geocoder,
    router
 } from '../services/mapbox';
 import { fireToast } from './toast'


// variables
let bounds;
let route;

const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const gpsControl = L.control.locate({
    initialZoomLevel: 12,
    strings: {
        title: 'Ubicame'
    }
}).addTo(map);

const featureGroup = L.featureGroup().addTo(map);

featureGroup.on('layerremove', () => {
    const layers = featureGroup.getLayers();
    if( !layers.length ) sidebar.hide();
})


const sidebar = L.control.sidebar('sidebar', {
    position: 'right'
});

map.on('locationfound', () => {
    bounds = map.getBounds();
})

gpsControl.start();
map.addControl(sidebar);

L.easyButton('fas fa-home', () => {
    if( bounds ) map.fitBounds(bounds);
}).addTo(map);

L.easyButton('fas fa-rotate-right', () => {
    clearLayers();
}).addTo(map);

new SimpleMapScreenshoter().addTo(map)

// funciones

const createMarker = ([lng, lat]) => {
    const marker = L.marker([lat, lng]).setBouncingOptions({
        bounceHeight : 30,    // height of the bouncing
        bounceSpeed  : 54,    // bouncing speed coefficient
        exclusive    : true,  // if this marker is bouncing all others must stop
    });
    featureGroup.addLayer(marker);
    return marker
}

const geojsonRoute = (geoJson) => {
    if( route ) map.removeLayer( route );
    return L.geoJSON( geoJson, {
        style: () => {
            return {
                color: 'red',
                weight: 4,
                dashArray: '5, 10'
            }
        }
    } ).addTo(map)
}

const calculateRoute = ([ lng2, lat2 ]) => {
    const { lat, lng } = gpsControl._event.latlng;
    const coords = [
        [ lng, lat ].join(','),
        [ lng2, lat2].join(',')
    ].join(';')

    router({ coords }).then( response => {
        const { routes } = response;
        const { geometry } = routes[0];
        route = geojsonRoute( geometry );

        map.flyToBounds( route.getBounds() );
    })
}

const setSidebarContent = ( features ) => {

    const container = document.createElement('div');
    container.classList.add('mt-5')

    for(const feature of features) {
        
        const marker = createMarker( feature.center );

        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('m-2');

        card.addEventListener('mouseover', () => {
            marker.bounce();
        })

        card.addEventListener('mouseout', () => {
            marker.stopBouncing();
        })

        card.addEventListener('click', () => {
            calculateRoute( feature.center )
        })

        const body = document.createElement('div');
        body.classList.add('card-body');
        body.innerText = feature.place_name_es;

        card.append(body);
        container.append(card);
    }

    sidebar.setContent( container )
    sidebar.show();
}


export const geocode = ( keyword ) => {
    const bbox = [ bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth() ].join(',');
    const { lat, lng  } = gpsControl._event.latlng;
    geocoder({
        lat, 
        lng,
        keyword,
        bbox
    }).then( response => {
        const { features } = response;
        if( features.length ) {
            setSidebarContent(features);
            fireToast.success(`${ features.length } resultados encontrados`);
        }
        else {
            fireToast.error('No se encontraron coincidencias');
        }
    })
}

export const clearLayers = () => {
    featureGroup.clearLayers();
    if( route ) map.removeLayer( route );
}