import { useEffect } from "react";
import moment from "moment";
import "moment/locale/ka";
import ButtonBox from "../components/component/ButtonBox";
import { useParams } from "react-router-dom";
import DevicesTable from "../components/component/DevicesTable";
import { useComponentStore } from "../store/componentStore";
import NotFound from "../components/NotFound";

const Component = () => {
  const { id } = useParams();
  const { getComponent, component, loading, error, isUpdate } =
    useComponentStore();

  useEffect(() => {
    getComponent(`${id}`);
    console.log(isUpdate);
  }, [id, getComponent, isUpdate]);

  if (loading) return <div>Loading...</div>;
  if (!component || error) return <NotFound name="კომპონენტი" />;

  return (
    <div>
      <ButtonBox currentComponent={component} />
      <div
        key={component.id}
        className=" py-10 px-4 max-w-[1440px] xl:mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 "
      >
        <div className="flex justify-center items-center md:col-span-2 xl:col-span-1  ">
          <div className="flex flex-col gap-4 h-[500px] w-[500px]">
            <img
              src={"https://picsum.photos/id/237/200/300"}
              alt="Component"
              className="w-full h-full object-cover rounded "
            />
          </div>
        </div>

        {/* Information Column 1 */}
        <div className="md:col-span-1 flex flex-col gap-2 mt-12">
          <h2 className="text-xl font-bold mb-3">ზოგადი ინფორმაცია</h2>
          <div className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4">
            <div className="flex gap-2 items-center">
              <div className="font-semibold text-gray-700 w-[150px]">
                დასახელება:
              </div>
              <div>{component.name}</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="font-semibold text-gray-700  w-[150px]">
                ოჯახი:
              </div>
              <div>{component.family}</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="font-semibold text-gray-700  w-[150px] ">
                ერთეულის ღირებულება:
              </div>
              <div className="">{component.unit_cost}</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="font-semibold text-gray-700  w-[150px] ">
                რაოდენობა:
              </div>
              <div className="">{component.available_quantity}</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="font-semibold text-gray-700  w-[150px] ">
                სხვა ხარჯები:
              </div>
              <div className="">{component.other_cost}</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="font-semibold text-gray-700  w-[150px] ">
                დანიშნულება:
              </div>
              <div className="">{component.purpose}</div>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-3">ტექნკური მახასიათებელი</h2>
          <div className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4">
            <div className="flex gap-2 items-center">
              <div className="font-semibold text-gray-700 w-[150px]">
                კორპუსის ტიპი:
              </div>
              <div className="">{component.package_type}</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="font-semibold text-gray-700 w-[150px]">
                ნომინალი:
              </div>
              <div className="">{component.nominal_value}</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="font-semibold text-gray-700 w-[150px]">
                ელ. კვება:
              </div>
              <div className="">{component.electrical_supply}</div>
            </div>
          </div>
        </div>

        {/* Information Column 2 */}
        <div className="md:col-span-1 flex flex-col gap-2 md:mt-12">
          <h2 className="text-xl font-bold mb-3">ლოჯისტიკა</h2>
          <div className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4">
            <div className="flex gap-2 items-center">
              <div className="font-semibold text-gray-700 w-[150px]">
                მწარმოებელის დასახელება:
              </div>
              <div className="">{component.suppliers_name}</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="font-semibold text-gray-700 w-[150px]">
                საკონტაქტო პირი:
              </div>
              <div className="">{component.suppliers_contact_person}</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="font-semibold text-gray-700 w-[150px]">
                საკონტაქტო ინფორმაცია:
              </div>
              <div className="">{component.suppliers_contact_details}</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="font-semibold text-gray-700 w-[150px]">
                მიღების თარიღი:
              </div>
              <div className="">
                {moment(component.receipt_date)
                  .locale("ka")
                  .format("D MMMM YYYY")}
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="font-semibold text-gray-700 w-[150px]">
                ინვოისი:
              </div>
              <div className="">{component.invoice_number}</div>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-3">შენახვის ადგილმდებარეობა</h2>
          <div className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4">
            <div className="flex gap-2 items-center">
              <div className="font-semibold text-gray-700 w-[150px]">
                კარადა:
              </div>
              <div className="">{component.storage_cabinet}</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="font-semibold text-gray-700 w-[150px]">თარო:</div>
              <div className="">{component.storage_shelf}</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="font-semibold text-gray-700 w-[150px]">უჯრა:</div>
              <div className="">{component.storage_drawer}</div>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 xl:col-span-3">
          <DevicesTable />
        </div>
      </div>
    </div>
  );
};

export default Component;
