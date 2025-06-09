import { AppLayout } from "../../components/AppLayout";
import classes from "./index.module.scss";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useState } from "react";
import { deleteOrder, Filters } from "../../services/orders";
import { Pagination, Stack } from "@mui/material";
import { useOrders } from "../../hooks/useOrders";
import { Table } from "./Table";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../../main";
import { AxiosError } from "axios";
import { APIError } from "../../api/api";
import { DeleteItem } from "../../components/DeleteItem/DeleteItem";
import { EditStatus } from "./EditStatus";

export const Orders = () => {
  const [order, setOrder] = useState<number>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditStatusModal, setOpenEditStatusModal] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    page: 1,
    size: 10,
  });

  const { data: orders, isLoading } = useOrders(filters);

  const { mutate: deleteorder, isPending: deleteLoading } = useMutation({
    mutationFn: (id: number | undefined) => deleteOrder(id),
    onSuccess: () => {
      toast.success("تم حذف الطلب بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
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
          <h1>الطلبات - {orders?.count}</h1>
          <div>
            {/* <button
              className={classes.button + " ml-3 inline-flex"}
              onClick={() => setOpenAddModal(true)}>
              اضافة
              <MdAdd size={20} color="#fff" />
            </button> */}
          </div>
        </div>
        <div className={classes.content}>
          <Table
            data={orders?.results}
            setOrder={setOrder}
            openDelete={() => setOpenDeleteModal(true)}
            openEdit={() => setOpenEditStatusModal(true)}
          />
          <Stack spacing={1}>
            <Pagination
              count={orders?.totalPages}
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
          <EditStatus
            id={order}
            isOpen={openEditStatusModal}
            onClose={() => setOpenEditStatusModal(false)}
          />
          <DeleteItem
            isOpen={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            confirm={() => {
              deleteorder(order);
              setOpenDeleteModal(false);
            }}
            isloading={deleteLoading}
          />
        </div>
      </div>
    </AppLayout>
  );
};
