import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useFilterStore } from "../store/componentFilterStore";
import { CustomSelectProps, OptionItem } from "../type";

const Api_Url = "http://localhost:3000/api";

const CustomSelect = ({ filterBy }: CustomSelectProps) => {
  const { [filterBy]: selectedValue, setFilter } = useFilterStore();

  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<OptionItem[]>(
          `${Api_Url}/filter-options/get/?filterBy=${filterBy}`
        );

        const filteredOptions = response.data
          .map((item) => ({
            value: item[filterBy],
            label: item[filterBy],
          }))
          .filter((option) => option.value && option.value.trim() !== "");

        setOptions(filteredOptions);
      } catch (error) {
        console.error("Error fetching options:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, [filterBy]);

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      isLoading={isLoading}
      isClearable
      isSearchable
      name={filterBy}
      options={options}
      value={options.find((option) => option.value === selectedValue)}
      onChange={(selectedOption) => {
        setFilter(filterBy, selectedOption?.value ?? "");
      }}
    />
  );
};

export default CustomSelect;
