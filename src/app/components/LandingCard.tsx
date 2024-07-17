import React, { ReactElement } from "react";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const LandingCard = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 p-8 max-h-[280px] text-lightblack bg-lightwhite aspect-square rounded-xl dark:shadow-neutral-600 shadow-neutral-500 shadow-md relative">
      {props.children}
    </div>
  );
};

export default LandingCard;
