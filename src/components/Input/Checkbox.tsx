import React from "react";
interface Props {
  name?: string;
  checked: any;
  handleChangeCheckBox: (
    e: React.ChangeEvent<HTMLInputElement>,
    row: any
  ) => void;
  rowData?: any;
}
const Checkbox: React.FC<Props> = ({
  name,
  checked,
  rowData,
  handleChangeCheckBox,
}) => {
  return (
    <input
      className="w-4 h-4 rounded outline-none flex items-center"
      type="checkbox"
      name={name}
      checked={checked}
      onChange={(e) => handleChangeCheckBox(e, rowData)}
    />
  );
};
export default Checkbox;
interface PropsCheckboxsingle {
  register: any;
  label: string;
  id: string;
  name: string;
  defaultChecked?: boolean;
  isDisabled?: boolean;
  isChecked?: boolean;
  // handleChangeCheckBox?: any;
}
export const Checkboxsingle: React.FC<PropsCheckboxsingle> = ({
  register,
  label,
  id,
  name,
  defaultChecked,
  isDisabled,
  isChecked,
  // handleChangeCheckBox,
}) => {
  // const handleChangeCheckBox = (e: any) => {
  //   console.log("a");
  // };
  return (
    <div className="flex items-center mb-8">
      <input
        // onChange={(e) => handleChangeCheckBox(e)}
        disabled={isDisabled}
        checked={isChecked}
        name={name}
        {...register}
        defaultChecked={defaultChecked}
        id={id}
        type="checkbox"
        className="w-5 h-5 rounded"
      />
      <label htmlFor={id} className="ml-3 text-base font-medium text-[#11181C]">
        {label}
      </label>
    </div>
  );
};
