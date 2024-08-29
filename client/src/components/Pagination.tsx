import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { IPagination } from "../type";
import { useState, useEffect } from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }: IPagination) => {
  const [current, setCurrent] = useState<number>(currentPage);

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
