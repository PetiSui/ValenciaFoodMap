"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultipleSelect, { Option } from "./MultipleSelect";

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

export default function Filters() {
  return (
    <div className="flex gap-4 self-center mt-2">
      <MultipleSelect
        className="self-center"
        defaultOptions={COST_OPTIONS}
        placeholder="Seleccione coste"
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            No se encontraron resultados
          </p>
        }
      />

      <MultipleSelect
        className="self-center"
        defaultOptions={RATING_OPTIONS}
        placeholder="Seleccione valoración"
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            No se encontraron resultados
          </p>
        }
      />
    </div>
  );
}
