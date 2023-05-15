import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { Menu, MenuProps, MenuTheme, Switch } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Attendance,
  Leave,
  Employee,
  Global,
  Master,
  Payroll,
  User,
} from "../../assets/index";
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
const items: MenuItem[] = [
  getItem(
    <Link className="text-base font-medium" to="/">
      Dashboard
    </Link>,
    "1"
  ),
  getItem(<div className="text-base font-medium">General</div>, "sub1", "", [
    getItem(
      <Link to="/products">Attendance Management</Link>,
      "2",
      <img src={Attendance} alt="" />
    ),
    getItem(
      <Link to="/Leave">Leave Management</Link>,
      "3",
      <img src={Leave} alt="" />
    ),
    getItem(
      <Link to="/Payroll">Payroll Management</Link>,
      "4",
      <img src={Payroll} alt="" />
    ),
    getItem(
      <Link to="/Employee">Employee Management</Link>,
      "5",
      <img src={Global} alt="" />
    ),
    getItem(
      <Link to="/User">User Management</Link>,
      "6",
      <img src={User} alt="" />
    ),
    getItem(
      <Link to="/Master">Master Management</Link>,
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
const MenuSidebar: React.FC = () => {
  const [mode] = useState<"vertical" | "inline">("inline");
  const [theme] = useState<MenuTheme>("light");
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
