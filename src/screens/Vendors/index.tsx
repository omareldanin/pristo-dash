import { MdAdd } from "react-icons/md";
import { AppLayout } from "../../components/AppLayout";
import classes from "./index.module.scss";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useState } from "react";
import { useVendors } from "../../hooks/useVendors";
import { VendorLayout } from "./Table";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { deleteVendor, Filters } from "../../services/vendors";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../../main";
import { AxiosError } from "axios";
import { APIError } from "../../api/api";
import { DeleteItem } from "../../components/DeleteItem/DeleteItem";
import { useNavigate } from "react-router-dom";

export const Vendors = () => {
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [filter, setfilter] = useState<Filters>({
    page: 1,
    size: 10,
  });
  const { data: vendor, isLoading } = useVendors(filter);
  const [selectedVendor, setSelectedVendor] = useState<number>();

  const { mutateAsync: deletevendor, isPending: deleteLoading } = useMutation({
    mutationFn: (id: number) => deleteVendor(id),
    onSuccess: () => {
      toast.success("تم حذف المطعم بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["vendors"],
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
          <h1>المطاعم</h1>
          <div>
            <button
              className={classes.button + " ml-3 inline-flex"}
              onClick={() => {
                navigate("/vendors/add");
              }}>
              اضافة
              <MdAdd size={20} color="#fff" />
            </button>
          </div>
        </div>
        <div className={classes.content}>
          <VendorLayout
            data={vendor?.results}
            // setSelectedCategory={setSelectedCategory}
            openDelete={() => setOpenDeleteModal(true)}
            setvendor={(id: number) => setSelectedVendor(id)}
          />
          <Stack spacing={1}>
            <Pagination
              count={vendor?.totalPages}
              page={filter?.page}
              shape="rounded"
              style={{ margin: "20px auto 0" }}
              onChange={(e, value) => {
                console.log(e);

                setfilter({
                  ...filter,
                  page: value,
                });
              }}
            />
          </Stack>
        </div>
      </div>

      <DeleteItem
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        confirm={() => {
          deletevendor(selectedVendor || 0);
          setOpenDeleteModal(false);
        }}
        isloading={deleteLoading}
      />
    </AppLayout>
  );
};
