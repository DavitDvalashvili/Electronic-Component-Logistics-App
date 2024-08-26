// DevicesTable.jsx
import React from "react";

const DevicesTable = () => {
  // Sample data
  const data = [
    {
      device_name: "Device C",
      component_count_per_device: 45,
      component_available_quantity: 800,
    },
    {
      device_name: "Device D",
      component_count_per_device: 80,
      component_available_quantity: 800,
    },
    // Add more data items as needed
  ];

  return (
    <div className="w-full max-w-6xl overflow-x-auto p-4 mx-auto">
      <div className="hidden md:block">
        {/* Table for medium and larger screens */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blackLight">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                მოწყობილობა
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
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.device_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.component_count_per_device}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.component_available_quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {Math.floor(
                    item.component_available_quantity /
                      item.component_count_per_device
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {/* Card-like layout for small screens */}
        {data.map((item, index) => (
          <div
            key={index}
            className="mb-4 p-4 border rounded-lg shadow-sm bg-white"
          >
            <div className="mb-2">
              <h4 className="font-semibold text-lg text-gray-700">
                მოწყობილობა
              </h4>
              <p className="text-gray-900">{item.device_name}</p>
            </div>
            <div className="mb-2">
              <h4 className="font-semibold text-lg text-gray-700">
                კომპონენტის რაოდენობა 1 მოწყობილობისთვის
              </h4>
              <p className="text-gray-900">{item.component_count_per_device}</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-700">
                ხელმისაწვდომი კომპონენტების რაოდენონა
              </h4>
              <p className="text-gray-900">
                {item.component_available_quantity}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-700">
                მოწყობილობის რაოდენობა
              </h4>
              <p className="text-gray-900">
                {Math.floor(
                  item.component_available_quantity /
                    item.component_count_per_device
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevicesTable;
