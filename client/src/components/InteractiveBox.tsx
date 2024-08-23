import FilterContainer from "../components/FilterContainer";
import Pagination from "../components/Pagination";
import SearchBox from "../components/SearchBox";
import { TbFilterCheck } from "react-icons/tb";
import { MdFilterAltOff } from "react-icons/md";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../App/hook";
import { getComponents } from "../feature/componentSlice";

const InteractiveBox = () => {
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { components } = useAppSelector((state) => state.component);
  const [totalPages, setTotalPages] = useState<number>(1);
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  const handleClick = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    setTotalPages(Math.round(components.length / 10 + 10));
  }, [components.length]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(getComponents({ ...filters, page: page.toString() }));
  };

  return (
    <div className="max-w-[1440px] pb-5 pt-10 xl:mx-auto ">
      <div className="flex flex-col md:flex-row md:items-center md:justify-start justify-center items-start gap-5 px-4 pb-5 ">
        <div className="flex justify-start items-center gap-5">
          <div
            className="flex justify-center items-top gap-2 cursor-pointer "
            onClick={handleClick}
          >
            {showFilter ? (
              <MdFilterAltOff className="text-[24px]" />
            ) : (
              <TbFilterCheck className="text-[24px]" />
            )}
            <span className="text-lg font-bolt">ფილტრი</span>
          </div>
          <SearchBox />
        </div>
        <div className="w-[300px] sm:w-[450px] md:w-[300px] md:ml-auto lg:w-[500px]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange} // Pass the handler function to Pagination
          />
        </div>
      </div>

      {showFilter && <FilterContainer />}
    </div>
  );
};

export default InteractiveBox;
