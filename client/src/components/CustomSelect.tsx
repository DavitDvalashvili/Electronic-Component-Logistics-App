// import { useState, useEffect } from "react";
// import Select from "react-select";
// import axios from "axios";

// // Example API URL
// const Api_Url = "http://localhost:3000/api";

// interface OptionItem {
//   [key: string]: string;
// }

// interface CustomSelectProps {
//   filterBy: string;
// }

// const CustomSelect = ({ filterBy }: CustomSelectProps) => {
//   const [options, setOptions] = useState<{ value: string; label: string }[]>(
//     []
//   );
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchOptions = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get<OptionItem[]>(
//           `${Api_Url}/filter-options/get/?filterBy=${filterBy}`
//         );
//         setOptions(
//           response.data.map((item) => ({
//             value: item[filterBy],
//             label: item[filterBy],
//           }))
//         );
//       } catch (error) {
//         console.error("Error fetching options:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOptions();
//   }, [filterBy]);

//   return (
//     <Select
//       className="basic-single"
//       classNamePrefix="select"
//       isLoading={isLoading}
//       isClearable
//       isSearchable
//       name={filterBy}
//       options={options}
//     />
//   );
// };

// export default CustomSelect;

import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../App/store";
import { setFilter } from "../feature/filtersSlice";

const Api_Url = "http://localhost:3000/api";

type FilterKey =
  | "name"
  | "family"
  | "package_type"
  | "nominal_value"
  | "electrical_supply"
  | "suppliers_name";

interface OptionItem {
  [key: string]: string;
}

interface CustomSelectProps {
  filterBy: FilterKey;
}

const CustomSelect = ({ filterBy }: CustomSelectProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedValue = useSelector(
    (state: RootState) => state.filters[filterBy]
  );
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
        setOptions(
          response.data.map((item) => ({
            value: item[filterBy],
            label: item[filterBy],
          }))
        );
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
        dispatch(setFilter({ filterBy, value: selectedOption?.value ?? "" }));
      }}
    />
  );
};

export default CustomSelect;
