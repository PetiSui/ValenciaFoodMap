import { redirect } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import Card from "../components/Card";
import Filters from "../components/Filters";
import { ToastContainer } from "react-toastify";

var cache = require("memory-cache");

export default async function App({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (!process.env.NEXT_PUBLIC_BASE_API_URL) return null;

  const getCards = async () => {
    // const apiUrl = "http://localhost:3000";
    const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

    // console.log(process.env.API_URL);

    // const value = cache.get("descubrir");
    let value = false;
    if (value) {
      console.log("CACHE HIT");

      return value;
    } else {
      const res = await fetch(`${apiUrl}/api/cards`, {
        headers: { "Content-Type": "application/json" },
      });
      const jsonData = await res.json();
      const hours = 1; //2 hour cache
      cache.put("descubrir", jsonData, hours * 1000 * 60 * 60);

      return jsonData;
    }
  };

  const datax = await getCards();
  const data = datax.sort((a: any, b: any) => {
    if (a.name === b.name) return 0;
    return a.name > b.name ? 1 : -1;
  });
  console.log(data);

  // Controls how many cards per page are displayed
  const perPage = 9;

  const totalPages = Math.ceil(Object.entries(data).length / perPage);
  let pageNumber = parseInt(searchParams["page"] as string) || 1;

  console.log("PAGINA " + parseInt(searchParams["page"] as string));

  if (
    (searchParams["page"] as string) !== undefined &&
    isNaN(parseInt(searchParams["page"] as string))
  ) {
    redirect("/descubrir?page=1");
  }

  if (pageNumber > totalPages) {
    pageNumber = totalPages;
    redirect("/descubrir?page=" + totalPages);
  }

  if (pageNumber < 1) {
    pageNumber = 1;
    redirect("/descubrir?page=1");
  }

  console.log(pageNumber + "/" + totalPages);

  let x = 0;
  const start = (pageNumber - 1) * perPage;
  const end = start + perPage;

  return (
    <>
      {/* <div className="flex flex-wrap justify-center items-center gap-8 p-4 mx-auto  w-[90%] bg-neutral-600 bg-opacity-80 rounded"> */}
      {/* <p className="mr-auto">Filtros:</p> */}

      <Filters></Filters>

      {/* </div> */}
      <div className="flex flex-wrap justify-center gap-8 p-10 mx-auto">
        {Object.entries(data)
          .slice(start, end)
          .map((card: any, index: Number) => (
            <Card
              data={JSON.stringify(card[1])}
              key={crypto.randomUUID()}
            ></Card>
          ))}
      </div>
      <ToastContainer />
      <div className="flex flex-wrap justify-center gap-0 p-2 mt-2 mx-auto">
        <Pagination>
          {/* BOTON ANTERIOR */}
          <PaginationContent className="gap-1 px-2">
            <PaginationItem>
              <PaginationPrevious
                href={`/descubrir?page=${
                  pageNumber - 1 < 1 ? 1 : pageNumber - 1
                }`}
                text="Anterior"
                className="active:bg-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-lightblack"
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
                        pageNumber + x >= totalPages
                          ? totalPages
                          : pageNumber + x
                      }`}
                    >
                      {pageNumber + x >= totalPages
                        ? totalPages
                        : pageNumber + x}
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
    </>
  );
}
