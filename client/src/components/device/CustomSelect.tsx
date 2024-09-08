import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useDeviceFilterStore } from "../../store/filterStore";
import { CustomSelectDeviceProps, OptionItem } from "../../type";

const Api_Url = import.meta.env.VITE_API_URL;

const CustomSelect = ({
  filterDeviceBy,
  placeholder,
}: CustomSelectDeviceProps) => {
  const { [filterDeviceBy]: selectedValue, setDeviceFilter } =
    useDeviceFilterStore();

  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<OptionItem[]>(
          `${Api_Url}/filter-options/device/?filterBy=${filterDeviceBy}`
        );

        const filteredOptions = response.data
          .map((item) => ({
            value: item[filterDeviceBy],
            label: item[filterDeviceBy],
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
  }, [filterDeviceBy]);

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      isLoading={isLoading}
      isClearable
      isSearchable
      name={filterDeviceBy}
      options={options}
      value={options.find((option) => option.value === selectedValue)}
      onChange={(selectedOption) => {
        setDeviceFilter(filterDeviceBy, selectedOption?.value ?? "");
      }}
      placeholder={placeholder}
    />
  );
};

export default CustomSelect;
