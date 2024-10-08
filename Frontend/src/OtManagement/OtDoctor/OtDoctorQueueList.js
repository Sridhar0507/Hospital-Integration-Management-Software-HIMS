import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch ,useSelector} from "react-redux";

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        columnHeader: {
          backgroundColor: "var(--ProjectColor)",
          textAlign: "Center",
        },
        root: {
          "& .MuiDataGrid-root .MuiDataGrid-columnHeader, .MuiDataGrid-columnHeaderTitleContainer":
            {
              textAlign: "center",
              display: "flex !important",
              justifyContent: "center !important",
            },
          "& .MuiDataGrid-window": {
            overflow: "hidden !important",
          },
        },
        cell: {
          borderTop: "0px !important",
          borderBottom: "1px solid  var(--ProjectColor) !important",
          display: "flex",
          justifyContent: "center",
        },
      },
    },
  },
});

function OtDoctorQueueList() {
  const [columns] = React.useState([
    { field: "id", headerName: "Patient ID", width: 100 },
    {
      field: "Patientphoto",
      headerName: "Patient Photo",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          // src={`data:image/jpg;base64, ${params.value}`}
          alt="Employee"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      ),
    },
    { field: "firstName", headerName: "First Name", width: 120 },
    { field: "Gender", headerName: "Gender", width: 120 },
    { field: "BloodGroup", headerName: "Blood Group", width: 120 },
    { field: "phone", headerName: "Phone No", width: 120 },
    { field: "location", headerName: "Branch Location", width: 150 },
    // { field: "email", headerName: "Email", width: 200 },
    {
      field: "upload ",
      headerName: "Upload",
      width: 120,
      renderCell: (params) => (
        <>
          <Button className="cell_btn" >
          {/* onClick={() => handleList(params)} */}
            <VisibilityIcon />
          </Button>
        </>
      ),
    },
    {
      field: "proceed ",
      headerName: "Proceed",
      width: 120,
      renderCell: (params) => (
        <>
          <Button className="cell_btn" >
          {/* onClick={() => handleEditList(params)} */}
            <EditIcon />
          </Button>
        </>
      ),
    },
  ]);

//   const filteredData1 = userRecord.Patient_id
//   ? PatientData.filter((row) => row.id === userRecord.Patient_id)
//   : PatientData;

const [searchQuery, setSearchQuery] = useState("");
const [searchQuery1, setSearchQuery1] = useState("");
const [filteredRows, setFilteredRows] = useState([]);
const [page, setPage] = useState(0);

const pageSize = 10;
const showdown = filteredRows.length;
const totalPages = Math.ceil(filteredRows.length / 10);

const handlePageChange = (params) => {
  setPage(params.page);
};

// const handleSearchChange = (event) => {
//     const { id, value } = event.target;

//     if (id === "FirstName") {
//       setSearchQuery(value);
//     } else if (id === "PhoneNo") {
//       setSearchQuery1(value);
//     }
//   };

//   useEffect(() => {
//     console.log(PatientData);

//     const filteredData = PatientData.filter((row) => {
//       const lowerCaseSupplierName = row.firstName.toLowerCase();
//       const lowerCasePhoneNo = row.phone.toString();
//       const lowerCaseQuery = searchQuery.toLowerCase();
//       const lowerCaseQuery1 = searchQuery1.toLowerCase();


//       const matchesFirstName = lowerCaseSupplierName.includes(lowerCaseQuery);

   
//       const matchesPhoneNo = lowerCasePhoneNo.includes(lowerCaseQuery1);

//       return (
//         (matchesFirstName || !searchQuery) && (matchesPhoneNo || !searchQuery1)
//       );
//     });

//     setFilteredRows(filteredData);
//     setPage(0); 
//   }, [searchQuery, searchQuery1, PatientData]);

  return (
    <div className="appointment">
      <div className="h_head">
        <h4>OT Doctor Oueue List</h4>
      </div>
      <form>
        <div className="con_1 ">
          <div className="inp_1">
            <label htmlFor="input">
              First Name <span>:</span>
            </label>
            <input
              type="text"
              id="FirstName"
              value={searchQuery}
            //   onChange={handleSearchChange}
              placeholder="Enter the First Name"
            />
          </div>
          <div className="inp_1">
            <label htmlFor="input">
              Phone No <span>:</span>
            </label>
            <input
              type="text"
              id="PhoneNo"
            //   value={searchQuery1}
            // //   onChange={handleSearchChange}
              placeholder="Enter the Phone No"
            />
          </div>
          <button className="btn_1" type="submit">
            <SearchIcon />
          </button>
        </div>
      </form>

      <div className="grid_1">
        <ThemeProvider theme={theme}>
          <div className="grid_1">
            <DataGrid
              rows={filteredRows.slice(page * pageSize, (page + 1) * pageSize)}
              columns={columns}
              pageSize={10}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              onPageChange={handlePageChange}
              hideFooterPagination
              hideFooterSelectedRowCount
              className="data_grid"
            />
            {showdown > 0 && filteredRows.length > 10 && (
              <div className="grid_foot">
                <button
                  onClick={() =>
                    setPage((prevPage) => Math.max(prevPage - 1, 0))
                  }
                  disabled={page === 0}
                >
                  Previous
                </button>
                Page {page + 1} of {totalPages}
                <button
                  onClick={() =>
                    setPage((prevPage) =>
                      Math.min(prevPage + 1, totalPages - 1)
                    )
                  }
                  disabled={page === totalPages - 1}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </ThemeProvider>

        {filteredRows.length !== 0 ? (
          ""
        ) : (
          <div className="IP_norecords">
            <span>No Records Found</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default OtDoctorQueueList;






