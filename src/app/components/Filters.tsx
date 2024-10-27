"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faEuroSign,
  faFilter
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useCallback, useState } from "react";


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
import { Label } from "../../components/ui/label";
import { cn } from "../../lib/utils";
import { Toggle } from "../../components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';

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
  { label: "o más", value: "1", rating: 0.6, icon: <>{Star}</> },
  {
    label: "o más",
    value: "2",
    rating: 1.6,
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
    rating: 2.6,
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
    rating: 3.6,
    icon: (
      <>
        {Star}
        {Star}
        {Star}
        {Star}
      </>
    ),
  },
  // {
  //   label: "",
  //   value: "5",
  //   rating: 4.6,
  //   icon: (
  //     <>
  //       {Star}
  //       {Star}
  //       {Star}
  //       {Star}
  //       {Star}
  //     </>
  //   ),
  // },
];



export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const urlCostFilter = searchParams.get('cost')?.replace(' ','').split(",") || [];
  const urlRatingFilter = searchParams.get('rating')?.replace(' ','') || "";

  const [AZ, setAz] = useState(true);
  const [openFilters, setOpenFilters] = useState(false);
  const [costFilters, setCostFilters] = useState<string[]>(urlCostFilter);
  const [ratingFilter, setRatingFilter] = useState(urlRatingFilter);

  function addCostFilter(filter: string) {
    if (costFilters.includes(filter)) {
      let newCostFilters = costFilters.filter(
        (costFilter) => costFilter != filter
      );
      setCostFilters((prev) => newCostFilters);
    } else {
      setCostFilters([...costFilters, filter]);
    }
  }

  function handleFilters(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Los filtros de coste son: ", costFilters);
    console.log("El filtro de valoracion es: ", ratingFilter);
    
    setOpenFilters((prev) => !prev);

    const params = new URLSearchParams(searchParams.toString());
    ratingFilter != "" && params.set('rating', ratingFilter);
    costFilters.length > 0 && params.set('cost', costFilters.toString().replace("[","").replace("]",""));
    params.set("page", "1");
    
    router.push(pathname + "?" + params);
  }

  function FilterForm({ className }: React.ComponentProps<"form">) {
    return (
      <form
        className={cn("grid items-start gap-4 z-[999]", className)}
        onSubmit={(e) => handleFilters(e)}
      >
        <div className="grid gap-2">
          <Label htmlFor="email">Coste</Label>
          <div className="flex flex-wrap gap-4">
            {COST_OPTIONS.map((item: any) => {
              return (
                <Toggle
                  key={crypto.randomUUID()}
                  variant="outline"
                  className={`outline outline-1 outline-neutral-700 hover:bg-neutral-300 ${costFilters.includes(item.value) ? " dark:bg-neutral-600" : ""}`}
                  aria-label="Toggle italic"
                  onClick={(e) => {
                    e.preventDefault();
                    addCostFilter(item.value);
                  }}
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
            <ToggleGroup
              type="single"
              variant={"outline"}
              className="gap-4 flex-wrap justify-start"
              onValueChange={(value: string) => {
                if(!value){return;}
                setRatingFilter(prev => value);
              }}
            >
              {RATING_OPTIONS.map((item: any) => {
                return (
                  <ToggleGroupItem
                    key={crypto.randomUUID()}
                    value={item.value}
                    aria-label={`${item.value} estrellas o más`}
                    className={`outline outline-1 outline-neutral-700 hover:bg-neutral-300 ${ratingFilter === item.value ? " dark:bg-neutral-600" : ""}`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </div>
        </div>
        <Button
          type="submit"
          variant="outline"
          className="dark:bg-lightwhite dark:hover:bg-neutral-300 dark:hover:text-lightblack text-lightwhite bg-lightblack hover:bg-neutral-800 hover:text-lightwhite dark:text-lightblack"
        >
          Aplicar
        </Button>
      </form>
    );
  }

  return (
    <Drawer open={openFilters} onOpenChange={setOpenFilters}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="shadow-md bg-lightwhite hover:bg-neutral-300" title="Filtros">
          <FontAwesomeIcon icon={faFilter} className="mr-2"></FontAwesomeIcon>
          Filtros
        </Button>
      </DrawerTrigger>
      <DrawerContent className="dark:text-lightwhite z-[99999] dark:bg-lightblack bg-lightwhite opacity-95 backdrop-blur">
        <DrawerHeader className="text-left mb-2">
          <DrawerTitle>Filtros</DrawerTitle>
          <DrawerDescription className="opacity-95">
            Añade filtros a la búsqueda.
          </DrawerDescription>
          <Separator className="dark:bg-lightwhite bg-lightblack opacity-30 mt-1" />
        </DrawerHeader>
        <FilterForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button className="dark:bg-neutral-800 dark:text-lightwhite dark:hover:bg-neutral-700 bg-neutral-200 hover:bg-neutral-300 hover:text-lightwhite text-lightblack">
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
