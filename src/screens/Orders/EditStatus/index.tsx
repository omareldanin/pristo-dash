import { AnimatePresence, motion } from "motion/react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../../../main";
import { AxiosError } from "axios";
import { APIError } from "../../../api/api";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { statusStyles } from "../Table";
import { useState } from "react";
import { updateOrder } from "../../../services/orders";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: number | undefined;
}
const statuses = [
  "REGISTERED",
  "RECEIVED",
  "PREPARING",
  "FINISHED",
  "TACKED",
  "WITH_DELIVERY",
  "COMPLETE",
  "CANCELED",
  "DELETED",
];

export const EditStatus = ({ isOpen, onClose, id }: Props) => {
  const [status, setStatus] = useState("");

  const { mutate: editOrder, isPending } = useMutation({
    mutationFn: (data: FormData) => updateOrder(data),
    onSuccess: () => {
      toast.success("تم تعديل الحاله بنجاح");
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || "حدث خطأ ما");
    },
  });

  const editStatus = () => {
    const fm = new FormData();
    fm.append("status", status);
    fm.append("id", id + "");
    editOrder(fm);
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
              <h2>تعديل حاله الطلب</h2>
            </div>
            <form action="">
              <div className="form-group">
                <label htmlFor="status">الحاله </label>
                <select
                  name="status"
                  id="status"
                  onChange={(e) => setStatus(e.target.value)}>
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {statusStyles[s as keyof typeof statusStyles].label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="controls">
                <button type="button" disabled={isPending} onClick={editStatus}>
                  تعديل
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
