import React from "react";
import { BiDollar } from "react-icons/bi";
import { ErrorType } from "./Register";
interface InputProps extends React.ComponentProps<"input"> {
  label: string;
  id: string;
  type?: string;
  formatPrice?: boolean;
  disabled?: boolean;
  required?: boolean;
  errors?: ErrorType;
}
const Input: React.FC<InputProps> = ({
  label,
  id,
  type = "text",
  disabled,
  required,
  formatPrice,
  onChange,
  value,
  errors,
}) => {
  return (
    <div className=" relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute top-4 left-2 text-neutral-700"
        />
      )}
      <input
        value={value}
        onChange={onChange}
        type={type}
        id={id}
        name={id}
        disabled={disabled}
        required={required}
        placeholder=" "
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
          errors[id] ? "border-rose-300" : "border-neutral-300"
        } ${errors[id] ? "focus: border-rose-500" : "focus:border-black"}`}
      />
      <label
        htmlFor={id}
        className="absolute text-sm duration-150 transform -translate-y-3 top-5 origin-[0] left-4 z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
