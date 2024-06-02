"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { faEuroSign, faFilter, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  faArrowDownAZ,
  faArrowDownZA,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultipleSelect, { Option } from "./MultipleSelect";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { FormEvent, useState } from "react";
import { ButtonIcon } from "./ButtonIcon";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { cn } from "../../lib/utils";
import { Toggle } from "../../components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";

const Euro = <FontAwesomeIcon icon={faEuroSign}></FontAwesomeIcon>;
const Star = <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>;

const COST_OPTIONS: any = [
  { label: `Económico`, value: "low", cost: "1", icon: <>{Euro}</> },
  {
    label: "Intermedio",
    value: "med",
    cost: "2",
    icon: (
      <>
        {Euro}
        {Euro}
      </>
    ),
  },
  {
    label: "Elevado",
    value: "high",
    cost: "3",
    icon: (
      <>
        {Euro}
        {Euro}
        {Euro}
      </>
    ),
  },
];

const RATING_OPTIONS: any = [
  { label: "o más", value: "1", rating: 1, icon: <>{Star}</> },
  {
    label: "o más",
    value: "2",
    rating: 2,
    icon: (
      <>
        {Star}
        {Star}
      </>
    ),
  },
  {
    label: "o más",
    value: "3",
    rating: 3,
    icon: (
      <>
        {Star}
        {Star}
        {Star}
      </>
    ),
  },
  {
    label: "o más",
    value: "4",
    rating: 4,
    icon: (
      <>
        {Star}
        {Star}
        {Star}
        {Star}
      </>
    ),
  },
  {
    label: "o más",
    value: "5",
    rating: 5,
    icon: (
      <>
        {Star}
        {Star}
        {Star}
        {Star}
        {Star}
      </>
    ),
  },
];

const ORDER_OPTIONS: Option[] = [
  { label: "A-Z", value: "A" },
  { label: "Z-A", value: "Z" },
];



export default function Filters() {
  const [AZ, setAz] = useState(true);
  const [openFilters, setOpenFilters] = useState(false);
  const [costFilters, setCostFilters] = useState([]);
  const [ratingFilters, setRatingFilters] = useState([]);

  function addCostFilter(filter:string){

  }

  function handleFilters(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    console.log("HANDLE FILTERS");
    setOpenFilters(prev => !prev);
  }

  function FilterForm({ className }: React.ComponentProps<"form">) {
    return (
      <form className={cn("grid items-start gap-4 z-[999]", className)} onSubmit={(e) => handleFilters(e)}>
        <div className="grid gap-2">
          <Label htmlFor="email">Coste</Label>
          <div className="flex flex-wrap gap-4">
            {COST_OPTIONS.map((item: any) => {
              return (
                <Toggle
                  key={crypto.randomUUID()}
                  variant="outline"
                  className="outline outline-1 outline-neutral-700 hover:bg-neutral-300"
                  aria-label="Toggle italic"
                  onClick={()=>{addCostFilter(item.value)}}
                >
                  {item.icon}
                  <span className="ml-4">{item.label}</span>
                </Toggle>
              );
            })}
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">Valoración</Label>
          <div className="flex flex-wrap mb-2">
            <ToggleGroup type="single" variant={"outline"} className="gap-4 flex-wrap justify-start">
              {RATING_OPTIONS.map((item: any) => {
                return (
                  <ToggleGroupItem
                    key={crypto.randomUUID()}
                    value={item.value}
                    aria-label="Toggle bold"
                    className="outline outline-1 outline-neutral-700 hover:bg-neutral-300"
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </div>
        </div>
        <Button type="submit" variant="outline" className="dark:bg-lightwhite dark:hover:bg-neutral-300 dark:hover:text-lightblack text-lightwhite bg-lightblack hover:bg-neutral-800 hover:text-lightwhite dark:text-lightblack">
          Aplicar
        </Button>
      </form>
    );
  }

  return (
    <Drawer open={openFilters} onOpenChange={setOpenFilters}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="shadow-md">
          <FontAwesomeIcon icon={faFilter} className="mr-2"></FontAwesomeIcon>
          Filtros</Button>
      </DrawerTrigger>
      <DrawerContent className="dark:text-lightwhite z-[99999] outline dark:outline-neutral-400 dark:bg-lightblack bg-lightwhite opacity-95 backdrop-blur">
        <DrawerHeader className="text-left mb-2">
          <DrawerTitle>Filtros</DrawerTitle>
          <DrawerDescription className="opacity-95">Añade filtros a la búsqueda.</DrawerDescription>
          <Separator className="dark:bg-lightwhite bg-lightblack opacity-30 mt-1" />
        </DrawerHeader>
        <FilterForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button className="dark:bg-neutral-800 dark:text-lightwhite dark:hover:bg-neutral-700 bg-neutral-200 hover:bg-neutral-300 hover:text-lightwhite text-lightblack">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    // <div className="glassmorphism filter_navbar flex gap-4 mx-auto w-[90%] h-[8vh] overflow-visible items-center justify-center bg-neutral-600 bg-opacity-80 rounded p-4">
    //   <ButtonIcon
    //     className="bg-neutral-500 hover:bg-neutral-600 border-solid border-[1px] border-white  border-input px-3 py-2 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
    //     handleOnClick={() => setAz((prev) => !prev)}
    //   >
    //     <FontAwesomeIcon
    //       size="xl"
    //       icon={AZ ? faArrowDownAZ : faArrowDownZA}
    //     ></FontAwesomeIcon>
    //   </ButtonIcon>
    //   <MultipleSelect
    //     className="self-center inline-block"
    //     defaultOptions={COST_OPTIONS}
    //     onChange={(a) => {
    //       console.log(a);
    //     }}
    //     placeholder="Coste"
    //     placeholderIcon={faEuroSign}
    //     emptyIndicator={
    //       <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
    //         No se encontraron resultados
    //       </p>
    //     }
    //   />

    //   <MultipleSelect
    //     className="self-center inline-block"
    //     defaultOptions={RATING_OPTIONS}
    //     placeholder="Valoración"
    //     placeholderIcon={faStar}
    //     emptyIndicator={
    //       <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
    //         No se encontraron resultados
    //       </p>
    //     }
    //   />
    //   {/* <MultipleSelect
    //     className="self-center inline-block"
    //     defaultOptions={ORDER_OPTIONS}
    //     placeholder="Orden alfabético"
    //     placeholderIcon={AZ ? faArrowDownAZ : faArrowDownZA}
    //     emptyIndicator={
    //       <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
    //         No se encontraron resultados
    //       </p>
    //     }
    //   /> */}
    // </div>
  );
}
