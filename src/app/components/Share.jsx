"use client"

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";

function share(link, name, address) {
  let shareData = {
    title: name,
    text: address,
    url: link,
  };

  if (navigator.share) {
    navigator
      .share(shareData)
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.error("Sharing failed:", error));
  }
}

const Share = ({ url, name, address }) => {
  return (
    <button
      title="Compartir"
      onClick={() => {
        share(url, name, address);
      }}
    >
      <FontAwesomeIcon
        icon={faShareNodes}
        size="lg"
        className="share"
      ></FontAwesomeIcon>
    </button>
  );
};

export default Share;
