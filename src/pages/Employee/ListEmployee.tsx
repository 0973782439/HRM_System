import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Breadcrumb, Modal } from "antd";
import "./employee.css";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { IEmployee, IEmployeeList, IFilter } from "../../interfaces/Employee";
import { ROUTER } from "../../utils/path";
import { debounce } from "../../customs/Debounce";
import Pagination from "../../components/Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { EmployeeActions } from "../../app/Redux/Employee.slice";
import { RootState } from "../../app/store";
import Table from "../../components/Table/Table";
import { DeleteMultipleEmployee } from "../../api/Employee.api";

const ListEmployee = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [listDelete, setListDelete] = useState<number[]>();
  const [rowData, setRowData] = useState<IEmployeeList>();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Lấy query params trên url
  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const filter: IFilter = {
    search: search,
    page: page,
  };
  // ========== GET record in Saga
  const memoizedEmployeeList = useAppSelector((state: RootState) => {
    return state.employee.EmployeeList;
  });
  const getEmployeeListSaga = useMemo(() => {
    return memoizedEmployeeList;
  }, [memoizedEmployeeList]);
  // ========= Set lại state sau khi lấy employee khi employee thay đổi
  useEffect(() => {
    setRowData(getEmployeeListSaga);
  }, [memoizedEmployeeList]);
  // ========= lấy employee khi url thay đổi
  useEffect(() => {
    dispatch(EmployeeActions.fetchEmployee(filter));
  }, [page, search, dispatch]);
  //=================Tìm kiếm =========================
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keySearch = e.target.value;
    navigate(`?search=${keySearch}&page=1`, {
      replace: true,
    });
  };
  const onSearch = useCallback(debounce(handleSearch), []);
  // ======== Hàm select record để xoá ========
  var handleChangeCheckBox = function (
    e: React.ChangeEvent<HTMLInputElement>,
    row: any
  ) {
    const { name, checked } = e.target;
    if (name === "checkboxall") {
      const rowSelection = rowData?.data.map((item: any) => ({
        ...item,
        isChecked: checked,
      }));
      setRowData((prev: any) => ({ ...prev, data: rowSelection }));
      const listId = rowSelection
        ?.filter((item: any) => item?.isChecked === true)
        .map((item: IEmployee) => item.id);
      setListDelete(listId);
    } else {
      const rowSelection = rowData?.data.map((item: any) =>
        item === row ? { ...item, isChecked: checked } : item
      );
      setRowData((prev: any) => ({ ...prev, data: rowSelection }));
      const listId = rowSelection
        ?.filter((item: any) => item?.isChecked === true)
        .map((item: IEmployee) => item.id);
      setListDelete(listId);
    }
  };
  // ======== Hàm xoá employee ============
  const handleAgreeDeleteEmployee = () => {
    const json = DeleteMultipleEmployee({ record_ids: listDelete });
    json
      .then((res: any) => {
        dispatch(EmployeeActions.fetchEmployee(filter));
        setModal(false);
        setListDelete([]);
      })
      .catch((error: any) => {});
  };
  const renderTitleAndSearch = () => {
    return (
      <div className="flex justify-between">
        <h1 className="text-4xl font-medium mt-3">Employee Management</h1>
        <form className="hidden lg:block ">
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              onChange={(e) => onSearch(e)}
              type="text"
              name="search"
              className="bg-gray-50 outline-none border border-blue-300 text-gray-900 rounded-lg block w-[200px] pl-10 p-2"
              placeholder="Search..."
            />
          </div>
        </form>
      </div>
    );
  };
  const renderHr = () => {
    return <hr className="hr_action" />;
  };
  const renderActionCreateAnđelete = () => {
    return (
      <div className="action">
        <Link to={ROUTER.create_employee} className="btn_create">
          <svg
            width="13"
            height="15"
            viewBox="0 0 13 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.2333 1.63307C1.93875 1.63307 1.69997 1.87186 1.69997 2.16641V12.8331C1.69997 13.1276 1.93875 13.3664 2.2333 13.3664H10.7666C11.0611 13.3664 11.3 13.1276 11.3 12.8331V4.52066L8.41238 1.63307H2.2333ZM0.633301 2.16641C0.633301 1.28275 1.34964 0.566406 2.2333 0.566406H8.6333C8.77475 0.566406 8.91041 0.622598 9.01042 0.72262L12.1323 3.84451C12.2824 3.99454 12.3666 4.19802 12.3666 4.41019V12.8331C12.3666 13.7167 11.6503 14.4331 10.7666 14.4331H2.2333C1.34964 14.4331 0.633301 13.7167 0.633301 12.8331V2.16641ZM3.56663 7.49974C3.56663 7.20519 3.80542 6.96641 4.09997 6.96641H5.96663V5.09974C5.96663 4.80519 6.20542 4.56641 6.49997 4.56641C6.79452 4.56641 7.0333 4.80519 7.0333 5.09974V6.96641H8.89997C9.19447 6.96641 9.4333 7.20519 9.4333 7.49974C9.4333 7.79429 9.19447 8.03307 8.89997 8.03307H7.0333V9.89974C7.0333 10.1942 6.79452 10.4331 6.49997 10.4331C6.20542 10.4331 5.96663 10.1942 5.96663 9.89974V8.03307H4.09997C3.80542 8.03307 3.56663 7.79429 3.56663 7.49974Z"
              fill="#0091FF"
            />
          </svg>
          Add
        </Link>
        {listDelete && listDelete.length > 0 ? (
          <button
            className="btn_action btn_delete"
            onClick={() => setModal(true)}
          >
            <svg
              width="10"
              height="14"
              viewBox="0 0 10 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.86662 0.566406C2.57207 0.566406 2.33328 0.80519 2.33328 1.09974C2.33328 1.39429 2.57207 1.63307 2.86662 1.63307H7.13329C7.42783 1.63307 7.66662 1.39429 7.66662 1.09974C7.66662 0.80519 7.42783 0.566406 7.13329 0.566406H2.86662ZM0.199951 3.23307C0.199951 2.93852 0.438735 2.69974 0.733285 2.69974H2.33328H7.66662H9.26662C9.56112 2.69974 9.79995 2.93852 9.79995 3.23307C9.79995 3.52762 9.56112 3.76641 9.26662 3.76641H8.73328V12.2997C8.73328 12.8889 8.25574 13.3664 7.66662 13.3664H2.33328C1.74419 13.3664 1.26662 12.8889 1.26662 12.2997V3.76641H0.733285C0.438735 3.76641 0.199951 3.52762 0.199951 3.23307ZM2.33328 3.76641H7.66662V12.2997H2.33328V3.76641Z"
                fill="#E5484D"
              />
            </svg>
            Delete
          </button>
        ) : (
          <button
            className="btn_action btn_delete_active cursor-not-allowed"
            onClick={() => setModal(true)}
          >
            <svg
              width={15}
              height={15}
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="svg-fill-all"
              style={{ fill: "rgba(193, 200, 205, 0.8)" }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                fill="black"
              />
            </svg>
            Delete
          </button>
        )}
      </div>
    );
  };
  return (
    <>
      <Breadcrumb
        separator=">"
        items={[
          {
            title: "General",
          },
          {
            title: "Employee Management",
          },
        ]}
      />
      {renderTitleAndSearch()}
      <section className="container">
        {renderActionCreateAnđelete()}
        {renderHr()}
        <Table
          rowData={rowData}
          handleChangeCheckBox={handleChangeCheckBox}
        ></Table>
        {renderHr()}
        <Pagination />
      </section>
      <Modal
        width={352}
        centered
        title={
          <div>
            <h2 className="font-medium text-2xl">Delete</h2>
            <p className="py-3" style={{ color: "rgb(104, 112, 118)" }}>
              Are you sure you want to delete?
            </p>
          </div>
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
        onOk={() => handleAgreeDeleteEmployee()}
        onCancel={() => setModal(false)}
      />
    </>
  );
};

export default ListEmployee;
