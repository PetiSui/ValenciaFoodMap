import Image from "next/image";
import hero from "../../public/hero.png";

export default async function App() {

  return (
    <>
        <Image src={hero} height={400} width={400} alt="Hero Image"></Image>
    </>
  );
}