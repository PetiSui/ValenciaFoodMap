"use client";

// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
//import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import MarkerWhatever from "../MarkerWhatever";
import Filters from "../Filters";
import { CategoryFilter } from "../CategoryFilter";
import { useEffect, useState } from "react";  
import MarkerIconUser from '../../../../public/marker-icon-2x-red.png';

type DetailsProps = {
  _id: string;
  address: string;
  name: string;
  lat: number;
  lng: number;
  photos?: string;
  url: string;
  categories?: string[];
};

type Props = {
  data: DetailsProps[];
};

type Coordinates = {
  lat: number;
  lng: number;
};

export default function Location(data: any) {
  const DEFAULT_LOCATION: Coordinates = {
    lat: 39.469468,
    lng: -0.3919,
  };

  const [userLocation, setUserLocation] = useState<Coordinates>(DEFAULT_LOCATION);

  useEffect(() => {
    navigator?.geolocation?.getCurrentPosition?.(
    (position) =>
      setUserLocation({
        lat: position?.coords?.latitude,
        lng: position?.coords?.longitude,
      }),
    (err) => console.log(err)
  );}, []);
  
  const userMarker = new L.Icon({
    iconUrl: MarkerIconUser.src,
    iconRetinaUrl: MarkerIconUser.src,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

  let arr = new Array(data.data);

  function MapEventsHandler() {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div className="flex flex-col self-start w-[85dvw] max-sm:mx-auto md:w-full sm:!px-[7vw] mt-6 mb-2">
        <h3 className="text-3xl font-semibold text-lightwhite self-start">
          <FontAwesomeIcon icon={faMapLocationDot} className="mr-4" />
          Mapa Interactivo
        </h3>
        <p className="text-xl font-light dark:text-neutral-300/95 text-neutral-700/95 self-start">
          Explora los mejores establecimientos por zonas
        </p>
      </div>
      <div className="w-[85dvw] max-md:mx-auto md:w-full self-start flex flex-wrap justify-between items-end gap-4 py-2 md:px-[7vw]">
        <Filters></Filters>
        <CategoryFilter></CategoryFilter>
      </div>
      <div className="w-[85vw] mx-auto mt-4 mb-8">
        <MapContainer
          center={DEFAULT_LOCATION}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "65vh", width: "85vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png"
          ></TileLayer>
          <Marker icon={userMarker} position={[userLocation?.lat, userLocation?.lng]}>
            <Popup autoPan={true}>
              <div>Estás aquí</div>
            </Popup>
          </Marker>
          {arr[0]?.map((details: any) => {
            return (
              <MarkerWhatever
                key={crypto.randomUUID()}
                details={details}
              ></MarkerWhatever>
            );
          })}
          <MapEventsHandler />
        </MapContainer>
      </div>
    </div>
  );
}
