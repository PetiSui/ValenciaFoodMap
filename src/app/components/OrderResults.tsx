"use client";

import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownAZ,
  faArrowDownZA,
} from "@fortawesome/free-solid-svg-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Separator } from "../../components/ui/separator";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

const OrderResults = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  //console.log("PATHNAME", pathname);

  //console.log("SEARCHPARAMS", searchParams.toString());

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function orderBy(orderFilter: string): void {
    if (orderFilter != "AZ" && orderFilter != "ZA") return redirect(pathname);

    //redirect(pathname + "?" + createQueryString('order', orderFilter));
    //redirect(pathname + "?order=" + orderFilter);

    router.push(pathname + "?" + createQueryString('order', orderFilter));
  }

  return (
    <Select
      onValueChange={(value) => orderBy(value)}
      defaultValue={searchParams.get("order") || ""}
    >
      <SelectTrigger title="Ordenar por" className="w-fit !bg-lightwhite shadow-md dark:bg-neutral-700 dark:text-lightwhite !text-lightblack dark:bg-opacity-80 outline outline-1 outline-[rgba(82,82,82,0.4)] underline-offset-4">
        <FontAwesomeIcon
          icon={faArrowRightArrowLeft}
          rotation={90}
          className="mr-2"
        ></FontAwesomeIcon>
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent className="!bg-lightwhite !min-w-fit !p-1 !mt-1">
        <SelectGroup className="!bg-lightwhite border-0 outline-0">
          {/* <SelectLabel className="!bg-neutral-600 !text-lightwhite">Alfabético</SelectLabel> */}

          <SelectItem
            value="AZ"
            className="!bg-lightwhite !text-lightblack hover:!bg-lightblack hover:!text-lightwhite"
          >
            <FontAwesomeIcon
              icon={faArrowDownAZ}
              size="lg"
              className="mr-2"
            ></FontAwesomeIcon>
            Ascendente
          </SelectItem>
          {/* <Separator className="!bg-lightblack max-w-[60%] mx-auto my-1"></Separator> */}
          <SelectItem
            value="ZA"
            className="!bg-lightwhite !text-lightblack hover:!bg-lightblack hover:!text-lightwhite"
          >
            <FontAwesomeIcon
              icon={faArrowDownZA}
              size="lg"
              className="mr-2"
            ></FontAwesomeIcon>
            Descendente
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default OrderResults;
