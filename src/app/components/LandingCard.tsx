import React, { ReactElement } from "react";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const LandingCard = (props: Props) => {
  return (
    <div className="flex flex-col scale-[90%] justify-center flex-1 gap-4 px-8 pt-8 pb-6 max-h-[33dvh] min-h-[280px] max-sm:max-w-[80dvw] text-lightblack bg-lightwhite aspect-[1/1] rounded-xl dark:shadow-neutral-700 shadow-neutral-600 shadow relative">
      {props.children}
    </div>
  );
};

export default LandingCard;
