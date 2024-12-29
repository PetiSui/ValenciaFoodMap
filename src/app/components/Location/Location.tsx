"use client";

// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
//import "leaflet-defaulticon-compatibility";

import {
  MapContainer,
  TileLayer
} from "react-leaflet";
import { Map } from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import MarkerWhatever from "../MarkerWhatever";
import Filters from "../Filters";
import { CategoryFilter } from "../CategoryFilter";

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

export default function Location(data: any) {
  const coordiantePoint = {
    lat: 39.469468,
    lng: -0.3919,
  };

  
  let arr = new Array(data.data);
  

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
    //const map = useMap();
    //
    //useMapEvents({
    //  click: (e) => {
    //    const { lat, lng } = e.latlng;
    //    alert(`Clicked at: ${lat}, ${lng}`);
    //    map.setView([lat, lng - 2], map.getZoom());
    //  },
    //});
    return null;
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div className="flex flex-col self-start w-[85dvw] max-sm:mx-auto md:w-full sm:!px-[9vw] mt-8 mb-8">
        <h3 className="text-3xl font-semibold text-lightwhite self-start">
          <FontAwesomeIcon icon={faMapLocationDot} className="mr-4" />
          Mapa Interactivo
        </h3>
        <p className="text-xl font-light text-lightwhite self-start">
          Explora los mejores establecimientos por zonas
        </p>
      </div>
      <div className="w-[85dvw] max-md:mx-auto md:w-full self-start flex flex-wrap justify-between items-end gap-4 py-2 md:px-[9vw] pb-4">
        <Filters></Filters>
        <CategoryFilter></CategoryFilter>
      </div>
      <div className="w-[85vw] mx-auto mt-8 mb-8">
        <MapContainer
          center={coordiantePoint}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "65vh", width: "85vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png"
          ></TileLayer>
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
