import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useComponentFilterStore } from "../../store/filterStore";
import { CustomSelectComponentProps, OptionItem } from "../../type";

// Base API URL from environment variables
const Api_Url = import.meta.env.VITE_API_URL;

const CustomSelect = ({
  filterComponentBy,
  placeholder,
}: CustomSelectComponentProps) => {
  // Extract the selected value and setter function from Zustand store
  const { [filterComponentBy]: selectedValue, setComponentFilter } =
    useComponentFilterStore();

  // State for managing options and loading status
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  // Effect to fetch options based on the filterComponentBy prop
  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<OptionItem[]>(
          `${Api_Url}/api/filter-options/component/?filterBy=${filterComponentBy}`
        );
        // Map response data to options format for react-select
        const filteredOptions = response.data
          .map((item) => ({
            value: item[filterComponentBy],
            label: item[filterComponentBy],
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
  }, [filterComponentBy]);

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      isLoading={isLoading}
      isClearable
      isSearchable
      name={filterComponentBy}
      options={options}
      value={options.find((option) => option.value === selectedValue)}
      onChange={(selectedOption) => {
        setComponentFilter(filterComponentBy, selectedOption?.value ?? "");
      }}
      placeholder={placeholder}
    />
  );
};

export default CustomSelect;
