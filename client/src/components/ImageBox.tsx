import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { imageBoxProps } from "../type";
import "swiper/css";
import "swiper/css/navigation";

const ImageBox = ({ image_urls }: imageBoxProps) => {
  const imageArray = image_urls
    ? image_urls.split(",").map((url) => url.trim())
    : [];

  return (
    <div className="w-full h-full">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation]}
        className="max-w-6xl rounded-md w-full h-full"
      >
        {imageArray.length > 0 ? (
          imageArray.map((url, index) => (
            <SwiperSlide key={index}>
              <img
                src={url}
                alt={`Slide ${index + 1}`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/image.png";
                }}
                className="object-cover w-full h-full"
              />
            </SwiperSlide>
          ))
        ) : (
          <div className="h-[500px] flex items-center justify-center text-gray-500">
            No Images Available
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default ImageBox;
