import {
  //SubmitHandler,
  useForm,
} from "react-hook-form";
import { IComponent } from "../type";

const Form = () => {
  const {
    register,
    //control,
    //handleSubmit,
    //formState: { errors },
    //watch,
    // setValue,
    //reset,
  } = useForm<IComponent>({
    defaultValues: {},
  });

  // const onSubmit: SubmitHandler<> = async (data) => {
  //   try {
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <form className="max-w-[1440px] mt-[150px] rounded-md bg-white h-fit p-5">
      <div className=" xl:mx-auto md:grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-1 flex flex-col gap-2 mt-12 ">
          <legend className="text-xl font-bold mb-3">ზოგადი ინფორმაცია</legend>
          <fieldset className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4">
            {/* 1 */}
            <div className="flex gap-2 items-center">
              <label
                htmlFor="name"
                className="font-semibold text-SheetMetal w-[150px]"
              >
                დასახელება:
              </label>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-AntarcticDeep pl-1"
                type="text"
                {...register("name", {
                  required: "Can't be empty",
                })}
              />
            </div>
            {/* 2 */}
            <div className="flex gap-2 items-center">
              <label className="font-semibold text-gray-700  w-[150px]">
                ოჯახი:
              </label>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-AntarcticDeep pl-1 "
                type="text"
                {...register("family", {
                  required: "Can't be empty",
                })}
              />
            </div>
            {/* 3 */}
            <div className="flex gap-2 items-center">
              <label
                htmlFor="unit_cost"
                className="font-semibold text-gray-700  w-[150px] "
              >
                ერთეულის ღირებულება:
              </label>
              <input
                type="text"
                className="focus:outline-none border-[1px] rounded-sm border-AntarcticDeep pl-1 "
                {...register("unit_cost", {
                  required: "Can't be empty",
                  pattern: {
                    value: /^\d{1,3}(?:,\d{3})*(?:\.\d+)?$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </div>
            {/* 4 */}
            <div className="flex gap-2 items-center">
              <label
                htmlFor="available_quantity"
                className="font-semibold text-gray-700  w-[150px] "
              >
                რაოდენობა:
              </label>
              <input
                type="text"
                className="focus:outline-none border-[1px] rounded-sm border-AntarcticDeep pl-1"
                {...register("available_quantity", {
                  required: "Can't be empty",
                  pattern: {
                    value: /^\d{1,3}(?:,\d{3})*(?:\.\d+)?$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </div>
          </fieldset>

          <legend className="text-xl font-bold mb-3">
            ტექნკური მახასიათებელი
          </legend>
          <fieldset className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4">
            {/* 5 */}
            <div className="flex gap-2 items-center">
              <label
                htmlFor="component.package_type"
                className="font-semibold text-gray-700 w-[150px]"
              >
                კორპუსის ტიპი:
              </label>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-AntarcticDeep pl-1"
                type="text"
                {...register("package_type", {})}
              />
            </div>
            {/* 6 */}
            <div className="flex gap-2 items-center">
              <label
                htmlFor="nominal_value"
                className="font-semibold text-gray-700 w-[150px]"
              >
                ნომინალი:
              </label>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-AntarcticDeep pl-1"
                type="text"
                {...register("nominal_value", {})}
              />
            </div>
            {/* 7 */}
            <div className="flex gap-2 items-center">
              <label
                htmlFor="electrical_supply"
                className="font-semibold text-gray-700 w-[150px]"
              >
                ელ. კვება:
              </label>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-AntarcticDeep pl-1"
                type="text"
                {...register("electrical_supply", {})}
              />
            </div>
            {/* 8 */}
            <div className="flex gap-2 items-center">
              <label
                htmlFor="purpose"
                className="font-semibold text-gray-700 w-[150px]"
              >
                დანიშნულება
              </label>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-AntarcticDeep pl-1"
                type="text"
                {...register("purpose", {})}
              />
            </div>
          </fieldset>
        </div>

        {/* Information Column 2 */}
        <div className="md:col-span-1 flex flex-col gap-2 md:mt-12">
          <legend className="text-xl font-bold mb-3">მწარმოებელი</legend>
          <fieldset className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4">
            {/* 9 */}
            <div className="flex gap-2 items-center">
              <label
                htmlFor="suppliers_name"
                className="font-semibold text-gray-700 w-[150px]"
              >
                მწარმოებელის დასახელება:
              </label>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-AntarcticDeep pl-1 "
                type="text"
                {...register("suppliers_name", {})}
              />
            </div>
            {/* 10 */}
            <div className="flex gap-2 items-center">
              <label
                htmlFor="suppliers_contact_person"
                className="font-semibold text-gray-700 w-[150px]"
              >
                საკონტაქტო პირი:
              </label>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-AntarcticDeep pl-1"
                type="text"
                {...register("suppliers_contact_person", {})}
              />
            </div>
            {/* 11 */}
            <div className="flex gap-2 items-center">
              <label
                htmlFor="suppliers_contact_details"
                className="font-semibold text-gray-700 w-[150px]"
              >
                საკონტაქტო ინფორმაცია:
              </label>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-AntarcticDeep pl-1"
                type="text"
                {...register("suppliers_contact_details", {})}
              />
            </div>
            {/* 12 */}
            <div className="flex gap-2 items-center">
              <label
                htmlFor="receipt_date"
                className="font-semibold text-gray-700 w-[150px]"
              >
                მიღების თარიღი:
              </label>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-AntarcticDeep w-[180px] pl-1"
                type="date"
                {...register("receipt_date", {})}
              />
            </div>
            {/* 13 */}
            <div className="flex gap-2 items-center">
              <label
                htmlFor="invoice"
                className="font-semibold text-gray-700 w-[150px]"
              >
                ინვოისი:
              </label>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-AntarcticDeep pl-1"
                type="text"
                {...register("invoice", {})}
              />
            </div>
          </fieldset>
          <legend className="text-xl font-bold mb-3">
            შენახვის ადგილმდებარეობა
          </legend>
          <fieldset className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4">
            {/* 14 */}
            <div className="flex gap-2 items-center">
              <label
                htmlFor="storage_cabinet"
                className="font-semibold text-gray-700 w-[150px]"
              >
                კარადა:
              </label>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-AntarcticDeep pl-1 "
                type="text"
                {...register("storage_cabinet", {
                  pattern: {
                    value: /^\d{1,3}(?:,\d{3})*(?:\.\d+)?$/,
                    message: "Enter Number",
                  },
                })}
              />
            </div>
            {/* 15 */}
            <div className="flex gap-2 items-center">
              <label
                htmlFor="storage_shelf"
                className="font-semibold text-gray-700 w-[150px]"
              >
                თარო:
              </label>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-AntarcticDeep pl-1"
                type="text"
                {...register("storage_shelf", {
                  pattern: {
                    value: /^\d{1,3}(?:,\d{3})*(?:\.\d+)?$/,
                    message: "Enter Number",
                  },
                })}
              />
            </div>
            {/* 16 */}
            <div className="flex gap-2 items-center">
              <label
                htmlFor="storage_drawer"
                className="font-semibold text-gray-700 w-[150px]"
              >
                უჯრა:
              </label>
              <input
                className="focus:outline-none border-[1px] rounded-sm border-AntarcticDeep pl-1"
                type="text"
                {...register("storage_drawer", {
                  pattern: {
                    value: /^\d{1,3}(?:,\d{3})*(?:\.\d+)?$/,
                    message: "Enter Number",
                  },
                })}
              />
            </div>
          </fieldset>
        </div>
      </div>
      <div className="flex justify-start items-center gap-5">
        <button
          type="submit"
          className="px-4 py-2 bg-green text-white rounded-md cursor-pointer text-sm "
        >
          დამატება
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-AntarcticDeep text-white rounded-md cursor-pointer text-sm "
        >
          გათიშვა
        </button>
      </div>
    </form>
  );
};

export default Form;
