import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Control, Controller } from "react-hook-form";
import { Locale } from "date-fns";
import ka from "date-fns/locale/ka";

registerLocale("ka", ka as Locale);

interface GeorgianDatePickerProps {
  name: string;
  control: Control<any>;
}

const GeorgianDatePicker = ({
  name,
  control,
}: GeorgianDatePickerProps): JSX.Element => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <DatePicker
          className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1"
          selected={value}
          onChange={(date) => onChange(date)} // Pass the selected date to onChange
          onBlur={onBlur}
          ref={ref}
          dateFormat="P"
          locale="ka"
        />
      )}
    />
  );
};

export default GeorgianDatePicker;
