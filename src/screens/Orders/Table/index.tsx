import { Dispatch } from "react";
import { Order } from "../../../services/orders";
import { IoLocationSharp } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
// import { CiEdit } from "react-icons/ci";

interface tableData {
  data: Order[] | undefined;
  setOrder: Dispatch<number>;
  openDelete: () => void;
  openEdit: () => void;
}

export const statusStyles = {
  REGISTERED: {
    label: "مسجل",
    bg: "#E0F7FA",
    color: "#00796B",
  },
  RECEIVED: {
    label: "تم الاستلام",
    bg: "#FFF3E0",
    color: "#EF6C00",
  },
  PREPARING: {
    label: "جاري التحضير",
    bg: "#FFFDE7",
    color: "#F9A825",
  },
  FINISHED: {
    label: "جاهز",
    bg: "#E8F5E9",
    color: "#388E3C",
  },
  TACKED: {
    label: "تم التوضيب",
    bg: "#F3E5F5",
    color: "#8E24AA",
  },
  WITH_DELIVERY: {
    label: "مع مندوب التوصيل",
    bg: "#E1F5FE",
    color: "#0288D1",
  },
  COMPLETE: {
    label: "مكتمل",
    bg: "#E0F2F1",
    color: "#004D40",
  },
  CANCELED: {
    label: "ملغي",
    bg: "#FFEBEE",
    color: "#C62828",
  },
  DELETED: {
    label: "محذوف",
    bg: "#ECEFF1",
    color: "#607D8B",
  },
};

export const Table = ({ data, setOrder, openDelete, openEdit }: tableData) => {
  return (
    <div className="table">
      <table>
        <thead>
          <th>#</th>
          <th>الاسم</th>
          <th>رقم الهاتف</th>
          <th>المطعم</th>
          <th>حاله الطلب</th>
          <th>مبلغ الطلب</th>
          <th>سعر التوصيل</th>
          {/* <th>الكميه</th> */}
          <th>طريقه الدفع</th>
          <th>تاريخ الانشاء</th>
          <th>الاعدادات</th>
        </thead>
        <tbody>
          {data?.map((order) => {
            const date = new Date(order.createdAt);
            return (
              <tr>
                <td>{order.id}</td>
                <td>
                  {order.User && order.User.name ? order.User.name : "لا يوجد"}
                </td>
                <td>
                  {" "}
                  {order.User && order.User.phone
                    ? order.User.phone
                    : "لا يوجد"}
                </td>
                <td>{order.Vendor ? order.Vendor?.name?.ar : "لا يوجد"}</td>
                <td>
                  <button
                    onClick={() => {
                      setOrder(order.id);
                      openEdit();
                    }}
                    style={{
                      width: "150px",
                      background:
                        statusStyles[order.status as keyof typeof statusStyles]
                          .bg,
                      color:
                        statusStyles[order.status as keyof typeof statusStyles]
                          .color,
                    }}>
                    {
                      statusStyles[order.status as keyof typeof statusStyles]
                        .label
                    }
                  </button>
                </td>
                <td>{order.total}</td>
                <td>{order.shipping}</td>
                {/* <td>{order.quantity}</td> */}
                <td>
                  {order.paymentMethod === "cash" ? "عند الاستلام" : "محفظه"}
                </td>
                <td>{date.toLocaleString()}</td>
                <td>
                  <div className="controls">
                    <a
                      style={
                        order.UserAddresses
                          ? {}
                          : { opacity: 0.7, cursor: "no-drop" }
                      }
                      href={
                        order.UserAddresses
                          ? `https://www.google.com/maps?q=${order.UserAddresses.latitude},${order.UserAddresses.longitudes}`
                          : "?"
                      }
                      target="_blank"
                      rel="noopener noreferrer">
                      <IoLocationSharp
                        size={30}
                        color="red"
                        cursor={!order.UserAddresses ? "no-drop" : "pointer"}
                      />
                    </a>
                    {/* <CiEdit
                      size={22}
                      color="green"
                      onClick={() => {
                        setOrder(order.id);
                        openEdit();
                      }}
                      cursor={"pointer"}
                    /> */}
                    <GoTrash
                      size={22}
                      color="red"
                      cursor={"pointer"}
                      onClick={() => {
                        setOrder(order.id);
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
