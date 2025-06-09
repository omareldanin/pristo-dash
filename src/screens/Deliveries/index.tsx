import { MdAdd } from "react-icons/md";
import { AppLayout } from "../../components/AppLayout";
import classes from "./index.module.scss";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../../main";
import { AxiosError } from "axios";
import { APIError } from "../../api/api";
import { deleteUser, Filters, User } from "../../services/users";
import { useUsers } from "../../hooks/useUsers";
import { Table } from "./Table";
import { Pagination, Stack } from "@mui/material";
import { DeleteItem } from "../../components/DeleteItem/DeleteItem";
import { AddDelivery } from "./AddDelivery/AddDelivery";
import { EditDelivery } from "./EditDelivery/EditDelivery";

export const Deliveries = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<User>();
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    size: 10,
    role: "DELIVERY",
  });

  const { data: users, isLoading } = useUsers(filters);

  const { mutate: deleteDelivery, isPending: deleteLoading } = useMutation({
    mutationFn: (id: number | undefined) => deleteUser(id),
    onSuccess: () => {
      toast.success("تم حذف الديلفرى بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["deliveries"],
      });
      setOpenDeleteModal(false);
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || "حدث خطأ ما");
    },
  });

  return (
    <AppLayout>
      {isLoading ? <LoadingSpinner /> : null}
      <div className={classes.categories}>
        <div className={classes.header}>
          <h1>الديلفرى</h1>
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
            data={users?.results}
            setSelectedDelivery={setSelectedDelivery}
            openEdit={() => setOpenEditModal(true)}
            openDelete={() => setOpenDeleteModal(true)}
          />
          <Stack spacing={1}>
            <Pagination
              count={users?.totalPages}
              page={filters?.page}
              shape="rounded"
              style={{ margin: "20px auto 0" }}
              onChange={(e, value) => {
                console.log(e);

                setFilters({
                  ...filters,
                  page: value,
                });
              }}
            />
          </Stack>
        </div>
      </div>

      <EditDelivery
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        delivery={selectedDelivery}
      />

      <AddDelivery
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />
      <DeleteItem
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        confirm={() => {
          deleteDelivery(selectedDelivery?.id);
          setOpenDeleteModal(false);
        }}
        isloading={deleteLoading}
      />
    </AppLayout>
  );
};
