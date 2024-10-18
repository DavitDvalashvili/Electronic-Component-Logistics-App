import { useState } from "react";
import InteractiveBox from "../components/device/InteractiveBox";
import UpdateQuantityBox from "../components/UpdateQuantityBox";
import { device } from "../type";
import { Link } from "react-router-dom";
import { useDeviceStore } from "../store/deviceStore";
import NotFound from "../components/NotFound";
import CustomLoader from "../components/CustomLoader";
import { useDeviceFilterStore } from "../store/filterStore";

const Devices = () => {
  // Access devices data, update function, toggle function, and loading/error states from device store
  const { devices, updateDevice, getDevices, error, loading } =
    useDeviceStore();

  // Local state to control the display of the update quantity popup and track the current device and quantity
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [currentDevice, setCurrentDevice] = useState<device>(devices[0]);
  const [quantity, setQuantity] = useState<number>(0);
  const state = useDeviceFilterStore((state) => state);

  // Function to handle the click event for updating the device quantity
  const handleClick = async () => {
    if (currentDevice && currentDevice.id) {
      await updateDevice({
        ...currentDevice,
        available_quantity: quantity,
      });
      await getDevices(state);
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
          className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center z-20"
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
                <div className="flex justify-center items-center md:col-span-1 h-[160px] w-[200px]">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(${
                        device.default_image || "../../public/image.png"
                      })`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  ></div>
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
