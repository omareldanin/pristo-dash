// import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { Dispatch, SetStateAction } from "react";
import notFound from "../../../assets/notfound.jpg";
import { SubCategory } from "../../../services/subCategories";
interface tableData {
  data: SubCategory[] | undefined;
  setSelectedCategory: Dispatch<SetStateAction<SubCategory | undefined>>;
  openEdit: () => void;
  openDelete: () => void;
}

export const Table = ({
  data,
  setSelectedCategory,
  openEdit,
  openDelete,
}: tableData) => {
  return (
    <div className="table">
      <table>
        <thead>
          <th>#</th>
          <th>الاسم</th>
          <th>القسم الرئيسي</th>
          <th>الاعدادات</th>
        </thead>
        <tbody>
          {data?.map((category) => {
            return (
              <tr>
                <td>{category.id}</td>
                <td className={"tdImage"}>
                  <img
                    src={
                      category.image
                        ? "http://139.59.135.25:3000/" + category.image
                        : notFound
                    }
                  />
                  <span>{category.name?.ar}</span>
                </td>
                <td>
                  <span>{category.mainCategory.name.ar}</span>
                </td>
                {/* <td className={classes.tdImage + " " + classes.otherTdImage}>
                <img src={user} />
                <span>عمر محمد</span>
              </td> */}
                <td>
                  <div className={"controls"}>
                    {/* <FaEye size={20} color="#000" /> */}
                    <CiEdit
                      size={20}
                      color="green"
                      onClick={() => {
                        setSelectedCategory(category);
                        openEdit();
                      }}
                      cursor={"pointer"}
                    />
                    <GoTrash
                      size={20}
                      color="red"
                      cursor={"pointer"}
                      onClick={() => {
                        setSelectedCategory(category);
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
