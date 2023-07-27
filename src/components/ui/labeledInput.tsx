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
  isRequired?: boolean;
  isError?: boolean;
}

const LabeledInput = (props: LABELED_INPUT) => {
  const {
    label,
    name,
    value,
    placeHolder = "",
    type,
    onChange,
    isRequired = false,
    isError = false,
  } = props;

  return (
    <div className="relative">
      <Label
        className={`bg-white pt-1 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium absolute ${
          isError ? "text-red-500" : "text-gray-600"
        }`}
      >
        {label}
      </Label>

      <Input
        name={name}
        value={value}
        placeholder={placeHolder}
        onChange={onChange}
        type={type}
        required={isRequired}
        className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full p-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white rounded-md ${
          isError ? "border-red-500" : "border-gray-300"
        }`}
      />
    </div>
  );
};

export default LabeledInput;
