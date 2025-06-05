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

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, isSuccess } = useValidateToken();
  const token = localStorage.getItem("token");

  const isBaseRoute = location.pathname === "/";

  useEffect(() => {
    if (isSuccess) {
      const navigateTo = isBaseRoute ? "/home" : location.pathname;
      navigate(navigateTo || "/home");
    }
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
      </Route>
    </Routes>
  );
}

export default App;
