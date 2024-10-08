import { SubmitHandler, useForm } from "react-hook-form";
import { device } from "../../type";
import { useDeviceStore } from "../../store/deviceStore";
import { formProps } from "../../type";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useDeviceFilterStore } from "../../store/filterStore";

const Form = ({ setShowForm, status }: formProps) => {
  const { id } = useParams();
  // Destructure functions and state from the device store
  const { addDevice, device, updateDevice, getDevice, getDevices } =
    useDeviceStore();
  const state = useDeviceFilterStore((state) => state);

  // Initialize form methods from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<device>();

  // Submit handler for the form
  const onSubmit: SubmitHandler<device> = async (data) => {
    try {
      if (status === "adding") {
        await addDevice(data); // Add new device
        await getDevices(state);
      } else if (status === "updating") {
        await updateDevice(data); // Update existing device
        await getDevice(`${id}`);
      }

      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Populate form fields with existing device data when updating
    if (status === "updating" && device !== null) {
      (Object.keys(device) as (keyof device)[]).forEach((field) => {
        setValue(field, device[field]);
      });
    }
  }, [status, device, setValue]);

  return (
    <motion.form
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: -1, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1440px] mt-[200px] rounded-md bg-white h-fit p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className=" xl:mx-auto md:grid grid-cols-1 md:grid-cols-2 gap-5">
        <fieldset className="flex flex-col gap-2  p-4  mb-4">
          {/* 1 */}
          <div className="flex gap-2 items-end">
            <label
              htmlFor="name"
              className="font-semibold text-SheetMetal w-[150px]"
            >
              დასახელება:
            </label>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-ChinChinCherry h-4">
                {errors.name?.message}
              </span>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 "
                type="text"
                {...register("name", {
                  required: "სავალდებულო ველი",
                })}
              />
            </div>
          </div>
          <div className="flex gap-2 items-end">
            <label
              htmlFor="unit_cost"
              className="font-semibold text-gray-700  w-[150px] "
            >
              ელ კვება:
            </label>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-ChinChinCherry h-4">
                {errors.electrical_supply?.message}
              </span>
              <input
                type="text"
                className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 "
                {...register("electrical_supply", {})}
              />
            </div>
          </div>

          <div className="flex gap-2 items-end">
            <label
              htmlFor="purpose"
              className="font-semibold text-gray-700 w-[150px]"
            >
              დანიშნულება
            </label>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-ChinChinCherry h-4">
                {errors.purpose?.message}
              </span>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1"
                type="text"
                {...register("purpose", {})}
              />
            </div>
          </div>
        </fieldset>

        {/* Information Column 2 */}

        <fieldset className="flex flex-col gap-2  p-4  mb-4">
          {/* 1 */}
          <div className="flex gap-2 items-end">
            <label
              htmlFor="name"
              className="font-semibold text-SheetMetal w-[150px]"
            >
              ერთეულის ღირებულება:
            </label>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-ChinChinCherry h-4">
                {errors.unit_cost?.message}
              </span>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 "
                type="text"
                {...register("unit_cost", {
                  pattern: {
                    value: /^\d{1,3}(?:,\d{3})*(?:\.\d+)?$/,
                    message: "შეიყვანეთ რიცხვი",
                  },
                })}
              />
            </div>
          </div>

          <div className="flex gap-2 items-end">
            <label
              htmlFor="available_quantity"
              className="font-semibold text-gray-700  w-[150px] "
            >
              რაოდენობა:
            </label>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-ChinChinCherry h-4">
                {errors.available_quantity?.message}
              </span>
              <input
                type="t{ext"
                className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1"
                {...register("available_quantity", {
                  required: "სავალდებულო ველი",
                  pattern: {
                    value: /^\d{1,3}(?:,\d{3})*(?:\.\d+)?$/,
                    message: "შეიყვანეთ რიცხვი",
                  },
                })}
              />
            </div>
          </div>

          <div className="flex gap-2 items-end">
            <label
              htmlFor="purpose"
              className="font-semibold text-gray-700 w-[150px]"
            >
              ზომა
            </label>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-ChinChinCherry h-4">
                {errors.size?.message}
              </span>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1"
                type="text"
                {...register("size", {})}
              />
            </div>
          </div>
        </fieldset>
      </div>

      <div className="flex justify-end items-center gap-5">
        <button
          type="button"
          className="px-4 py-2 bg-AntarcticDeep text-white rounded-md cursor-pointer text-[10px] "
          onClick={() => {
            setShowForm(false);
          }}
        >
          გაუქმება
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green text-white rounded-md cursor-pointer text-[10px] "
        >
          {status == "adding" ? "დამატება" : "განახლება"}
        </button>
      </div>
    </motion.form>
  );
};

export default Form;
