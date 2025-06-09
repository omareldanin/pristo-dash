import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { AppLayout } from "../../components/AppLayout";
import { useHomeCategories } from "../../hooks/useHomeCategories";
import { useMainCategories } from "../../hooks/useMainCategories";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateVendor } from "../../services/vendors";
import toast from "react-hot-toast";
import { queryClient } from "../../main";
import { AxiosError } from "axios";
import { APIError } from "../../api/api";
import { useForm } from "react-hook-form";
import { VendorFormData, vendorSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import { useVendorDetails } from "../../hooks/useVendors";

export const EditVendor = () => {
  const { data: mainCategories } = useMainCategories();
  const { data: homeCategories } = useHomeCategories();
  const { data: subCategories } = useSubCategories();
  const [feature, setFeature] = useState(false);
  const [active, setActive] = useState(true);
  const [pick, setPick] = useState(false);
  const { id = "" } = useParams();
  const { data: vendor, isLoading } = useVendorDetails(Number.parseInt(id));

  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
  });
  useEffect(() => {
    if (vendor) {
      reset({
        arName: vendor.results.name.ar,
        frName: vendor.results.name.fr,
        enName: vendor.results.name.en,
        phone: vendor.results.phone,
        deliveryCost: vendor.results.deliveryCost,
        orderTime: vendor.results.orderTime + "",
        mainCategory: vendor.results.mainCategoryId + "",
        subCategory: vendor.results.subCategoryId + "",
        homeCategory: vendor.results.homeCategoryId + "",
      });
      setActive(vendor.results.active);
      setFeature(vendor.results.feature);
      setPick(vendor.results.pickUp);
    }
  }, [vendor]);

  const { mutate: editvendor, isPending } = useMutation({
    mutationFn: (data: FormData) => updateVendor(data),
    onSuccess: () => {
      toast.success("تم تعديل المطعم بنجاح");
      // reset();
      queryClient.invalidateQueries({
        queryKey: ["vendors"],
      });
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || "حدث خطأ ما");
    },
  });

  const onSubmit = (data: VendorFormData) => {
    const fm = new FormData();
    const name = {
      ar: data.arName,
      fr: data.frName,
      en: data.enName,
    };
    fm.append("name", JSON.stringify(name));

    fm.append("id", id + ""); // not data.avatar
    if (data.avatar) {
      fm.append("avatar", data.avatar[0]); // not data.avatar
    }
    if (data.cover) {
      fm.append("cover", data.cover[0]);
    }
    fm.append("phone", data.phone);
    if (data.password) {
      fm.append("password", data.password);
    }
    fm.append("deliveryCost", data.deliveryCost + "");
    fm.append("orderTime", data.orderTime + "");
    fm.append("pickUp", pick + "");
    fm.append("active", active + "");
    fm.append("feature", feature + "");
    fm.append("mainCategoryId", data.mainCategory);
    fm.append("homeCategoryId", data.homeCategory);
    fm.append("subCategoryId", data.subCategory);
    editvendor(fm);
  };

  return (
    <AppLayout>
      <div className="add-page">
        {isPending || isLoading ? <LoadingSpinner /> : null}
        <div className="head">
          <h1>إضافه مطعم</h1>
        </div>
        <div className="form">
          <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="image">الصوره</label>
              <input
                id="image"
                type="file"
                className="form-control"
                {...register("avatar")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cover">الغلاف</label>
              <input
                id="cover"
                type="file"
                className="form-control"
                {...register("cover")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">
                رقم الهاتف <span>*</span>{" "}
              </label>
              <input
                id="phone"
                type="text"
                className="form-control"
                placeholder="رقم الهاتف"
                required
                {...register("phone")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">
                الاسم <span>*</span>
              </label>
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="الاسم باللغه العربيه"
                required
                {...register("arName")}
              />
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="الاسم باللغه الفرنسيه"
                required
                {...register("frName")}
              />
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="الاسم باللغه الانجليزيه"
                required
                {...register("enName")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="delivery-cost">
                تكلفه التوصيل <span>*</span>{" "}
              </label>
              <input
                id="delivery-cost"
                type="number"
                className="form-control"
                placeholder="تكلفه التوصيل"
                min={1}
                required
                {...register("deliveryCost")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="order-time">
                مده تحضير الطلب <span>*</span>{" "}
              </label>
              <input
                id="order-time"
                type="number"
                min={1}
                className="form-control"
                placeholder="مده تحضير الطلب"
                required
                {...register("orderTime")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="main-category">
                القسم <span>*</span>{" "}
              </label>
              <select
                id="
                main-category"
                {...register("mainCategory")}>
                <option value="">----</option>
                {mainCategories?.results.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name.ar}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="sub-category">
                تصنيف المطعم <span>*</span>{" "}
              </label>
              <select id="sub-category" {...register("subCategory")}>
                <option value="">----</option>

                {subCategories?.results.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name.ar}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="home-category">الفئه</label>
              <select id="home-category" {...register("homeCategory")}>
                <option value="">----</option>
                {homeCategories?.results.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name.ar}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-switch">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      color="warning"
                      checked={active}
                      onChange={(e) => {
                        setActive(e.target.checked);
                      }}
                    />
                  }
                  label="تفعيل المطعم"
                />
              </FormGroup>
            </div>
            <div className="form-switch">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      color="warning"
                      checked={feature}
                      onChange={(e) => {
                        setFeature(e.target.checked);
                      }}
                    />
                  }
                  label="مطعم مميز"
                />
              </FormGroup>
            </div>
            <div className="form-switch">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      color="warning"
                      checked={pick}
                      onChange={(e) => {
                        setPick(e.target.checked);
                      }}
                    />
                  }
                  label="متاح استلام"
                />
              </FormGroup>
            </div>
            <div className="form-group">
              <label htmlFor="password">كلمه المرور</label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="كلمه المرور"
                {...register("password")}
              />
            </div>

            <div className="controls">
              <button type="submit">اضافه</button>
              <button type="button">الغاء</button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};
