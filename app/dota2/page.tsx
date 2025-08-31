import SellBar from "@/components/SellBar";
import { FilterItem } from "@/components/filterItem";
import { ProductItemProps, ProductItem } from "@/components/productItem";
import { AdBanner } from "@/components/adBanner";
import { Suspense } from "react";
import Loading from "./loading";

const hardCodedProductItems: ProductItemProps[] = [
  {
    productId: "1",
    heroName: "Monkey king",
    urlToMoreLikes: "",
    imageUrl: "/images/Autographed.png",
    itemName: "Autographed",
    originalPrice: "264,000",
    discountPrice: "264,000",
    timeToDeliver: "فوری",
    isFory: true,
  },
  {
    productId: "2",
    heroName: "Monkey king",
    urlToMoreLikes: "",
    imageUrl: "/images/Harborblossom.png",
    itemName: "Harborblossom",
    originalPrice: "320,000",
    discountPrice: "289,000",
    timeToDeliver: "فوری",
    isFory: false,
  },
  {
    productId: "3",
    heroName: "Monkey king",
    urlToMoreLikes: "",
    imageUrl: "/images/InscribedElixir.png",
    itemName: "Inscribed Elixir",
    originalPrice: "149,000",
    discountPrice: "149,000",
    timeToDeliver: "فوری",
    isFory: true,
  },
  {
    productId: "4",
    heroName: "Monkey king",
    urlToMoreLikes: "",
    imageUrl: "/images/Magus Apex.png",
    itemName: "Magus Apex",
    originalPrice: "499,000",
    discountPrice: "439,000",
    timeToDeliver: "فوری",
    isFory: false,
  },
  {
    productId: "5",
    heroName: "Monkey king",
    urlToMoreLikes: "",
    imageUrl: "/images/PhantomConcord.png",
    itemName: "Phantom Concord",
    originalPrice: "199,000",
    discountPrice: "199,000",
    timeToDeliver: "فوری",
    isFory: true,
  },
  {
    productId: "6",
    heroName: "Monkey king",
    urlToMoreLikes: "",
    imageUrl: "/images/TheOrderOfCyprin.png",
    itemName: "The Order Of Cyprin",
    originalPrice: "399,000",
    discountPrice: "349,000",
    timeToDeliver: "فوری",
    isFory: false,
  },
  {
    productId: "7",
    heroName: "Monkey king",
    urlToMoreLikes: "",
    imageUrl: "/images/UmbralGlyph.png",
    itemName: "Umbral Glyph",
    originalPrice: "229,000",
    discountPrice: "229,000",
    timeToDeliver: "فوری",
    isFory: true,
  },
  {
    productId: "8",
    heroName: "Monkey king",
    urlToMoreLikes: "",
    imageUrl: "/images/UmbralGlyph.png",
    itemName: "Umbral Glyph",
    originalPrice: "500,000",
    discountPrice: "500,000",
    timeToDeliver: "3 روزه",
    isFory: false,
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
          <div className="grid sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-2 px-4">
            <Suspense fallback={<Loading />}>
              {hardCodedProductItems.length > 0 &&
                hardCodedProductItems.map((productItem) => (
                  <ProductItem
                    key={productItem.productId}
                    productId={productItem.productId}
                    heroName={productItem.heroName}
                    imageUrl={productItem.imageUrl}
                    itemName={productItem.itemName}
                    originalPrice={productItem.originalPrice}
                    discountPrice={productItem.discountPrice}
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
