import { Button, Modal, Popconfirm, Popover } from "antd";
import logo_header from "../../assets/logo-header.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTER } from "../../utils/path";
import { Logout } from "../../api/Auth.api";
import { clearAccesTokenLST } from "../../utils/token";
import { useAppDispatch } from "../../app/hooks";
import { AuthActions } from "../../app/Redux/Auth.slice";
import i18next from "i18next";
enum Language {
  vi = "vi",
  en = "en",
}
const Header: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [language, setLanguage] = useState(Language.en);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleChangeLanguage = (lng: Language) => {
    i18next.changeLanguage(lng);
    setLanguage(lng);
  };
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
  const content = (
    <ul>
      <li
        onClick={() => handleChangeLanguage(Language.vi)}
        className="w-full flex items-center px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="flag-icons-gb"
          viewBox="0 0 640 480"
          style={{ width: 20, height: 12, marginRight: 6 }}
        >
          <path fill="#012169" d="M0 0h640v480H0z" />
          <path
            fill="#FFF"
            d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
          />
          <path
            fill="#C8102E"
            d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
          />
          <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
          <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
        </svg>
        <button> Tiếng Việt</button>
      </li>
      <li
        onClick={() => handleChangeLanguage(Language.en)}
        className="w-full flex items-center px-4 py-2 border-b border-gray-200 dark:border-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="flag-icons-gb"
          viewBox="0 0 640 480"
          style={{ width: 20, height: 12, marginRight: 6 }}
        >
          <path fill="#012169" d="M0 0h640v480H0z" />
          <path
            fill="#FFF"
            d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
          />
          <path
            fill="#C8102E"
            d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
          />
          <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
          <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
        </svg>
        <button> Tiếng Anh</button>
      </li>
    </ul>
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
        <div className="flex items-center gap-4">
          <Popover content={content}>
            <div
              className="flex items-center rounded-lg px-3 py-2 h-8"
              style={{ background: "rgb(241, 243, 245)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="flag-icons-gb"
                viewBox="0 0 640 480"
                style={{ width: 20, height: 12, marginRight: 6 }}
              >
                <path fill="#012169" d="M0 0h640v480H0z" />
                <path
                  fill="#FFF"
                  d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
                />
                <path
                  fill="#C8102E"
                  d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
                />
                <path
                  fill="#FFF"
                  d="M241 0v480h160V0H241zM0 160v160h640V160H0z"
                />
                <path
                  fill="#C8102E"
                  d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"
                />
              </svg>
              <button className="btn btn-info">{language}</button>
              <svg
                width={20}
                height={20}
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="KeyboardArrowDownIcon"
              >
                <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
              </svg>
            </div>
          </Popover>
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
