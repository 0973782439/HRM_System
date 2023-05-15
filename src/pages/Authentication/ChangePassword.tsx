import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const ChangePassword = () => {
  return (
    <div className="main mt-9 w-full max-w-[348px]">
      <h3 className="text-4xl text-center leading-tight mb-5">Sing In</h3>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="pt-5 px-6 font-medium text-2xl">
          Please input password
        </h3>
        <hr className="m-auto w-[284px] text-center mt-1" />
        <div className="p-6">
          <form className="space-y-4 md:space-y-6 mb-5" action="#">
            <div>
              <label
                htmlFor="email"
                className="block p-1 text-base font-normal text-black"
              >
                New password:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-100 text-black rounded-lg block w-full p-3 outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block p-1 text-base font-normal text-black"
              >
                Confirm password:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-100 text-black rounded-lg block w-full p-3 outline-none"
              />
            </div>
            <button className="w-full flex justify-center text-white bg-blue-500 hover:bg-blue-600 font-normal rounded-lg text-base py-3 px-5">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
