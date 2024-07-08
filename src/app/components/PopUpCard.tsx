import Image from "next/image";
import Placeholder from '../../../public/No-Image-Placeholder.webp';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type DetailsProps = {
    _id: string;
    address: string;
    name: string;
    lat: number;
    lng: number;
    photos?: string;
    url: string;
    categories?: string[];
  };

export default function PopUpCard(data:DetailsProps) : JSX.Element {
    //console.log(data.name);
    
    return <div className="flex flex-wrap flex-col gap-2 py-4 pr-1 pl-2 max-sm:max-w-[200px] max-w-[250px] max-h-fit">
        <Image className="!m-0 object-cover" src={data?.photos || Placeholder} width={250} height={112} alt={data?.name}></Image>
        <p className="text-xl font-semibold !m-0">{data.name}</p>
        <a href={data?.url} target="_blank" className="text-l underline font-light !m-0 !mt-2">{data.address}</a>
        <Link
            className="font-semibold flex-1 bg-lightblack !text-white border-0 rounded mt-2 px-5 py-3 text-center hover:!bg-slate-200 hover:!text-lightblack"
            href={`/descubrir/${data._id}`}
          >
            <FontAwesomeIcon
              className="mr-2"
              size="sm"
              icon={faPlus}
            ></FontAwesomeIcon>
            Más info
          </Link>
    </div>
}