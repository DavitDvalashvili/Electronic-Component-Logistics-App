import { IoSearch } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../App/hook";
import { getComponents } from "../feature/componentSlice";

const SearchBox = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(getComponents({ ...filters, search_term: e.target.value }));
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
