import { imageReview } from "../../type";
import { useEffect, useState } from "react";
import { useComponentStore } from "../../store/componentStore";
import { useUploadStore } from "../../store/upload";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const ImageReviewBox = ({
  imageUrls,
  setImageReview,
  component,
}: imageReview) => {
  // State to store processed image URLs
  const [urls, setUrls] = useState<string[]>([]);
  const { id } = useParams();
  const { getComponent } = useComponentStore();
  const { updateImage } = useUploadStore();

  useEffect(() => {
    console.log("imageUrls updated:", imageUrls);
    if (typeof imageUrls === "string" && imageUrls.trim() !== "") {
      // Split and trim image URLs from the string
      const newUrls = imageUrls.split(",").map((url) => url.trim());
      // Adding a small delay to allow React to process state update properly
      setTimeout(() => setUrls(newUrls), 50);
    } else {
      setUrls([]);
    }
  }, [imageUrls]);

  const handleSubmit = async () => {
    try {
      await updateImage({
        images_urls: urls.toString(),
        component_id: component.id,
        device_id: null,
      });
      await getComponent(`${id}`);
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
