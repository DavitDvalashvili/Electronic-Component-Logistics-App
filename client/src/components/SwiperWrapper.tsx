import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { swiperWrapperProps } from "../type";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import DeleteBox from "./DeleteBox";
import { useUploadStore } from "../store/files";
import { useDeviceStore } from "../store/deviceStore";
import { useComponentStore } from "../store/componentStore";
//import { useParams } from "react-router-dom";

const SwiperWrapper = ({ images, id, type }: swiperWrapperProps) => {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [targetImageId, setTargetImageId] = useState<string>("");
  const { deleteImage } = useUploadStore();
  const { getDevice } = useDeviceStore();
  const { getComponent } = useComponentStore();

  const handleDelete = async () => {
    console.log(targetImageId);
    await deleteImage(targetImageId);
    if (id && type === "component") {
      getComponent(id);
    } else if (id && type === "device") {
      getDevice(id);
    }
  };

  return (
    <div className="w-full h-full ">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation]}
        className="max-w-6xl rounded-md w-full h-full z-[1]"
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  backgroundImage: `url(${
                    image.image_url || "../../public/image.png"
                  })`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                className="w-full h-full  "
              >
                {image.image_url && (
                  <button
                    className="px-4 py-2 bg-ChinChinCherry text-white rounded-md cursor-pointer text-sm"
                    onClick={() => {
                      setTargetImageId(image.image_id);
                      setShowDelete(true);
                    }}
                  >
                    ფოტოს წაშლა
                  </button>
                )}
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div className="h-[500px] flex items-center justify-center text-gray-500">
            No Images Available
          </div>
        )}
      </Swiper>
      {showDelete && (
        <div className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center z-20 ">
          <DeleteBox
            setShowDelete={setShowDelete}
            handleDelete={handleDelete}
            name="სურათი"
          />
        </div>
      )}
    </div>
  );
};

export default SwiperWrapper;
