import { useEffect } from "react";
import CustomSelect from "./CustomSelect";
import { useDeviceStore } from "../../store/deviceStore";
import { useDeviceFilterStore } from "../../store/filterStore";

const FilterContainer = () => {
  const { getDevices, isUpdate } = useDeviceStore();

  const state = useDeviceFilterStore((state) => state);

  useEffect(() => {
    getDevices(state);
  }, [state, getDevices, isUpdate]);

  return (
    <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <CustomSelect filterDeviceBy="name" />
      <CustomSelect filterDeviceBy="electrical_supply" />
      <CustomSelect filterDeviceBy="size" />
    </section>
  );
};

export default FilterContainer;