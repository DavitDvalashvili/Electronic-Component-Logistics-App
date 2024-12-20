import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, FieldValues } from "react-hook-form";
import { Locale } from "date-fns";
import ka from "date-fns/locale/ka";
import { GeorgianDatePickerProps } from "../../type";
import React from "react";
registerLocale("ka", ka as Locale);

const GeorgianDatePicker:React.FC<GeorgianDatePickerProps<FieldValues>> = ({ name, control}): JSX.Element => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <DatePicker
          className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1"
          selected={value}
          onChange={(date) => onChange(date)}
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
