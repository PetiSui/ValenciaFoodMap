"use client";

import { React, useState, useEffect, use } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faEmptyHeart } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePrefersColorScheme from "use-prefers-color-scheme";

const LikeButton = ({ id }) => {
  let [clicked, setClicked] = useState(false);
  let [liked, setLiked] = useState(false);

  //console.log("RENDER", id);

  useEffect(() => {
    if (global?.localStorage?.getItem("likedEstablishments") === null) {
      //localStorage entry does not exist yet
      global?.localStorage?.setItem("likedEstablishments", "[]");
      console.log("LOCALSTORAGE ENTRY DID NOT EXIST");
    }

    if (global?.localStorage?.getItem("likedEstablishments") !== null) {
      let arr = JSON.parse(
        global?.localStorage?.getItem("likedEstablishments")
      );

      console.log("ARRAY ANTES");
      console.dir(arr);

      let found = arr.includes(id);
      found ? setLiked(true) : setLiked(false);
    }
  }, []);

  const prefersColorScheme = usePrefersColorScheme();
  const colorScheme = prefersColorScheme === "dark" ? "light" : "dark";

  const notifyLiked = () =>
    toast.success("Me gusta! 😄", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: colorScheme,
    });
  const notifyDisliked = () =>
    toast.info("No me gusta 😟", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: colorScheme,
    });

  const handleLiked = () => {
    if (
      global?.window !== undefined &&
      global?.localStorage?.getItem("likedEstablishments") !== null
    ) {
      let arr = JSON.parse(
        global?.localStorage?.getItem("likedEstablishments")
      );

      // console.log("ARRAY ANTES");
      // console.dir(arr);

      let found = arr.includes(id);

      // console.log("FOUND", found);

      let likedEstablishments = found
        ? [...arr].filter((item) => {
            console.log(item);
            return item != id;
          })
        : [...arr, id];

      // console.log("ARRAY DESPUES", likedEstablishments);

      let likedJSONEstablishments = JSON.stringify(likedEstablishments);
      // console.log("PARSEADO", likedJSONEstablishments);
      localStorage.setItem("likedEstablishments", likedJSONEstablishments);

      found ? notifyDisliked() : notifyLiked();
      found ? setLiked(false) : setLiked(true);
    } else {
      console.log("ERROR ONCLICK");
    }
  };

  return (
    <>
      <button
        title="Me gusta"
        className="like_button"
        onClick={() => {
          setClicked(true);
          handleLiked();
        }}
        clicked={clicked.toString()}
      >
        {liked ? (
          <FontAwesomeIcon
            icon={faHeart}
            className="like"
            size="xl"
            data-liked={clicked.toString()}
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            icon={faEmptyHeart}
            className="like"
            size="xl"
          ></FontAwesomeIcon>
        )}
      </button>
    </>
  );
};

export default LikeButton;
