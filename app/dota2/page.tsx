import SellBar from "@/components/SellBar";
import { FilterItem } from "@/components/filterItem";
import { ProductItemProps, ProductItem } from "@/components/productItem";
import Autographed from "@/public/Dota2Products/Autographed.png";
import Harborblossom from "@/public/Dota2Products/Harborblossom.png";
import InscribedElixir from "@/public/Dota2Products/InscribedElixir.png";
import { AdBanner } from "@/components/adBanner";
import { Suspense } from "react";
import Loading from "./loading";

const hardCodedProductItems: ProductItemProps[] = [
  {
    productId: "1",
    heroName: "Monkey king",
    urlToMoreLikes: "https://google.com",
    imageUrl: Autographed.src,
    itemName: "Autographed",
    price: "string",
    timeToDeliver: "fori",
  },
  {
    productId: "2",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: Harborblossom.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "3",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "4",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "5",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "6",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "7",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "8",
    heroName: "Monkey king",
    urlToMoreLikes: "https://google.com",
    imageUrl: Autographed.src,
    itemName: "Autographed",
    price: "string",
    timeToDeliver: "fori",
  },
  {
    productId: "9",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: Harborblossom.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "10",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "11",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "12",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "13",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "14",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "15",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: Harborblossom.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "16",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "17",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "18",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "19",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "20",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
];

function Dota2Page() {
  return (
    <div className="mt-4">
      <div className="max-laptop:hidden">
        <SellBar />
      </div>
      <div className="flex mt-10">
        <div className="w-[75%] max-laptop:w-[100%] flex flex-col gap-2 ">
          <div className="flex px-2 py-2 justify-between items-center font-IranYekanWebBold text-white text-xl max-laptop:hidden">
            <AdBanner />
            <div>آیتم دوتا2 (46 آیتم)</div>
          </div>
          <div className="flex justify-around flex-wrap gap-2">
            <Suspense fallback={<Loading />}>
              {hardCodedProductItems.length > 0 &&
                hardCodedProductItems.map((productItem) => (
                  <ProductItem
                    key={productItem.productId}
                    productId={productItem.productId}
                    heroName={productItem.heroName}
                    imageUrl={productItem.imageUrl}
                    itemName={productItem.itemName}
                    price={productItem.price}
                    timeToDeliver={productItem.timeToDeliver}
                    urlToMoreLikes={productItem.urlToMoreLikes}
                  />
                ))}
            </Suspense>
          </div>
        </div>
        <div className="w-[25%] max-laptop:hidden">
          <FilterItem
            searchTermItemPlaceholder="جستجو با نام آیتم"
            BestSellerText="پرفروش ترین ها"
            dealsItems="آیتم های تخفیف خورده"
            chooseHeroText="انتخاب هیرو"
            searchTermHeroNamePlaceholder="نام هیرو"
            listHeroImages={[]}
            itemTypeSelectTagText="مدل آیتم"
            itemRaritySelectTagText="ارزش آیتم"
            fromUserOrBotSelectTagText="همه آیتم ها"
            priceSortSelectTagText="مرتب سازی"
          />
        </div>
      </div>
    </div>
  );
}

export default Dota2Page;
