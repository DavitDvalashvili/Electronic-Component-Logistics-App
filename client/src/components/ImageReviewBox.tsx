import { imageReview } from "../type";
import { useEffect, useState } from "react";
import { useComponentStore } from "../store/componentStore";

const ImageReviewBox = ({
  imageUrls,
  setImageReview,
  component,
}: imageReview) => {
  const [urls, setUrls] = useState<string[]>([]);
  const { updateComponent, toggleUpdate } = useComponentStore();

  useEffect(() => {
    console.log("imageUrls updated:", imageUrls);
    if (typeof imageUrls === "string" && imageUrls.trim() !== "") {
      const newUrls = imageUrls.split(",").map((url) => url.trim());
      // Adding a small delay to allow React to process state update properly
      setTimeout(() => setUrls(newUrls), 100);
    } else {
      setUrls([]);
    }
  }, [imageUrls]);

  const handleSubmit = async () => {
    try {
      if (component) {
        await updateComponent({
          ...component,
          images_urls: imageUrls,
        });
      }
      await toggleUpdate();
      setImageReview(false);
    } catch (error) {
      console.error("Error updating component:", error);
    }
  };

  return (
    <div className="bg-white text-AntarcticDeep p-10 rounded-md text-lg">
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
    </div>
  );
};

export default ImageReviewBox;
