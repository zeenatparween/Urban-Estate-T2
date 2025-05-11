import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./mapMapTiler.scss";

function MapMapTiler({ data, focusLatLng }) {
    const [curLat, setCurLat] = useState(focusLatLng.length == 2 ? focusLatLng[0] : 28.6);
    const [curLng, setCurLng] = useState(focusLatLng.length == 2 ? focusLatLng[1] : 77.21);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const zoom = focusLatLng.length == 2 ? 12 : 4;
    const API_KEY = import.meta.env.VITE_MAPLIBREGL_API_KEY;

    useEffect(() => {
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
            center: [curLng, curLat],
            zoom: zoom,
        });

        const el = document.createElement("div");
        el.className = "marker";

        for (const item of data) {
            const cordinates = item?.location?.coordinates || false;

            if (cordinates.length === 2) {
                new maplibregl.Marker(el).setLngLat([cordinates[1], cordinates[0]]).addTo(map.current);
            }
        }
    }, [API_KEY, zoom, data, curLat, curLng]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}
export default MapMapTiler;
