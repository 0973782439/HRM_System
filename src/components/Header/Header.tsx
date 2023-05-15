import { Button, Modal, Popconfirm } from "antd";
import logo_header from "../../assets/logo-header.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTER } from "../../utils/path";
import { Logout } from "../../api/Auth.api";
import { error } from "console";
import { clearAccesTokenLST } from "../../utils/token";
import { useAppDispatch } from "../../app/hooks";
import { AuthActions } from "../../app/Redux/Auth.slice";
const Header = () => {
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Hàm xử lý đăng xuất
  const handleAgreeLogout = () => {
    const json = Logout();
    json
      .then((res: any) => {
        dispatch(AuthActions.logout());
        clearAccesTokenLST();
        navigate(ROUTER.login);
      })
      .catch((error: any) => {});
  };
  const text = (
    <div className="px-1 py-1">
      <h1 className="text-2xl font-medium">tulevan</h1>
      <div className="mt-4">
        <p>Developer</p>
        <p>Staff ID: 19 </p>
      </div>
      <Button
        className="bg-[#0091FF] text-[#FBFDFF] w-full px-[22px] py-1 my-3 rounded-md"
        onClick={() => setModal(true)}
      >
        Sing Up
      </Button>
      <Link to={ROUTER.home} className="text-blue-500">
        Reset password
      </Link>
    </div>
  );
  return (
    <nav
      className="fixed z-30 w-full px-[30px] py-3 bg-white h-[60px]"
      style={{ boxShadow: "0px 3px 15px #ECEEF0" }}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-4 justify-start items-center">
          <img src={logo_header} alt="" />
          <a className="text-md font-semibold flex items-center lg:mr-1.5">
            <span className="hidden md:inline-block self-center text-2xl font-bold whitespace-nowrap">
              HR Management System
            </span>
          </a>
        </div>
        <div className="flex items-center">
          <Popconfirm
            icon={<></>}
            placement="bottomRight"
            title={text}
            showCancel={false}
            okButtonProps={{ style: { display: "none" } }}
          >
            <button className="flex text-sm bg-gray-800 rounded-full">
              <img
                className="w-8 h-8 rounded-full"
                src={logo_header}
                alt="user photo"
              />
            </button>
          </Popconfirm>
          <Modal
            width={352}
            centered
            title={
              <h2 className="font-medium text-2xl pb-6">
                Do you wish to sign out?
              </h2>
            }
            closeIcon={
              <svg
                className="mt-[10px]"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="CloseIcon"
              >
                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            }
            open={modal}
            cancelText={<>No</>}
            okText={<>Yes</>}
            onOk={() => handleAgreeLogout()}
            onCancel={() => setModal(false)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
