import { useState } from "react";
interface Props {
  name: string;
  type: React.HTMLInputTypeAttribute;
  className?: string;
  placeholder?: string;
  errorMessage?: string;
  register: any;
  label: string;
  id: string;
  handleChangShowPass?: () => void;
  onlyGetNumber?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SvgShowPass = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z"
        fill="black"
      ></path>
    </svg>
  );
};
const SvgHidePass = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
        fill="black"
      ></path>
    </svg>
  );
};
const Input: React.FC<Props> = ({
  errorMessage,
  placeholder,
  className,
  type,
  name,
  register,
  label,
  id,
  handleChangShowPass,
  onlyGetNumber,
  handleOnChange,
}) => {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="block text-base font-medium text-[#11181C] w-[162px]"
        >
          {label}
        </label>
      )}
      <div className="flex flex-col">
        <div className="flex items-center bg-[#F1F3F5] rounded-lg">
          {type === "number" && (
            <div
              className="font-normal text-base pl-[10px]"
              style={{ color: "rgb(0, 106, 220)" }}
            >
              Rp
            </div>
          )}
          <input
            {...register}
            type={type}
            name={name}
            id={id}
            className={className}
            placeholder={placeholder}
            min={0}
            onKeyPress={onlyGetNumber}
            onChange={handleOnChange}
          />
          {name === "password" && (
            <button
              type="button"
              className="pr-2"
              onClick={handleChangShowPass}
            >
              {type === "password" ? SvgShowPass() : SvgHidePass()}
            </button>
          )}
        </div>
        {errorMessage && (
          <p className="text-red-600 bg-white text-xs italic">
            {errorMessage + label}
          </p>
        )}
      </div>
    </>
  );
};

export default Input;
