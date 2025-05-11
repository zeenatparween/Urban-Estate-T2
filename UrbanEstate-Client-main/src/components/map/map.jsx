import "./map.scss";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/pin";
function Map({ items }) {
    console.log(items);
    return (
        <MapContainer center={[items[0].latitude, items[0].longitude]} zoom={7} scrollWheelZoom={false} className="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {items.map((item, index) => (
                <Pin key={index} item={item} />
            ))}
        </MapContainer>
    );
}

export default Map;
