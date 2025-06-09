import { AnimatePresence, motion } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeliveryFormData, deliverySchema } from "./schema";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../../../main";
import { AxiosError } from "axios";
import { APIError } from "../../../api/api";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { useEffect } from "react";
import { editDelivery, User } from "../../../services/users";

interface Props {
  delivery: User | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export const EditDelivery = ({ isOpen, onClose, delivery }: Props) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<DeliveryFormData>({
    resolver: zodResolver(deliverySchema),
  });

  useEffect(() => {
    if (delivery) {
      // Example: reset form with new category
      reset({
        name: delivery.name,
        phone: delivery.phone,
      });
    }
  }, [delivery]);

  const { mutate: updateDelivery, isPending } = useMutation({
    mutationFn: (data: FormData) => editDelivery(data),
    onSuccess: () => {
      toast.success("تم تعديل الديلفرى بنجاح");
      onClose();
      reset();
      queryClient.invalidateQueries({
        queryKey: ["deliveries"],
      });
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || "حدث خطأ ما");
    },
  });

  const onSubmit = (data: DeliveryFormData) => {
    const fm = new FormData();

    if (data.avatar) {
      fm.append("avatar", data.avatar[0]);
    }
    fm.append("id", delivery?.id + "");
    fm.append("name", data.name);
    fm.append("phone", data.phone);
    if (data.password) {
      fm.append("password", data.password);
    }
    updateDelivery(fm);
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
              <h2>تعديل ديلفرى</h2>
            </div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="image">الصوره </label>
                <input
                  id="image"
                  type="file"
                  className="form-control"
                  {...register("avatar")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">الاسم </label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="الاسم باللغه العربيه"
                  required
                  {...register("name")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="desc">رقم الهاتف </label>
                <input
                  id="desc"
                  type="text"
                  className="form-control"
                  placeholder="رقم الهاتف"
                  required
                  {...register("phone")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">كلمه المرور</label>
                <input
                  id="password"
                  type="text"
                  className="form-control"
                  placeholder="كلمه المرور"
                  {...register("password")}
                />
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
