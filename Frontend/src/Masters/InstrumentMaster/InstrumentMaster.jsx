import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from "../../OtherComponent/ReactGrid/ReactGrid";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import ToastAlert from "../../OtherComponent/ToastContainer/ToastAlert";
import "../../OP/TreatmentComponent.css";
import { FaTrash } from 'react-icons/fa';
import VisibilityIcon from '@mui/icons-material/Visibility';

const InstrumentMaster = () => {
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const toast = useSelector((state) => state.userRecord?.toast);
  const dispatchvalue = useDispatch();

  // -------------------------------- Instrument------------
  const [Instrument, setInstrument] = useState({
    InstrumentCode: "",
    InstrumentName: "",
  });

  const [IsInstrumentGet, setIsInstrumentGet] = useState(false);
  const [IsInstrumentsss, setIsInstrumentss] = useState([]);

  const handleInstrumentOnchange = (e) => {
    const { name, value } = e.target;
    setInstrument((prev) => ({
      ...prev,
      [name]: value.toUpperCase().replace(/ +(?= )/g, ''), // Remove extra spaces but keep single spaces
    }));
  };

  const handleInstrumentSumbmit = () => {
    if (Instrument.InstrumentName) {
      const data = {
        ...Instrument,
        created_by: userRecord?.username || "",

      };

      axios.post(`${UrlLink}Masters/Instrument_Name_link`, data)
        .then((res) => {
          const restes = res.data;
          const type = Object.keys(restes)[0];
          const mess = Object.values(restes)[0];
          const tdata = {
            message: mess,
            type: type,
          };
          dispatchvalue({ type: "toast", value: tdata });
          setIsInstrumentGet((prev) => !prev);
          setInstrument({
            InstrumentCode: "",
            InstrumentName: "",

          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      const tdata = {
        message: "Please provide the Instrument Name.",
        type: "warn",
      };
      dispatchvalue({ type: "toast", value: tdata });
    }
  };


  useEffect(() => {
    axios.get(`${UrlLink}Masters/Instrument_Name_link`)
      .then((response) => {

        setIsInstrumentss(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [IsInstrumentGet, UrlLink]);

  const handleeditInstrumentMaster = (params) => {
    const { id, ...rest } = params;
    setInstrument({
      InstrumentCode: params.id,
      InstrumentName: params.InstrumentName,
      ...rest,
    })
  };
  const handleeditInstrumentstatus = (params) => {
    const data = {
      InstrumentCode: params.id,
      Statusedit: true
    };

    axios.post(`${UrlLink}Masters/Instrument_Name_link`, data)
      .then((res) => {
        const resres = res.data;
        let typp = Object.keys(resres)[0];
        let mess = Object.values(resres)[0];
        const tdata = {
          message: mess,
          type: typp,
        };
        dispatchvalue({ type: 'toast', value: tdata });
        setIsInstrumentGet(prev => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const InstrumentColumns = [
    {
      key: "ind",
      name: "S.No",
      frozen: true,
    },
    {
      key: "id",
      name: "Instrument Code",
      frozen: true,
    },
    {
      key: "created_by",
      name: "Created By",
      frozen: true,
    },
    {
      key: "InstrumentName",
      name: "Instrument Name",
    },

    {
      key: "Status",
      name: "Status",
      renderCell: (params) => (
        <Button
          className="cell_btn"
          onClick={() => handleeditInstrumentstatus(params.row)}
        >
          {params.row.Status}
        </Button>
      ),
    },
    {
      key: "Action",
      name: "Action",
      renderCell: (params) => (
        <Button className="cell_btn" onClick={() => handleeditInstrumentMaster(params.row)}>
          <EditIcon className="check_box_clrr_cancell" />
        </Button>
      ),
    },
  ];

  // --------------------tray----------
  // Instruiment_Names_link
  const [instrumentTray, setinstrumentTray] = useState([]);
  useEffect(() => {
    const fetchTestNames = async () => {
      try {
        const response = await axios.get(`${UrlLink}Masters/Instruiment_Names_link?InstrumentName=${Instrument.InstrumentName}`);
        setinstrumentTray(response.data);
        console.log("Response Dataaa:", response.data);
      } catch (err) {
        console.error("Error fetching instrument names:", err);
      }
    };

    fetchTestNames();
  }, [UrlLink, Instrument.InstrumentName]);

  const [TrayNames, setTrayNames] = useState({
    TrayCode: "",
    TrayName: "",
    TrayQuantity:"",
    InstrumentName: "",
    Quantity: "",

  });
  console.log("TrayNamesbharathi", TrayNames);
  const [isEditing, setIsEditing] = useState(false);
  const [TrayNamess, setTrayNamess] = useState([]);
  console.log("TrayNamess", TrayNamess)
  const [IsTrayGet, setTrayGet] = useState(false);
  console.log("TrayNamess", TrayNamess);

  const handleTrayOnchange = (e) => {
    const { name, value } = e.target;
    setTrayNames((prevState) => ({
      ...prevState,
      [name]: value.toUpperCase().replace(/ +(?= )/g, ''),
    }));
    if(name === "TrayName"){
      setTrayNames((prevState)=>({
        ...prevState,
        TrayName:value?.toUpperCase()?.trim(),
        InstrumentName:"",
        Quantity:"",

      }));
      setTrayNamess([])
    }
  };


  const handleAddTray = () => {
    const selectedTest = instrumentTray.find(test => test.id === TrayNames.InstrumentName);
    console.log("selectedTest", selectedTest); // Debugging line
    console.log("TrayNames.InstrumentName", TrayNames.InstrumentName); // Debugging line
      if (selectedTest) {
        const isDuplicate = TrayNamess.some(tray => tray.InstrumentCode === selectedTest.id);

        if (isDuplicate) {
          const tdata = {
            message: `Instrument already added`,
            type: "warn",
          };
          dispatchvalue({ type: "toast", value: tdata });
        } else {
          const newFavourite = {
            idx:TrayNamess.length+1,
            InstrumentCode: selectedTest.id,
            Instrument_Name: selectedTest.InstrumentName,
            Current_Quantity: TrayNames.Quantity,
          };

          setTrayNamess(prev => [...prev, newFavourite]);


          setTrayNames(prevState => ({
            ...prevState,
            InstrumentName: "",
            Quantity: "",

          }));

          const tdata = {
            message: `Instrument added successfully`,
            type: "success",
          };
          dispatchvalue({ type: "toast", value: tdata });
        }
      } else {
        const tdata = {
          message: `Invalid Instrument`,
          type: "warn",
        };
        dispatchvalue({ type: "toast", value: tdata });
      }
    
   

  };

  const handleRemoveTray = (row) => {
    console.log("params", row);

    // Filter out the item with matching InstrumentCode
    const updatedTrayNames = TrayNamess.filter(tray => tray.InstrumentCode !== row.InstrumentCode);

    // Update state with filtered array
    setTrayNamess(updatedTrayNames);
    setTrayNames(prevState => ({
      ...prevState,
    }));
    // dispatchvalue success toast message
    const tdata = {
      message: `Instrument removed successfully`,
      type: "success",
    };
    dispatchvalue({ type: "toast", value: tdata });
  };

  const TrayColumns = [
   
    {
      key: "InstrumentCode",
      name: "Instrument Code",
      frozen: true,
    },
    {
      key: "Instrument_Name",
      name: "Instrument Name",
    },
    {
      key: "Current_Quantity",
      name: " Instrument Quantity",
    },
    {
      key: "Action",
      name: "Action",
      renderCell: (params) => (
        <Button
          className="cell_btn"
          onClick={() => handleRemoveTray(params.row)}
        >
          <FaTrash className="check_box_clrr_cancell" />
        </Button>
      ),
    },
  ];


  const hadleTraySubmit = () => {
    console.log("TrayNames.TrayName", TrayNames.TrayName);
    if (TrayNames.TrayName !== "") {
      const data =
      {
        ...TrayNames,
        TrayNamess: TrayNamess,
        created_by: userRecord?.username || "",
      };
      console.log("data", data);
      axios.post(`${UrlLink}Masters/Instrument_Tray_Names_link`, data)
        .then((res) => {
          const reste = res.data;
          const type = Object.keys(reste)[0];
          const mess = Object.values(reste)[0];
          const tdata = {
            message: mess,
            type: type,
          };
          dispatchvalue({ type: "toast", value: tdata });
          setTrayGet((prev) => !prev);
          setTrayNames({
            TrayCode: "",
            TrayName: "",
            TrayQuantity:"",
            InstrumentName: "",
            Quantity: ""


          });
          setTrayNamess([]);
          setEdits(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      const tdata = {
        message: "Please provide the TrayName.",
        type: "warn",
      };
      dispatchvalue({ type: "toast", value: tdata });
    }
  };

  const [joy, setJoy] = useState(false);
  
  console.log("joy",joy);

  const [special, setSpecial] = useState([]);
  useEffect(() => {
    axios.get(`${UrlLink}Masters/Instrument_Tray_Names_link`)
      .then((response) => {
        console.log("Specialresponse", response.data);
        setSpecial(response.data);
      })
      .catch((err) => {
        console.log(err);
      })

  }, [IsTrayGet, UrlLink])

  const handleviewTrayInstrumentnames = (params) => {
    console.log("paramsview", params);
    setIsEditing(true);
    setJoy(true)
    const InstrumentRow = params.Instrument;
    console.log("InstrumentRow", InstrumentRow);
    setTrayNamess(InstrumentRow);

    const { TrayCode, TrayName, TrayQuantity,Status, Instrument, ...rest } = params;
    const InstrumentCodeNew = params.TrayCode; 

    setTrayNames((prev) => ({
      ...prev,
      TrayCode: InstrumentCodeNew,
      TrayName: TrayName,
      TrayQuantity:TrayQuantity,
      Quantity: "",
      InstrumentName: "",
      ...rest,
    }));
  };


  const SpecialColumnns = [
    {
      key: "TrayCode",
      name: "S.No",
      frozen: true,
      width: 80, 
    },
    {
      key: "TrayName",
      name: "Tray Name",
    },
    {
      key: "TrayQuantity",
      name: "Tray Quantity",
    },

    {
      key: "Instrument",
      name: "View Instrument",

      renderCell: (params) => (
        <Button
          className="cell_btn"
          onClick={() => handleviewTrayInstrumentnames(params.row)}
        >
          <VisibilityIcon className="check_box_clrr_cancell" />
        </Button>
      ),
    },
    {
      key: "Action",
      name: "Action",
      renderCell: (params) => (
        <Button
          className="cell_btn"
          onClick={() => handleEditTray(params.row)}
        >
          <EditIcon className="check_box_clrr_cancell" />
        </Button>
      ),
    },
    {
      key: "Status",
      name: "Status",
      renderCell: (params) => (
        <>
          <Button
            className="cell_btn"
          onClick={() => handleeditTraystatus(params.row)}
          >
            {params.row.Status}
          </Button>
        </>
      ),
    },
  ];

 const  handleeditTraystatus = (params)=>{
  const data = {
    ...params,
    TrayCode: params.TrayCode,
    TrayName: params.TrayName,
    TrayQuantity:params.TrayQuantity,
    TrayNamess: params.Instrument,
    Statusedit: true
};
axios.post(`${UrlLink}Masters/Instrument_Tray_Names_link`, data)
.then((res) => {
    const tdata = {
        message: "Status Updated Successfully",
        type: "success",
    };
    dispatchvalue({ type: 'toast', value: tdata });
   setTrayGet(prev => !prev);
})
.catch((err) => {
    console.log(err);
});
 };

  const TrayColumnsView = [
    {
      key: "idx",
      name: "S.No",
      frozen: true,
    },
    {
      key: "InstrumentCode",
      name: "Instrument Code",
      frozen: true,
    },
    {
      key: "Instrument_Name",
      name: "Instrument Name",
    },

    {
      key: "Current_Quantity",
      name: " Instrument Quantity",
    }
 
    
  ];
  const TrayColumnsEdit = [
    {
      key: "idx",
      name: "S.No",
      frozen: true,
    },
    {
      key: "InstrumentCode",
      name: "Instrument Code",
      frozen: true,
    },
    {
      key: "Instrument_Name",
      name: "Instrument Name",
    },
    {
      key: "Current_Quantity",
      name: "Instrument Quantity",
    },   
     {
      key: "Action",
      name: "Action",
      renderCell: (params) => (
        <Button
          className="cell_btn"
          onClick={() => handleRemoveTray(params.row)}
        >
          <FaTrash className="check_box_clrr_cancell" />
        </Button>
      ),
    },
 
    
  ];

  const handleTrayViewClear = () => {
    setTrayNamess([]);
    setIsEditing(false);
    setJoy(false);
    setTrayNames({
      TrayName: "",
      TrayQuantity:"",
    })
  };

  const [edits,setEdits] = useState(false);
  const handleEditTray = (params) => {
    setIsEditing(false);
    // setJoy(false);
    setEdits(true);

    console.log("joy",joy);
    const InstrumentRow = params.Instrument;
    console.log("InstrumentRow", InstrumentRow);
    setTrayNamess(InstrumentRow);

    const { TrayCode, TrayName, TrayQuantity,Status, Instrument, ...rest } = params;
    const InstrumentCodeNew = params.TrayCode;

    setTrayNames((prev) => ({
      ...prev,
      TrayCode: InstrumentCodeNew,
      TrayName: TrayName,
      TrayQuantity:TrayQuantity,
      ...rest,
    }));
  };



 


  return (
    <>
      <div className="Main_container_app">
        {/* ----------------------------instrument------------------------ */}
        <div className="common_center_tag">
          <span>Instrument Name </span>
        </div>
        <div className="RegisFormcon_1">
          <div className="RegisForm_1">
            <label>
              Instrument Name <span>:</span>
            </label>
            <input
              type="text"
              name="InstrumentName"
              required
              value={Instrument.InstrumentName}
              autoComplete="off"
              onChange={handleInstrumentOnchange}
            />
          </div>
        </div>

        <div className="Main_container_Btn">
          <button onClick={handleInstrumentSumbmit}>
            {Instrument.InstrumentCode ? "Update" : "Save"}
          </button>
        </div>

        {IsInstrumentsss.length > 0 && (
          <ReactGrid columns={InstrumentColumns} RowData={IsInstrumentsss} />
        )}

        {/* ----------------------------Tray------------------------ */}
        <div className="common_center_tag">
          <span>Tray Name </span>
        </div>


        <div className="RegisFormcon_1">
          <div className="RegisForm_1">
            <label>
              Tray Name <span>:</span>
            </label>
            <input
              id="TrayName"
              type="text"
              name="TrayName"
              required
              disabled={edits}
              value={TrayNames.TrayName}
              autoComplete="off"
              onChange={handleTrayOnchange}
            />
          </div>
          <div className="RegisForm_1">
                <label>
                 Tray Quantity<span>:</span>
                </label>
                <input
                  type="number"
                  name="TrayQuantity"
                  required
                  value={TrayNames.TrayQuantity}
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                  autoComplete="off"
                  onChange={handleTrayOnchange}
                />
              </div>



          {!isEditing && (
            <>

              <div className="RegisForm_1">
                <label>
                  Instrument Name <span>:</span>
                </label>

                <input
                  type="text"
                  list="packagenameOptions"
                  id="InstrumentName"
                  name="InstrumentName"
                  value={TrayNames.InstrumentName}
                  autoComplete="off"
                  onChange={handleTrayOnchange}
                />
                <datalist id="packagenameOptions">
                  {instrumentTray.map((ins, index) => (
                    <option key={index} value={ins.id}>{ins.InstrumentName}</option>
                  ))}
                </datalist>
              </div>
              <div className="RegisForm_1">
                <label>
                  Quantity<span>:</span>
                </label>
                <input
                  type="number"
                  name="Quantity"
                  required
                  value={TrayNames.Quantity}
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                  autoComplete="off"
                  onChange={handleTrayOnchange}
                />
              </div>


              <button className="Addnamebtn2222" onClick={handleAddTray}>
                +
              </button>
            </>
          )}

        </div>

        {TrayNamess.length > 0 && !joy&& !edits &&(
          <ReactGrid columns={TrayColumns} RowData={TrayNamess} />
        )}
        {TrayNamess.length > 0 && joy &&(
          <ReactGrid columns={TrayColumnsView} RowData={TrayNamess} />
        )}
        {TrayNamess.length > 0 && !joy && edits &&(
          <ReactGrid columns={TrayColumnsEdit} RowData={TrayNamess} />
        )}
       
        {!joy && (
          <div className="Main_container_Btn">
            <button onClick={hadleTraySubmit}>
              {TrayNames.TrayCode ? "Update" : "Save"}
            </button>
          </div>
        )}
        {joy && (
          <div className="Main_container_Btn">
            <button
              onClick={handleTrayViewClear}
            >
              Clear
            </button>
          </div>
        )}

        {special.length > 0 && (
          <ReactGrid columns={SpecialColumnns} RowData={special} />
        )}


        <ToastAlert Message={toast.message} Type={toast.type} />
      </div>

    </>
  )
}

export default InstrumentMaster

