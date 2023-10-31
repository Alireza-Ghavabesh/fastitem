import Image from "next/image";

export type ProductItemProps = {
  productId: string;
  heroName: string;
  urlToMoreLikes: string;
  imageUrl: string;
  itemName: string;
  price: string;
  timeToDeliver: string;
};

export const ProductItem: React.FC<ProductItemProps> = ({
  productId,
  heroName,
  urlToMoreLikes,
  imageUrl,
  itemName,
  price,
  timeToDeliver,
}) => {
  return (
    <div className="flex flex-col items-center rounded-lg">
      <Image
        src={imageUrl}
        alt="logo"
        width={244}
        height={162}
        className="rounded-t-lg w-full"
      />
      <div className="bg-[#4d5d74] w-full rounded-b-lg p-2 flex flex-col items-center gap-2">
        <div className="text-[14px] text-[#2c3747] w-full flex justify-start">
          {heroName}
        </div>
        <div className="text-white w-full flex justify-start">{itemName}</div>
        <div className="flex bg-[#2b313a] items-center rounded-lg p-2 w-full gap-2 justify-between">
          <div className="bg-[#77bc0a] text-white text-[15px] p-1 rounded-lg font-IranYekanWebBold">
            فوری
          </div>
          <div className="flex gap-2 font-IranYekanWebBold text-white text-[15px]">
            <p>تومان</p>
            <p className="">264,000</p>
          </div>
        </div>
        <button className="bg-[#004fff] font-IranYekanWebBold rounded-lg p-1 text-white w-full">
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
};
