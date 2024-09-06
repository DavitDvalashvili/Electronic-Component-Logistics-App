import { useState } from "react";
import InteractiveBox from "../components/device/InteractiveBox";
import UpdateQuantityBox from "../components/UpdateQuantityBox";
import { device } from "../type";
import { Link } from "react-router-dom";
import { useDeviceStore } from "../store/deviceStore";
import NotFound from "../components/NotFound";
import CustomLoader from "../components/CustomLoader";

const Devices = () => {
  const { devices, updateDevice, toggleUpdate, error, loading } =
    useDeviceStore();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [currentDevice, setCurrentDevice] = useState<device>(devices[0]);
  const [quantity, setQuantity] = useState<number>(0);

  const handleClick = () => {
    if (currentDevice && currentDevice.id) {
      updateDevice({
        ...currentDevice,
        available_quantity: quantity,
      });
      toggleUpdate();
    }
  };

  return (
    <main className="mx-5 pb-10">
      <InteractiveBox />
      {loading && <CustomLoader />}
      {error && <NotFound name="მოწყობილობა" />}
      {showPopup && currentDevice && (
        <div
          id="updateQuantity"
          className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center"
        >
          <UpdateQuantityBox
            setShowPopup={setShowPopup}
            quantity={currentDevice.available_quantity}
            setQuantity={setQuantity}
            handleClick={handleClick}
            name={currentDevice.name}
          />
        </div>
      )}
      <div className="space-y-4">
        {devices.map((device) => (
          <div
            key={device.id}
            className="border border-gray-300 rounded-lg p-4 bg-white shadow-md max-w-[1440px] xl:mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
              {/* Images Column */}
              <div className="flex justify-center items-center">
                <div className="flex justify-center items-center md:col-span-1 h-[120px] w-[160px]">
                  {device.images_urls &&
                    device.images_urls.split(",").length > 0 && (
                      <img
                        src={device.images_urls.split(",")[0]}
                        alt="Component"
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = "/image.png";
                        }}
                      />
                    )}
                </div>
              </div>

              {/* Information Column 1 */}
              <div className="md:col-span-1 flex flex-col gap-1">
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700 ">დასახელება</div>
                  <div>{device.name || "---"}</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700 ">ელ. კვება</div>
                  <div>{device.electrical_supply || "---"}</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700 ">
                    დანიშნულება
                  </div>
                  <div className="truncate">{device.purpose || "---"}</div>
                </div>
              </div>
              {/* Information Column 2 */}
              <div className="md:col-span-1 flex flex-col gap-1">
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700 ">
                    ერთეულის ღირებულება
                  </div>
                  <div>{device.unit_cost || "---"}</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700 ">რაოდენობა</div>
                  <div>{device.available_quantity || "---"}</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="font-semibold text-gray-700">ზომა</div>
                  <div>{device.size || "---"}</div>
                </div>
              </div>
            </div>
            <div className="mt-2 flex justify-center items-center  mx-auto gap-3">
              <button
                onClick={() => {
                  setCurrentDevice(device);
                  setShowPopup(true);
                }}
                className="px-2 py-2 bg-SheetMetal text-white rounded-md cursor-pointer text-sm transition-transform duration-200 hover:shadow-lg hover:scale-105"
              >
                რაოდენობის განახლება
              </button>
              <Link to={`/device/${device.id}`}>
                <button className="px-2 py-2 bg-NorthAtlanticBreeze text-white rounded-md cursor-pointer text-sm transition-transform duration-200 hover:shadow-lg hover:scale-105">
                  დეტალურად ნახვა
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Devices;
