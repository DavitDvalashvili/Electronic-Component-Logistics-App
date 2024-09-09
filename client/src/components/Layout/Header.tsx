import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDeviceStore } from "../../store/deviceStore";
import { useLocation } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";

const Header = () => {
  // State and function to control sidebar visibility
  const { toggleShowSideBar, showSideBar } = useDeviceStore();
  const location = useLocation(); // Get the current path
  const index = location.pathname.split("/")[2];
  const navigate = useNavigate();

  // Navigate to the previous page
  const handleClick = () => {
    console.log("navigate");
    navigate(-1);
  };

  return (
    <header className="w-full bg-AntarcticDeep p-5 text-white sticky top-0 left-0 z-10 flex justify-end items-center space-x-10 ">
      <div
        className="text-white h-[35px]  bg-AntarcticDeep  flex justify-center items-center gap-5 text-md lg:text-xl  cursor-pointer  mr-auto "
        onClick={() => {
          toggleShowSideBar();
        }}
      >
        {index && (
          <>
            <span>{showSideBar ? "დამალვა" : "გამოჩენა"}</span>
            {showSideBar ? (
              <MdKeyboardDoubleArrowLeft className="text-ChinChinCherry text-2xl" />
            ) : (
              <MdKeyboardDoubleArrowRight className="text-ChinChinCherry text-2xl" />
            )}
          </>
        )}
      </div>
      <nav>
        <ul className="flex justify-end space-x-10">
          <li className="px-2 py-1 text-md lg:text-xl relative group">
            <Link to="/" className="relative">
              კომპონენტები
              <span className="absolute bottom-[-4px] left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-out group-hover:w-full group-hover:right-0"></span>
            </Link>
          </li>
          <li className="px-2 py-1 text-md lg:text-xl relative group">
            <Link to="/devices" className="relative">
              მოწყობილობები
              <span className="absolute bottom-[-4px] left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-out group-hover:w-full group-hover:right-0"></span>
            </Link>
          </li>
        </ul>
      </nav>
      <div
        className="flex justify-center gap-3 items-center cursor-pointer "
        onClick={handleClick}
      >
        <SlArrowLeft className="text-md text-ChinChinCherry " />
        <span className="hidden md:inline-block text-sm xl:text-lg  ">
          წინა გვერდძე დაბრუნება
        </span>
      </div>
    </header>
  );
};

export default Header;
