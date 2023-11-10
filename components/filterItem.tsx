import Image from "next/image";
import { heroNameIconsList } from "@/components/heronames";
import { Suspense } from "react";
import Loading from "./loadingHeros";

export type FilterItemProps = {
  searchTermItemPlaceholder?: string;
  BestSellerText?: string;
  dealsItems?: string;
  chooseHeroText?: string;
  searchTermHeroNamePlaceholder?: string;
  listHeroImages?: string[];
  itemTypeSelectTagText?: string;
  itemRaritySelectTagText?: string;
  fromUserOrBotSelectTagText?: string;
  priceSortSelectTagText?: string;
};

export const FilterItem: React.FC<FilterItemProps> = ({
  searchTermItemPlaceholder,
  BestSellerText,
  dealsItems,
  chooseHeroText,
  searchTermHeroNamePlaceholder,
  listHeroImages,
  itemTypeSelectTagText,
  itemRaritySelectTagText,
  fromUserOrBotSelectTagText,
  priceSortSelectTagText,
}) => {
  return (
    <div className="bg-[#1C1D22] flex flex-col p-4 gap-4">
      <input
        type="text"
        placeholder={searchTermItemPlaceholder}
        className="placeholder:font-IranYekanWebBold h-11 text-center placeholder:text-center outline-none bg-[#2E3039] text-white"
      />
      <div className="bg-[#77BC0A] rounded-lg h-11 flex justify-center cursor-pointer items-center text-white font-IranYekanWebBold">
        {BestSellerText}
      </div>
      <div className="bg-[#DE7351] h-12 flex justify-center items-center rounded-lg text-[#efeff0] font-IranYekanWebBold">
        {dealsItems}
      </div>
      <div className="flex justify-end text-white font-IranYekanWebBold">
        {chooseHeroText}
      </div>
      <input
        type="text"
        placeholder={searchTermHeroNamePlaceholder}
        className="placeholder:font-IranYekanWebBold h-11 text-center placeholder:text-center outline-none bg-[#2E3039] text-white"
      />
      <div className="flex justify-center flex-wrap gap-3">
        <Suspense fallback={<Loading />}>
          {heroNameIconsList.length > 0 &&
            heroNameIconsList.map((hero, index) => (
              <button key={index}>
                <Image
                  src={hero.image}
                  alt="logo"
                  width={63}
                  height={39}
                  className="rounded-t-lg w-full"
                />
              </button>
            ))}
        </Suspense>
      </div>
    </div>
  );
};
