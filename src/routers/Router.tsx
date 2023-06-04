import React, { Suspense } from "react";
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
import ResetPassword from "../pages/Authentication/ResetPassword";
const UpdateEmployee = React.lazy(
  () => import("../pages/Employee/UpdateEmployee")
);
const CreateEmployee = React.lazy(
  () => import("../pages/Employee/CreateEmployee")
);
const ListEmployee = React.lazy(() => import("../pages/Employee/ListEmployee"));
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
    element: (
      <LayoutDefault>
        <ListEmployee></ListEmployee>
      </LayoutDefault>
    ),
  },
  {
    path: "",
    element: <ProtectedRoute></ProtectedRoute>,
    children: [
      {
        path: `${ROUTER.home}`,
        element: (
          <LayoutDefault>
            <Suspense fallback={<div>Loading...</div>}>
              <ListEmployee />
            </Suspense>
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
            <Suspense fallback={<div>Loading...</div>}>
              <CreateEmployee />
            </Suspense>
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
            <Suspense fallback={<div>Loading...</div>}>
              <UpdateEmployee />
            </Suspense>
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
    path: ROUTER.reset_password,
    element: (
      <LayoutDefault>
        <ResetPassword></ResetPassword>
      </LayoutDefault>
    ),
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
];
const routersPrivate = [{}];
export { routersPublic, routersPrivate };
