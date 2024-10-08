import { useEffect } from "react";
import CustomSelect from "./CustomSelect";
import { useDeviceStore } from "../../store/deviceStore";
import { useDeviceFilterStore } from "../../store/filterStore";

const FilterContainer = () => {
  // Destructure getDevices function and isUpdate flag from the device store
  const { getDevices } = useDeviceStore();
  const state = useDeviceFilterStore((state) => state);

  // Fetch devices based on current filter state
  useEffect(() => {
    getDevices(state);
  }, [state, getDevices]);

  return (
    <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <CustomSelect filterDeviceBy="name" placeholder="დასახელებით ძებნა..." />
      <CustomSelect
        filterDeviceBy="electrical_supply"
        placeholder="ელექტრონული კვებით ძებნა..."
      />
      <CustomSelect filterDeviceBy="size" placeholder="ზომით ძებნა..." />
    </section>
  );
};

export default FilterContainer;
