import { NavLink } from "react-router-dom";
import logo from "../../../assets/Logo.png";
import { GoHome } from "react-icons/go";
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosCloseCircle } from "react-icons/io";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { IoRestaurantOutline } from "react-icons/io5";
import { MdDeliveryDining } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";

interface Props {
  toggleSideBar: () => void;
  openSidebar: boolean;
}

export const SideBar = ({ openSidebar, toggleSideBar }: Props) => {
  return (
    <div className={`sidebar ${openSidebar ? "openSidebar" : ""}`}>
      <div className="logo center">
        <div
          className="bars"
          style={{ position: "absolute", top: "20px", right: "210px" }}>
          <IoIosCloseCircle
            size={25}
            onClick={toggleSideBar}
            color="rgb(255, 16, 16)"
          />
        </div>
        <img src={logo} alt="Logo" />
      </div>
      <div className="pages">
        <NavLink to={"/home"}>
          <span className="parent">
            <GoHome size={22} />
            <span>الرئيسيه</span>
          </span>
        </NavLink>
        <NavLink to={"/orders"}>
          <span className="parent">
            <FaBoxOpen size={22} />
            <span>الطلبات</span>
          </span>
        </NavLink>
        <NavLink to={"/vendors"}>
          <span className="parent">
            <IoRestaurantOutline size={22} />
            <span>المطاعم</span>
          </span>
        </NavLink>
        <NavLink to={"/delivery"}>
          <span className="parent">
            <MdDeliveryDining size={22} />
            <span>الديلفرى</span>
          </span>
        </NavLink>
        <NavLink to={"/users"}>
          <span className="parent">
            <FaUsers size={22} />
            <span>المستخدمين</span>
          </span>
        </NavLink>
        <NavLink to={"/sliders"}>
          <span className="parent">
            <TfiLayoutSliderAlt size={22} />
            <span>سلايدر</span>
          </span>
        </NavLink>

        <NavLink to={"/main-categories"}>
          <span className="parent">
            <BiCategoryAlt size={22} />
            <span>الاقسام الرئيسيه</span>
          </span>
        </NavLink>
        <NavLink to={"/home-categories"}>
          <span className="parent">
            <BiCategoryAlt size={22} />
            <span>الفئات</span>
          </span>
        </NavLink>
        <NavLink to={"/sub-categories"}>
          <span className="parent">
            <BiCategoryAlt size={22} />
            <span>تصنيف المطاعم</span>
          </span>
        </NavLink>
        <NavLink to={"/product-categories"}>
          <span className="parent">
            <BiCategoryAlt size={22} />
            <span>تصنيف المنتجات</span>
          </span>
        </NavLink>
      </div>
    </div>
  );
};
