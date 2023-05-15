import logo from "../../assets/logo.png";
import Footer from "../../components/Footer/Footer";
interface Props {
  children: any;
}
const LayoutAuthentication: React.FC<Props> = ({ children }) => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img
          style={{ width: "100px", height: "100px" }}
          className="mt-[64px]"
          src={logo}
          alt="logo"
        />
        <h3 className="font-medium text-4xl mb-3">HR Management System </h3>
        {children}
        <Footer className="mt-auto m-8"></Footer>
      </div>
    </section>
  );
};

export default LayoutAuthentication;
