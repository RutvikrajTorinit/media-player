import { ChangeEvent } from "react";
import { Input } from "./input";
import { Label } from "./label";

interface LABELED_INPUT {
  name: string;
  label: string;
  value: string | number;
  onChange: (_e: ChangeEvent<HTMLInputElement>) => void;
  type:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  placeHolder?: string;
  required?: boolean;
}

const LabeledInput = (props: LABELED_INPUT) => {
  const {
    label,
    name,
    value,
    placeHolder = "",
    type,
    onChange,
    required = false,
  } = props;

  return (
    <div className="relative">
      <Label
        className="bg-white pt-1 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
      absolute"
      >
        {label}
      </Label>

      <Input
        name={name}
        value={value}
        placeholder={placeHolder}
        onChange={onChange}
        type={type}
        required={required}
        className="border placeholder-gray-400 focus:outline-none
      focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
      border-gray-300 rounded-md"
      />
    </div>
  );
};

export default LabeledInput;
