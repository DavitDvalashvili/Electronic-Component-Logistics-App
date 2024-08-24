import { useEffect, useState } from "react";
import { useAppSelector } from "../App/hook";
import { useAppDispatch } from "../App/hook";
import InteractiveBox from "../components/InteractiveBox";
import UpdateQuantityBox from "../components/updateQuantityBox";
import { updateComponent } from "../feature/componentSlice";
import { IComponent } from "../type";
import { getComponents } from "../feature/componentSlice";
import { Link } from "react-router-dom";

const Components = () => {
  const { components } = useAppSelector((state) => state.component);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [currentComponent, setCurrentComponent] = useState<IComponent>(
    components[0]
  );
  const [update, setUpdate] = useState(false);

  const [quantity, setQuantity] = useState<number>(0);
  const filters = useAppSelector((state) => state.filters);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (currentComponent) {
      dispatch(
        updateComponent({
          ...currentComponent,
          available_quantity: quantity,
          receipt_date: currentComponent.receipt_date.split("T")[0],
        })
      );
      setUpdate(!update);
    }
  };

  useEffect(() => {
    dispatch(getComponents(filters));
  }, [update]);

  return (
    <main>
      <InteractiveBox />
      {showPopup && currentComponent && (
        <div
          id="updateQuantity"
          className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center"
        >
          <UpdateQuantityBox
            setShowPopup={setShowPopup}
            quantity={currentComponent.available_quantity}
            setQuantity={setQuantity}
            handleClick={handleClick}
            componentName={currentComponent.name}
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
                  <img
                    src={"https://picsum.photos/id/237/200/300"}
                    alt="Component"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>

              {/* Information Column 1 */}
              <div className="md:col-span-1 flex flex-col gap-1">
                <div className="flex gap-2">
                  <div className="font-semibold text-gray-700">დასახელება:</div>
                  <div>{component.name}</div>
                </div>
                <div className="flex gap-2">
                  <div className="font-semibold text-gray-700">ოჯახი:</div>
                  <div>{component.family}</div>
                </div>
                <div className="flex gap-2">
                  <div className="font-semibold text-gray-700">
                    კორპუსის ტიპი:
                  </div>
                  <div>{component.package_type}</div>
                </div>
                <div className="flex gap-2">
                  <div className="font-semibold text-gray-700">ნომინალი:</div>
                  <div>{component.nominal_value}</div>
                </div>
                <div className="flex gap-2">
                  <div className="font-semibold text-gray-700">ელ. კვება:</div>
                  <div>{component.electrical_supply}</div>
                </div>
              </div>

              {/* Information Column 2 */}
              <div className="md:col-span-1 flex flex-col gap-1">
                <div className="flex gap-2"></div>
                <div className="flex gap-2">
                  <div className="font-semibold text-gray-700">
                    ერთეულის ღირებულება:
                  </div>
                  <div>{component.unit_cost}</div>
                </div>
                <div className="flex gap-2">
                  <div className="font-semibold text-gray-700">რაოდენობა</div>
                  <div>{component.available_quantity}</div>
                </div>
                <div className="">
                  <div className="font-semibold text-gray-700">
                    შენახვის ადგილმდებარეობა:
                  </div>
                  <div className="flex gap-3">
                    <div>
                      <span>კარადა:</span> {component.storage_cabinet}
                    </div>
                    <div>
                      {" "}
                      <span>თარო:</span> {component.storage_shelf}
                    </div>
                    <div>
                      {" "}
                      <span>უჯრა:</span> {component.storage_drawer}
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="font-semibold text-gray-700">
                    დანიშნულება:
                  </div>
                  <div className="truncate">{component.purpose}</div>
                </div>
              </div>
            </div>
            <div className="mt-2 flex justify-center items-center  mx-auto gap-2">
              <button
                onClick={() => {
                  setCurrentComponent(component);
                  setShowPopup(true);
                }}
                className="px-2 py-2 bg-SheetMetal text-white rounded-md cursor-pointer text-sm"
              >
                რაოდენობის განახლება
              </button>
              <Link to={`/component/${component.id}`}>
                <button className="px-2 py-2 bg-NorthAtlanticBreeze text-white rounded-md cursor-pointer text-sm">
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
