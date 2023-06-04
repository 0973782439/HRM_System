import React from "react";
import {
  EEmployeeType,
  EEntitleOT,
  EGender,
  EMealAllowancePaid,
} from "../../interfaces/Common";
import { IEmployeeList } from "../../interfaces/Employee";
import Loading from "../Loading/Loading";
import "./table.css";
import Checkbox from "../Input/Checkbox";
import numeral from "numeral";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../utils/path";
import NotData from "../NotData/NotData";
import dayjs from "dayjs";
interface Props {
  rowData?: IEmployeeList;
  handleChangeCheckBox: (e?: any, row?: any) => void;
  handleClickRow?: any;
}

const Table: React.FC<Props> = ({
  rowData,
  handleChangeCheckBox,
  handleClickRow,
}) => {
  const navigate = useNavigate();
  const handleUpdateEmployee = (id: number) => {
    navigate(`${ROUTER.create_employee}/${id}`, {
      replace: true,
    });
  };

  return (
    <>
      <div className="relative overflow-x-auto w-full sm:rounded-lg table-wrapper min-h-[525px] max-h-[525px]">
        <Loading></Loading>
        <table className="w-full text-left border-separate">
          <thead className="text-sm bg-[#ECEEF0] sticky top-0">
            <tr>
              <th className="py-[6px] pl-[10px] min-w-[36px]">
                <Checkbox
                  name="checkboxall"
                  checked={
                    (rowData &&
                      rowData?.data.filter(
                        (item: any) => item.isChecked == true
                      ).length >= 1) ||
                    false
                  }
                  handleChangeCheckBox={handleChangeCheckBox}
                />
              </th>
              <th className="py-[6px] pl-[10px] min-w-[95px]">NIK</th>
              <th className="py-[6px] pl-[10px] min-w-[150px]">Name</th>
              <th className="py-[6px] pl-[10px] min-w-[70px]">Gender</th>
              <th className="py-[6px] pl-[10px] min-w-[130px]">
                Bank Card No.
              </th>
              <th className="py-[6px] pl-[10px] min-w-[150px]">
                Bank Account No.
              </th>
              <th className="py-[6px] pl-[10px] min-w-[150px]">
                Family Card No.
              </th>
              <th className="py-[6px] pl-[10px] min-w-[130px]">
                Marriage Status
              </th>
              <th className="py-[6px] pl-[10px] min-w-[150px]">Mother Name</th>
              <th className="py-[6px] pl-[10px] min-w-[115px]">
                Place of birth
              </th>
              <th className="py-[6px] pl-[10px] min-w-[115px]">
                Date of birth
              </th>
              <th
                colSpan={2}
                className="py-[6px] pl-[10px] min-w-[700px] text-center"
              >
                Home Address
              </th>
              <th className="py-[6px] pl-[10px] min-w-[170px]">
                National Card ID No.
              </th>
              <th className="py-[6px] pl-[10px] min-w-[90px]">Date Start</th>
              <th className="py-[6px] pl-[10px] min-w-[110px]">
                First Contract
              </th>
              <th className="py-[6px] pl-[10px] min-w-[130px]">
                Second Contract
              </th>
              <th className="py-[6px] pl-[10px] min-w-[110px]">End Contract</th>
              <th className="py-[6px] pl-[10px] min-w-[150px]">Department</th>
              <th className="py-[6px] pl-[10px] min-w-[120px]">
                Employee Type
              </th>
              <th className="py-[6px] pl-[10px] min-w-[90px]">Salary Rp.</th>
              <th className="py-[6px] pl-[10px] min-w-[150px]">Position</th>
              <th className="py-[6px] pl-[10px] min-w-[80px]">O/T Paid</th>
              <th className="py-[6px] pl-[10px] min-w-[90px]">Meal paid</th>
              <th className="py-[6px] pl-[10px] min-w-[80px]">Meal Rp.</th>
              <th className="py-[6px] pl-[10px] min-w-[80px]">Grading</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {rowData &&
              rowData.data.map((row: any, index: number) => {
                return (
                  <tr
                    key={row.id}
                    onDoubleClick={() => handleUpdateEmployee(row.id)}
                    className={
                      row?.isChecked
                        ? "bg-[#E9F9EE] hover:bg-[#EDF6FF]"
                        : "bg-[#F8F9FA] border-b hover:bg-[#EDF6FF]"
                    }
                    onClick={(e) => handleClickRow(e, row)}
                  >
                    <td className="py-[3px] pl-[10px]">
                      <Checkbox
                        name="select-record"
                        checked={row?.isChecked || false}
                        handleChangeCheckBox={handleChangeCheckBox}
                        rowData={row}
                      />
                    </td>
                    <td className="py-[6px] pl-[10px] whitespace-nowrap">
                      {row.staff_id}
                    </td>
                    <td className="py-[6px] pl-[10px]">{row.name}</td>
                    <td className="py-[6px] pl-[10px]">
                      {row.gender === EGender.Male ? "Male" : "Female"}
                    </td>
                    <td className="py-[6px] pl-[10px]">{row.card_number}</td>
                    <td className="py-[6px] pl-[10px]">
                      {row.bank_account_no}
                    </td>
                    <td className="py-[6px] pl-[10px]">
                      {row.family_card_number}
                    </td>
                    <td className="py-[6px] pl-[10px]">{row.marriage_code}</td>
                    <td className="py-[6px] pl-[10px]">{row.mother_name}</td>
                    <td className="py-[6px] pl-[10px]">{row.pob}</td>
                    <td className="py-[6px] pl-[10px]">
                      {dayjs(row.dob).format("YYYY/MM/DD")}
                    </td>
                    <td className="py-[6px] pl-[10px]">{row.home_address_1}</td>
                    <td className="py-[6px] pl-[10px]">{row.home_address_2}</td>
                    <td className="py-[6px] pl-[10px]">{row.nc_id}</td>
                    <td className="py-[6px] pl-[10px]">
                      {dayjs(row.contract_start_date).format("YYYY/MM/DD")}
                    </td>
                    <td className="py-[2px] pl-[10px]">
                      {row.contracts[0]?.contract_date
                        ? dayjs(row.contracts[0]?.contract_date).format(
                            "YYYY/MM/DD"
                          )
                        : null}
                    </td>
                    <td className="py-[6px] pl-[10px]">
                      {row.contracts[1]?.contract_date
                        ? dayjs(row.contracts[1]?.contract_date).format(
                            "YYYY/MM/DD"
                          )
                        : null}
                    </td>
                    <td className="py-[2px] pl-[10px]">
                      {row.contracts[2]?.contract_date
                        ? dayjs(row.contracts[2]?.contract_date).format(
                            "YYYY/MM/DD"
                          )
                        : null}
                    </td>
                    <td className="py-[2px] pl-[10px]">
                      {row.department_name}
                    </td>
                    <td className="py-[2px] pl-[10px]">
                      {row.type == EEmployeeType.Permanent
                        ? "Permanent"
                        : row.type == EEmployeeType.PartTime
                        ? "Part-time"
                        : "Contract"}
                    </td>
                    <td className="py-[2px] pl-[10px]">
                      {numeral(row.basic_salary).format("0,0")}
                    </td>
                    <td className="py-[2px] pl-[10px]">{row.position_name}</td>
                    <td className="py-[2px] pl-[10px]">
                      {row?.entitle_ot == EEntitleOT.Checked ? "Yes" : null}
                    </td>
                    <td className="py-[2px] pl-[10px]">
                      {row?.meal_allowance_paid == EMealAllowancePaid.Checked
                        ? "Yes"
                        : null}
                    </td>
                    <td className="py-[2px] pl-[10px]">
                      {numeral(row.meal_allowance).format("0,0")}
                    </td>
                    <td className="py-[2px] pl-[10px]">{row.grade_name}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {rowData && rowData?.data.length <= 0 && <NotData></NotData>}
      </div>
    </>
  );
};

export default Table;
