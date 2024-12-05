"use client";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerWhatever from "../MarkerWhatever";

// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

const SingleLocation = ({ datax }: any) => {
   
  const coordiantePoint = {
    lat: datax?.lat ?? 39.469468,
    lng: datax?.lng ?? -0.3919,
  };

  return (
    <MapContainer
      center={coordiantePoint}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "45vh", width: "60vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png"
      ></TileLayer>

      <MarkerWhatever
        key={crypto.randomUUID()}
        details={datax}
        smallMap={true}
      ></MarkerWhatever>
    </MapContainer>
  );
};

export default SingleLocation;
