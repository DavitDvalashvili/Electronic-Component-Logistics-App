import { useEffect } from "react";
import CustomSelect from "./CustomSelect";
import { useComponentStore } from "../../store/componentStore";
import { useComponentFilterStore } from "../../store/filterStore";

const FilterContainer = () => {
  const { getComponents, isUpdate } = useComponentStore();

  const state = useComponentFilterStore((state) => state);

  useEffect(() => {
    getComponents(state);
  }, [state, getComponents, isUpdate]);

  return (
    <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <CustomSelect filterComponentBy="name" />
      <CustomSelect filterComponentBy="family" />
      <CustomSelect filterComponentBy="package_type" />
      <CustomSelect filterComponentBy="nominal_value" />
      <CustomSelect filterComponentBy="electrical_supply" />
      <CustomSelect filterComponentBy="suppliers_name" />
    </section>
  );
};

export default FilterContainer;
