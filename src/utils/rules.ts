import type { RegisterOptions, UseFormGetValues } from "react-hook-form";
type Rules = {
  [keyof in
    | "name"
    | "email"
    | "username"
    | "password"
    | "company_id"
    | "repeatPassword"
    | "notRequired"
    | "isRequired"]: RegisterOptions;
};

export const rules = (getValues?: UseFormGetValues<any>): Rules => ({
  notRequired: {
    required: false,
  },
  isRequired: {
    required: { value: true, message: "Please input" },
  },
  username: {
    required: { value: true, message: "Please enter " },
  },
  password: {
    required: { value: true, message: "Please enter " },
  },
  email: {
    required: { value: true, message: "Please enter " },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Invalid email address",
    },
  },
  company_id: { required: { value: true, message: "Please choose " } },
  name: { required: { value: true, message: "Please input " } },
  repeatPassword: {
    required: { value: true, message: "requiredPassword" },
    minLength: { value: 4, message: "maxLengthPassword" },
    validate:
      typeof getValues === "function"
        ? (value) => value === getValues("password") || "passwordDoNotMatch"
        : undefined,
  },
});
