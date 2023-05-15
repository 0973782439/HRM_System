import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  register: UseFormRegisterReturn;
  children: React.ReactNode;
  label: string;
  id: string;
  value?: string;
  errorMessage?: string;
  className: string;
  handleChangeOption?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const Select: React.FC<Props> = ({
  register,
  children,
  label,
  id,
  value,
  errorMessage,
  className,
  handleChangeOption,
}) => {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-base font-medium text-[#11181C] w-[162px]"
      >
        {label}
      </label>
      <div className="flex flex-col">
        <select
          data-te-select-init
          defaultValue={value}
          {...register}
          id={id}
          className={className}
          onChange={handleChangeOption}
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
