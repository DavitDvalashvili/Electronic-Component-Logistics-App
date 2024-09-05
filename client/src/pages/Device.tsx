import { useEffect } from "react";
import "moment/locale/ka";
import SideBarDevice from "../components/Layout/SideBarDevice";
import { useParams } from "react-router-dom";
import { useDeviceStore } from "../store/deviceStore";
import ComponentsTable from "../components/device/ComponentsTable";
import NotFound from "../components/NotFound";
import CustomLoader from "../components/CustomLoader";
import ImageBox from "../components/SwiperWrapper";

const Device = () => {
  const { id } = useParams();
  const { getDevice, device, error, loading, isUpdate } = useDeviceStore();

  useEffect(() => {
    getDevice(`${id}`);
  }, [id, getDevice, isUpdate]);

  return (
    <div>
      {loading && <CustomLoader />}
      {error && <NotFound name="მოწყობილობა" />}
      {device && (
        <>
          <SideBarDevice currentDevice={device} />
          <div
            key={device.id}
            className="py-10 px-4 max-w-[1370px] xl:mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            <div className="flex justify-center items-center md:col-span-2 xl:col-span-1">
              <div className="flex flex-col gap-4 h-[500px] w-full">
                <ImageBox image_urls={device.images_urls} />
              </div>
            </div>
            {/* Information Column 1 */}
            <div className="flex flex-col gap-2 border border-gray-300 rounded-lg p-5 bg-white shadow-md">
              <div className="flex gap-2 items-center">
                <div className="font-semibold text-gray-700 w-[150px]">
                  დასახელება:
                </div>
                <div>{device.name || "მონაცემი არ არის"}</div>
              </div>

              <div className="flex gap-2 items-center">
                <div className="font-semibold text-gray-700 w-[150px]">
                  ელ. კვება:
                </div>
                <div>{device.electrical_supply || "მონაცემი არ არის"}</div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="font-semibold text-gray-700 w-[150px]">
                  დანიშნულება:
                </div>
                <div>{device.purpose || "მონაცემი არ არის"}</div>
              </div>
            </div>
            {/* Information Column 2 */}
            <div className="flex flex-col gap-2 border border-gray-300 rounded-lg p-5 bg-white shadow-md">
              <div className="flex gap-2 items-center">
                <div className="font-semibold text-gray-700 w-[150px]">
                  ერთეულის ღირებულება:
                </div>
                <div>{device.unit_cost || "მონაცემი არ არის"}</div>
              </div>

              <div className="flex gap-2 items-center">
                <div className="font-semibold text-gray-700 w-[150px]">
                  რაოდენობა:
                </div>
                <div>{device.available_quantity || "მონაცემი არ არის"}</div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="font-semibold text-gray-700 w-[150px]">
                  ზომა:
                </div>
                <div>{device.size || "მონაცემი არ არის"}</div>
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
