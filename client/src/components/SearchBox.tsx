import { IoSearch } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../App/hook";
import { getComponents } from "../feature/componentSlice";
import { useState } from "react";

const SearchBox = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value); // Update local search term state

    // Dispatch the action with the updated filterTerm
    dispatch(getComponents({ ...filters, search_term: value }));
  };
  console.log(filters);

  return (
    <div className="p-4 bg-red-500 flex justify-start gap-4 items-center">
      <IoSearch className="text-xl" />
      <input
        type="search"
        name="search"
        id="search"
        placeholder="ძიება.."
        className="w-full p-1 rounded-md focus:outline-none text-base"
        onChange={handleChange}
        value={searchTerm}
      />
    </div>
  );
};

export default SearchBox;
