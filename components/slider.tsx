"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { ProductItemProps, ProductItem } from "./productItem";
// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper/modules";

type SliderProps = {
  showGameItemsText: string;
  productItems: ProductItemProps[];
};

export const Slider: React.FC<SliderProps> = ({
  showGameItemsText,
  productItems,
}) => {


  console.log(productItems[0].heroName)
  console.log(productItems[0].itemName)

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <hr className="w-full opacity-30" />
        <button className="flex gap-3 bg-[#363944] p-1 rounded-md justify-center px-4">
          <p className="text-green-500 font-IranYekanWebBold text-[14px] whitespace-nowrap">
            نمایش همه
          </p>
          <p className="text-white font-IranYekanWebBold text-[14px] whitespace-nowrap">
            آیتم {showGameItemsText}
          </p>
        </button>
        <hr className="w-full opacity-30" />
      </div>
      <div className="p-2">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={5}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
          loop={true}
          breakpoints={{
            250: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
        >
          {productItems.length > 0 &&
            productItems.map((productItem) => (
              <SwiperSlide key={productItem.productId}>
                <ProductItem
                  productId={productItem.productId}
                  heroName={productItem.heroName}
                  imageUrl={productItem.imageUrl}
                  itemName={productItem.itemName}
                  originalPrice={productItem.originalPrice}
                  discountPrice={productItem.discountPrice}
                  isFory={productItem.isFory}
                  timeToDeliver={productItem.timeToDeliver}
                  urlToMoreLikes={productItem.urlToMoreLikes}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};
