
type PageProps = {
    start: number;
    end: number;
    length: number;
}

export default function PageInfo({start, end, length} : PageProps) {
    return  <h2 className="font-extrabold text-lightwhite text-2xl">Mostrando establecimientos {start + " - " + end + " / " + length}</h2>

}