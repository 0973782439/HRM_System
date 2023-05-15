import { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Link, createSearchParams } from "react-router-dom";
import { ROUTER } from "../../utils/path";
import classNames from "classnames";
interface Props {}
const Pagination: React.FC<Props> = () => {
  const memoizedEmployeeList = useAppSelector((state: RootState) => {
    return state.employee.EmployeeList;
  });
  const getEmployeeListSaga = useMemo(() => {
    return memoizedEmployeeList;
  }, [memoizedEmployeeList]);
  const totalPage = Math.ceil((getEmployeeListSaga?.total || 0) / 20);
  const current_page = getEmployeeListSaga?.current_page || 0;
  const last_page = getEmployeeListSaga?.last_page || 0;
  const RANGE = 2;
  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;
    {
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <li key={index}>
            <a className="block px-5 py-2 leading-tight text-[#687076] bg-[#FFFFFF] rounded-r-lg">
              ...
            </a>
          </li>
        );
      }
      return null;
    };
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <li key={index}>
            <a className="block px-5 py-2 leading-tight text-[#687076] bg-[#FFFFFF] rounded-r-lg">
              ...
            </a>
          </li>
        );
      }
      return null;
    };
    return Array(totalPage)
      .fill(0)
      .map((_, index) => {
        const pageCurrent = index + 1;
        const isActive = pageCurrent === current_page;
        if (
          current_page <= RANGE * 2 + 1 &&
          pageCurrent > current_page + RANGE &&
          pageCurrent < totalPage - RANGE + 1
        ) {
          return renderDotAfter(index);
        } else if (
          current_page > RANGE * 2 + 1 &&
          current_page < totalPage - RANGE * 2
        ) {
          if (pageCurrent < current_page - RANGE && pageCurrent > RANGE) {
            return renderDotBefore(index);
          } else if (
            pageCurrent > current_page + RANGE &&
            pageCurrent < totalPage - RANGE + 1
          ) {
            return renderDotAfter(index);
          }
        } else if (
          current_page >= totalPage - RANGE * 2 &&
          pageCurrent > RANGE &&
          pageCurrent < current_page - RANGE
        ) {
          return renderDotBefore(index);
        }
        return (
          <Link
            key={index}
            to={{
              pathname: ROUTER.home,
              search: createSearchParams({
                page: pageCurrent.toString(),
              }).toString(),
            }}
            className={classNames("px-5 py-2 rounded-md leading-tight ", {
              "bg-[#E6E8EB] text-[#11181C]": isActive,
              "bg-[#F1F3F5] text-[#687076]": !isActive,
            })}
          >
            {pageCurrent}
          </Link>
        );
      });
  };
  return (
    <nav className="flex items-center">
      <ul className="inline-flex items-center gap-1">
        {current_page === 1 ? (
          <button className="block px-5 py-2 leading-tight rounded-l-lg bg-[#FFFFFF] text-[#687076] cursor-not-allowed">
            <svg
              width={12}
              height={11}
              viewBox="0 0 12 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.31042 1.60967C5.51871 1.4014 5.51871 1.06371 5.31042 0.855435C5.10215 0.647147 4.76446 0.647147 4.55618 0.855435L0.289517 5.1221C0.0812288 5.33038 0.0812288 5.66806 0.289517 5.87634L4.55618 10.1431C4.76446 10.3513 5.10215 10.3513 5.31042 10.1431C5.51871 9.93474 5.51871 9.59704 5.31042 9.38872L1.42089 5.49922L5.31042 1.60967ZM11.7105 1.60967C11.9187 1.4014 11.9187 1.06371 11.7105 0.855435C11.5022 0.647147 11.1645 0.647147 10.9561 0.855435L6.68952 5.1221C6.48123 5.33038 6.48123 5.66806 6.68952 5.87634L10.9561 10.1431C11.1645 10.3513 11.5022 10.3513 11.7105 10.1431C11.9187 9.93474 11.9187 9.59704 11.7105 9.38872L7.82089 5.49922L11.7105 1.60967Z"
                fill="#687076"
              />
            </svg>
          </button>
        ) : (
          <Link
            to={{
              pathname: ROUTER.home,
              search: createSearchParams({
                page: (1).toString(),
              }).toString(),
            }}
            className="block px-5 py-2 leading-tight text-[#687076] bg-[#FFFFFF] rounded-l-lg"
          >
            <svg
              width={12}
              height={11}
              viewBox="0 0 12 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.31042 1.60967C5.51871 1.4014 5.51871 1.06371 5.31042 0.855435C5.10215 0.647147 4.76446 0.647147 4.55618 0.855435L0.289517 5.1221C0.0812288 5.33038 0.0812288 5.66806 0.289517 5.87634L4.55618 10.1431C4.76446 10.3513 5.10215 10.3513 5.31042 10.1431C5.51871 9.93474 5.51871 9.59704 5.31042 9.38872L1.42089 5.49922L5.31042 1.60967ZM11.7105 1.60967C11.9187 1.4014 11.9187 1.06371 11.7105 0.855435C11.5022 0.647147 11.1645 0.647147 10.9561 0.855435L6.68952 5.1221C6.48123 5.33038 6.48123 5.66806 6.68952 5.87634L10.9561 10.1431C11.1645 10.3513 11.5022 10.3513 11.7105 10.1431C11.9187 9.93474 11.9187 9.59704 11.7105 9.38872L7.82089 5.49922L11.7105 1.60967Z"
                fill="#687076"
              />
            </svg>
          </Link>
        )}
        {current_page === 1 ? (
          <button className="block px-5 py-2 leading-tight rounded-l-lg bg-[#FFFFFF] text-[#687076] cursor-not-allowed">
            <svg
              width={6}
              height={11}
              viewBox="0 0 6 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.43131 0.843466C5.64619 1.04493 5.65708 1.38243 5.45563 1.59732L1.79759 5.49922L5.45563 9.40108C5.65708 9.61601 5.64619 9.9535 5.43131 10.155C5.21642 10.3564 4.8789 10.3455 4.67745 10.1307L0.677451 5.86399C0.48512 5.65884 0.48512 5.3396 0.677451 5.13445L4.67745 0.867786C4.8789 0.652895 5.21642 0.642015 5.43131 0.843466Z"
                fill="#687076"
              />
            </svg>
          </button>
        ) : (
          <Link
            to={{
              pathname: ROUTER.home,
              search: createSearchParams({
                page: (current_page - 1).toString(),
              }).toString(),
            }}
            className="block px-5 py-2 leading-tight text-[#687076] bg-[#FFFFFF] rounded-l-lg"
          >
            <svg
              width={6}
              height={11}
              viewBox="0 0 6 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.43131 0.843466C5.64619 1.04493 5.65708 1.38243 5.45563 1.59732L1.79759 5.49922L5.45563 9.40108C5.65708 9.61601 5.64619 9.9535 5.43131 10.155C5.21642 10.3564 4.8789 10.3455 4.67745 10.1307L0.677451 5.86399C0.48512 5.65884 0.48512 5.3396 0.677451 5.13445L4.67745 0.867786C4.8789 0.652895 5.21642 0.642015 5.43131 0.843466Z"
                fill="#687076"
              />
            </svg>
          </Link>
        )}
        {renderPagination()}
        {current_page === last_page ? (
          <button className="block px-5 py-2 leading-tight text-[#687076] bg-[#FFFFFF] rounded-r-lg cursor-not-allowed">
            <svg
              width={6}
              height={11}
              viewBox="0 0 6 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.568962 0.84347C0.783842 0.642009 1.12136 0.652899 1.32282 0.86779L5.32277 5.13446C5.5151 5.3396 5.5151 5.65884 5.32277 5.86399L1.32282 10.1306C1.12136 10.3456 0.783842 10.3565 0.568962 10.155C0.354071 9.95347 0.34318 9.61597 0.544642 9.40114L4.20267 5.49922L0.544642 1.59733C0.34318 1.38244 0.354071 1.04492 0.568962 0.84347Z"
                fill="#687076"
              />
            </svg>
          </button>
        ) : (
          <Link
            to={{
              pathname: ROUTER.home,
              search: createSearchParams({
                page: (current_page + 1).toString(),
              }).toString(),
            }}
            className="block px-5 py-2 leading-tight text-[#687076] bg-[#FFFFFF] rounded-r-lg"
          >
            <svg
              width={6}
              height={11}
              viewBox="0 0 6 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.568962 0.84347C0.783842 0.642009 1.12136 0.652899 1.32282 0.86779L5.32277 5.13446C5.5151 5.3396 5.5151 5.65884 5.32277 5.86399L1.32282 10.1306C1.12136 10.3456 0.783842 10.3565 0.568962 10.155C0.354071 9.95347 0.34318 9.61597 0.544642 9.40114L4.20267 5.49922L0.544642 1.59733C0.34318 1.38244 0.354071 1.04492 0.568962 0.84347Z"
                fill="#687076"
              />
            </svg>
          </Link>
        )}

        {current_page === last_page ? (
          <button className="block px-5 py-2 leading-tight text-[#687076] bg-[#FFFFFF] rounded-r-lg cursor-not-allowed">
            <svg
              width={12}
              height={11}
              viewBox="0 0 12 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.289517 9.38872C0.0812288 9.59704 0.0812288 9.93474 0.289517 10.1431C0.497794 10.3513 0.835479 10.3513 1.04376 10.1431L5.31042 5.87634C5.51871 5.66806 5.51871 5.33038 5.31042 5.1221L1.04376 0.855435C0.835479 0.647147 0.497794 0.647147 0.289517 0.855435C0.0812288 1.06371 0.0812288 1.4014 0.289517 1.60967L4.17905 5.49922L0.289517 9.38872ZM6.68952 9.38872C6.48123 9.59704 6.48123 9.93474 6.68952 10.1431C6.89779 10.3513 7.23548 10.3513 7.44376 10.1431L11.7105 5.87634C11.9187 5.66806 11.9187 5.33038 11.7105 5.1221L7.44376 0.855435C7.23548 0.647147 6.89779 0.647147 6.68952 0.855435C6.48123 1.06371 6.48123 1.4014 6.68952 1.60967L10.5791 5.49922L6.68952 9.38872Z"
                fill="#687076"
              />
            </svg>
          </button>
        ) : (
          <Link
            to={{
              pathname: ROUTER.home,
              search: createSearchParams({
                page: last_page.toString(),
              }).toString(),
            }}
            className="block px-5 py-2 leading-tight text-[#687076] bg-[#FFFFFF] rounded-r-lg"
          >
            <svg
              width={12}
              height={11}
              viewBox="0 0 12 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.289517 9.38872C0.0812288 9.59704 0.0812288 9.93474 0.289517 10.1431C0.497794 10.3513 0.835479 10.3513 1.04376 10.1431L5.31042 5.87634C5.51871 5.66806 5.51871 5.33038 5.31042 5.1221L1.04376 0.855435C0.835479 0.647147 0.497794 0.647147 0.289517 0.855435C0.0812288 1.06371 0.0812288 1.4014 0.289517 1.60967L4.17905 5.49922L0.289517 9.38872ZM6.68952 9.38872C6.48123 9.59704 6.48123 9.93474 6.68952 10.1431C6.89779 10.3513 7.23548 10.3513 7.44376 10.1431L11.7105 5.87634C11.9187 5.66806 11.9187 5.33038 11.7105 5.1221L7.44376 0.855435C7.23548 0.647147 6.89779 0.647147 6.68952 0.855435C6.48123 1.06371 6.48123 1.4014 6.68952 1.60967L10.5791 5.49922L6.68952 9.38872Z"
                fill="#687076"
              />
            </svg>
          </Link>
        )}
      </ul>
      {getEmployeeListSaga?.from &&
        getEmployeeListSaga?.to &&
        getEmployeeListSaga?.total && (
          <span className="bg-[#F1F3F5] text-[#687076] text-sm font-medium px-3 py-2 ml-1 rounded-md">
            {`${getEmployeeListSaga?.from}-${getEmployeeListSaga?.to} of ${getEmployeeListSaga?.total}`}
          </span>
        )}
    </nav>
  );
};

export default Pagination;
