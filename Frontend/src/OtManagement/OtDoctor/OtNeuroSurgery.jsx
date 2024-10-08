import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// import ToastAlert from "../OtherComponent/ToastContainer/ToastAlert";

function OtNeuroSurgery() {
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const toast = useSelector((state) => state.userRecord?.toast);
  const dispatchvalue = useDispatch();
  
  const IpNurseQueSelectedRow = {
    Booking_Id: "1001A", // Replace with actual data or initialize as needed
    PatientId: "1",
    PatientName: "diya",
  };

  const [OtSheet, setOtSheet] = useState({
    SurgeryName: "",
    OperationNotes: "",
    PostOfInstructions: "",
  });

  const [OtSheetGet, setOtSheetGet] = useState(false);

  const handleOtChange = (e) => {
    const { name, value } = e.target;
    setOtSheet((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitOt = () => {
    const requiredFields = [
      "SurgeryName",
      "OperationNotes",
      "PostOfInstructions",
    ];

    const missingFields = requiredFields.filter((field) => !OtSheet[field]);
    if (missingFields.length > 0) {
      alert(`Please fill empty fields: ${missingFields.join(", ")}`);
    } else {
      const Allsenddata = {
        ...OtSheet,
        PatientId: IpNurseQueSelectedRow?.PatientId,
        Booking_Id: IpNurseQueSelectedRow?.Booking_Id,
        PatientName: IpNurseQueSelectedRow?.PatientName,
        Location: userRecord?.location || "chennai",
        CreatedBy: userRecord?.username || "admin",
      };

      axios
        .post(`${UrlLink}Ot/Mlc_Details_Link`, Allsenddata)
        .then((res) => {
          const resData = res.data;
          const type = Object.keys(resData)[0];
          const message = Object.values(resData)[0];
          const toastData = {
            message: message,
            type: type,
          };

          dispatchvalue({ type: "toast", value: toastData });
          setOtSheetGet(true); // Refresh data after submission
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (IpNurseQueSelectedRow?.Booking_Id) {
      axios
        .get(
          `http://127.0.0.1:8000/Ot/Mlc_Details_Link?Booking_Id=${IpNurseQueSelectedRow.Booking_Id}`
        )
        .then((response) => {
          const data = response.data[0]; // Assuming it returns an array with a single object
          console.log("Fetched OtSheetdata:", data);

          setOtSheet({
            SurgeryName: data?.SurgeryName || "",
            OperationNotes: data?.OperationNotes || "",
            PostOfInstructions: data?.PostOfInstructions || "",
          });

          console.log("Fetched data:", data);
        })
        .catch((error) => {
          console.log("Error fetching data:", error);
        })
        .finally(() => {
          setOtSheetGet(false); // Reset the state to prevent unnecessary re-fetch
        });
    }
  }, [IpNurseQueSelectedRow?.Booking_Id, OtSheetGet]);

  return (
    <>
   
      <div className="Main_container_app" >
       
      <div className="common_center_tag">
          <h3>Dr Shree Vijay Phadke - Ot</h3>
        </div>
        <br />

            
        <div className="ewdfhyewuf65">
            <div className="OtMangementForm_1 djkwked675">
              <label htmlFor="SurgeryName">
              Surgery Name <span>:</span>
              </label>
              <textarea
                style={{ width: "305px", height: "40px" }}
                id="SurgeryName"
                name="SurgeryName"
                value={OtSheet.SurgeryName}
                onChange={handleOtChange}
                required
              />
            </div>

            <div className="Otdoctor_intra_Con_2 with_increse_85">
              <label htmlFor="OperationNotes">
                Operation Notes<span>:</span>
              </label>
              <textarea
             

                id="OperationNotes"
                name="OperationNotes"
                value={OtSheet.OperationNotes}
                onChange={handleOtChange}
                required
              />
            </div>
            <div className="OtMangementForm_1 djkwked675">
              <label htmlFor="PostOfInstructions">
              Post Op Instructions <span>:</span>
              </label>
              <textarea
                style={{ width: "305px", height: "40px" }}
                id="PostOfInstructions"
                name="PostOfInstructions"
                value={OtSheet.PostOfInstructions}
                onChange={handleOtChange}
                required
              />
            </div>
            </div>
            <br />
            <div className="Register_btn_con">
          <button className="RegisterForm_1_btns" onClick={handleSubmitOt}>
            Submit
          </button>
        </div>
        {/* <ToastAlert Message={toast.message} Type={toast.type} /> */}
        </div>
    </>
  );
}

export default OtNeuroSurgery;


