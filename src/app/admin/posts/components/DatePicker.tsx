import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface BasicDatePickerProps {
  label?: string;
  value?: any;
  onChange?: (newValue: any) => void;
}

export default function BasicDatePicker(props: BasicDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={props.label}
        value={props.value}
        onChange={props.onChange}
      />
    </LocalizationProvider>
  );
}
