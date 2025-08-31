import Image, { ImageProps } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export type ProductItemProps = {
  productId: string;
  heroName?: string;
  urlToMoreLikes?: string;
  imageUrl: string;
  itemName?: string;
  originalPrice?: string;
  discountPrice?: string;
  timeToDeliver?: string;
  isFory?: boolean;
};

export const ProductItem: React.FC<ProductItemProps> = ({
  productId,
  heroName,
  urlToMoreLikes,
  imageUrl,
  itemName,
  originalPrice,
  discountPrice,
  timeToDeliver,
  isFory,
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
      <div className="bg-[#4d5d74] w-full p-2 flex flex-col items-center gap-2">
        <div className="text-[14px] text-[#2c3747] w-full flex justify-start">
          {heroName}
        </div>
        <div className="text-white w-full flex justify-start">{itemName}</div>
        <div className="flex bg-[#2b313a] items-center rounded-lg p-2 w-full gap-2 justify-between">
          {isFory && (
            <div className="flex items-center gap-1 bg-[#77bc0a] text-white  text-[15px] p-1 rounded-lg font-IranYekanWebBold">
              <div>فوری</div>
              <FontAwesomeIcon icon={faCheck} />
            </div>
          )}
          <div className="flex items-center gap-2">
            {originalPrice && discountPrice && discountPrice !== originalPrice ? (
              <>
                <div className="flex gap-1 font-IranYekanWebBold text-gray-300 text-xs line-through">
                  <p>تومان</p>
                  <p className="font-IRANSansWeb text-sm opacity-80">{originalPrice}</p>
                </div>
                <div className="flex gap-1 font-IranYekanWebBold text-white text-xs">
                  <p>تومان</p>
                  <p className="font-IRANSansWeb text-xl">{discountPrice}</p>
                </div>
              </>
            ) : originalPrice ? (
              <div className="flex gap-1 font-IranYekanWebBold text-white text-xs">
                <p>تومان</p>
                <p className="font-IRANSansWeb text-xl">{originalPrice}</p>
              </div>
            ) : null}
          </div>
        </div>
        <button className="bg-[#004fff] gap-2 h-[38px] text-[14px] flex justify-center items-center whitespace-nowrap font-IranYekanWebBold rounded-lg p-1 text-white w-full">
          <div>افزودن به سبد خرید</div>
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>
      </div>
    </div>
  );
};
