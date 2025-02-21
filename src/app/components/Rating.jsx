import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStarHalf as faStarHalfSolid } from "@fortawesome/free-solid-svg-icons";

const Rating = ({ starCount }) => {
  if (!starCount) return null;

  let MAX_RATING = 5;
  let rating = parseFloat(starCount);
  if (rating > MAX_RATING) {
    rating = MAX_RATING;
  }
  if (rating < 0.0) {
    rating = 0.0;
  }
  let wholeStars = Math.floor(rating);

  let stars = Array.from({ length: MAX_RATING });

  let i;
  for (i = 0; i < wholeStars; i++) {
    stars[i] = (
      <FontAwesomeIcon
        icon={faStarSolid}
        className="star"
        key={i}
      ></FontAwesomeIcon>
    );
  }

  if (rating - wholeStars > 0 && rating - wholeStars < 1) {
    stars[i] = (
      <FontAwesomeIcon
        icon={faStarHalfSolid}
        className="star half-star"
        key={i}
      ></FontAwesomeIcon>
    );
  }

  return (
    <div className="rating flex flex-col items-start gap-[.15rem]">
      <p className="text-white drop-shadow-xl drop-shadow-black text-m mr-2 border border-neutral-500/55 bg-neutral-400/55 hover:bg-neutral-400/75 transition-all rounded pt-[.15rem] pb-[.075rem] px-[.15rem]">
        {rating}
      </p>
      <div>{stars}</div>
    </div>
  );
};

export default Rating;
