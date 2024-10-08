
import * as React from "react";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LoupeIcon from "@mui/icons-material/Loupe";
import axios from "axios";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from "../../OtherComponent/ReactGrid/ReactGrid";


const IPPharmacyBillingList = () => {
  const dispatchvalue = useDispatch();
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [Prescription_Patient_list, setPrescription_Patient_list] = useState(
    []
  );

  const [filteredRows, setFilteredRows] = useState([]);


  const handleRequestEdit = (params) => {
    console.log(
      "============================================",
      params.row
    );

    dispatchvalue({
      type: "Selected_Patient_Pharmacy",
      value: { PatientID: params.row.PatientId, VisitID: params.row.Booking_Id, Patient_Name: params.row.PatientName, type: 'IP', Priscription_Barcode: params.row.Priscription_Barcode },
    });
    navigate("/Home/OPPharmachyBilling");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    axios
      .get(
        `${UrlLink}DrugAdminstrations/inhouse_pharmacy_queue_list_prescrib`)
      .then((response) => {
        console.log(response.data);
        const Datas = response.data

        setPrescription_Patient_list(Datas);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error, e.g., show an error message to the user
      });
  }, [userRecord, UrlLink]);

  console.log(Prescription_Patient_list);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData = Array.isArray(Prescription_Patient_list) && Prescription_Patient_list?.filter((row) => {
      const lowerCaseSupplierName = row.Patient_Name
        ? row.Patient_Name.toLowerCase()
        : "";

      return lowerCaseSupplierName.includes(lowerCaseQuery);
    });

    setFilteredRows(filteredData);
  }, [searchQuery, Prescription_Patient_list]);

  const handlePharmacybilling = () => {
    navigate("/Home/OPPharmachyWalkinBilling");
  };

  const UserRegisterColumns = [
    {
      key: "id",
      name: "S No",
      filter: true,
      frozen: true,
    },
    {
      key: "PatientName",
      name: "Patient Name",
      filter: true,
      frozen: true,
    },
    {
      key: "PatientPhoneNo",
      name: "Contact Number",
      frozen: true,
    },
    {
      key: "DoctorName",
      name: "Doctor Name",
      frozen: true,
    },
    {
      key: "UserAction",
      name: "User Action",
      renderCell: (params) => (
        <Button
          className="cell_btn"
          onClick={() => handleRequestEdit(params)}
        >
          <ArrowForwardIcon className="check_box_clrr_cancell" />
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="Main_container_app">
        <h3>IP Pharmacy Billing List</h3>
        <br />
        <div className="search_div_bar ">
          <div className="search_div_bar_inp_1">
            <label htmlFor="input">
              Patient Name <span>:</span>
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Enter the Patient Name"
            />
          </div>
          <button className="search_div_bar_btn_1" type="submit">
            <SearchIcon />
          </button>
       {/*    <button
            type="submit"
            onClick={() => handlePharmacybilling()}
            title="Manual Billing"
            className="search_div_bar_btn_1"
          >
            <LoupeIcon />
          </button> */}
        </div>
        <ReactGrid
          columns={UserRegisterColumns}
          RowData={filteredRows}
        />
      </div>
    </>
  );
};
export default IPPharmacyBillingList;








