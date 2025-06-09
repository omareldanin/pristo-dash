// import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { Dispatch, SetStateAction } from "react";
import notFound from "../../../assets/notfound.jpg";
import { User } from "../../../services/users";

interface tableData {
  data: User[] | undefined;
  setSelectedDelivery: Dispatch<SetStateAction<User | undefined>>;
  openEdit: () => void;
  openDelete: () => void;
}

export const Table = ({
  data,
  setSelectedDelivery,
  openEdit,
  openDelete,
}: tableData) => {
  return (
    <div className="table">
      <table>
        <thead>
          <th>#</th>
          <th>الاسم</th>
          <th>رقم الهاتف</th>
          <th>الحاله</th>
          <th>الاعدادات</th>
        </thead>
        <tbody>
          {data?.map((delivery) => {
            return (
              <tr>
                <td>{delivery.id}</td>
                <td className={"tdImage"}>
                  <img
                    src={
                      delivery.avatar &&
                      !delivery.avatar.includes("null") &&
                      !delivery.avatar.includes("undefined")
                        ? "http://139.59.135.25:3000/" + delivery.avatar
                        : notFound
                    }
                  />
                  <span>{delivery.name}</span>
                </td>
                <td>
                  <span>{delivery.phone}</span>
                </td>
                {/* <td className={classes.tdImage + " " + classes.otherTdImage}>
                <img src={user} />
                <span>عمر محمد</span>
              </td> */}
                <td>
                  <span>{delivery.delivery.online ? "متاح" : "غير متاح"}</span>
                </td>
                <td>
                  <div className={"controls"}>
                    {/* <FaEye size={20} color="#000" /> */}
                    <CiEdit
                      size={20}
                      color="green"
                      onClick={() => {
                        setSelectedDelivery(delivery);
                        openEdit();
                      }}
                      cursor={"pointer"}
                    />
                    <GoTrash
                      size={20}
                      color="red"
                      cursor={"pointer"}
                      onClick={() => {
                        setSelectedDelivery(delivery);
                        openDelete();
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
