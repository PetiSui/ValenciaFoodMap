import { redirect } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../../components/ui/pagination";
import Card from "../../../components/Card";
import Filters from "../../../components/Filters";
import { ToastContainer } from "react-toastify";
import PageInfo from "../../../components/PageInfo";
import OrderResults from "../../../components/OrderResults";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default async function Categorias({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { categoria: string };
}) {
  if (!process.env.NEXT_PUBLIC_BASE_API_URL) return null;

  const getCards = async () => {
    //const apiUrl = "http://localhost:3000";
    const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

    // console.log(process.env.API_URL);
    const categoria = params.categoria
      ? params.categoria.charAt(0).toUpperCase() + params.categoria.slice(1)
      : redirect("/descubrir");
    console.log(categoria);

    const res = await fetch(
      `${apiUrl}/api/cards/categories/${params.categoria}`,
      {
        headers: {
          "Cache-store": "no-store",
        },
      }
    );

    const jsonData = await res.json();
    console.log(jsonData);

    return jsonData;
  };

  const datax = await getCards();
  console.log("ORDER BY", searchParams["order"]);

  const orderFunction = {
    AZ: (a: any, b: any) => {
      if (a.name === b.name) return 0;
      return a.name > b.name ? 1 : -1;
    },
    ZA: (a: any, b: any) => {
      if (a.name === b.name) return 0;
      return a.name > b.name ? -1 : 1;
    },
  };

  const orderBy = searchParams["order"] as string;

  const data =
    orderBy == "ZA"
      ? datax.sort(orderFunction["ZA"])
      : datax.sort(orderFunction["AZ"]);

  // Controls how many cards per page are displayed
  const perPage = 24;

  const totalPages = Math.ceil(Object.entries(data).length / perPage);
  let pageNumber = parseInt(searchParams["page"] as string) || 1;

  console.log("PAGINA " + parseInt(searchParams["page"] as string));

  if (
    (searchParams["page"] as string) !== undefined &&
    isNaN(parseInt(searchParams["page"] as string))
  ) {
    redirect("/descubrir?page=1");
  }

  if (
    (searchParams["page"] as string) !== undefined &&
    pageNumber > totalPages
  ) {
    pageNumber = totalPages;
    redirect("/descubrir?page=" + totalPages);
  }

  if ((searchParams["page"] as string) !== undefined && pageNumber < 1) {
    pageNumber = 1;
    redirect("/descubrir?page=1");
  }

  console.log(pageNumber + "/" + totalPages);

  let x = 0;
  const start = (pageNumber - 1) * perPage;
  const end = start + perPage;

  return (
    <div className="flex flex-col">
      <h3 className="text-3xl font-semibold text-lightwhite self-start">
        <FontAwesomeIcon icon={faSearch} className="mr-4" />
        Categorías
      </h3>
      <p className="text-xl font-light text-lightwhite self-start">
        Explorando la categoría: {params.categoria.charAt(0).toUpperCase() + params.categoria.slice(1)}
      </p>

      <div className="w-[100%] max-md:max-w-[350px] mx-auto flex justify-between items-center gap-4 py-2 md:px-[9vw] mt-10 pb-4">
        <Filters></Filters>
        <OrderResults></OrderResults>
      </div>

      {/* </div> */}
      {/* <div className="flex flex-wrap max-md:justify-center md:justify-between gap-8 p-2 mx-auto sm:w-[80%]"> */}
      {/* <div className="grid-card-layout items-stretch justify-items-center gap-8 p-10 mx-auto sm:w-[95%]"> */}
      <div className="flex flex-wrap max-md:w-[70%] max-md:justify-center justify-between gap-8 py-2 px-[9vw] mx-auto w-[100%]">
        {Object.entries(data)
          .slice(start, end)
          .map((card: any, index: Number) => (
            <Card
              data={JSON.stringify(card[1])}
              key={crypto.randomUUID()}
            ></Card>
          ))}
      </div>
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
    </div>
  );
}
