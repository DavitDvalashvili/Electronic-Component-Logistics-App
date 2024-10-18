import { useEffect } from "react";
import SideBarDevice from "../components/Layout/SideBarDevice";
import { useParams } from "react-router-dom";
import { useDeviceStore } from "../store/deviceStore";
import ComponentsTable from "../components/device/ComponentsTable";
import NotFound from "../components/NotFound";
import CustomLoader from "../components/CustomLoader";
import ImageBox from "../components/SwiperWrapper";

const Device = () => {
  // Extract device ID from URL parameters
  const { id } = useParams();

  // Access device data, loading, error state, and update status from device store
  const { getDevice, device, error, loading } = useDeviceStore();

  // Fetch device details when component mounts or updates based on the ID and update status
  useEffect(() => {
    getDevice(`${id}`);
  }, [id, getDevice]);

  return (
    <div className="pl-[70px]">
      {loading && <CustomLoader />}
      {error && <NotFound name="მოწყობილობა" />}
      {device && (
        <>
          <SideBarDevice currentDevice={device} />
          <div
            key={device.id}
            className="py-10 px-4 max-w-[1370px] xl:mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            <div className="flex justify-center items-center md:col-span-2 xl:col-span-1 ">
              <div className="flex flex-col gap-4 h-[500px] w-full ">
                <ImageBox images={device.images} id={device.id} type="device" />
              </div>
            </div>
            {/* Information Column 1 */}
            <div className="flex flex-col gap-2 border border-gray-300 rounded-lg p-5 bg-white shadow-md">
              <div className="flex gap-3 items-center">
                <div className="font-semibold text-gray-700">დასახელება</div>
                <div>{device.name || "---"}</div>
              </div>

              <div className="flex gap-3 items-center">
                <div className="font-semibold text-gray-700">ელ. კვება</div>
                <div>{device.electrical_supply || "---"}</div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="font-semibold text-gray-700">დანიშნულება</div>
                <div>{device.purpose || "---"}</div>
              </div>
            </div>
            {/* Information Column 2 */}
            <div className="flex flex-col gap-2 border border-gray-300 rounded-lg p-5 bg-white shadow-md">
              <div className="flex gap-3 items-center">
                <div className="font-semibold text-gray-700">
                  ერთეულის ღირებულება
                </div>
                <div>{device.unit_cost || "---"}</div>
              </div>

              <div className="flex gap-3 items-center">
                <div className="font-semibold text-gray-700">რაოდენობა</div>
                <div>{device.available_quantity || "---"}</div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="font-semibold text-gray-700">ზომა</div>
                <div>{device.size || "---"}</div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 xl:col-span-3">
              <ComponentsTable />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Device;
