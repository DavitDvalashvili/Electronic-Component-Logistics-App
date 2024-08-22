import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { IPagination } from "../type";
import { useState } from "react";

const Pagination = ({
  setCurrentPage,
  totalPages,
  currentPage,
}: IPagination) => {
  const [current, setCurrent] = useState<number>(currentPage);

  const handlePageChange = (page: number) => {
    setCurrent(page);
    setCurrentPage(page);
  };

  return (
    <ResponsivePagination
      current={current}
      total={totalPages}
      onPageChange={handlePageChange}
    />
  );
};

export default Pagination;
