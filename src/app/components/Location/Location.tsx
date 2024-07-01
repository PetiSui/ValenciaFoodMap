"use client";

// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L, { Map } from "leaflet";
import MarkerIcon from "../../../../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../../../../node_modules/leaflet/dist/images/marker-shadow.png";

export default function Location(props:any) {
  const coordiantePoint = {
    lat: 39.469468,
    lng: -0.391900,
  };

  const centerMarker = (position: { lat: number; lng: number }, fnMap: Map) => {
    fnMap.flyTo({
      lat: position.lat,
      lng: position.lng,
    });
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <h3 className="text-2xl text-lightwhite">Mapa Interativo</h3>
      <div className="h-full">
        <MapContainer
          center={coordiantePoint}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "70vh", width: "60vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png"
          ></TileLayer>
          <Marker
            icon={
              new L.Icon({
                iconUrl: MarkerIcon.src,
                iconRetinaUrl: MarkerIcon.src,
                iconSize: [25, 41],
                iconAnchor: [12.5, 41],
                popupAnchor: [0, -41],
                shadowUrl: MarkerShadow.src,
                shadowSize: [41, 41],
              })
            }
            position={[39.469468, -0.391900]}
          ></Marker>
        </MapContainer>
      </div>
    </div>
  );
}
