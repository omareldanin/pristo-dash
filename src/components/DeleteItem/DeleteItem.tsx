import { AnimatePresence, motion } from "motion/react";

interface Props {
  isOpen: boolean;
  isloading: boolean;
  onClose: () => void;
  confirm: () => void;
}

export const DeleteItem = ({ isOpen, onClose, confirm, isloading }: Props) => {
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
            className="box delete-box"
            onClick={(e) => e.stopPropagation()}
            key="box">
            <h2>هل انت متأكد من حذف هذا العنصر؟</h2>

            <div className="controls">
              <button type="submit" disabled={isloading} onClick={confirm}>
                تأكيد
              </button>
              <button type="button" onClick={onClose}>
                الغاء
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
