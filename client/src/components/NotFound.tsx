//import { useNavigate } from "react-router-dom";
import notFound from "/notFound.svg";
import { notFoundProps } from "../type";

const NotFound = ({ name }: notFoundProps) => {
  return (
    <div className="flex justify-center flex-col gap-5 items-center mt-[200px]">
      <img src={notFound} alt="not found" />
      <h2 className="text-lg text-AntarcticDeep font-semibold">
        {`${name} არ მოიძებნა`}
      </h2>
    </div>
  );
};

export default NotFound;
