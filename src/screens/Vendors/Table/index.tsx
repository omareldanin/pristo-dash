// import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { updateVendor, Vendor } from "../../../services/vendors";
import { FaStar } from "react-icons/fa6";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../../../main";
import { AxiosError } from "axios";
import { APIError } from "../../../api/api";
import { useNavigate } from "react-router-dom";

interface tableData {
  data: Vendor[] | undefined;
  openDelete: () => void;
  setvendor: (id: number) => void;
}

export const VendorLayout = ({ data, openDelete, setvendor }: tableData) => {
  const navigate = useNavigate();
  const { mutate: updatevendor } = useMutation({
    mutationFn: (data: FormData) => updateVendor(data),
    onSuccess: () => {
      toast.success("تم تعديل المطعم بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["vendors"],
      });
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || "حدث خطأ ما");
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {data?.map((vendor) => {
        return (
          <div className="vendor">
            {vendor.hasOffer && vendor.offerName ? (
              <span className="offername">{vendor.offerName?.ar}</span>
            ) : null}

            <div className="cover">
              <img src={"http://139.59.135.25:3000/" + vendor.cover} />
            </div>
            <div className="content">
              <div className="name-status flex items-center gap-3">
                <h2>{vendor.name.ar}</h2>
                <span
                  style={{
                    backgroundColor: vendor.status === "OPEN" ? "green" : "red",
                  }}>
                  {vendor.status === "OPEN" ? "مفتوح" : "مغلق"}
                </span>
              </div>
              <div className="cost-rate flex  items-center">
                <div className="delivery-cost">
                  <span style={{ fontWeight: "bold" }}>التوصيل : </span>
                  {vendor.hasOffer ? (
                    <>
                      <del
                        style={{
                          color: "gray",
                          marginLeft: "10px",
                          fontSize: "13px",
                        }}>
                        {vendor.deliveryCost} د.ل
                      </del>
                      <span>{vendor.deliveryCost} د.ل</span>
                    </>
                  ) : (
                    <span>{vendor.deliveryCost} د.ل</span>
                  )}
                </div>
                <div className="rate flex items-center">
                  <span style={{ marginLeft: "5px" }}>{vendor.rate}</span>
                  <FaStar color="rgba(219, 161, 2, 1)" />
                </div>
              </div>
              <div className="controls flex">
                <div>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          color="warning"
                          defaultChecked={vendor.active}
                          onChange={(e) => {
                            const fm = new FormData();
                            fm.append("id", vendor.id + "");
                            fm.append("active", e.target.checked + "");
                            updatevendor(fm);
                          }}
                        />
                      }
                      label="تفعيل"
                    />
                  </FormGroup>
                </div>
                <div className="flex items-center">
                  <CiEdit
                    size={20}
                    color="green"
                    onClick={() => {
                      navigate("/vendors/edit/" + vendor.id);
                    }}
                    cursor={"pointer"}
                  />
                  <GoTrash
                    size={20}
                    color="red"
                    cursor={"pointer"}
                    onClick={() => {
                      openDelete();
                      setvendor(vendor.id);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
