import Select from "react-select";
import useComponentDeviceStore from "../../store/componentDeviceStore";
import { useComponentStore } from "../../store/componentStore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { option, AddComponentProps } from "../../type";
import { useDeviceStore } from "../../store/deviceStore";
import { motion } from "framer-motion";

const LinkComponent = ({ setShowAddDevice }: AddComponentProps) => {
  // Destructure store methods and states
  const {
    getComponentsNames,
    names,
    addDeviceComponent,
    getComponents,
    components,
    loading,
  } = useComponentDeviceStore();
  const { getDevice } = useDeviceStore();
  const { getAllComponents, allComponents } = useComponentStore();

  // Local state management
  const [selectedOption, setSelectedOption] = useState<option | null>(null);
  const [value, setValue] = useState<number>(0);
  const [note, setNote] = useState<string>("");
  const id = useParams().id;

  // Fetch component names and all components on mount or when ID changes
  useEffect(() => {
    getComponentsNames();
    getAllComponents();
  }, [getComponentsNames, getAllComponents, id]);

  // Filter components based on selected option
  const filterComponent = allComponents.filter(
    (component) => component.name == selectedOption?.value
  );

  // Check if the component already exists in the current device
  const existingComponent = components.filter(
    (component) => component.component_name === selectedOption?.value
  );

  // Prepare options for the select input
  const options: option[] = names.map((option) => ({
    value: option,
    label: option,
  }));

  // Handle changes in the select input
  const handleSelectChange = (selected: option | null) => {
    setSelectedOption(selected);
  };

  // Submit form data to add a component to the device
  const handleSubmit = async () => {
    // Validation checks
    if (!selectedOption?.value || value === 0) {
      setNote("აირჩეთ კომპონენტის დასახელება და მიუთითეთ რაოდენობა");
      return;
    }

    if (existingComponent.length > 0) {
      setNote("კომპონენტი უკვე დამატებულია");
      return;
    }

    if (id) {
      try {
        if (filterComponent.length === 0) {
          setNote("კომპონენტი არ მოიძებნა");
          return;
        }
        // Add the component to the device
        addDeviceComponent({
          component_id: Number(filterComponent[0].id),
          device_id: Number(id),
          quantity_per_device: Number(value),
        });
        await getDevice(id);
        await getComponents(id);
        setNote("");
      } catch (err) {
        console.error(err);
        console.error("An error occurred while adding the device component.");
      }
    } else {
      setNote("Invalid device ID.");
    }
    setShowAddDevice(false);
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: -1, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white text-AntarcticDeep p-10 rounded-md  text-lg"
    >
      <p className="font-semibold text-center mb-4">დაამატე კომპონენტი</p>
      {note && <p className="text-ChinChinCherry text-[12px]">{note}</p>}
      <div className="flex justify-start items-center gap-4 mb-4 w-[375px] ">
        <Select
          className="basic-single w-full"
          classNamePrefix="select"
          isLoading={loading}
          isClearable
          isSearchable
          name="componentOptions"
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          placeholder="აირჩიეთ კომპონენტი"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) {
              setValue(Number(e.target.value));
            }
          }}
          className="w-16 h-8 text-base rounded-md border-[2px] border-solid border-NorthAtlanticBreeze focus:outline-none p-1"
        />
      </div>

      <div className="flex justify-center items-center gap-4 pt-5">
        <button
          onClick={() => setShowAddDevice(false)}
          className="px-2 py-2 bg-SheetMetal text-white rounded-md cursor-pointer text-sm"
        >
          გათიშვა
        </button>
        <button
          onClick={handleSubmit}
          className="px-2 py-2 bg-NorthAtlanticBreeze text-white rounded-md cursor-pointer text-sm"
        >
          დამატება
        </button>
      </div>
    </motion.div>
  );
};

export default LinkComponent;
