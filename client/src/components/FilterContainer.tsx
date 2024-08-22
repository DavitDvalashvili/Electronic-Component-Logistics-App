import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../App/hook";
import { RootState } from "../App/store";
import { getComponents } from "../feature/componentSlice";
import CustomSelect from "../components/CustomSelect";

const FilterContainer = () => {
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state: RootState) => state.filters);

  useEffect(() => {
    dispatch(getComponents(filters));
  }, [dispatch, filters]);

  return (
    <section className="grid  grid-cols-2 lg:grid-cols-3 gap-4 p-5 max-w-[1180px] xl:mx-auto">
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
