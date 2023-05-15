import React, { Fragment } from "react";
import Header from "../../components/Header/Header";
import MenuSidebar from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";
interface Props {
  children: any;
}
const LayoutDefault: React.FC<Props> = ({ children }) => {
  return (
    <Fragment>
      <Header></Header>
      <div
        className="flex gap-[46px] overflow-hiden bg-white pt-16"
        style={{ background: "#F8F9FA" }}
      >
        <MenuSidebar></MenuSidebar>
        <div className="w-full">
          <main className="max-w-[1170px] h-[90vh] flex flex-col">
            <div className="mt-[30px]">{children}</div>
            <Footer className="flex justify-around items-end flex-grow"></Footer>
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default LayoutDefault;
