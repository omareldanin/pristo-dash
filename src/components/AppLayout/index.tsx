import { useState } from "react";
import { Navbar } from "./Navbar";
import { SideBar } from "./SideBar";

interface Props {
  children: React.ReactNode;
  // isLoading?: boolean;
  // isError?: boolean;
}

export const AppLayout = ({ children }: Props) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const toggleSideBar = () => {
    setOpenSidebar((pre) => (pre = !pre));
  };
  return (
    <>
      <SideBar openSidebar={openSidebar} toggleSideBar={toggleSideBar} />
      <main>{children}</main>
      <Navbar toggleSideBar={toggleSideBar} />
    </>
  );
};
