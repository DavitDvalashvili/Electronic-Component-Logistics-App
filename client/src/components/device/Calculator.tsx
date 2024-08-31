import { calculatorProps } from "../../type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useComponentDeviceStore from "../../store/componentDeviceStore";

const Calculator = ({ setShowCalculator }: calculatorProps) => {
  const { components, getComponents } = useComponentDeviceStore();
  const { id } = useParams();
  const [value, setValue] = useState<number>(0);
  const [deviceAmount, setDeviceAmount] = useState<number>(0);

  useEffect(() => {
    getComponents(`${id}`);
  }, [getComponents, id]);

  const getDeviceAmount = () => {
    return components
      .map((component) =>
        Math.floor(
          component.component_available_quantity /
            component.component_count_per_device
        )
      )
      .reduce((min, current) => (current < min ? current : min), Infinity);
  };

  useEffect(() => {
    setDeviceAmount(getDeviceAmount());
  }, [value, setValue, components]);

  return (
    <div
      className="bg-white max-w-[768px] h-fit 
     p-10 rounded-md"
    >
      {components.length == 0 ? (
        <p className="font-semibold">მოწყობილობის კომპონენტები არ მოიძებნა</p>
      ) : (
        <>
          <div className="flex justify-center items-center gap-4 mb-4 ">
            <p className="font-semibold">მოწყობილობის რაოდენობა</p>
            <input
              type="text"
              value={deviceAmount}
              onChange={(e) => setDeviceAmount(Number(e.target.value))}
              className="w-16 h-8 text-base rounded-md border-[2px] border-solid border-NorthAtlanticBreeze focus:outline-none p-1"
            />
          </div>
          <div className=" border border-gray-300 rounded-lg p-4 shadow-md mb-5">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="">
                <tr>
                  <th className="px-6 py-3  text-xs font-bold text-SheetMetal text-center ">
                    კომპონენტის დასახელება
                  </th>
                  <th className="px-6 py-3  text-xs font-bold text-SheetMetal text-center">
                    კომპონენტის რაოდენობა 1 მოწყობილობისთვის
                  </th>
                  <th className="px-6 py-3  text-xs font-bold text-SheetMetal text-center">
                    ხელმისაწვდომი კომპონენტების რაოდენონა
                  </th>
                  <th className="px-6 py-3  text-xs font-meld text-SheetMetal text-center">
                    კომპონენტის ნაშთი
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {components.map((component, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-wrap">
                      {component.component_name}
                    </td>
                    <td className="px-6 py-4 whitespace-wrap text-center">
                      {component.component_count_per_device}
                    </td>
                    <td className="px-6 py-4 whitespace-wrap text-center">
                      {component.component_available_quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-wrap text-center">
                      {getDeviceAmount() === deviceAmount
                        ? component.component_available_quantity -
                          Math.floor(
                            component.component_available_quantity /
                              component.component_count_per_device
                          ) *
                            component.component_count_per_device
                        : component.component_available_quantity -
                          deviceAmount * component.component_count_per_device}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <button
        onClick={() => {
          setShowCalculator(false);
        }}
        className="px-4 py-2 bg-SheetMetal text-white rounded-md cursor-pointer text-sm ml-auto block mt-5"
      >
        დახურვა
      </button>
    </div>
  );
};

export default Calculator;
