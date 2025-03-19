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
              ? map.flyTo(new L.LatLng(e.latlng.lat, e.latlng.lng), map.getZoom())
              : map.flyTo(
                  new L.LatLng(e.latlng.lat + Math.max(0.0115, (0.0018 * (map.getZoom() - 4))), e.latlng.lng),
                  map.getZoom()
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
