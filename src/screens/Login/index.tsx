import classes from "./index.module.scss";
import logo from "../../assets/Logo.png";
import loginBK from "../../assets/login.png";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SignInRequest, signInService } from "../../services/auth";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { DotSpinner } from "ldrs/react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export const LoginScreen = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ password, phone }: SignInRequest) => {
      return signInService({ password, phone });
    },
    onSuccess: (data) => {
      toast.success("تم تسجيل الدخول بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["validateToken"],
      });
      setAuth(data);
      navigate("/home");
    },
    onError: (
      error: AxiosError<{
        message: string;
        status: string;
      }>
    ) => {
      toast.error(error.response?.data.message || "حدث خطأ ما");
    },
  });
  const changePasswordVisiblity = () => {
    setVisiblePassword((pre) => (pre = !pre));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const performLogin = () => {
      login({
        password: password,
        phone: phone,
      });
    };

    performLogin();
  };
  return (
    <div className={`${classes.loginScreen}`}>
      <div
        className={`${classes.loginContainer} grid grid-cols-1 md:grid-cols-2 gap-4`}>
        <div className={`${classes.intro}`}>
          <img src={loginBK} />
        </div>
        <div className={`${classes.box} flex justify-center items-center`}>
          <div className={classes.formContainer}>
            <div className={classes.social + " flex gap-2 justify-center"}>
              <img src={logo} />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">رقم الهاتف</label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="رقم الهاتف"
                  required
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <i onClick={changePasswordVisiblity}>
                  {visiblePassword ? <FaEyeSlash /> : <FaEye />}
                </i>
                <label htmlFor="pass">كلمه السر</label>
                <input
                  id="pass"
                  type={visiblePassword ? "text" : "password"}
                  className="form-control"
                  placeholder="كلمه السر"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked
                      style={{ color: "rgba(249, 165, 26, 1)" }}
                    />
                  }
                  label="تذكرني"
                />
              </FormGroup>
              <div className="form-group" style={{ margin: 0 }}>
                <button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <DotSpinner size="20" speed="0.9" color="#fff" />
                  ) : (
                    "تسجيل"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
