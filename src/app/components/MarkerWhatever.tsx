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
            //map.flyTo(e.latlng, 14);            
            props?.smallMap
              ? map.flyTo(
                  new L.LatLng(e.latlng.lat + 0.015, e.latlng.lng),
                  14
                )
              : map.flyTo(
                  new L.LatLng(e.latlng.lat + 0.015, e.latlng.lng),
                  map.getZoom()
                );
          },
        }}
        icon={
          new L.Icon({
            iconUrl: MarkerIcon.src,
            //iconUrl: markerIconsMap.get("almuerzos"),
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
          <div>
            <PopUpCard {...props.details} />
          </div>
        </Popup>
      </Marker>
    </div>
  );
}
