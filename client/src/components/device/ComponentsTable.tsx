import useComponentDeviceStore from "../../store/componentDeviceStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ComponentsTable = () => {
  const { loading, components, error, getComponents } =
    useComponentDeviceStore();
  const { id } = useParams();

  useEffect(() => {
    getComponents(`${id}`);
  }, [getComponents, id]);

  console.log(components);

  // Optional: Check if devices are being loaded or if there's an error
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full max-w-6xl overflow-x-auto p-4 mx-auto">
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blackLight">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                კომპონენტის დასახელება
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                კომპონენტის რაოდენობა 1 მოწყობილობისთვის
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                ხელმისაწვდომი კომპონენტების რაოდენონა
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                მოწყობილობის რაოდენობა
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {components.map((component, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {component.component_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {component.component_count_per_device}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {component.component_available_quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* Adjust this calculation if necessary */}
                  {Math.floor(
                    component.component_available_quantity /
                      component.component_count_per_device
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {/* Card-like layout for small screens */}
        {components.map((component, index) => (
          <div
            key={index}
            className="mb-4 p-4 border rounded-lg shadow-sm bg-white"
          >
            <div className="mb-2">
              <h4 className="font-semibold text-lg text-gray-700">
                მოწყობილობა
              </h4>
              <p className="text-gray-900">{component.component_name}</p>
            </div>
            <div className="mb-2">
              <h4 className="font-semibold text-lg text-gray-700">
                კომპონენტის რაოდენობა 1 მოწყობილობისთვის
              </h4>
              <p className="text-gray-900">
                {component.component_count_per_device}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-700">
                ხელმისაწვდომი კომპონენტების რაოდენონა
              </h4>
              <p className="text-gray-900">
                {component.component_available_quantity}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-700">
                მოწყობილობის რაოდენობა
              </h4>
              <p className="text-gray-900">
                {/* Adjust this calculation if necessary */}
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
  );
};

export default ComponentsTable;
