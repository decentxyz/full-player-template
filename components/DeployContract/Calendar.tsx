import DatePicker from "react-datepicker";
import { BsCalendar4 } from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = (props: any) => {
  const inputClass = "border border-black text-black rounded-lg p-3";

  return (
    <label className="relative text-sm rounded-full flex items-center h-max cursor-pointer">
      <DatePicker
        className={`no-outline cursor-pointer w-full ${inputClass}`}
        selected={props.date}
        minDate={new Date()}
        showTimeSelect
        placeholderText={props.placeholder || "MM/DD/YY"}
        dateFormat="MM/dd/yy h:mm aa"
        onChange={(date: Date) => props.setDate(date)}
      />
      <BsCalendar4 className="absolute right-6" />
    </label>
  );
};

export default Calendar;
