import { Children, ReactNode } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

interface ImageSliderProps {
  children: ReactNode;
}

export default function ImageSlider({ children }: ImageSliderProps) {
  return (
    <div className="w-full overflow-x-hidden">
      <Swiper
        slidesPerView="auto"
        centeredSlides
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="imageSlider"
      >
        {Children.map(children, (child, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
