import { useEffect } from "react";
import CustomSelect from "../components/CustomSelect";
import { useComponentStore } from "../store/componentStore";
import { useFilterStore } from "../store/componentFilterStore";

const FilterContainer = () => {
  const { getComponents } = useComponentStore();

  const state = useFilterStore((state) => state);

  useEffect(() => {
    getComponents(state);
  }, [state]);

  return (
    <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <CustomSelect filterBy="name" />
      <CustomSelect filterBy="family" />
      <CustomSelect filterBy="package_type" />
      <CustomSelect filterBy="nominal_value" />
      <CustomSelect filterBy="electrical_supply" />
      <CustomSelect filterBy="suppliers_name" />
    </section>
  );
};

export default FilterContainer;
