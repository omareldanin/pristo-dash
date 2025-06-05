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
import { useEffect } from "react";
import { editCategory, HomeCategory } from "../../../services/homeCategories";

interface Props {
  category: HomeCategory | undefined;
  id: number | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export const EditCategoryModal = ({ isOpen, onClose, category, id }: Props) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    if (category) {
      // Example: reset form with new category
      reset({
        arName: category.name.ar,
        enName: category.name.en,
        frName: category.name.fr,
        order: category.order + "",
      });
    }
  }, [category]);

  const { mutate: createMainCategory, isPending } = useMutation({
    mutationFn: (data: FormData) => editCategory(id, data),
    onSuccess: () => {
      toast.success("تم تعديل القسم بنجاح");
      onClose();
      reset();
      queryClient.invalidateQueries({
        queryKey: ["homeCategories"],
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

    if (data.image) {
      fm.append("image", data.image[0]);
    }
    fm.append("name", JSON.stringify(name));
    fm.append("order", data.order + "");
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
              <h2>تعديل فئه</h2>
            </div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="image">الصوره </label>
                <input
                  id="image"
                  type="file"
                  className="form-control"
                  {...register("image")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">الاسم </label>
                <input
                  id="name"
                  type="text"
                  defaultValue={category?.name.ar}
                  className="form-control"
                  placeholder="الاسم باللغه العربيه"
                  required
                  {...register("arName")}
                />
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  defaultValue={category?.name.fr}
                  placeholder="الاسم باللغه الفرنسيه"
                  required
                  {...register("frName")}
                />
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  defaultValue={category?.name.en}
                  placeholder="الاسم باللغه الانجليزيه"
                  required
                  {...register("enName")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="desc">الترتيب </label>
                <input
                  id="desc"
                  type="text"
                  className="form-control"
                  placeholder="الترتيب"
                  defaultValue={category?.order}
                  required
                  {...register("order")}
                />
              </div>
              <div className="controls">
                <button type="submit" disabled={isPending}>
                  حفظ
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
