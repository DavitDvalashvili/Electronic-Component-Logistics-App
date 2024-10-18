import { useEffect } from "react";
import { format } from "date-fns";
import SideBarComponent from "../components/Layout/SideBarComponent";
import { useParams } from "react-router-dom";
import DevicesTable from "../components/component/DevicesTable";
import { useComponentStore } from "../store/componentStore";
import ImageBox from "../components/SwiperWrapper";
import PdfViewer from "../components/component/PdfViewer";
import CustomLoader from "../components/CustomLoader";
import NotFound from "../components/NotFound";

const Component = () => {
  const { id } = useParams();
  const { getComponent, component, loading, error } = useComponentStore();

  // Fetch component data when the component ID or update status changes
  useEffect(() => {
    getComponent(`${id}`);
  }, [id, getComponent]);

  return (
    <div className="pl-[70px]">
      {loading && <CustomLoader />}
      {error && <NotFound name="მოწყობილობა" />}
      {component && (
        <>
          <SideBarComponent currentComponent={component} />
          <div
            key={component.id}
            className=" py-10 px-4 max-w-[1370px] xl:mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 "
          >
            <div className="flex justify-center items-center md:col-span-2 xl:col-span-1  ">
              <div className="flex flex-col gap-4 h-[500px] w-full">
                <ImageBox images={component.images} />
              </div>
            </div>

            {/* Information Column 1 */}
            <div className="md:col-span-1 flex flex-col gap-3 mt-12">
              <h2 className="text-xl font-bold mb-3">ზოგადი ინფორმაცია</h2>
              <div className="flex flex-col gap-3 border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4">
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700">დასახელება</div>
                  <div>{component.name || "---"}</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700  ">ოჯახი</div>
                  <div>{component.family || "---"}</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700 ">
                    ერთეულის ღირებულება
                  </div>
                  <div className="">{component.unit_cost || "---"}</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700 ">რაოდენობა</div>
                  <div className="">
                    {component.available_quantity || "---"}
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700">
                    სხვა ხარჯები
                  </div>
                  <div className="">{component.other_cost || "---"}</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700">დანიშნულება</div>
                  <div className="">{component.purpose || "---"}</div>
                </div>
              </div>

              <h2 className="text-xl font-bold mb-3">ტექნკური მახასიათებელი</h2>
              <div className="flex flex-col gap-3 border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4">
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700">
                    კორპუსის ტიპი
                  </div>
                  <div className="">{component.package_type || "---"}</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700">ნომინალი</div>
                  <div className="">{component.nominal_value || "---"}</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700">ელ. კვება</div>
                  <div className="">{component.electrical_supply || "---"}</div>
                </div>
              </div>
            </div>

            {/* Information Column 2 */}
            <div className="md:col-span-1 flex flex-col gap-3 md:mt-12">
              <h2 className="text-xl font-bold mb-3">ლოჯისტიკა</h2>
              <div className="flex flex-col gap-3 border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4">
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700">
                    მწარმოებელის დასახელება
                  </div>
                  <div className="">{component.suppliers_name || "---"}</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700">
                    საკონტაქტო პირი
                  </div>
                  <div className="">
                    {component.suppliers_contact_person || "---"}
                  </div>
                </div>
                <div className="flex justify-start gap-3 items-center">
                  <div className="font-semibold text-gray-700">
                    საკონტაქტო ინფო
                  </div>
                  <div className="">
                    {component.suppliers_contact_details || "---"}
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700">
                    მიღების თარიღი
                  </div>
                  <div className="">
                    {format(new Date(component.receipt_date), "yyyy-MM-dd") ||
                      "---"}
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700">ინვოისი:</div>
                  <div>{component.invoice_number || "---"}</div>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-3">
                შენახვის ადგილმდებარეობა
              </h2>
              <div className="flex flex-col gap-3 border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4">
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700">კარადა</div>
                  <div className="">{component.storage_cabinet || "---"}</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700">თარო</div>
                  <div className="">{component.storage_shelf || "---"}</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700">უჯრა</div>
                  <div className="">{component.storage_drawer || "---"}</div>
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 xl:col-span-3">
              <DevicesTable />
            </div>
            <div className="col-span-1 md:col-span-2 xl:col-span-3">
              <PdfViewer />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Component;
