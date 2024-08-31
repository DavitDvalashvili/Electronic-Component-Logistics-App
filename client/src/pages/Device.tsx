import { useEffect } from "react";
import "moment/locale/ka";
import ButtonBox from "../components/device/ButtonBox";
import { useParams } from "react-router-dom";
import { useDeviceStore } from "../store/deviceStore";
import ComponentsTable from "../components/device/ComponentsTable";

const Device = () => {
  const { id } = useParams();
  const { getDevice, device, loading, error, isUpdate } = useDeviceStore();

  useEffect(() => {
    getDevice(`${id}`);
  }, [id, getDevice, isUpdate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!device) return <div>No component found</div>;

  // Check if `component.name` exists
  return (
    <div>
      <ButtonBox currentDevice={device} />
      <div
        key={device.id}
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
        <div className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 bg-white shadow-md">
          <div className="flex gap-2 items-center">
            <div className="font-semibold text-gray-700 w-[150px]">
              დასახელება:
            </div>
            <div>{device.name}</div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="font-semibold text-gray-700  w-[150px] ">
              ელ. კვება
            </div>
            <div className="">{device.electrical_supply}</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="font-semibold text-gray-700  w-[150px] ">
              დანიშნულება:
            </div>
            <div className="">{device.purpose}</div>
          </div>
        </div>
        {/* Information Column 2 */}
        <div className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 bg-white shadow-md ">
          <div className="flex gap-2 items-center">
            <div className="font-semibold text-gray-700 w-[150px]">
              ერთეულის ღირებულება:
            </div>
            <div>{device.unit_cost}</div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="font-semibold text-gray-700  w-[150px] ">
              რაოდენობა
            </div>
            <div className="">{device.available_quantity}</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="font-semibold text-gray-700  w-[150px] ">ზომა</div>
            <div className="">{device.size}</div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 xl:col-span-3">
          <ComponentsTable />
        </div>
      </div>
    </div>
  );
};

export default Device;
