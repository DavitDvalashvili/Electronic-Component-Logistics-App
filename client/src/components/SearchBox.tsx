import { IoSearch } from "react-icons/io5";
import {
  useComponentFilterStore,
  useDeviceFilterStore,
} from "../store/filterStore";
import { useLocation } from "react-router-dom";

const SearchBox = () => {
  const location = useLocation();
  const pathname = location.pathname.slice(1);

  const { setComponentFilter } = useComponentFilterStore();
  const { setDeviceFilter } = useDeviceFilterStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (pathname === "devices") {
      setDeviceFilter("search_term", e.target.value);
    } else {
      setComponentFilter("search_term", e.target.value);
    }
  };

  return (
    <div className="py-[3px] px-3 border-solid border-[1px] border-shadowColor rounded-md flex justify-start gap-4 items-center w-auto w-[350px] md:w-[300px]">
      <IoSearch className="text-xl" />
      <input
        type="search"
        name="search"
        id="search"
        placeholder="ძიება.."
        className="w-full p-1 rounded-md focus:outline-none text-base"
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
