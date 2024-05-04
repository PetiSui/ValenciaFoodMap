"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  faArrowDownAZ,
  faArrowDownZA,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultipleSelect, { Option } from "./MultipleSelect";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { useState } from "react";
import { ButtonIcon } from "./ButtonIcon";

const Euro = <FontAwesomeIcon icon={faEuroSign}></FontAwesomeIcon>;

const COST_OPTIONS: Option[] = [
  { label: `Económico`, value: "low", cost: "low" },
  { label: "Intermedio", value: "med", cost: "med" },
  { label: "Elevado", value: "high", cost: "high" },
];

const RATING_OPTIONS: Option[] = [
  { label: "1 estrella", value: "1", rating: 1 },
  { label: "2 estrellas", value: "2", rating: 2 },
  { label: "3 estrellas", value: "3", rating: 3 },
  { label: "4 estrellas", value: "4", rating: 4 },
  { label: "5 estrellas", value: "5", rating: 5 },
];

const ORDER_OPTIONS: Option[] = [
  { label: "A-Z", value: "A" },
  { label: "Z-A", value: "Z" },
];

export default function Filters() {
  const [AZ, setAz] = useState(true);

  return (
    // <ScrollArea className="whitespace-nowrap rounded-md w-full">
    <div className="glassmorphism filter_navbar flex gap-0 w-full overflow-visible items-center justify-center bg-neutral-600 bg-opacity-80 rounded p-4">
      <ButtonIcon
        className="bg-neutral-500 hover:bg-neutral-600 border-solid border-[1px] border-white  border-input px-3 py-2 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        handleOnClick={() => setAz((prev) => !prev)}
      >
        <FontAwesomeIcon
          size="xl"
          icon={AZ ? faArrowDownAZ : faArrowDownZA}
        ></FontAwesomeIcon>
      </ButtonIcon>
      <MultipleSelect
        className="self-center inline-block"
        defaultOptions={COST_OPTIONS}
        onChange={(a) => {
          console.log(a);
        }}
        placeholder="Coste"
        placeholderIcon={faEuroSign}
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            No se encontraron resultados
          </p>
        }
      />

      <MultipleSelect
        className="self-center inline-block"
        defaultOptions={RATING_OPTIONS}
        placeholder="Valoración"
        placeholderIcon={faStar}
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            No se encontraron resultados
          </p>
        }
      />
      {/* <MultipleSelect
        className="self-center inline-block"
        defaultOptions={ORDER_OPTIONS}
        placeholder="Orden alfabético"
        placeholderIcon={AZ ? faArrowDownAZ : faArrowDownZA}
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            No se encontraron resultados
          </p>
        }
      /> */}
    </div>
    //   <ScrollBar orientation="horizontal" />
    // </ScrollArea>
  );
}
