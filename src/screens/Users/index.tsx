import { AppLayout } from "../../components/AppLayout";
import classes from "./index.module.scss";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useState } from "react";
import { Filters, User } from "../../services/users";
import { useUsers } from "../../hooks/useUsers";
import { Pagination, Stack } from "@mui/material";
import { Table } from "./Table";
import { AddTransaction } from "./AddTransaction/AddTransaction";

export const Users = () => {
  //   const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  //   const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<User>();
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    size: 10,
    role: "CUSTOMER",
  });

  const { data: users, isLoading } = useUsers(filters);

  return (
    <AppLayout>
      {isLoading ? <LoadingSpinner /> : null}
      <div className={classes.categories}>
        <div className={classes.header}>
          <h1>المستخدمين - {users?.count}</h1>
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
            data={users?.results}
            setSelectedDelivery={setSelectedDelivery}
            openEdit={() => setOpenEditModal(true)}
            openDelete={() => {}}
          />

          <AddTransaction
            isOpen={openEditModal}
            onClose={() => setOpenEditModal(false)}
            delivery={selectedDelivery}
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
    </AppLayout>
  );
};
