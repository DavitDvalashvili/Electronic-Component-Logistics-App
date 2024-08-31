import { SubmitHandler, useForm } from "react-hook-form";
import { component } from "../../type";
import { useComponentStore } from "../../store/componentStore";

import { formProps } from "../../type";
//import { update } from "../feature/componentSlice";
import { useEffect } from "react";

const Form = ({ setShowForm, status }: formProps) => {
  const { addComponent, component, updateComponent, toggleUpdate } =
    useComponentStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<component>();

  const onSubmit: SubmitHandler<component> = async (data) => {
    try {
      if (status === "adding") {
        addComponent(data);
      } else if (status === "updating") {
        updateComponent(data);
      }
      toggleUpdate();
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (status === "updating" && component !== null) {
      (Object.keys(component) as (keyof component)[]).forEach((field) => {
        setValue(field, component[field]);
      });
    }
  }, [status, component, setValue]);

  return (
    <form
      className="max-w-[1440px] mt-[100px] rounded-md bg-white h-fit p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className=" xl:mx-auto md:grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-1 flex flex-col gap-2 mt-12 ">
          <legend className="text-xl font-bold mb-3">ზოგადი ინფორმაცია</legend>
          <fieldset className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4">
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
                    required: "Can't be empty",
                  })}
                />
              </div>
            </div>
            {/* 2 */}
            <div className="flex gap-2 items-end">
              <label className="font-semibold text-gray-700  w-[150px]">
                ოჯახი:
              </label>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-ChinChinCherry h-4">
                  {errors.family?.message}
                </span>
                <input
                  className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 "
                  type="text"
                  {...register("family", {
                    required: "Can't be empty",
                  })}
                />
              </div>
            </div>
            {/* 3 */}
            <div className="flex gap-2 items-end">
              <label
                htmlFor="unit_cost"
                className="font-semibold text-gray-700  w-[150px] "
              >
                ერთეულის ღირებულება:
              </label>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-ChinChinCherry h-4">
                  {errors.unit_cost?.message}
                </span>
                <input
                  type="text"
                  className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 "
                  {...register("unit_cost", {
                    required: "Can't be empty",
                    pattern: {
                      value: /^\d{1,3}(?:,\d{3})*(?:\.\d+)?$/,
                      message: "Invalid number",
                    },
                  })}
                />
              </div>
            </div>
            {/* 4 */}
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
                  type="text"
                  className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1"
                  {...register("available_quantity", {
                    required: "Can't be empty",
                    pattern: {
                      value: /^\d{1,3}(?:,\d{3})*(?:\.\d+)?$/,
                      message: "Invalid number",
                    },
                  })}
                />
              </div>
            </div>
            {/* 5 */}
            <div className="flex gap-2 items-end">
              <label
                htmlFor="purpose"
                className="font-semibold text-gray-700 w-[150px]"
              >
                სხვა ხარჯები
              </label>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-ChinChinCherry h-4">
                  {errors.other_cost?.message}
                </span>
                <input
                  className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1"
                  type="text"
                  {...register("other_cost", {})}
                />
              </div>
            </div>
            {/* 6 */}
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

          <legend className="text-xl font-bold mb-3">
            ტექნკური მახასიათებელი
          </legend>
          <fieldset className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4">
            {/* 5 */}
            <div className="flex gap-2 items-end">
              <label
                htmlFor="component.package_type"
                className="font-semibold text-gray-700 w-[150px]"
              >
                კორპუსის ტიპი:
              </label>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-ChinChinCherry h-4">
                  {errors.package_type?.message}
                </span>
                <input
                  className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1"
                  type="text"
                  {...register("package_type", {})}
                />
              </div>
            </div>
            {/* 6 */}
            <div className="flex gap-2 items-end">
              <label
                htmlFor="nominal_value"
                className="font-semibold text-gray-700 w-[150px]"
              >
                ნომინალი:
              </label>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-ChinChinCherry h-4">
                  {errors.nominal_value?.message}
                </span>
                <input
                  className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1"
                  type="text"
                  {...register("nominal_value", {})}
                />
              </div>
            </div>
            {/* 7 */}
            <div className="flex gap-2 items-end">
              <label
                htmlFor="electrical_supply"
                className="font-semibold text-gray-700 w-[150px]"
              >
                ელ. კვება:
              </label>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-ChinChinCherry h-4">
                  {errors.nominal_value?.message}
                </span>
                <input
                  className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1"
                  type="text"
                  {...register("electrical_supply", {})}
                />
              </div>
            </div>
          </fieldset>
        </div>

        {/* Information Column 2 */}
        <div className="md:col-span-1 flex flex-col gap-2 md:mt-12">
          <legend className="text-xl font-bold mb-3">მწარმოებელი</legend>
          <fieldset className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4">
            {/* 9 */}
            <div className="flex gap-2 items-end">
              <label
                htmlFor="suppliers_name"
                className="font-semibold text-gray-700 w-[150px]"
              >
                მწარმოებელის დასახელება:
              </label>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-ChinChinCherry h-4">
                  {errors.suppliers_name?.message}
                </span>
                <input
                  className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 "
                  type="text"
                  {...register("suppliers_name", {})}
                />
              </div>
            </div>
            {/* 10 */}
            <div className="flex gap-2 items-end">
              <label
                htmlFor="suppliers_contact_person"
                className="font-semibold text-gray-700 w-[150px]"
              >
                საკონტაქტო პირი:
              </label>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-ChinChinCherry h-4">
                  {errors.suppliers_contact_person?.message}
                </span>
                <input
                  className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1"
                  type="text"
                  {...register("suppliers_contact_person", {})}
                />
              </div>
            </div>
            {/* 11 */}
            <div className="flex gap-2 items-end">
              <label
                htmlFor="suppliers_contact_details"
                className="font-semibold text-gray-700 w-[150px]"
              >
                საკონტაქტო ინფორმაცია:
              </label>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-ChinChinCherry h-4">
                  {errors.suppliers_contact_details?.message}
                </span>
                <input
                  className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1"
                  type="text"
                  {...register("suppliers_contact_details", {})}
                />
              </div>
            </div>
            {/* 12 */}
            <div className="flex gap-2 items-end">
              <label
                htmlFor="receipt_date"
                className="font-semibold text-gray-700 w-[150px]"
              >
                მიღების თარიღი:
              </label>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-ChinChinCherry h-4">
                  {errors.receipt_date?.message}
                </span>
                <input
                  className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep w-[180px] pl-1 cursor-text"
                  type="date"
                  {...register("receipt_date", {})}
                />
              </div>
            </div>
            {/* 13 */}
            <div className="flex gap-2 items-end">
              <label
                htmlFor="invoice_number"
                className="font-semibold text-gray-700 w-[150px]"
              >
                ინვოისი:
              </label>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-ChinChinCherry h-4">
                  {errors.invoice_number?.message}
                </span>
                <input
                  className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1"
                  type="text"
                  {...register("invoice_number", {})}
                />
              </div>
            </div>
          </fieldset>
          <legend className="text-xl font-bold mb-3">
            შენახვის ადგილმდებარეობა
          </legend>
          <fieldset className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4">
            {/* 14 */}
            <div className="flex gap-2 items-end">
              <label
                htmlFor="storage_cabinet"
                className="font-semibold text-gray-700 w-[150px]"
              >
                კარადა:
              </label>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-ChinChinCherry h-4">
                  {errors.storage_cabinet?.message}
                </span>
                <input
                  className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 "
                  type="text"
                  {...register("storage_cabinet", {})}
                />
              </div>
            </div>
            {/* 15 */}
            <div className="flex gap-2 items-end">
              <label
                htmlFor="storage_shelf"
                className="font-semibold text-gray-700 w-[150px]"
              >
                თარო:
              </label>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-ChinChinCherry h-4">
                  {errors.storage_shelf?.message}
                </span>
                <input
                  className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1"
                  type="text"
                  {...register("storage_shelf", {})}
                />
              </div>
            </div>
            {/* 16 */}
            <div className="flex gap-2 items-end">
              <label
                htmlFor="storage_drawer"
                className="font-semibold text-gray-700 w-[150px]"
              >
                უჯრა:
              </label>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-ChinChinCherry h-4">
                  {errors.storage_drawer?.message}
                </span>
                <input
                  className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1"
                  type="text"
                  {...register("storage_drawer", {})}
                />
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div className="flex justify-end items-center gap-5">
        <button
          type="submit"
          className="px-4 py-2 bg-green text-white rounded-md cursor-pointer text-[10px] "
        >
          {status == "adding" ? "დამატება" : "განახლება"}
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-AntarcticDeep text-white rounded-md cursor-pointer text-[10px] "
          onClick={() => {
            setShowForm(false);
          }}
        >
          გაუქმება
        </button>
      </div>
    </form>
  );
};

export default Form;
