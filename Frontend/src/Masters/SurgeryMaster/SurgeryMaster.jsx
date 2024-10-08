import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from "../../OtherComponent/ReactGrid/ReactGrid";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import ToastAlert from "../../OtherComponent/ToastContainer/ToastAlert";



const SurgeryMaster = () => {
    const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
    const userRecord = useSelector((state) => state.userRecord?.UserData);
    const toast = useSelector((state) => state.userRecord?.toast);
    const dispatchvalue = useDispatch();
      // ----------------------SurgeryName--------
  const [Surgery, setSurgery] = useState({
    SurgeryNameId: "",
    SurgeryName: "",
    Speciality:"",
    AnesthesiaType:"",
    Duration:"",
    Cost:"",
    Location:""
  });
  console.log("Surgerydata",Surgery);
  const [Surgerydata,setSurgerydata] = useState([]);

  const [IsSurgeryGet, setIsSurgeryGet] = useState(false);
  const [LocationData, setLocationData] = useState([]);
  const [SpecialityData, setSpecialityData] = useState([]);
  useEffect(() => {
    axios.get(`${UrlLink}Masters/Location_Detials_link`)
      .then((res) => {
        const ress = res.data
        setLocationData(ress)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [UrlLink])
  
  useEffect(() => {
    axios.get(`${UrlLink}Masters/Speciality_Detials_link`)
      .then((res) => {
        const ress = res.data
        console.log("specialization",ress);
        setSpecialityData(ress)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [UrlLink])


  const handleSurgeryChange = (e) => {
    const { name, value } = e.target;

    if (name === 'Location') {
      // Update Location and reset RadiologyName when location changes
      setSurgery((prev) => ({
        ...prev,
        [name]: value,
        SurgeryName: '',
        Speciality:'',
        Duration:'',
        AnesthesiaType:'',
        Cost:''
      }));
    } 
    else if (name === 'Speciality') {
        // Update Location and reset RadiologyName when location changes
        setSurgery((prev) => ({
          ...prev,
          [name]: value,
          SurgeryName: '',
          Duration:'',
          AnesthesiaType:'',
          Cost:'' // Reset RadiologyName on location change
        }));
      } else if (name === "SurgeryName") {
      // Update the relevant field, applying toUpperCase and trim
      setSurgery((prev) => ({
        ...prev,
        [name]: value?.toUpperCase()?.trim(),
        Duration:'',
        AnesthesiaType:'',
        Cost:''
      }));
    }
    else{
        setSurgery((pre)=>({
            ...pre,
            [name]: value,


        }));
    }
  };

  const handleSurgerySubmit = () =>{
    if(Surgery.SurgeryName && Surgery.Location){
        const data = {
            ...Surgery,
            Speciality:Surgery.Speciality ||"",
            SurgeryName: Surgery.SurgeryName || "",
            Location: Surgery.Location || "",
            Duration:Surgery.Duration || "",
            Cost:Surgery.Cost || "",
            created_by: userRecord?.username || "", 
        };
        console.log("senddatadata",data);
        axios
        .post(`${UrlLink}Masters/Surgery_Names_link`,data)
        .then((res)=>{
            const restes = res.data;
            console.log(restes);
            const type = Object.keys(restes)[0];
            const mess = Object.values(restes)[0];
            const tdata = {
              message: mess,
              type: type,
            };
            dispatchvalue({ type: "toast", value: tdata });
            setIsSurgeryGet((prev) => !prev);
            setSurgery({
                SurgeryNameId:"",
                SurgeryName:"",
                Location:"",
                Speciality:"",
                AnesthesiaType:"",
                Cost:"",
                Duration:""
            });
        })
        .catch((err)=>{
        console.log(err);
        });
    }else{
        dispatchvalue({ type: "toast", value: { message: "Please provide Surgery Name and Location.", type: "warn" } });    
    }

  };

  useEffect(() => {
    axios.get(`${UrlLink}Masters/Surgery_Names_link`)
        .then((response) => {
          console.log("123",response.data)
          setSurgerydata(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
}, [IsSurgeryGet, UrlLink]);

const handleSurgeryStatus = (params) =>{
  console.log("status",params);

  const data = {
    SurgeryNameId:params.id,
    Statusedit: true
  };
  axios.post(`${UrlLink}Masters/Surgery_Names_link`, data)
  .then((res) => {
    const resres = res.data;
    let typp = Object.keys(resres)[0];
    let mess = Object.values(resres)[0];
    const tdata = {
      message: mess,
      type: typp,
    };
    dispatchvalue({ type: 'toast', value: tdata });
    setIsSurgeryGet(prev => !prev);
  })
  .catch((err) => {
    console.log(err);
  });

}
const handleEditSurgery = (params) => {
  const { id, ...rest } = params;

  setSurgery({
    SurgeryNameId: params.id,
    SurgeryName: params.Surgery_Name,
    Duration: params.Duration_Hours,
    Cost: params.Estimate_Cost,
    Speciality: params.Speciality_Id, // Set Speciality ID if applicable
    AnesthesiaType: params.Anesthesia_Type,
    Location: params.Location_Id, // Set Location ID, not the name
    ...rest
  });
};


  const SurgeryNamesColumns = [
    {
      key: "id",
      name: "S.NO",
      frozen: true,
  },
  {
    key: "Speciality_Name",
    name: "Speciality Name ",

},

  {
    key: "Surgery_Name",
    name: "Surgery Name",

},

{
    key: "Duration_Hours",
    name: "Duration Hours",
},
{
    key: "Estimate_Cost",
    name: "Estimate Cost",
},
{
    key: "Status",
    name: "Status",
    renderCell: (params) => (
        <Button
            className="cell_btn"
            onClick={() => handleSurgeryStatus(params.row)}
        >
            {params.row.Status}
        </Button>
    ),
},
{
    key: "Action",
    name: "Action",
    renderCell: (params) => (
        <Button className="cell_btn" 
        onClick={() => handleEditSurgery(params.row)}
        >
            <EditIcon className="check_box_clrr_cancell" />
        </Button>
    ),
},
  ]

  return (
    <>
    <div className="Main_container_app">
    <div className="common_center_tag">
          <span>Surgery Master</span>
        </div>

        <div className="RegisFormcon_1">
        <div className="RegisForm_1">
            <label> Location <span>:</span> </label>

            <select
              name='Location'
              required
              disabled={Boolean(Surgery.SurgeryNameId)}
              value={Surgery.Location}
            onChange={handleSurgeryChange}
            >
              <option value=''>Select</option>
              {
                LocationData.map((p) => (
                  <option key={p.id} value={p.id}>{p.locationName}</option>
                ))
              }
            </select>
          </div>
          <div className="RegisForm_1">
            <label>Speciality Name <span>:</span> </label>

            <select
              name='Speciality'
              required
              disabled={Boolean(Surgery.SurgeryNameId)}
              value={Surgery.Speciality}
            onChange={handleSurgeryChange}
            >
              <option value=''>Select</option>
              {
                SpecialityData.map((p) => (
                  <option key={p.id} value={p.id}>{p.SpecialityName}</option>
                ))
              }
            </select>
          </div>

          {/* <div className="RegisForm_1">
                <label>
                 Speciality Name <span>:</span>
                </label>

                <input
                  type="text"
                  list="packagenameOptions"
                  id="Speciality"
                  name="Speciality"
                  value={Surgery.Speciality}
                  autoComplete="off"
                  onChange={handleSurgeryChange}
                />
                <datalist id="packagenameOptions">
                  {SpecialityData.map((ins, index) => (
                    <option key={index} value={ins.id}>{ins.SpecialityName}</option>
                  ))}
                </datalist>
              </div> */}
        <div className="RegisForm_1">

        <label>
              Surgery Name <span>:</span>
            </label>
            <input
              type="text"
              name="SurgeryName"
              required
              value={Surgery.SurgeryName}
              autoComplete="off"
              onChange={handleSurgeryChange}
            />
        </div>
        <div className="RegisForm_1">
                <label>
                  Duration in Hours<span>:</span>
                </label>
                <input
                  type="number"
                  name="Duration"
                  required
                  value={Surgery.Duration}
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                  autoComplete="off"
                  onChange={handleSurgeryChange}
                />
              </div>
              <div className="RegisForm_1">
                <label>
                  Estimate Cost<span>:</span>
                </label>
                <input
                  type="number"
                  name="Cost"
                  required
                  value={Surgery.Cost}
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                  autoComplete="off"
                  onChange={handleSurgeryChange}
                />
              </div>
              <div className="RegisForm_1">
  <label>
    Anesthesia Type <span>:</span>
  </label>
  <select
    name="AnesthesiaType"
    required
    value={Surgery.AnesthesiaType}
    onChange={handleSurgeryChange}
  >
    <option value="" disabled>Select</option>
    <option value="General">General</option>
    <option value="Regional">Regional</option>
    <option value="Local">Local</option>
    <option value="Topical">Topical</option>
  </select>
</div>


        
        </div>


        <div className="Main_container_Btn">
          <button onClick={handleSurgerySubmit}>
            {Surgery.SurgeryNameId ? "Update" : "Save"}
          </button>
        </div>
        {Surgerydata.length > 0 && (
                    <ReactGrid columns={SurgeryNamesColumns} RowData={Surgerydata} />
                )}
        <ToastAlert Message={toast.message} Type={toast.type} />
    </div>
     
    </>
  )
}

export default SurgeryMaster;

