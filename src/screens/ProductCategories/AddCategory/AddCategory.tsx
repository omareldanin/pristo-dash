import { AnimatePresence, motion } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, CategoryFormData } from "./schema";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../../../main";
import { AxiosError } from "axios";
import { APIError } from "../../../api/api";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { MainCategory } from "../../../services/mainCategories";
import { createCategory } from "../../../services/productCategories";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  mainCategories: MainCategory[] | undefined;
}

export const AddCategoryModal = ({
  isOpen,
  onClose,
  mainCategories,
}: Props) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const { mutate: createMainCategory, isPending } = useMutation({
    mutationFn: (data: FormData) => createCategory(data),
    onSuccess: () => {
      toast.success("تم اضافة القسم بنجاح");
      onClose();
      reset();
      queryClient.invalidateQueries({
        queryKey: ["productCategories"],
      });
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || "حدث خطأ ما");
    },
  });

  const onSubmit = (data: CategoryFormData) => {
    const fm = new FormData();
    const name = {
      ar: data.arName,
      fr: data.frName,
      en: data.enName,
    };
    fm.append("name", JSON.stringify(name));
    fm.append("mainCategoryId", data.mainCategoryId);
    createMainCategory(fm);
  };

  return (
    <div
      className="model-container center"
      style={{ display: isOpen ? "flex" : "none" }}
      onClick={onClose}>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            className="box"
            onClick={(e) => e.stopPropagation()}
            key="box">
            {isPending ? <LoadingSpinner /> : null}
            <div className="head">
              <h2>اضافه تصنيف</h2>
            </div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="name">الاسم </label>
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
                <label htmlFor="desc">القسم الرئيسي </label>
                <select className="form-select" {...register("mainCategoryId")}>
                  {mainCategories?.map((c) => (
                    <option value={c.id}>{c.name.ar}</option>
                  ))}
                </select>
              </div>
              <div className="controls">
                <button type="submit" disabled={isPending}>
                  اضافه
                </button>
                <button type="button" onClick={onClose}>
                  الغاء
                </button>
              </div>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
