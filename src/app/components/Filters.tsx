"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultipleSelect, {Option} from "./MultipleSelect";

const Euro = <FontAwesomeIcon icon={faEuroSign}></FontAwesomeIcon>

const OPTIONS: Option[] = [
  { label: `Económico`, value: 'low', cost: "low"},
  { label: "Intermedio", value: 'med', cost: "med"},
  { label: 'Elevado', value: 'high', cost: "high" },
];

export default function Filters() {
  return (
    <div className="self-center mt-2">
      <MultipleSelect
      className="self-center"
        defaultOptions={OPTIONS}
        placeholder="Seleccione coste"
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            No se encontraron resultados
          </p>
        }
      />
    </div>
  );
}
