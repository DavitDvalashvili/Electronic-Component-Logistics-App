import { useState } from "react";
import InteractiveBox from "../components/component/InteractiveBox";
import UpdateQuantityBox from "../components/UpdateQuantityBox";
import { component } from "../type";
import { Link } from "react-router-dom";
import { useComponentStore } from "../store/componentStore";
import CustomLoader from "../components/CustomLoader";
import NotFound from "../components/NotFound";
import { useComponentFilterStore } from "../store/filterStore";


// Base API URL from environment variables
const Api_Url = import.meta.env.VITE_API_URL;


const Components = () => {
  // Access state and actions from component store
  const { components, updateComponent, loading, error, getComponents } =
    useComponentStore();
  // Local state to manage the popup visibility, current component, and quantity
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [currentComponent, setCurrentComponent] = useState<component>(
    components[0]
  );
  const [quantity, setQuantity] = useState<number>(0);

  // Access the filter state from the filter store
  const state = useComponentFilterStore((state) => state);

  // Handler for updating the component's quantity
  const handleClick = async () => {
    if (currentComponent && currentComponent.id) {
      await updateComponent({
        ...currentComponent,
        available_quantity: quantity,
        receipt_date: currentComponent.receipt_date.split("T")[0],
      });
      await getComponents(state);
    }
  };

  return (
    <main className="mx-5 pb-10">
      <InteractiveBox />
      {loading && <CustomLoader />}
      {error && <NotFound name="მოწყობილობა" />}

      {showPopup && currentComponent && (
        <div
          id="updateQuantity"
          className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center z-20"
        >
          <UpdateQuantityBox
            setShowPopup={setShowPopup}
            quantity={currentComponent.available_quantity}
            setQuantity={setQuantity}
            handleClick={handleClick}
            name={currentComponent.name}
          />
        </div>
      )}
      <div className="space-y-4">
        {components.map((component) => (
          <div
            key={component.id}
            className="border border-gray-300 rounded-lg p-4 bg-white shadow-md max-w-[1440px] xl:mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
              {/* Images Column */}
              <div className="flex justify-center items-center">
                <div className="flex justify-center items-center md:col-span-1 h-[160px] w-[200px]">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(${component.default_image ? Api_Url + "/files" + component.default_image : "/image.png"})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
              </div>

              {/* Information Column 1 */}
              <div className="md:col-span-1 flex flex-col gap-1">
                <div className="flex gap-3">
                  <div className="font-semibold text-gray-700">დასახელება</div>
                  <div>{component.name || "---"}</div>
                </div>
                <div className="flex gap-3">
                  <div className="font-semibold text-gray-700">ოჯახი</div>
                  <div>{component.family || "---"}</div>
                </div>
                <div className="flex gap-3">
                  <div className="font-semibold text-gray-700">
                    კორპუსის ტიპი:
                  </div>
                  <div>{component.package_type || "---"}</div>
                </div>
                <div className="flex gap-3">
                  <div className="font-semibold text-gray-700">ნომინალი</div>
                  <div>{component.nominal_value || "---"}</div>
                </div>
                <div className="flex gap-3">
                  <div className="font-semibold text-gray-700">ელ. კვება</div>
                  <div>{component.electrical_supply || "---"}</div>
                </div>
              </div>

              {/* Information Column 2 */}
              <div className="md:col-span-1 flex flex-col gap-1">
                <div className="flex gap-3"></div>
                <div className="flex gap-3">
                  <div className="font-semibold text-gray-700">
                    ერთეულის ღირებულება
                  </div>
                  <div>{component.unit_cost || "---"}</div>
                </div>
                <div className="flex gap-3">
                  <div className="font-semibold text-gray-700">რაოდენობა</div>
                  <div>{component.available_quantity || "---"}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-700">
                    შენახვის ადგილმდებარეობა
                  </div>
                  <div className="flex gap-3">
                    <div>
                      <span>კარადა</span> {component.storage_cabinet || "---"}
                    </div>
                    <div>
                      {" "}
                      <span>თარო</span> {component.storage_shelf || "---"}
                    </div>
                    <div>
                      {" "}
                      <span>უჯრა</span> {component.storage_drawer || "---"}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="font-semibold text-gray-700">დანიშნულება</div>
                  <div className="truncate">{component.purpose || "---"}</div>
                </div>
              </div>
            </div>
            <div className="mt-2 flex justify-center items-center  mx-auto gap-2">
              <button
                onClick={() => {
                  setCurrentComponent(component);
                  setShowPopup(true);
                }}
                className="px-2 py-2 bg-SheetMetal text-white rounded-md cursor-pointer text-sm transition-transform duration-200 hover:shadow-lg hover:scale-105"
              >
                რაოდენობის განახლება
              </button>
              <Link to={`/component/${component.id}`}>
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

export default Components;
