import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Locale } from "date-fns";
import ka from "date-fns/locale/ka";

registerLocale("ka", ka as Locale);

const GeorgianDatePicker = (): JSX.Element => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <div>
      <DatePicker
        className="focus:outline-none border-[1px] rounded-sm border-Waiting focus:border-AntarcticDeep pl-1 "
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        dateFormat="P"
      />
    </div>
  );
};

export default GeorgianDatePicker;
