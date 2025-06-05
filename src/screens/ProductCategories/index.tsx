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
import { Table } from "./Table";
import { AddCategoryModal } from "./AddCategory/AddCategory";
import { EditCategoryModal } from "./EditCategory/EditCategory";
import { useMainCategories } from "../../hooks/useMainCategories";
import { useProductCategories } from "../../hooks/useProductCategory";
import {
  deleteCategory,
  ProductCategory,
} from "../../services/productCategories";

export const ProductCategories = () => {
  const { data: categories, isLoading } = useProductCategories();
  const { data: mainCategories } = useMainCategories();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>();

  const { mutate: deleteMainCategory, isPending: deleteLoading } = useMutation({
    mutationFn: (id: number | undefined) => deleteCategory(id),
    onSuccess: () => {
      toast.success("تم حذف القسم بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["productCategories"],
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
          <h1>تصنيف المنتجات</h1>
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
          <Table
            data={categories?.results}
            setSelectedCategory={setSelectedCategory}
            openEdit={() => setOpenEditModal(true)}
            openDelete={() => setOpenDeleteModal(true)}
          />
        </div>
      </div>
      <AddCategoryModal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        mainCategories={mainCategories?.results}
      />
      <EditCategoryModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        category={selectedCategory}
        id={selectedCategory?.id}
        mainCategories={mainCategories?.results}
      />
      <DeleteItem
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        confirm={() => {
          deleteMainCategory(selectedCategory?.id);
          setOpenDeleteModal(false);
        }}
        isloading={deleteLoading}
      />
    </AppLayout>
  );
};
