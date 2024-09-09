import useComponentDeviceStore from "../../store/componentDeviceStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineFolderDelete } from "react-icons/md";
import DeleteBox from "../DeleteBox";
import { deviceComponent } from "../../type";
import { useDeviceStore } from "../../store/deviceStore";

const ComponentsTable = () => {
  // Extract relevant states and functions from the stores
  const { components, getComponents, deleteComponent } =
    useComponentDeviceStore();
  const { id } = useParams();
  const { getDevice } = useDeviceStore();

  // State for showing delete confirmation box and current component to delete
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [currentComponent, setCurrentComponent] = useState<deviceComponent>({
    component_name: " ",
    component_count_per_device: 0,
    component_available_quantity: 0,
    device_component_id: "",
  });

  // Fetch components and device data when component mounts or when id or isUpdate changes
  useEffect(() => {
    getComponents(`${id}`);
    getDevice(`${id}`);
  }, [getComponents, id, getDevice]);

  // Handle delete operation
  const handleDelete = async () => {
    if (currentComponent) {
      await deleteComponent(currentComponent.device_component_id);
      await getDevice(`${id}`);
      await getComponents(`${id}`);
    }
  };

  return (
    components.length > 0 && (
      <div className="w-full max-w-6xl overflow-x-auto mx-auto">
        <div className="hidden md:block border border-gray-300 rounded-lg shadow-md p-4 mb-5">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-sm font-bold text-SheetMetal text-center">
                  კომპონენტის დასახელება
                </th>
                <th className="px-6 py-3 text-sm font-bold text-SheetMetal text-center">
                  კომპონენტის რაოდენობა 1 მოწყობილობისთვის
                </th>
                <th className="px-6 py-3 text-sm font-bold text-SheetMetal text-center">
                  ხელმისაწვდომი კომპონენტების რაოდენონა
                </th>
                <th className="px-6 py-3 text-sm font-bold text-SheetMetal text-center">
                  მოწყობილობის რაოდენობა
                </th>
                <th className="px-6 py-3 text-sm font-bold text-SheetMetal text-center">
                  წაშლა
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {components.map((component) => (
                <tr key={component.device_component_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {component.component_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {component.component_count_per_device}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {component.component_available_quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {Math.floor(
                      component.component_available_quantity /
                        component.component_count_per_device
                    )}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-center"
                    onClick={() => {
                      setShowDelete(true);
                      setCurrentComponent(component);
                    }}
                  >
                    <MdOutlineFolderDelete className="text-[22px] cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showDelete && (
          <div className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center z-20 ">
            <DeleteBox
              setShowDelete={setShowDelete}
              handleDelete={handleDelete}
              name={currentComponent.component_name}
            />
          </div>
        )}

        <div className="md:hidden">
          <h2 className="text-xl font-bold mb-4">დაკავშირებული კომპონენტები</h2>
          {components.map((component, index) => (
            <div
              key={index}
              className="mb-4 p-4 border bg-white text-sm lg:text-lg text-AntarcticDeep border-gray-300 rounded-lg shadow-md"
            >
              <div className="mb-4 flex justify-left item-center gap-4">
                <h4 className="font-semibold w-[200px]">
                  კომპონენტის დასახელება
                </h4>
                <p className="my-auto">{component.component_name}</p>
              </div>
              <div className="mb-4 flex justify-left item-center gap-4">
                <h4 className="font-semibold w-[200px]">
                  კომპონენტის რაოდენობა 1 მოწყობილობისთვის
                </h4>
                <p className="my-auto">
                  {component.component_count_per_device}
                </p>
              </div>
              <div className="mb-4 flex justify-left item-center gap-4">
                <h4 className="font-semibold w-[200px]">
                  ხელმისაწვდომი კომპონენტების რაოდენონა
                </h4>
                <p className="my-auto">
                  {component.component_available_quantity}
                </p>
              </div>
              <div className="flex justify-left item-center gap-4">
                <h4 className="font-semibold w-[200px]">
                  მოწყობილობის რაოდენობა
                </h4>
                <p className="my-auto">
                  {Math.floor(
                    component.component_available_quantity /
                      component.component_count_per_device
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default ComponentsTable;
