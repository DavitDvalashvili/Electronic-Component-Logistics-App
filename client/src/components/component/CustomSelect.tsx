import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useComponentFilterStore } from "../../store/filterStore";
import { CustomSelectComponentProps, OptionItem } from "../../type";

const Api_Url = "http://localhost:3000/api";

const CustomSelect = ({ filterComponentBy }: CustomSelectComponentProps) => {
  const { [filterComponentBy]: selectedValue, setComponentFilter } =
    useComponentFilterStore();

  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<OptionItem[]>(
          `${Api_Url}/filter-options/component/?filterBy=${filterComponentBy}`
        );

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
    />
  );
};

export default CustomSelect;
