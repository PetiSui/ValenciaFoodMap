import React from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import PopUpCard from "./PopUpCard";
import MarkerIcon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
import L from "leaflet";

export default function MarkerWhatever(props: any) {
  const map = useMap();

  return (
    <div>
      <Marker
        key={crypto.randomUUID()}
        eventHandlers={{
          click: (e) => {
            props?.smallMap
              ? map.flyTo(new L.LatLng(e.latlng.lat + 0.015, e.latlng.lng), 14)
              : map.flyTo(
                  new L.LatLng(e.latlng.lat + 0.03, e.latlng.lng),
                  13
                );
          },
        }}
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
        position={[props.details?.lat, props.details?.lng]}
      >
        <Popup autoPan={true}>
          <PopUpCard {...props.details} />
        </Popup>
      </Marker>
    </div>
  );
}
