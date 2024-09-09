import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { pagination } from "../type";
import { useState, useEffect } from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }: pagination) => {
  // State to track the current page
  const [current, setCurrent] = useState<number>(currentPage);

  // Update the current page state when the currentPage prop changes
  useEffect(() => {
    setCurrent(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrent(page);
    onPageChange(page);
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
