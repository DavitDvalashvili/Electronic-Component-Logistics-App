import { useEffect } from "react";
import CustomSelect from "./CustomSelect";
import { useComponentStore } from "../../store/componentStore";
import { useComponentFilterStore } from "../../store/filterStore";

const FilterContainer = () => {
  // Destructure `getComponents` and `isUpdate` from the component store
  const { getComponents } = useComponentStore();

  // Access the filter state from the filter store
  const state = useComponentFilterStore((state) => state);

  // Fetch components whenever the filter state or `getComponents` function changes
  useEffect(() => {
    getComponents(state);
  }, [state, getComponents]);

  return (
    <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <CustomSelect
        filterComponentBy="name"
        placeholder="დასახელებით ძებნა..."
      />
      <CustomSelect filterComponentBy="family" placeholder="ოჯახით ძებნა..." />
      <CustomSelect
        filterComponentBy="package_type"
        placeholder="პაკეტის ტიპით ძებნა..."
      />
      <CustomSelect
        filterComponentBy="nominal_value"
        placeholder="ნომინალური ღირებულებით ძებნა..."
      />
      <CustomSelect
        filterComponentBy="electrical_supply"
        placeholder="ელექტორნული კვებით ძებნა..."
      />
      <CustomSelect
        filterComponentBy="suppliers_name"
        placeholder="მომწოდებლის დასახელებლით ძებნა..."
      />
    </section>
  );
};

export default FilterContainer;
