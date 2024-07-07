"use client";

// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
//import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L, { Map } from "leaflet";
import MarkerIcon from "../../../../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../../../../node_modules/leaflet/dist/images/marker-shadow.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import PopUpCard from "../PopUpCard";
import { useMapEvent } from 'react-leaflet/hooks'
import Markerwhatever from "../MarkerWhatever";

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
  data : DetailsProps[];
};

export default function Location(data: Props) {
  const coordiantePoint = {
    lat: 39.469468,
    lng: -0.3919,
  };
  
  //console.log(data);
  
  var arr = new Array(data.data);

  // arr[0].map((element: any) => {
  //   console.log(element);
    
  // })

  //console.log(arr);
  //const fnMap = useMap();

  const centerMarker = (position: { lat: number; lng: number }, fnMap: Map) => {
    fnMap.flyTo({
      lat: position.lat,
      lng: position.lng,
    });
  };

  type DetailsProps = {
    _id: string;
    address: string;
    name: string;
    lat: number;
    lng: number;
    url: string;
    photos?: string;
    categories?: string[];
  };

  

  function MapEventsHandler() {
    const map = useMap();

    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        alert(`Clicked at: ${lat}, ${lng}`);
        map.setView([lat, lng - 2], map.getZoom());
      },
    });
    return null;
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center w-[80vw] mx-auto">
      <h3 className="text-3xl font-semibold text-lightwhite self-start">
        <FontAwesomeIcon icon={faMapLocationDot} className="mr-6" />
        Mapa Interactivo
      </h3>
      <p className="text-xl font-light text-lightwhite self-start">
        Explora los establecimientos más destacados
      </p>
      <div className="mt-4">
        <MapContainer
          center={coordiantePoint}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "70vh", width: "80vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png"
          ></TileLayer>
           {arr[0].map((details: any) => {
            return <Markerwhatever key={crypto.randomUUID()} details={details}></Markerwhatever>;
            // return (
            //   <Marker
            //     key={crypto.randomUUID()}
            //     eventHandlers={{
            //       click: (e) => {
            //         map.flyTo({lat: 56, lng: 13}, 14);
            //       },
            //     }}
            //     icon={
            //       new L.Icon({
            //         iconUrl: MarkerIcon.src,
            //         iconRetinaUrl: MarkerIcon.src,
            //         iconSize: [25, 41],
            //         iconAnchor: [12.5, 41],
            //         popupAnchor: [0, -41],
            //         shadowUrl: MarkerShadow.src,
            //         shadowSize: [41, 41],
            //       })
            //     }
            //     position={[details?.lat, details?.lng]}
            //   >
            //     <Popup>
            //       <div>
            //         <PopUpCard {...details} />
            //       </div>
            //     </Popup>
            //   </Marker>
            // );
          })}
          <MapEventsHandler/>
        </MapContainer>
      </div>
    </div>
  );

  
}
