import Image from "next/image";
import logo from "../../../public/favicons/android-chrome-384x384.png";
import Link from "next/link";

export default function Footer() {
  return (
    // <footer
    //   className="text-center p-3 flex justify-center align-middle w-full gap-1 bg-lightblack"
    //   style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    // >
    //   <p>© 2024 Copyright:</p>
    //   <a className="text-white" href="https://youtube.com/">
    //        ValenciaFoodMap.es
    //   </a>
    // </footer>
    <footer className="w-full bg-lightblack text-lightwhite p-8 flex flex-col flex-wrap items-center justify-center">
      <div className="w-full flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-lightblack text-center md:justify-between">
        <div className="w-full flex flex-nowrap justify-center items-center">
          <Image src={logo} alt="Logo" className="" width={60}></Image>
          <p className="self-end font-light text-wrap">Busca los sitios más destacados en Valencia, España</p>
        </div>
        <ul className="w-full flex flex-wrap justify-center items-center gap-y-2 gap-x-8">
          <li>
            <Link
              href="/descubrir"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 underline underline-offset-4"
            >
              Descubrir
            </Link>
          </li>
          <li>
            <Link
              href="/favoritos"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 underline underline-offset-4"
            >
              Mis favoritos
            </Link>
          </li>
          <li>
            <Link
              href="/mapa"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 underline underline-offset-4"
            >
              Mapa
            </Link>
          </li>
          <li>
            <Link
              href="/contacto"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 underline underline-offset-4"
            >
              Contáctanos
            </Link>
          </li>
        </ul>
      </div>

      <hr className="w-[80%] my-8 border-white" />
      <Link
        href="/"
        className="text-center font-normal align-middle content-center"
      >
        &copy; 2024 ValenciaFoodMap
      </Link>
    </footer>
  );
}
