import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import { ROUTER } from "../../utils/path";
import { ForgotPass } from "../../api/Auth.api";
import { rules as Rules } from "../../utils/rules";
import { toast } from "react-toastify";
import { IForgotPass } from "../../interfaces/Authentication";

const ForgotPassword = () => {
  const rules = Rules();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IForgotPass>();
  const onSubmit = (values: IForgotPass) => {
    const json = ForgotPass(values);
    json
      .then((res: any) => {
        navigate(ROUTER.login);
      })
      .catch((error: any) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="main mt-[85px] w-full max-w-[348px]">
      <h3 className="text-4xl text-center leading-tight mb-5">
        Forgot Password
      </h3>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
          >
            <Input
              register={{ ...register("email", rules.email) }}
              type="text"
              name="email"
              className="bg-gray-100 text-black rounded-lg block w-full p-3 outline-none"
              label="Your work email"
              id="email"
              errorMessage={errors.email?.message}
            ></Input>

            <button
              type="submit"
              className="w-full flex justify-center text-white bg-blue-500 hover:bg-blue-600 font-normal rounded-lg text-base py-3 px-5"
            >
              Confirm & Send OTP
            </button>
            <Link
              to={ROUTER.login}
              className="block text-sm text-center font-medium text-blue-400 hover:underline"
            >
              Back to Sing-In
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
