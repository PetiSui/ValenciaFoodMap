import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "../../components/ui/pagination";

  type Props = {
    pageNumber: number,
    totalPages: number
  }

export default function Paginacion({pageNumber, totalPages}: Props) {

  if (!pageNumber || !totalPages) return null;

  let x = 0;
  
  return (
    <div className="flex flex-wrap justify-center p-2 mt-2 mx-auto">
      <Pagination className="text-lightwhite">
        {/* BOTON ANTERIOR */}
        <PaginationContent className="gap-1 px-2">
          <PaginationItem>
            <PaginationPrevious
              href={`/descubrir?page=${
                pageNumber - 1 < 1 ? 1 : pageNumber - 1
              }`}
              text="Anterior"
              className="active:bg-lightwhite hover:bg-lightwhite hover:text-lightblack"
            ></PaginationPrevious>
          </PaginationItem>

          {/* Selected pages is greater than max pages? */}
          {pageNumber >= totalPages && totalPages > 2 ? (
            <>
              <PaginationItem>
                <PaginationLink
                  className="active:bg-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-lightblack font-semibold"
                  href="/descubrir?page=1"
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
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Render one page button when possible, modifieble! */}
          {Array.from({ length: 1 }).map((_, index) => {
            x++;
            if (pageNumber + x < totalPages)
              return (
                <PaginationItem key={crypto.randomUUID()}>
                  <PaginationLink
                    className="active:bg-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-lightblack font-semibold"
                    href={`/descubrir?page=${
                      pageNumber + x >= totalPages ? totalPages : pageNumber + x
                    }`}
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
                  href={`/descubrir?page=${totalPages}`}
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
              className="active:bg-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-lightblack"
              href={`/descubrir?page=${
                pageNumber + 1 >= totalPages ? totalPages : pageNumber + 1
              }`}
              text="Siguiente"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
