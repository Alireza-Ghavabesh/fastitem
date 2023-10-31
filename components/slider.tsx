"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { ProductItemProps, ProductItem } from "./productItem";
// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper/modules";

type SliderProps = {
  productItems: ProductItemProps[];
};

export const Slider: React.FC<SliderProps> = ({ productItems }) => {
  return (
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
          400: {
            slidesPerView: 2,
            spaceBetween: 70,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
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
                price={productItem.price}
                timeToDeliver={productItem.timeToDeliver}
                urlToMoreLikes={productItem.urlToMoreLikes}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
