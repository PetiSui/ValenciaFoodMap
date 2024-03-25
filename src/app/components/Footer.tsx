import Image from "next/image";
import logo from "../../../public/favicons/android-chrome-384x384.png";

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
    <footer className="w-full bg-lightblack p-8 flex flex-col flex-wrap items-center justify-center">
      <div className="w-full flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-lightblack text-center md:justify-between">
        <div className="w-full flex flex-wrap justify-center items-center">
          <Image src={logo} alt="Logo" className="" width={60}></Image>
          <p className="self-end font-extralight text-wrap">Busca los sitios más destacados y asegurate una experiencia TOP</p>
        </div>
        <ul className="w-full flex flex-wrap justify-center items-center gap-y-2 gap-x-8">
          <li>
            <a
              href="/descubrir"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 underline underline-offset-4"
            >
              Descubrir
            </a>
          </li>
          <li>
            <a
              href="/favoritos"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 underline underline-offset-4"
            >
              Mis favoritos
            </a>
          </li>
          <li>
            <a
              href="/mapa"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 underline underline-offset-4"
            >
              Mapa
            </a>
          </li>
          <li>
            <a
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 underline underline-offset-4"
            >
              Contáctanos
            </a>
          </li>
        </ul>
      </div>

      <hr className="w-[80%] my-8 border-white" />
      <a
        color="blue-gray"
        className="text-center font-normal align-middle content-center"
      >
        &copy; 2024 ValenciaFoodMap
      </a>
    </footer>
  );
}
