"use client"

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocation } from "@fortawesome/free-solid-svg-icons";
import { useHover } from "@uidotdev/usehooks";

const Street = ({ address, url }) => {
  const [ref, hovering] = useHover();
  if (!address || !url) return;
  const StreetAddress = hovering ? (
    <FontAwesomeIcon
      icon={faMapLocation}
      bounce
      className="map"
    ></FontAwesomeIcon>
  ) : (
    <FontAwesomeIcon
      icon={faMapLocation}
      className="map"
    ></FontAwesomeIcon>
  );

  return (
    <div ref={ref} className="street_details" title="Dirección">
      {StreetAddress}
      <a href={url} target="_blank" className="address link">
        {address}
      </a>
    </div>
  );
};

export default Street;
