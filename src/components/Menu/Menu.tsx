import { Menu, MenuProps, MenuTheme, Switch } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Attendance,
  Leave,
  Global,
  Master,
  Payroll,
  User,
} from "../../assets/index";
import { ROUTER } from "../../utils/path";
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const MenuSidebar: React.FC = () => {
  const { t } = useTranslation();
  const [mode] = useState<"vertical" | "inline">("inline");
  const [theme] = useState<MenuTheme>("light");
  const items: MenuItem[] = [
    getItem(
      <Link className="text-base font-medium" to="/">
        Dashboard
      </Link>,
      "1"
    ),
    getItem(<div className="text-base font-medium">General</div>, "sub1", "", [
      getItem(
        <Link to="/products">{t("MENU.attendance_management")}</Link>,
        "2",
        <img src={Attendance} alt="" />
      ),
      getItem(
        <Link to="/Leave">{t("MENU.leave_management")}</Link>,
        "3",
        <img src={Leave} alt="" />
      ),
      getItem(
        <Link to="/Payroll">{t("MENU.payroll_management")}</Link>,
        "4",
        <img src={Payroll} alt="" />
      ),
      getItem(
        <Link to={ROUTER.home}>{t("MENU.employee_management")}</Link>,
        "5",
        <img src={Global} alt="" />
      ),
      getItem(
        <Link to="/User">{t("MENU.user_management")}</Link>,
        "6",
        <img src={User} alt="" />
      ),
      getItem(
        <Link to="/Master">{t("MENU.master_management")}</Link>,
        "7",
        <img src={Master} alt="" />
      ),
    ]),
    getItem(
      <>
        <hr className="border-0 h-px bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100" />
        <div className="text-base font-medium">Advance</div>
      </>,
      "sub2",
      "",
      [
        getItem(
          <Link to="/products">Global Setting</Link>,
          "8",
          <img src={Global} alt="" />
        ),
      ]
    ),
  ];
  return (
    <aside className="flex z-20 flex-col flex-shrink-0 w-[330px] duration-200 bg-white">
      <div className="flex relative flex-col flex-1 pt-0 min-h-0">
        <div className="flex overflow-y-auto flex-col flex-1">
          <div className="flex-1">
            <ul className="pb-2 pt-1">
              <li className="bg-white">
                <Menu
                  defaultSelectedKeys={["5"]}
                  defaultOpenKeys={["sub1"]}
                  mode={mode}
                  theme={theme}
                  items={items}
                  className="text-sm font-medium px-6"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default MenuSidebar;
