import { imageReviewDevice } from "../../type";
import { useEffect, useState } from "react";
import { useDeviceStore } from "../../store/deviceStore";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useUploadStore } from "../../store/upload";

const ImageReviewBox = ({
  imageUrls,
  setImageReview,
  device,
}: imageReviewDevice) => {
  const { id } = useParams();
  // State to hold the parsed image URLs
  const [urls, setUrls] = useState<string[]>([]);
  const { getDevice } = useDeviceStore();
  const { updateImage } = useUploadStore();

  useEffect(() => {
    if (typeof imageUrls === "string" && imageUrls.trim() !== "") {
      // Parse the imageUrls string into an array of URLs
      const newUrls = imageUrls.split(",").map((url) => url.trim());
      // Adding a small delay to allow React to process state update properly
      setTimeout(() => setUrls(newUrls), 100);
    } else {
      setUrls([]);
    }
  }, [imageUrls]);

  // Handle the form submission
  const handleSubmit = async () => {
    try {
      // Update the device with new image URLs if device exists

      await updateImage({
        images_urls: urls.toString(),
        device_id: device.id,
        component_id: null,
      });

      await getDevice(`${id}`);
      setImageReview(false);
    } catch (error) {
      console.error("Error updating component:", error);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: -1, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white text-AntarcticDeep p-10 rounded-md text-lg"
    >
      <div className="flex justify-evenly items-center gap-5 flex-wrap">
        {urls.length > 0 ? (
          urls.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="flex justify-start items-center gap-5"
            >
              <img
                src={`${url}`}
                alt={`image-${index}`}
                className="w-[200px] h-[200px] rounded-md"
                onError={() => console.error(`Failed to load image at ${url}`)}
              />
            </div>
          ))
        ) : (
          <p>No images to display</p>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 pt-5">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green text-white rounded-md cursor-pointer text-sm"
        >
          დადასტურება
        </button>
      </div>
    </motion.div>
  );
};

export default ImageReviewBox;
