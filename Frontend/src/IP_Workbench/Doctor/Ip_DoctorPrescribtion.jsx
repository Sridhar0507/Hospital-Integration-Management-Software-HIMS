import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { DataGrid } from "@mui/x-data-grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import "../IPNurseflow/IpNurseVitals.css";
import { ToastContainer, toast } from "react-toastify";
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import { format, longFormatters } from "date-fns";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";


import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';


function CancelDrugDialog({ open, onClose, onConfirm, cancelsenddata, setcancelsenddata }) {

  console.log(open,'ppiup');
  
    const handleConfirm = () => {
      // Call the onConfirm callback with the cancellation reason
      onConfirm(cancelsenddata);
      // Close the dialog
      onClose();
  
    };
  
    const handleClose = () => {
      setcancelsenddata(null)
      onClose();
    }
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Drug Stop Reason</DialogTitle>
        <DialogContent>
          <TextField
            label="Drug Stop Reason"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={cancelsenddata?.Reason}
            onChange={(e) => setcancelsenddata((prev)=>({
              ...prev,
              Reason:e.target.value
            }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  

const Prescription = () => {
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const IP_DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.IP_DoctorWorkbenchNavigation);
  console.log(IP_DoctorWorkbenchNavigation,'IP_DoctorWorkbenchNavigation');
  const [GenericName, setgenericName] = useState([]);
  const [getdataa, setgetdataa] = useState(false);
  const [ItemName, setItemName] = useState([]);
  const [Speciality, setSpeciality] = useState([]);
  const [DoctorData, setDoctorData] = useState([]);
  const [ isEdit, setisEdit] = useState(false);
  const [cancelsenddata,setcancelsenddata]=useState(null)
  const [OpenDialog,setOpenDialog]=useState(false)
  const [editid , seteditid] = useState('');
  const [priscriptionid, setpriscriptionid] = useState()
  const IpNurseQueSelectedRow = useSelector(
    (state) => state.InPatients?.IpNurseQueSelectedRow
  );
  const [lastprescribed, setlastprescribed] = useState([])
  const [page, setPage] = useState(0);
  const [page1, setPage1] = useState(0);
  const pageSize = 10;
  const [summa, setsumma] = useState([]);
  const [summa1, setsumma1] = useState(null);
  const showdown = summa.length;
  const showdown1 = summa1?.medicinedata.length || 0;
  const totalPages = Math.ceil(summa.length / 10);
  const totalPages1 = Math.ceil(summa1?.medicinedata.length / 10);
  const handlePageChange = (params) => {
    if (type === "Intake") {
      setPage(params.page);
    } else {
      setPage1(params.page);
    }
  };
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  const [type, setType] = useState("Intake");
  const [AddPriscribtion, setAddPriscribtion] = useState({
    Department: "",
    DoctorName: "",
    GenericName: "",
    MedicineCode: "",
    MedicineName: "",
    Dosage: "",
    Route: "",
    FrequencyMethod: "Regular",
    FrequencyName: "",
    FrequencyType: "",
    Frequency: "",
    FrequencyTime: "", 
    DurationType: "days",
    AdminisDose: "",
    Quantity: "",
    Date: "",
    Time: "",
    Instruction: "",
    Specialization:"",
    Onbehalf: "No",
    Prescribedby: "",
    RouteSites:"",
    IvSite:""
  });

  console.log(AddPriscribtion)
  useEffect(() => {
    axios
      .get(
        `${UrlLink}Masters/getgenericname`
      )
      .then((response) => {
        console.log(response.data);
        // Process the response data as needed
        setgenericName(response.data);
      })
      .catch((error) => {
        console.error("Error fetching generic names:", error);
        // Handle the error, e.g., show an error message to the user
      });
  }, [userRecord?.location]);
  useEffect(() => {
    const selectedGenericName = AddPriscribtion.GenericName;

    if (selectedGenericName) {
      axios
        .get(
          `${UrlLink}Masters/getitemname_bygenericname?genericName=${selectedGenericName}&location=${userRecord?.location}`
        )
        .then((response) => {
          console.log(response.data);
          setItemName(response.data);
          if(!response.data.length>0){
            setAddPriscribtion((prev) => ({
              ...prev,
              MedicineName: '',
              MedicineCode: '',
              Dosage:'',
              Route:'',
            }));
          }
        })
        .catch((error) => {
          console.error("Error fetching item names:", error);
        });
    }
    // setItemName([])
    // setAddPriscribtion((prev) => ({
    //   ...prev,
    //   MedicineName: '',
    //   MedicineCode: '',
    //   Dosage:'',
    //   Route:'',
    // }));
  }, [AddPriscribtion.GenericName, userRecord?.location]);

  const [selectedTimes, setSelectedTimes] = useState([]);

  useEffect(() => {
    if (AddPriscribtion.FrequencyName) {
      const frequencytypeval = selectedTimes.find(
        (p) => p.id === Number(AddPriscribtion.FrequencyName)
      );
     console.log('frequencytypeval',frequencytypeval);
     
      setAddPriscribtion((prev) => ({
        ...prev,
        FrequencyTime: frequencytypeval?.FrequencyTime,
        Frequency: frequencytypeval?.Frequency,
        FrequencyType: frequencytypeval?.FrequencyType
      }));
    }
  }, [AddPriscribtion.FrequencyName, selectedTimes]);
  const [getdatastate, setgetdatastate] = useState(false);


  const handleCancelAppointment = () => {
    const requiredfields=[...Object.keys(cancelsenddata)]
    const existing = requiredfields.filter((field)=> !cancelsenddata[field])

    if(existing.length>0){
      alert(`Please fill the Required Fields for ${existing.join(',')}`)
    }else{
    const confirmation = window.confirm('Are you sure you want to Stop the Drug ?.');
    console.log(confirmation);

    if (confirmation) {
      axios.post(`${UrlLink}ipregistration/cancel_drug_administration`,cancelsenddata)
      .then((response)=>{
        console.log(response.data);
        setgetdataa(!getdataa);
      })
      .catch((error)=>{
        console.log(error);
      })
      setOpenDialog(false)
      setcancelsenddata(null)
    } else {
      setOpenDialog(false)
      setcancelsenddata(null)
    }
  }
  };

  const handlestopDrug = (params) => {
   
    const senddata={
      Booking_Id:IpNurseQueSelectedRow?.Booking_Id,
      Prescibtion_Id:params?.Prescibtion_Id,
      Reason:'',
      Stopped_date: format(new Date() , 'yyyy-MM-dd'),
      Stopped_time:format(new Date(), "HH:mm:ss"),
      CapturedBy:userRecord?.username
    }

    setcancelsenddata(senddata)
    setOpenDialog(true);
    console.log('---------',senddata)
  };


  const warnmessage = (warnmsg) => {
    toast.warn(`${warnmsg}`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      style: { marginTop: "50px" },
    });
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === "checkbox") {
      setAddPriscribtion((prev) => ({
        ...prev,
        [name]: checked ? "Yes" : "", // Set value to "yes" if checked, otherwise empty string
      }));
    } else {
      console.log(name, value);
  
      if (name === "MedicineName") {
        const detail = ItemName?.find((p) => p.ItemCode === value);
        console.log(detail, '000000000000');
        if (detail) {
          setAddPriscribtion((prev) => ({
            ...prev,
            [name]: detail?.ItemName,
            MedicineCode: detail?.ItemCode,
            Dosage: detail?.Dose,
            Route: detail?.Pack_type,
          }));
        } else {
          setAddPriscribtion((prev) => ({
            ...prev,
            [name]: detail?.ItemName,
            MedicineCode: '',
            Dosage: '',
            Route: '',
          }));
        }
      } else if (name === 'Department') {
        setAddPriscribtion((prev) => ({
          ...prev,
          [name]: value,
          DoctorName: value === 'Primary' ? IpNurseQueSelectedRow?.PrimaryDoctor : '',
        }));
      } else if (name === 'Onbehalf') {
        setAddPriscribtion((prev) => ({
          ...prev,
          [name]: value === 'Yes' ? 'Yes' : 'No', // Set value to "yes" if checked, otherwise empty string
        }));
      } else {
        setAddPriscribtion((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };
  
  useEffect(() => {
    if (
      AddPriscribtion?.Frequency &&
      AddPriscribtion?.Duration &&
      AddPriscribtion?.DurationType
    ) {
      // Split the Frequency string into an array
      const frequency = AddPriscribtion?.Frequency.split("-");
      // Calculate the sum of frequencies
      const sum = frequency.reduce((acc, val) => acc + parseInt(val), 0);

      let durationdata = 0;
      // Adjust durationdata based on the DurationType
      if (AddPriscribtion?.DurationType === "Weeks") {
        durationdata = sum * 7;
      } else if (AddPriscribtion?.DurationType === "Months") {
        durationdata = sum * 30;
      } else {
        durationdata = sum * 1;
      }
      console.log("durationdata", durationdata);

      let quantityData = 0;

      if (AddPriscribtion?.Route === "Syrup") {
        const dattt = durationdata * AddPriscribtion?.Duration;
        console.log("dattt", dattt);
        const rrrr = dattt * AddPriscribtion?.AdminisDose;
        let qnt = 0;
        const dosageSplit = AddPriscribtion?.Dosage.split(" ");
        const dosageValue = parseFloat(dosageSplit[0]);
        const dosageUnit = dosageSplit[1];
        if (dosageUnit === "ml") {
          if (rrrr > dosageValue) {
            qnt = rrrr / dosageValue;
          } else {
            qnt = 1;
          }
        } else if (dosageUnit === "l") {
          qnt = dosageValue * 1000; // Convert liters to milliliters
          if (rrrr > dosageValue * 1000) {
            qnt = rrrr / (dosageValue * 1000);
          } else {
            qnt = 1;
          }
        }

        console.log("qnt", qnt);
        console.log("rrrr", rrrr);
        quantityData = Math.ceil(qnt);
      } else {
        // Calculate Quantity based on durationdata and Duration
        quantityData = durationdata * AddPriscribtion.Duration;
      }

      console.log("Route", AddPriscribtion.Route);

      // Update the state with the new Quantity value
      setAddPriscribtion((prev) => ({
        ...prev,
        Quantity: quantityData,
      }));
    }
  }, [
    AddPriscribtion?.Frequency,
    AddPriscribtion?.Duration,
    AddPriscribtion?.DurationType,
    AddPriscribtion?.AdminisDose,
    AddPriscribtion?.Route,
    AddPriscribtion?.Dosage,
    AddPriscribtion?.FrequencyMethod,
    AddPriscribtion?.FrequencyType
  ]);

  const handlecleardata = () => {
    setAddPriscribtion((prev) => ({
      ...prev,
      Department: "",
      DoctorName: "",
      GenericName: "",
      MedicineCode: "",
      MedicineName: "",
      Dosage: "",
      Route: "",
      FrequencyMethod: "Regular",
      FrequencyName:"",
      FrequencyType: "",
      Frequency: "",
      FrequencyTime: "",
      Duration: "",
      DurationType: "days",
      AdminisDose: "",
      Quantity: "",
      Instruction: "",
      Prescribedby: "",
      Specialization:"",
      Onbehalf: "No",
      RouteSites:"",
      IvSite:""
    }));
  };
  useEffect(() => {
    axios
      .get(`${UrlLink}Masters/insert_frequency_masters`)
      .then((response) => {
        const data = response.data.map((p, index) => ({
          ...p,
          id: p.Frequency_Id,
        }));
        setSelectedTimes(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(()=>{
    axios.get(`${UrlLink}DrugAdminstrations/get_prescription_master_code`)
    .then((response)=>{
      console.log(response)
      const data = response.data.nextInvoiceCode
      setpriscriptionid(data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[]);

  useEffect(() => {
    axios
      .get(
        `${UrlLink}DrugAdminstrations/get_for_ip_durgs_doctor_show?Booking_id=${IP_DoctorWorkbenchNavigation?.RegistrationId}`
      )
      .then((response) => {
        const data = response.data;

        console.log("data", data);
        // Function to convert time to AM/PM format
        // Function to convert time to AM/PM format
        const convertToAMPM = (time) => {
          const numTime = parseInt(time);
          return numTime >= 1 && numTime <= 11
            ? numTime + " AM"
            : numTime === 12
            ? "12 PM"
            : numTime - 12 + " PM";
        };

        // Extract unique times from FrequencyTime arrays and convert them to AM/PM format
        const freqdata = [
          ...new Set(
            data.flatMap((p) =>
              p.FrequencyIssued.flatMap((r) => r.FrequencyIssued)
            )
          ),
        ]
          .map((time) => convertToAMPM(time))
          .sort((a, b) => {
            // Extract AM/PM and numerical value from time string
            const [aNum, aPeriod] = a.split(" ");
            const [bNum, bPeriod] = b.split(" ");

            // Compare periods (AM comes before PM)
            if (aPeriod !== bPeriod) {
              return aPeriod.localeCompare(bPeriod);
            }

            // If periods are the same, sort numerically
            return parseInt(aNum) - parseInt(bNum);
          });

        console.log("freqdata", freqdata);

        setsumma1({
          frequencyTime: freqdata,
          medicinedata: data.map((p, indx) => ({ ...p, id: indx + 1 })),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [IpNurseQueSelectedRow?.Booking_Id, type]);
  useEffect(() => {
    const now = new Date();
    const formattedTime = format(now, "HH:mm:ss");
    const newdate = format(new Date(), "yyyy-MM-dd");
    setAddPriscribtion((prev) => ({
      ...prev,
      Time: formattedTime,
      Date: newdate,
    }));
  }, []);

  const handleChange = (event) => {
    setType(event.target.value);
  };
  const formatLabel = (label) => {
    // Check if the label contains both uppercase and lowercase letters, and doesn't contain numbers
    if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
      return label
        .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between lowercase and uppercase letters
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
    } else {
      return label;
    }
  };

    const handleChangeedit = (params) =>{
          console.log('params/.............................', params)
         const data = summa.find((p)=>p.id === params.id)
          setAddPriscribtion ({
            ...data
          })
          setisEdit(true)
          seteditid(params.id)
    };

    const handleChangeadd = (params) =>{
      console.log('params/.............................', params)
     const data = lastprescribed.find((p)=>p.id === params.id)
      setAddPriscribtion ({
        ...data,
        DurationType : 'days'

      })
      // setisEdit()
      seteditid(params.id)
};


    const handleupdate = () => {
      let requiredfields = [];
      if (AddPriscribtion.FrequencyMethod === "Regular") {
        requiredfields = [...Object.keys(AddPriscribtion)].filter(
          (key) => key !== "Instruction"
        );
      } else {
        requiredfields = [...Object.keys(AddPriscribtion)].filter(
          (key) =>
            ![
              "Instruction",
              "FrequencyType",
              "Frequency",
              "FrequencyTime",
              "Duration",
              "DurationType",
            ].includes(key)
        );
      }
    
      const exist = requiredfields.filter((field) => !AddPriscribtion[field]);
    
      if (exist.length > 0) {
        warnmessage(`The following fields are required: ${exist.join(", ")}`);
      } else {
        const index = summa.findIndex((row) => row.id === editid);
        if (index !== -1) {
          const updatedRow = {
            ...summa[index],
            ...AddPriscribtion,
          };
          const data = [...summa];
          data[index] = updatedRow;
          setsumma(data);
          handlecleardata();
          setisEdit(false)
        } else {
          console.error("Row with id", editid, "not found.");
        }
      }
    };

    const lastprescrib = [
      {
        field: "id",
        headerName: "S_No",
        width: 40,
      },
      ...(lastprescribed && lastprescribed.length > 0 ? Object.keys(lastprescribed[0]).filter((p)=>p!=='id').map((labelname, index) => {
        const formattedLabel = formatLabel(labelname);
        const labelWidth = getTextWidth(formattedLabel);
    
        return {
          field: labelname,
          headerName: formattedLabel,
          width: ["Instruction", "Date", "Time"].includes(labelname) ? labelWidth + 100 : labelWidth + 30,
          valueGetter: (params) => {
            const value = params.row[labelname];
            return value ? value : "-";
          },
        };
      }) : []),
      {
        field: "Action",
        headerName: "Add",
        width: 120,
        renderCell: (params) => (
          <>
            <Button className="cell_btn" onClick={() => handleChangeadd(params.row)}>
              <AddIcon className="check_box_clrr_add"/>
            </Button>
          </>
        ),
      },
      {
        field: "Actions", // corrected the field name to match the header name
        headerName: "Stop",
        width: 120,
        renderCell: (params) => (
          <>{ params.row.Status === 'Stopped'? 'Stopped':
            <Button className="cell_btn" 
            onClick={() => handlestopDrug(params.row)}>
              <BlockIcon  className="check_box_clrr_5"/> {/* corrected the icon to StopIcon */}
            </Button>}
          </>
        ),
      },
    ];
    
  function getTextWidth(text) {
    // Create a dummy element to measure text width
    const dummyElement = document.createElement("span");
    dummyElement.textContent = text;
    dummyElement.style.visibility = "hidden";
    dummyElement.style.whiteSpace = "nowrap";
    document.body.appendChild(dummyElement);

    // Get the width of the text
    const width = dummyElement.offsetWidth;

    // Remove the dummy element
    document.body.removeChild(dummyElement);

    return width;
  }
  const dynamicColumns = [
    {
      key: "id",
      name: "S_No",

    },
    ...Object.keys(AddPriscribtion).map((labelname, index) => {
      const formattedLabel = formatLabel(labelname);
      const labelWidth = getTextWidth(formattedLabel);
  
      return {
        key: labelname,
        name: formattedLabel,
        
      };
    }),
    {
      key: "Action",
      name: "Edit",
      renderCell: (params) => (
        <>
          <Button className="cell_btn" onClick={() => handleChangeedit(params.row)}>
            <EditIcon />
          </Button>
        </>
      ),
    },
  ];
  const dynamicColumns1 = () => {
    // Define static fields
    const staticFields = [
      { key: "id", name: "S_No" },
      { key: "PrescribedDate", name: "Prescribed Date" },
      { key: "IssuedDate", name: "Issued Date" },
      { key: "Department", name: "Department" },
      { key: "DoctorName", name: "Doctor Name" },
      { key: "MedicineName", name: "Medicine Name" },
      { key: "FrequencyMethod", name: "Frequency Method" }
    ];
  
    // Check if summa1 and summa1?.frequencyTime are valid
    let dynamicFields = [];
    if (summa1 && Array.isArray(summa1?.frequencyTime)) {
      dynamicFields = summa1.frequencyTime.map(labelname => {
        const formattedLabel = formatLabel(labelname);
        return {
          key: labelname,
          name: formattedLabel,
          renderCell: (params) => {
            if (![
              "PrescribedDate",
              "IssuedDate",
              "Department",
              "DoctorName",
              "MedicineName",
              "FrequencyMethod",
            ].includes(labelname.split(" ")[0])) {
              const newwtime = labelname.split(" ");
              let ttt = 0;
              if (newwtime[1] === "PM") {
                ttt = +newwtime[0] + 12;
              } else {
                ttt = +newwtime[0];
              }
              const med = params.row;
              if (med.FrequencyIssued) {
                const statusMap = {
                  "Pending": "check_box_clrr_1",
                  "Issued": "check_box_clrr_1",
                  "Before": "check_box_clrr_2",
                  "Delay": "check_box_clrr_3",
                  "NotIssued": "check_box_clrr_4",
                  "Stopped": "check_box_clrr_5"
                };
  
                const statuses = {
                  "Pending": med.FrequencyIssued.some(f => f.Status === "Pending" && +f.FrequencyIssued === +ttt),
                  "Issued": med.FrequencyIssued.some(f => f.Status === "Issued" && +f.FrequencyIssued === +ttt),
                  "Before": med.FrequencyIssued.some(f => f.Status === "Before" && +f.FrequencyIssued === +ttt),
                  "Delay": med.FrequencyIssued.some(f => f.Status === "Delay" && +f.FrequencyIssued === +ttt),
                  "NotIssued": med.FrequencyIssued.some(f => f.Status === "NotIssued" && +f.FrequencyIssued === +ttt),
                };
  
                const showdata = med.FrequencyIssued.filter(rr => +rr.FrequencyIssued === +ttt)
                  .map(p => ({
                    IssuedBy: p.CapturedBy,
                    IssuedDate: p.Completed_Date,
                    IssuedTime: p.Completed_Time,
                    Remarks: p.Completed_Remarks,
                  }));
                const dataone = showdata[0];
  
                for (const [status, className] of Object.entries(statusMap)) {
                  if (statuses[status]) {
                    return (
                      <Tooltip
                        title={
                          <div>
                            {Object.keys(dataone).map((field, indx) => (
                              <h4
                                key={indx}
                                style={{
                                  padding: "3px",
                                  display: "block",
                                  fontSize: "11px",
                                }}
                              >
                                {field === 'IssuedBy' ? 'Stopped By'
                                  : field === 'IssuedDate' ? 'Stopped Date'
                                  : field === 'IssuedTime' ? 'Stopped Time'
                                  : formatLabel(field)} <span>:</span>{" "}
                                {dataone[field]}
                              </h4>
                            ))}
                          </div>
                        }
                      >
                        <span className={className}>{status}</span>
                      </Tooltip>
                    );
                  }
                }
                return "-";
              } else {
                return "-";
              }
            } else {
              return params.value;
            }
          },
        };
      });
    }
  
    // // Define action field
    // const actionField = {
    //   // key: "Action",
    //   // name: "Action",
    //   // renderCell: (params) => (
    //   //   <Button className="cell_btn" onClick={() => handlestopDrug(params.row)}>
    //   //     <CancelIcon className="check_box_clrr_cancell" />
    //   //   </Button>
    //   // ),
    // };
  
    return [...staticFields, ...dynamicFields];
  };
  
  useEffect(()=>{
    axios.get(`${UrlLink}ipregistration/get_last_prescribed_madicine_by_doc`)
    .then((response)=>{
      console.log(response)
      const data = response.data.map((p, index)=>({
        ...p,
        id : index + 1
      }))
      console.log(data)
      setlastprescribed(data)
      // setPrescriptionData(data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])

  const handlesubmitdata = () => {
    let requiredfields = [];
    if (AddPriscribtion.FrequencyMethod === "Regular") {
      requiredfields = [...Object.keys(AddPriscribtion)].filter(
        (key) => key !== "Instruction" && key !=="Prescribedby" && key !== 'Onbehalf' && key !=="IvSite"
      );
    } else {
      requiredfields = [...Object.keys(AddPriscribtion)].filter(
        (key) =>
          ![
            "Instruction",
            "FrequencyType",
            "Frequency",
            "FrequencyTime",
            "Duration",
            "DurationType",
          ].includes(key)
      );
    }
  
    const exist = requiredfields.filter((field) => !AddPriscribtion[field]);
  
    if (exist.length > 0) {
      warnmessage(`The following fields are required: ${exist.join(", ")}`);
    } else {
      const indxx = summa.length + 1;
      const senddata = {
        ...AddPriscribtion,
        Location: userRecord?.location,
        CapturedBy: userRecord?.username,
        Booking_Id: IP_DoctorWorkbenchNavigation?.RegistrationId,
        priscriptionid: priscriptionid,
        id: indxx, // Generate a unique id for the new row
      };
      setsumma((prevSumma) => [...prevSumma, senddata]);
      setgetdatastate(!getdatastate);
      handlecleardata();
    }
  };
  
  console.log('summa...............................', summa)
  const submitalldata = () => {
    if (summa.length > 0) {
      axios
        .post(
          `${UrlLink}DrugAdminstrations/insert_Drug_Administration_datas`,
          summa
        )
        .then((response) => {
          console.log(response);
          setsumma([]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
useEffect(()=>{
  console.log(ItemName,'=====');
  let fiddata=ItemName.find((p)=> AddPriscribtion.MedicineCode === p.ItemCode && AddPriscribtion.MedicineName === p.ItemName)
  console.log(fiddata,'------');
  if(fiddata){
    axios.get(`http://localhost:8000/Masters/getDose_By_Itemname?selectedItemname=${fiddata.ItemCode}&location=${userRecord?.location}`)
    .then((res)=>{
      console.log(res);
      let data = res.data[0]
      setAddPriscribtion((prev)=>({
        ...prev,
        Dosage:data.dose,
        Route:data.Pack_type
    
      }))
    })
    .catch((err)=>{
      console.log(err);
    })
  }else{
    setAddPriscribtion((prev)=>({
      ...prev,
      Dosage:'',
      Route:''
  
    }))
  }

},[ItemName,AddPriscribtion.MedicineCode,AddPriscribtion.MedicineName])


useEffect(()=>{
  axios.get(`${UrlLink}Masters/Speciality_Detials_link`)
  .then((response)=>{
    console.log('response', response);
    let data = response.data
    setSpeciality(data)
  })
  .catch((error)=>{
    console.log(error);
    
  })
},[AddPriscribtion.Department])
useEffect(() => {
 let data = Speciality.filter(p=>(p.SpecialityName === AddPriscribtion.Specialization))
 console.log('data', data);
 
  const fetchdat = async () => {
      try {
          const response = await axios.get(`${UrlLink}Masters/get_Doctor_by_Speciality_Detials?Speciality=${data[0].id}`);

          setDoctorData(response.data);
          console.log(response.data, 'daaaaaaa');
      } catch (error) {
          setDoctorData([])
          console.error("Error fetching referral doctors:", error);
      }
  }
  if (AddPriscribtion.Specialization) { fetchdat() }
}, [UrlLink, AddPriscribtion.Specialization])


  return (
    <>
      <div className="Main_container_app">
        <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
          <ToggleButtonGroup
            value={type}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton
              value="Intake"
              style={{
                height: "30px",
                width: "180px",
                backgroundColor:
                  type === "Intake"
                    ? "var(--selectbackgroundcolor)"
                    : "inherit",
              }}
              className="togglebutton_container"
            >
              Add Drugs
            </ToggleButton>
            <ToggleButton
              value="Output"
              style={{
                backgroundColor:
                  type === "Output"
                    ? "var(--selectbackgroundcolor)"
                    : "inherit",
                width: "180px",
                height: "30px",
              }}
              className="togglebutton_container"
            >
              View Drugs
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <br />
        {type === "Intake" && (
          <>
            <div className="RegisFormcon">
           {/* {lastprescribed.length > 0 && <div className="IP_grid">
                  <ThemeProvider theme={theme}>
                    <div className="IP_grid_1">
                      <DataGrid
                        rows={lastprescribed.slice(
                          page * pageSize,
                          (page + 1) * pageSize
                        )} // Display only the current page's data
                        columns={lastprescrib} // Use dynamic columns here
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
                        className="Ip_data_grid"
                      />
                      {!showdown > 0 && !lastprescribed.length > 10 && (
                        <div className="IP_grid_foot">
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
                  {showdown !== 0 && lastprescribed.length !== 0 && (
                    <div className="IP_norecords">
                      <span>No Records Found</span>
                    </div>
                  )}
                </div>
} */}
              <div className="RegisForm_1">
                <label>
                  Department <span>:</span>
                </label>

                <select
                  name="Department"
                  value={AddPriscribtion.Department}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="Primary">Primary</option>
                  <option value="Duty">Duty</option>
                  <option value="Special">Special</option>
                </select>
              </div>
              <div className="RegisForm_1">
                <label>
                Specialization Name <span>:</span>
                </label>

                <input
                  type="text"
                  name="Specialization"
                  list="SpecializationList"
                  // readOnly={AddPriscribtion.Specialization==='Primary'}
                  value={AddPriscribtion.Specialization}
                  onChange={handleInputChange}
                />
                <datalist id="SpecializationList">
                  {Speciality?.map((row, index) => (
                    <option key={index} value={row.SpecialityName} >{row.SpecialityName}</option>
                  ))}
                </datalist>
              </div>
              <div className="RegisForm_1">
                <label>
                  Doctor Name <span>:</span>
                </label>

                <select
                  type="text"
                  name="DoctorName"
                  list="IpDoctorNameList"
                  // readOnly={AddPriscribtion.Department==='Primary'}
                  value={AddPriscribtion.DoctorName}
                  onChange={handleInputChange}
                >
                <option value="">Select</option>
                  {DoctorData?.map((row, index) => (
                    <option key={index} value={row.id} >{row.ShortName} </option>
                  ))}
             </select>
              </div>
              
              <div className="RegisForm_1">
                <label>
                  Generic Name <span>:</span>
                </label>

                <input
                  type="text"
                  name="GenericName"
                  list="IpGenericNameList"
                  value={AddPriscribtion.GenericName}
                  onChange={handleInputChange}
                />
                <datalist id="IpGenericNameList">
                  {GenericName.map((row, index) => (
                    <option key={index} value={row.GenericName} />
                  ))}
                </datalist>
              </div>
              <div className="RegisForm_1">
                <label>
                  Medicine Name <span>:</span>
                </label>

                <input
                  type="text"
                  name="MedicineName"
                  list="IpMedicineNameList"
                  value={AddPriscribtion.MedicineName}
                  onChange={handleInputChange}
                />
                <datalist id="IpMedicineNameList">
                  {ItemName.map((row, index) => (
                    <option key={index} value={row.ItemCode}>
                     <div style={{display : "flex", flexDirection:"column"}}>
                     {row.ItemName}
                      {","}
                      <br />
                      AvailableQuantity : {row.AvailableQuantity}
                     </div>
                      {/* {`${row.ItemName} , AvailableQuantity - ${row.AvailableQuantity}`} */}
                    </option>
                  ))}
                </datalist>
              </div>
              <div className="RegisForm_1">
                <label>
                  Dose <span>:</span>
                </label>

                <input
                  name="Dosage"
                  type="text"
                  readOnly
                  value={AddPriscribtion.Dosage}
                  onChange={handleInputChange}
                />

              </div>
              <div className="RegisForm_1">
                <label>
                  Drug Type <span>:</span>
                </label>

                <input
                  name="Route"
                  type="text"
                  readOnly
                  value={AddPriscribtion.Route}
                  onChange={handleInputChange}
                />

                
              </div>
              <div className="RegisForm_1">
                <label>
                Route  <span>:</span>
                </label>

                <select
                  name="RouteSites"
                  // type="text"
                  // readOnly
                  value={AddPriscribtion.RouteSites}
                  onChange={handleInputChange}
                >
                  <option value= "">Select</option>
                  <option value="IV-Direct"> IV-Direct</option>
                  <option value="IV-Infusion"> IV-Infusion</option>
                  <option value="Intramuscular">Intramuscular</option>
                  <option value="Subcutaneous">Subcutaneous</option>
                  <option value="Sublingual">Sublingual </option>
                  <option value="Rectal">Rectal</option>
                  <option value="Oral">Oral</option>
                  <option value="Inhalational">Inhalational</option>
                  <option value="Nasal">Nasal</option>
                </select>

                
              </div> 
              {(AddPriscribtion.RouteSites === "IV-Direct" || AddPriscribtion.RouteSites === "IV-Infusion") &&
               <div className="RegisForm_1">
                <label>
                IV Site <span>:</span>
                </label>

                <select
                  name="IvSite"
                  // type="text"
                  // readOnly
                  value={AddPriscribtion.IvSite}
                  onChange={handleInputChange}
                >
                 <option value="">Select</option>
                 <option value="External Jugular">External Jugular</option>
                 <option value="Subclavian vein">Subclavian vein</option>
                 <option value="Femoral vein"> Femoral vein</option>
                 <option value="Dorsal Venous Network of Hand">Dorsal Venous Network of Hand</option>
                 <option value="Radial vein">Radial vein</option>
                 <option value="Median Cubital vein">Median Cubital vein</option>
                 <option value="Cephalic vein">Cephalic vein</option>
                 <option value="Dorsal Venous Network of Leg">Dorsal Venous Network of Leg</option>
                 <option value="Saphaneous vein">Saphaneous vein</option>
                 <option value="Superficial Temporal vein">Superficial Temporal vein</option>

                </select>

                
              </div>}
              <div className="RegisForm_1">
                <label>
                  Freq Method <span>:</span>
                </label>

                <select
                  name="FrequencyMethod"
                  value={AddPriscribtion.FrequencyMethod}
                  onChange={handleInputChange}
                >
                  <option value="Regular">Regular</option>
                  <option value="SOS">SOS</option>
                </select>
              </div>

              <div className="RegisForm_1">
                <label>
                  Frequency Name <span>:</span>
                </label>

                <select
                  name="FrequencyName"
                  value={AddPriscribtion.FrequencyName}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  {selectedTimes
                    .map((fields, index) => (
                      <option value={fields.Frequency_Id} key={index}>
                        {fields.FrequencyName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="RegisForm_1">
                <label>
                  Frequency Type <span>:</span>
                </label>

                <input
                  name="FrequencyType"
                  value={AddPriscribtion.FrequencyType}
                  disabled={AddPriscribtion.FrequencyMethod === "SOS"}
                  onChange={handleInputChange}
                />
                  
              </div>
              <div className="RegisForm_1">
                <label>
                  Frequency <span>:</span>
                </label>

                <input
                  name="Frequency"
                  value={AddPriscribtion.Frequency}
                  disabled={AddPriscribtion.FrequencyMethod === "SOS"}
                  onChange={handleInputChange}
                />
              </div>
              <div className="RegisForm_1">
                <label>
                  Frequency Time <span>:</span>
                </label>

                <input
                  name="FrequencyTime"
                  type="text"
                  readOnly
                  disabled={AddPriscribtion.FrequencyMethod === "SOS"}
                  value={AddPriscribtion.FrequencyTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="RegisForm_1">
                <label>
                  Duration <span>:</span>
                </label>

                <input
                  name="Duration"
                  type="number"
                  onKeyDown={blockInvalidChar}
                  style={{ width: "20px" }}
                  disabled={AddPriscribtion.FrequencyMethod === "SOS"}
                  value={AddPriscribtion.Duration}
                  onChange={handleInputChange}
                />
                <select
                  name="DurationType"
                  style={{ width: "110px" }}
                  value={AddPriscribtion.DurationType}
                  onChange={handleInputChange}
                  disabled={AddPriscribtion.FrequencyMethod === "SOS"}
                >
                  <option value="days">days</option>
                  <option value="Weeks">weeks</option>
                  <option value="Months">Months</option>
                </select>
              </div>
              <div className="RegisForm_1">
                <label>
                  Adminis Dose <span>:</span>
                </label>

                <input
                  name="AdminisDose"
                  type="number"
                  onKeyDown={blockInvalidChar}
                  value={AddPriscribtion.AdminisDose}
                  onChange={handleInputChange}
                />
              </div>
              <div className="RegisForm_1">
                <label>
                  Quantity <span>:</span>
                </label>

                <input
                  name="Quantity"
                  type="number"
                  onKeyDown={blockInvalidChar}
                  value={AddPriscribtion.Quantity}
                  readOnly={AddPriscribtion.FrequencyMethod === "Regular"}
                  onChange={handleInputChange}
                />
              </div>

              <div className="RegisForm_1">
                <label>
                  Date <span>:</span>
                </label>

                <input
                  name="Date"
                  type="date"
                  value={AddPriscribtion.Date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="RegisForm_1">
                <label>
                  Time <span>:</span>
                </label>

                <input
                  name="Time"
                  type="time"
                  value={AddPriscribtion.Time}
                  onChange={handleInputChange}
                />
              </div>

              <div className="RegisForm_1">
              <label>
                On Behalf Of<span>:</span>
              </label>
              <input
                name="Onbehalf"
                type="checkbox"
                checked={AddPriscribtion.Onbehalf === 'Yes'} // Check if value is "yes"
                onChange={handleInputChange}
              />
            </div>

            {AddPriscribtion.Onbehalf === 'Yes' && (
               <div className="RegisForm_1">
               <label>
                 Prescribed By <span>:</span>
               </label>

               <input
                 name="Prescribedby"
                 type="text"
                //  readOnly
                 disabled={AddPriscribtion.Prescribedby === "SOS"}
                 value={AddPriscribtion.Prescribedby}
                 onChange={handleInputChange}
               />
             </div>
            )}
              <div className="RegisForm_1">
                <label>
                  Instructions <span>:</span>
                </label>

                <textarea
                  name="Instruction"
                  value={AddPriscribtion.Instruction}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <br />

            <div
              style={{ display: "grid", placeItems: "center", width: "100%" }}
            >
              <button className="btn-add" onClick={isEdit?handleupdate:handlesubmitdata}>
                {isEdit ?'Update' :'Add'}
              </button>
            </div>
           {summa.length > 0 &&
           <>
                    <ReactGrid columns={dynamicColumns} RowData={summa} />
                    <button className="btn-add" onClick={submitalldata}>
                    Submit
                  </button>
                  </>
                }
                
          </>
        )}

        {type === "Output" && (
          
        
             <ReactGrid columns={dynamicColumns1()} RowData={summa1?.medicinedata} />
          
        )}
      </div>

      <ToastContainer />
      <CancelDrugDialog
        open={OpenDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleCancelAppointment}
        setcancelsenddata={setcancelsenddata}
        cancelsenddata={cancelsenddata}
      />
    </>
  );
};

export default Prescription;




