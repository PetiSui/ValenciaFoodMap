import React, { ReactElement } from "react";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const LandingCard = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 p-8 flex-1 w-[max(30%,300px)] max-h-[300px] text-lightblack bg-lightwhite aspect-[1/1] rounded-xl dark:shadow-neutral-600 shadow-neutral-500 shadow-md relative">
      {props.children}
    </div>
  );
};

export default LandingCard;
