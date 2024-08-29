import { IoSearch } from "react-icons/io5";
import { useFilterStore } from "../store/componentFilterStore";

const SearchBox = () => {
  const { setFilter } = useFilterStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter("search_term", e.target.value);
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
