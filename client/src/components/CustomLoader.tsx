import { ThreeDots } from "react-loader-spinner";

const CustomLoader = () => {
  return (
    <div className=" h-full flex justify-center items-center mt-[200px] ">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#343a40"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default CustomLoader;
