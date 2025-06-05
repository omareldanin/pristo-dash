import classes from "./index.module.scss";
import user from "../../assets/team3.jpg";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";

export const Table = () => {
  return (
    <div className={classes.table}>
      <table>
        <thead>
          <th>الاسم</th>
          <th>الجوال</th>
          <th>الجنسيه</th>
          <th>الصلاحيه</th>
          <th>العدادات</th>
        </thead>
        <tbody>
          <tr>
            <td className={classes.tdImage}>
              <img src={user} />
              <span>عمر محمد</span>
            </td>
            <td>
              <span>عمر محمد</span>
            </td>
            <td className={classes.tdImage + " " + classes.otherTdImage}>
              <img src={user} />
              <span>عمر محمد</span>
            </td>
            <td>
              <span>عمر محمد</span>
            </td>
            <td>
              <div className={classes.controls}>
                <FaEye size={20} color="#000" />
                <CiEdit size={20} color="green" />
                <GoTrash size={20} color="red" />
              </div>
            </td>
          </tr>
          <tr>
            <td className={classes.tdImage}>
              <img src={user} />
              <span>عمر محمد</span>
            </td>
            <td>
              <span>عمر محمد</span>
            </td>
            <td className={classes.tdImage + " " + classes.otherTdImage}>
              <img src={user} />
              <span>عمر محمد</span>
            </td>
            <td>
              <span>عمر محمد</span>
            </td>
            <td>
              <div className={classes.controls}>
                <FaEye size={20} color="#000" />
                <CiEdit size={20} color="green" />
                <GoTrash size={20} color="red" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
