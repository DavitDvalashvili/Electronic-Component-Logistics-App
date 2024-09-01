import { imageReview } from "../type";

const ImageReviewBox = ({ imageUrls, setImageReview }: imageReview) => {
  const handleSubmit = () => {
    console.log(imageUrls);
    setImageReview(false);
  };

  return (
    <div className="bg-white text-AntarcticDeep p-10 rounded-md flex flex-col items-center gap-4 text-lg">
      <div className="flex justify-start items-center gap-2 flex-col">
        <p className="font-semibold">ნამდვილად გსურთ წაშალოთ</p>
        <p className=" text-NorthAtlanticBreeze">name</p>
      </div>
      <div className="flex justify-center items-center gap-4 pt-5">
        <button
          onClick={() => setImageReview(false)}
          className="px-4 py-2 bg-SheetMetal text-white rounded-md cursor-pointer text-sm"
        >
          არა
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-ChinChinCherry text-white rounded-md cursor-pointer text-sm"
        >
          დიახ
        </button>
      </div>
    </div>
  );
};

export default ImageReviewBox;
