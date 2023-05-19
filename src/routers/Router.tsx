import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import LayoutAuthentication from "../layouts/LayoutAuthentication/LayoutAuthentication";
import LayoutDefault from "../layouts/LayoutDefault/LayoutDefault";
import ChangePassword from "../pages/Authentication/ChangePassword";
import ForgotPassword from "../pages/Authentication/ForgotPassword";
import Login from "../pages/Authentication/Login";
import { RootState } from "../app/store";
import NotFound from "../components/NotFound/NotFound";
import { ROUTER } from "../utils/path";
import ListEmployee from "../pages/Employee/ListEmployee";
import CreateEmployee from "../pages/Employee/CreateEmployee";
import UpdateEmployee from "../pages/Employee/UpdateEmployee";

//được bảo vệ
function ProtectedRoute() {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTER.login} />;
}
//bị từ chối
function RejectedRoute() {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return !isAuthenticated ? <Outlet /> : <Navigate to={ROUTER.home} />;
}
const routersPublic = [
  {
    path: "",
    element: <ProtectedRoute></ProtectedRoute>,
    children: [
      {
        path: `${ROUTER.home}`,
        element: (
          <LayoutDefault>
            <ListEmployee></ListEmployee>
          </LayoutDefault>
        ),
      },
    ],
  },
  {
    path: "",
    element: <ProtectedRoute></ProtectedRoute>,
    children: [
      {
        path: ROUTER.create_employee,
        element: (
          <LayoutDefault>
            <CreateEmployee></CreateEmployee>
          </LayoutDefault>
        ),
      },
    ],
  },
  {
    path: "",
    element: <ProtectedRoute></ProtectedRoute>,
    children: [
      {
        path: ROUTER.edit_employee,
        element: (
          <LayoutDefault>
            <UpdateEmployee></UpdateEmployee>
          </LayoutDefault>
        ),
      },
    ],
  },
  {
    path: ROUTER.forgot_password,
    element: (
      <LayoutAuthentication>
        <ForgotPassword></ForgotPassword>,
      </LayoutAuthentication>
    ),
  },
  {
    path: ROUTER.change_password,
    element: (
      <LayoutAuthentication>
        <ChangePassword></ChangePassword>,
      </LayoutAuthentication>
    ),
  },
  {
    path: "",
    element: <RejectedRoute></RejectedRoute>,
    children: [
      {
        path: ROUTER.login,
        element: (
          <LayoutAuthentication>
            <Login></Login>
          </LayoutAuthentication>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
];
const routersPrivate = [{}];
export { routersPublic, routersPrivate };
