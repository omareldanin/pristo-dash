// import { LiaSearchSolid } from "react-icons/lia";
import avatar from "../../../assets/admin.png";
import { IoIosArrowDown } from "react-icons/io";
import { RiNotification4Fill } from "react-icons/ri";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../../../store/authStore";

interface Props {
  toggleSideBar: () => void;
}
export const Navbar = ({ toggleSideBar }: Props) => {
  const { name, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="navbar">
      <div className="search">
        <div className="bars">
          <FaBars size={20} onClick={toggleSideBar} />
        </div>
      </div>
      <div className="admin-controls">
        <div className="notification-btn center">
          <RiNotification4Fill size={20} color="#3eaae0" />
        </div>
        <div className="user-card">
          <div className="info">
            <h3>{name}</h3>
            <span>admin</span>
            <IoIosArrowDown size={20} onClick={handleToggle} />
          </div>
          <div className="avatar">
            <img src={avatar} alt="" />
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              style={{ left: "30px", top: "70px" }}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start"
                        ? "right top"
                        : "left bottom",
                  }}>
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}>
                        <MenuItem onClick={handleClose}>الملف الشخصي</MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            handleClose(e);
                            logout();
                          }}>
                          تسجيل خروج
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </div>
      </div>
    </div>
  );
};
