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
import { editCategory, Slider } from "../../../services/sliders";

interface Props {
  slider: Slider | undefined;
  id: number | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export const EditCategoryModal = ({ isOpen, onClose, slider, id }: Props) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    if (slider) {
      // Example: reset form with new category
      reset({
        order: slider.order + "",
      });
    }
  }, [slider]);

  const { mutate: createMainCategory, isPending } = useMutation({
    mutationFn: (data: FormData) => editCategory(id, data),
    onSuccess: () => {
      toast.success("تم تعديل البانر بنجاح");
      onClose();
      reset();
      queryClient.invalidateQueries({
        queryKey: ["sliders"],
      });
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || "حدث خطأ ما");
    },
  });

  const onSubmit = (data: CategoryFormData) => {
    const fm = new FormData();
    if (data.image) {
      fm.append("image", data.image[0]);
    }
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
                <label htmlFor="desc">الترتيب </label>
                <input
                  id="desc"
                  type="text"
                  className="form-control"
                  placeholder="الترتيب"
                  defaultValue={slider?.order}
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
