import useComponentDeviceStore from "../../store/componentDeviceStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineFolderDelete } from "react-icons/md";

const ComponentsTable = () => {
  const { components, getComponents } = useComponentDeviceStore();
  const { id } = useParams();

  useEffect(() => {
    getComponents(`${id}`);
  }, [getComponents, id]);

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
              {components.map((component, index) => (
                <tr key={index}>
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
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <MdOutlineFolderDelete className="text-[22px] cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
