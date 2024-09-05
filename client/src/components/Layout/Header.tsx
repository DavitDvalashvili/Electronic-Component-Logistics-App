import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDeviceStore } from "../../store/deviceStore";

const Header = () => {
  const { toggleShowSideBar, showSideBar } = useDeviceStore();
  return (
    <header className="w-full bg-AntarcticDeep p-5 text-white sticky top-0 left-0 z-5 flex justify-between items-center ">
      <div
        className="text-white   bg-AntarcticDeep  flex justify-center items-center gap-5 text-[20px] px-10 cursor-pointer w-[259.344px] "
        onClick={() => {
          toggleShowSideBar();
        }}
      >
        <span>{showSideBar ? "დამალვა" : "გამოჩენა"}</span>
        {showSideBar ? (
          <MdKeyboardDoubleArrowLeft className="text-ChinChinCherry text-[35px]" />
        ) : (
          <MdKeyboardDoubleArrowRight className="text-ChinChinCherry text-[35px]" />
        )}
      </div>
      <nav>
        <ul className="flex justify-end space-x-10">
          <li className="px-2 py-1 text-sm xl:text-[18px] relative group">
            <Link to="/" className="relative">
              კომპონენტები
              <span className="absolute bottom-[-4px] left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-out group-hover:w-full group-hover:right-0"></span>
            </Link>
          </li>
          <li className="px-2 py-1 text-sm xl:text-[18px] relative group">
            <Link to="/devices" className="relative">
              მოწყობილობები
              <span className="absolute bottom-[-4px] left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-out group-hover:w-full group-hover:right-0"></span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
