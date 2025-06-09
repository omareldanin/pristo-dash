import { AnimatePresence, motion } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionFormData, transactionSchema } from "./schema";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../../../main";
import { AxiosError } from "axios";
import { APIError } from "../../../api/api";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { createTransaction, User } from "../../../services/users";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  delivery: User | undefined;
}

export const AddTransaction = ({ isOpen, onClose, delivery }: Props) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
  });

  const { mutate: addDelivery, isPending } = useMutation({
    mutationFn: (data: FormData) => createTransaction(data),
    onSuccess: () => {
      toast.success("تم اضافه رصيد بنجاح");
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

  const onSubmit = (data: TransactionFormData) => {
    const fm = new FormData();
    fm.append("amount", data.amount + "");
    fm.append("type", "DEPOSIT");
    fm.append("userId", delivery?.id + "");
    addDelivery(fm);
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
              <h2>اضافة رصيد</h2>
            </div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="desc">المبلغ </label>
                <input
                  id="desc"
                  type="number"
                  className="form-control"
                  placeholder="المبلغ"
                  required
                  {...register("amount")}
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
