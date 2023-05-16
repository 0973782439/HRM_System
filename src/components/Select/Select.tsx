import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  register: UseFormRegisterReturn;
  children: React.ReactNode;
  label: string;
  id: string;
  value?: string;
  errorMessage?: string;
  className: string;
  isRequired?: boolean;
}
const Select: React.FC<Props> = ({
  register,
  children,
  label,
  id,
  value,
  errorMessage,
  className,
  isRequired,
}) => {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-base font-medium text-[#11181C] w-[162px]"
      >
        {label}
        {isRequired && <span className="text-[#E5484D]">*</span>}
      </label>
      <div className="flex flex-col">
        <select
          data-te-select-init
          defaultValue={value}
          {...register}
          id={id}
          className={className}
        >
          {children}
        </select>
        {errorMessage && (
          <p className="text-red-600 text-xs italic">{errorMessage + label}</p>
        )}
      </div>
    </>
  );
};

export default Select;
