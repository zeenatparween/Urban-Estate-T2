import { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./mapMarkerOne.scss";
import "/src/lib/locationIqGeocoder/maplibre-gl.css";
import "/src/lib/locationIqGeocoder/locationiq-gl-geocoder.css";

function MapMarkerOne({ setLatitude, setLongitude }) {
    const [curLat, setCurLat] = useState(28.6);
    const [curLng, setCurLng] = useState(77.21);
    const mapContainer = useRef(null);
    const markerRef = useRef(null);
    const map = useRef(null);
    const zoom = 8;
    const API_KEY = import.meta.env.VITE_MAPLIBREGL_API_KEY;
    const locationiqKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;

    const setCurrentPosition = (position) => {
        setCurLat(position.coords.latitude);
        setCurLng(position.coords.longitude);
    };

    useEffect(() => {
        if (map.current) return;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setCurrentPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
            center: [curLng, curLat],
            zoom: zoom,
        });

        map.current.addControl(new maplibregl.NavigationControl(), "top-right");

        map.current.on("click", function (e) {
            if (markerRef.current) {
                console.log(markerRef.current);
                markerRef.current.remove();
                setLatitude("");
                setLongitude("");
            }

            const el = document.createElement("div");
            el.className = "marker";

            let newMarker = new maplibregl.Marker(el).setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map.current);
            setLatitude(e.lngLat.lat);
            setLongitude(e.lngLat.lng);
            newMarker.getElement().addEventListener("click", function (event) {
                event.stopPropagation();
                newMarker.remove();
                setLatitude("");
                setLongitude("");
            });
            console.log(newMarker);
            markerRef.current = newMarker;
        });

        const scriptMaplibre = document.createElement("script");
        scriptMaplibre.src = "/src/lib/locationIqGeocoder/maplibre-gl.min.js";
        scriptMaplibre.async = true;
        scriptMaplibre.onload = () => {
            const script = document.createElement("script");
            script.src = "/src/lib/locationIqGeocoder/locationiq-gl-geocoder.min.js";
            script.async = true;
            script.onload = () => {
                // Initialize LocationIQ Geocoder
                map.current.addControl(
                    // eslint-disable-next-line no-undef
                    new MapboxGeocoder({
                        accessToken: locationiqKey,
                        mapboxgl: maplibregl,
                        limit: 10,
                        dedupe: 1,
                        marker: {
                            color: "red",
                        },
                        flyTo: {
                            screenSpeed: 3,
                            speed: 2,
                        },
                    }),
                    "top-left"
                );
            };

            document.body.appendChild(script);
        };

        document.body.appendChild(scriptMaplibre);

        return () => {
            document.body.removeChild(scriptMaplibre);
        };
    }, [API_KEY, curLat, curLng, setLatitude, setLongitude]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}

export default MapMarkerOne;
