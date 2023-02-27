const access_token = 'pk.eyJ1IjoiY2xhdmlqbyIsImEiOiJjbGQ3andnNm0xbXR5M3BtcWdoZTM0cXI3In0.vERGy1LqV1h_HZUAYxEYDw';


export const geocoder = ({
    keyword,
    limit = 40,
    lat,
    lng,
    bbox
}) => {
    const params = {
        access_token,
        limit,
        proximity: `${lng},${lat}`,
        language: 'es',
        country: 'co',
        types: 'poi',
        bbox
    }

    const searchParams = new URLSearchParams(params);
    const baseUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${keyword}.json?`
    return fetch(baseUrl+searchParams).then( res => res.json() )
}

export const router = ({ coords }) => {
    const params = {
        access_token,
        language: 'es',
        overview: 'simplified',
        geometries: 'geojson'
    }
    const searchParams = new URLSearchParams(params);
    const baseUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}?`;
    return fetch(baseUrl+searchParams).then( res => res.json() )
}