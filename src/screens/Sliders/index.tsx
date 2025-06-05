import { MdAdd } from "react-icons/md";
import { AppLayout } from "../../components/AppLayout";
import classes from "./index.module.scss";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useState } from "react";
import { DeleteItem } from "../../components/DeleteItem/DeleteItem";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../../main";
import { AxiosError } from "axios";
import { APIError } from "../../api/api";

import { useSliders } from "../../hooks/useSlider";
import { deleteCategory, Slider } from "../../services/sliders";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { AddSlider } from "./AddCategory/AddCategory";
import { EditCategoryModal } from "./EditCategory/EditCategory";
export const SLiders = () => {
  const { data: sliders, isLoading } = useSliders();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState<Slider>();

  const { mutate: deleteMainCategory, isPending: deleteLoading } = useMutation({
    mutationFn: (id: number | undefined) => deleteCategory(id),
    onSuccess: () => {
      toast.success("تم حذف البانر بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["sliders"],
      });
      setOpenDeleteModal(false);
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || "حدث خطأ ما");
    },
  });

  return (
    <AppLayout>
      {isLoading || deleteLoading ? <LoadingSpinner /> : null}
      <div className={classes.categories}>
        <div className={classes.header}>
          <h1>سلايدر</h1>
          <div>
            <button
              className={classes.button + " ml-3 inline-flex"}
              onClick={() => setOpenAddModal(true)}>
              اضافة
              <MdAdd size={20} color="#fff" />
            </button>
          </div>
        </div>
        <div className={classes.content}>
          {sliders?.results.map((slider) => (
            <div className="slider" key={slider.id}>
              <div className="image">
                <img src={"http://139.59.135.25:3000/" + slider.image} />
              </div>
              <div>
                <span>الترتيب</span>
                <span>{slider.order}</span>
              </div>
              <div className="controls">
                <CiEdit
                  size={25}
                  color="green"
                  onClick={() => {
                    setSelectedSlider(slider);
                    setOpenEditModal(true);
                  }}
                  cursor={"pointer"}
                />
                <GoTrash
                  size={25}
                  color="red"
                  cursor={"pointer"}
                  onClick={() => {
                    setSelectedSlider(slider);
                    setOpenDeleteModal(true);
                  }}
                />
              </div>
            </div>
          ))}
          {/* <Table
            data={categories?.results}
            setSelectedCategory={setSelectedCategory}
            openEdit={() => setOpenEditModal(true)}
            openDelete={() => setOpenDeleteModal(true)}
          /> */}
        </div>
      </div>
      <AddSlider isOpen={openAddModal} onClose={() => setOpenAddModal(false)} />
      <EditCategoryModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        slider={selectedSlider}
        id={selectedSlider?.id}
      />
      <DeleteItem
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        confirm={() => {
          deleteMainCategory(selectedSlider?.id);
          setOpenDeleteModal(false);
        }}
        isloading={deleteLoading}
      />
    </AppLayout>
  );
};
