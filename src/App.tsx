import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.scss";
import { LoginScreen } from "./screens/Login";
import { HomeScreen } from "./screens/Home";
import { useValidateToken } from "./hooks/useValidateToken";
import { useEffect } from "react";
import { Loader } from "@mantine/core";
import PrivateRoutes from "./components/PrivateWrappers";
import { MainCategories } from "./screens/MainCategories";
import "ldrs/react/DotSpinner.css";
import { HomeCategories } from "./screens/HomeCategories";
import { Subategories } from "./screens/SubCategories";
import { ProductCategories } from "./screens/ProductCategories";
import { SLiders } from "./screens/Sliders";
import { Vendors } from "./screens/Vendors";
import { AddVendor } from "./screens/AddVendor";
import { EditVendor } from "./screens/EditVendor";
import { Deliveries } from "./screens/Deliveries";
import { Users } from "./screens/Users";
import { Orders } from "./screens/Orders";
import { io, Socket } from "socket.io-client";
import { queryClient } from "./main";
import toast from "react-hot-toast";

const SOCKET_URL = "http://139.59.135.25:3000";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, isSuccess } = useValidateToken();
  const token = localStorage.getItem("token");

  const isBaseRoute = location.pathname === "/";

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL, {
      autoConnect: false, // optional: control connection manually
    });

    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
    });

    socket.emit("joinRoom", {
      room: "admins",
    });

    socket.on("newOrder", (message) => {
      console.log("📩 newOrder:", message);
      toast.success(`هناك طلب جديد رقم ${message.id}`);

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      // Display browser notification
      new Notification("طلببه جديده", {
        body: `هناك طلبيه جديده من ${message.id}`,
      });
    });

    socket.on("updateOrder", (message) => {
      console.log("📩 newOrder:", message);
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    });

    if (isSuccess) {
      const navigateTo = isBaseRoute ? "/home" : location.pathname;
      navigate(navigateTo || "/home");
    }
    return () => {
      socket.disconnect();
    };
  }, [isSuccess, navigate, isBaseRoute, location.pathname]);

  if (isLoading && token) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route Component={PrivateRoutes}>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/main-categories" element={<MainCategories />} />
        <Route path="/home-categories" element={<HomeCategories />} />
        <Route path="/sub-categories" element={<Subategories />} />
        <Route path="/product-categories" element={<ProductCategories />} />
        <Route path="/sliders" element={<SLiders />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/delivery" element={<Deliveries />} />
        <Route path="/users" element={<Users />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/vendors/add" element={<AddVendor />} />
        <Route path="/vendors/edit/:id" element={<EditVendor />} />
      </Route>
    </Routes>
  );
}

export default App;
