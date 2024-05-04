"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Tags = ({ tags }) => {
  const [expanded, setExpanded] = useState(false);

  if (!tags || tags.length === 0) return;
  // console.log(tags);

  let categories = Array.from({ length: tags.length });
  const defaultNumberOfTags = 2;

  const baselineLength = tags.length > defaultNumberOfTags ? defaultNumberOfTags : tags.length;
  let length = expanded === true ? tags.length : baselineLength;

  for (let i = 0; i < length; i++) {
    categories[i] = (
      <span
        key={crypto.randomUUID()}
        className={["tag", tags[i].toLowerCase()].join(" ")}
      >
        {tags[i]}
      </span>
    );
  }

  return (
    <div className="tags_container">
      <div className="tags">
        {categories}
      </div>
      {tags.length > defaultNumberOfTags ? (
        <FontAwesomeIcon
          icon={faChevronDown}
          size="xl"
          className={`tag_expand ${
            expanded ? "fa-rotate-180" : "fa-rotate-360"
          } `}
          onClick={() => setExpanded((prev) => !prev)}
        ></FontAwesomeIcon>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Tags;
