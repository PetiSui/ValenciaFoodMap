
type PageProps = {
    start: number;
    end: number;
    length: number;
}

export default function PageInfo({start, end, length} : PageProps) {
    return  <div className="font-semibold dark:text-lightwhite text-xl flex flex-wrap gap-2"><p className="">Mostrando establecimientos </p><p>{start + " - " + end + " / " + length}</p></div>

}