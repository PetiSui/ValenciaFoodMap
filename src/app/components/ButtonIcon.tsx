import { Button } from "../../components/ui/button";

export function ButtonIcon({
  handleOnClick,
  className,
  children,
}: Readonly<{
  handleOnClick: () => void;
  className : string;
  children: React.ReactNode;
}>) {
  return (
    <Button className={className} variant="outline" onClick={() => handleOnClick()}>
      {children}
    </Button>
  );
}
