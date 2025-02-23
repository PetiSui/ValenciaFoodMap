"use client"
import { MultiSelect } from "@/components/multi-select";
import { Constants } from "@/lib/constants";
import { useDebounce } from "@/lib/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function CategoryFilter() {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );




  let categoriesFilterList : any = [];
  Constants.CATEGORIES.forEach(categoria => categoriesFilterList.push({label: categoria, value: categoria}));

  // const [selectedCategoriesToFilter, setSelectedCategoriesToFilter] = useState<string[]>(params.get("categories")?.split(",") || []);
  const [selectedCategoriesToFilter, setSelectedCategoriesToFilter] = useState<string[]>(params.get("categories") != undefined && params.get("categories") != "all" ? params.get("categories")!.split(",") : []);
  const debouncedSelectedFrameworks = useDebounce(selectedCategoriesToFilter, 600);

  useEffect( () => {
    debouncedSelectedFrameworks.length > 0 ? router.push(pathname + "?" + createQueryString('categories', debouncedSelectedFrameworks.join(","))) : router.push(pathname + "?" + createQueryString('categories', 'all'));
  }, [debouncedSelectedFrameworks])

  return (
    <div className="max-w-xl">
        <MultiSelect
          options={categoriesFilterList}
          onValueChange={(values: string[]) => setSelectedCategoriesToFilter(values)}
          defaultValue={debouncedSelectedFrameworks}
          placeholder="Categorías"
          variant="inverted"
          animation={1}
          maxCount={2}
          className="bg-lightwhite hover:bg-neutral-300 text-lightblack shadow-md mt-3"
        />
    </div>
  );
}
