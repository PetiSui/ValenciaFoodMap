"use client"

import { redirect, usePathname, useSearchParams } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "../../components/ui/pagination";
import { useCallback } from "react";

  type Props = {
    pageNumber: number,
    totalPages: number
  }

export default function Paginacion({pageNumber, totalPages}: Props) {

  let x = 0;

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string | number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value.toString());

      return params.toString();
    },
    [searchParams]
  );

  // if (
  //   (searchParams["page"] as string) !== undefined &&
  //   isNaN(parseInt(searchParams["page"] as string))
  // ) {
  //redirect("/descubrir?page=1");
  //}

  if(isNaN(pageNumber) || isNaN(totalPages)){
    redirect(pathname + "?" + createQueryString("page", 1));
  }

  if (pageNumber < 1) {
    //pageNumber = 1;
    redirect(pathname + "?" + createQueryString("page", 1));
  }

  if (pageNumber > totalPages) {
    //pageNumber = totalPages;
    redirect(pathname + "?" + createQueryString("page", totalPages));
  }

  if (!pageNumber || !totalPages) return null;
  
  return (
    <div className="flex flex-wrap justify-center p-2 mt-2 mx-auto">
      <Pagination className="text-lightwhite">
        {/* BOTON ANTERIOR */}
        <PaginationContent className="gap-1 px-2">
          <PaginationItem>
            <PaginationPrevious
              href={`${pathname}?${
                createQueryString("page", pageNumber - 1 < 1 ? 1 : pageNumber - 1)
              }`}
              text="Anterior"
              title={`${totalPages <= 1 || pageNumber === 1 ? "Volver arriba" : "Anterior"}`}
              aria-disabled={totalPages <= 1 || pageNumber === 1}
              className={`active:bg-lightwhite hover:bg-lightwhite hover:text-lightblack ${totalPages <= 1 || pageNumber === 1 ? "!cursor-not-allowed" : ""}`}
            ></PaginationPrevious>
          </PaginationItem>

          {/* Selected pages is greater than max pages? */}
          {pageNumber >= totalPages && totalPages > 2 ? (
            <>
              <PaginationItem>
                <PaginationLink
                  className="active:bg-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-lightblack font-semibold"
                  href={`${pathname}?${createQueryString("page", 1)}`}
                  title="Página 1"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive
                  className="active:bg-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-lightblack font-semibold bg-neutral-800"
                  title={"Página " + totalPages}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          ) : (
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive
                className="active:bg-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-lightblack font-semibold bg-neutral-800"
                title={"Página " + pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Render one page button ahead when possible, modifieble! */}
          {Array.from({ length: 1 }).map((_, index) => {
            x++;
            if (pageNumber + x < totalPages)
              return (
                <PaginationItem key={crypto.randomUUID()}>
                  <PaginationLink
                    className="active:bg-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-lightblack font-semibold"
                    href={`${pathname}?${
                      createQueryString("page", pageNumber + x >= totalPages ? totalPages : pageNumber + x)
                    }`}
                    title={`Página ${pageNumber + x >= totalPages ? totalPages : pageNumber + x}`}
                  >
                    {pageNumber + x >= totalPages ? totalPages : pageNumber + x}
                  </PaginationLink>
                </PaginationItem>
              );
          })}

          {pageNumber + 3 <= totalPages && totalPages > 3 ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <></>
          )}

          {pageNumber !== totalPages ? (
            <>
              <PaginationItem>
                <PaginationLink
                  className="active:bg-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-lightblack font-semibold"
                  href={`${pathname}?${createQueryString("page", totalPages)}`}
                  title={"Página " + totalPages}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          ) : (
            <></>
          )}

          {/* Boton siguiente */}
          <PaginationItem>
            <PaginationNext
              className={`active:bg-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-lightblack ${totalPages <= 1 || pageNumber === totalPages ? "!cursor-not-allowed" : ""}`}
                href={`${pathname}?${
                createQueryString("page", pageNumber + 1 >= totalPages ? totalPages : pageNumber + 1)
              }`}
              text="Siguiente"
              title={`${totalPages <= 1 || pageNumber === totalPages ? "Volver arriba" : "Siguiente"}`}
              aria-disabled={totalPages <= 1 || pageNumber === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
