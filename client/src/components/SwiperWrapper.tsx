import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { imageBoxProps } from "../type";
import "swiper/css";
import "swiper/css/navigation";

const SwiperWrapper = ({ image_urls }: imageBoxProps) => {
  const imageArray = image_urls
    ? image_urls.split(",").map((url) => url.trim())
    : [];

  return (
    <div className="w-full h-full ">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation]}
        className="max-w-6xl rounded-md w-full h-full z-[-2]"
      >
        {imageArray.length > 0 ? (
          imageArray.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  backgroundImage: `url(${url})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                className="w-full h-full  "
              ></div>
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

export default SwiperWrapper;
