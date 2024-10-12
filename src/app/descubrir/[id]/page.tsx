import { redirect } from "next/navigation";
import Card from "../../components/Card";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faFaceSadTear } from "@fortawesome/free-solid-svg-icons";

export default async function Categorias({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { id: string };
}) {
  if (!process.env.NEXT_PUBLIC_BASE_API_URL) return null;

  const getCard = async () => {
    //const apiUrl = "http://localhost:3000";
    const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

    // console.log(process.env.API_URL);
    const id = params.id ? params.id : redirect("/descubrir");
    console.log(id);

    const res = await fetch(`${apiUrl}/api/cards/${params.id}`, {
      headers: {
        "Cache-store": "no-store",
      },
    });

    const jsonData = await res.json();
    console.log(jsonData);

    return jsonData;
  };

  const datax = await getCard();

  if (datax.message || !datax) {
    return (
      <div className="glassmorphism flex flex-col justify-center items-center gap-5 w-[70%] p-12 mt-12 mx-auto outline outline-1 outline-[#40404030]">
        <FontAwesomeIcon
          icon={faFaceSadTear}
          className="text-6xl drop-shadow-md dark:text-lightwhite text-lightblack"
        />
        <p className="font-semibold mt-2 text-2xl text-balance text-center text-lightblack dark:text-lightwhite">
          No se ha encontrado el establecimiento
        </p>
        <Link
          className="bg-lightblack border-0 px-5 py-3 mt-4 rounded hover:bg-slate-100 hover:text-lightblack text-lightwhite"
          href="/descubrir"
        >
          Explora
          <FontAwesomeIcon
            className="ml-3"
            size="sm"
            icon={faArrowRight}
          ></FontAwesomeIcon>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap max-md:w-[70%] max-md:justify-center justify-between gap-8 py-2 px-[9vw] mx-auto w-[100%]">
      <Card data={JSON.stringify(datax)}></Card>
    </div>
  );
}
