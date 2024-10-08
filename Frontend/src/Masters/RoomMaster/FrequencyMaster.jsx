import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Button from '@mui/material/Button';
// import "../IPNurseflow/IpNurseVitals.css";
import EditIcon from '@mui/icons-material/Edit';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';



export default function FrequencyMaster() {
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  console.log('userRecord', userRecord);
  
  const [page, setPage] = useState(0);
  const [summa, setSumma] = useState([]);
  const [getdatastate, setGetDataState] = useState(false);
  const [editrow,seteditrow]=useState(null)
  const [VitalFormData, setVitalFormData] = useState({
    FrequencyName : "",
    FrequencyType: "",
    Frequency: "",
    FrequencyTime: "",
    
  });
  
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVitalFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const blockInvalidChar = (e) =>
    ["e", "E", "+"].includes(e.key) && e.preventDefault();

  const timeOptions = Array.from({ length: 24 }, (_, i) => i + 1);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const toggleTimeSelection = (time) => {
    
    if (!VitalFormData.Frequency) return;
    const maxSelections = VitalFormData.Frequency.split("-").reduce(
      (acc, val) => acc + parseInt(val),
      0
    );

    if (selectedTimes.includes(time)) {
      const timeData = selectedTimes.filter((t) => t !== time);
      setSelectedTimes(timeData);
      setVitalFormData((prev) => ({
        ...prev,
        FrequencyTime: timeData.sort((a, b) => +a - +b).join(","),
      }));
    } else {
      if (selectedTimes.length < maxSelections) {
        const timeData = [...selectedTimes, time];
        setSelectedTimes(timeData);
        setVitalFormData((prev) => ({
          ...prev,
          FrequencyTime: timeData.sort((a, b) => +a - +b).join(","),
        }));
      }
    }
  };

  const handleeditrow=(params)=>{
    const dataaa= params.row
    setSelectedTimes([])
    setVitalFormData({
      FrequencyType:dataaa.FrequencyType ,
    Frequency: dataaa.Frequency ,
    FrequencyTime:dataaa.FrequencyTime  ,
    FrequencyName: dataaa.FrequencyName
    })
    seteditrow(dataaa.id)
    const splitedtime=dataaa.FrequencyTime.split(',')
  
    setSelectedTimes(splitedtime)
  }

  const handleeditstatus=(params)=>{
    
    const AllSendData = {
      FrequencyName: params.row.FrequencyName,
      FrequencyType:params.row.FrequencyType ,
      Frequency: params.row.Frequency ,
      FrequencyTime:params.row.FrequencyTime  ,
      Frequency_Id:params.row.Frequency_Id,
      Status:params.row.Status==='Active'?'InActive':'Active',
      Location: userRecord?.location,
      CapturedBy: userRecord?.username,
    };
      console.log('AllSendData',AllSendData)
    axios
      .post(
        `${UrlLink}Masters/insert_frequency_masters`,
        AllSendData
      )
      .then((response) => {
        console.log(response);
        if(response.data?.message){
          alert(response.data?.message)
        }
        cleardata();
        setSelectedTimes([])
        setGetDataState(!getdatastate);
        seteditrow(null)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const formatLabel = (label) => {
    if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
      return label
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/^./, (str) => str.toUpperCase());
    } else {
      return label;
    }
  };
   const getTextWidth = (text) => {
    const dummyElement = document.createElement("span");
    dummyElement.textContent = text;
    dummyElement.style.visibility = "hidden";
    dummyElement.style.whiteSpace = "nowrap";
    document.body.appendChild(dummyElement);

    const width = dummyElement.offsetWidth;

    document.body.removeChild(dummyElement);

    return width;
  };
  const dynamicColumns = [
    {
      key: "Frequency_Id",
      name: "S No",
    },
    ...Object.keys(VitalFormData).map((labelname) => {
      const formattedLabel = formatLabel(labelname);
      const labelWidth = getTextWidth(formattedLabel);
  
      return {
        key: labelname,
        name: formattedLabel,
      };
    }),
    {
      key: "Status",
      name: "Status",
      renderCell: (params) => (
        <Button className="cell_btn" onClick={() => handleeditstatus(params)}>
          {params.row.Status} {/* Ensure you're accessing the value correctly */}
        </Button>
      ),
    },
    {
      key: "actions",
      name: "Actions",
      renderCell: (params) => (
        <Button className="cell_btn" onClick={() => handleeditrow(params)}>
          <EditIcon />
        </Button>
      ),
    },
  ];
  

  const cleardata = () => {
    setVitalFormData({
      FrequencyType: "",
      Frequency: "",
      FrequencyTime: "",
      FrequencyName: ""
    });
  };
useEffect(()=>{
  axios.get(`${UrlLink}Masters/insert_frequency_masters`)
  .then((response)=>{
    const data =response.data.map((p,index)=>({
      ...p,
      id:p.Frequency_Id
    }))
    setSumma(data)
    console.log(data)
  })
  .catch((error)=>{
    console.log(error)
  })
},[getdatastate])


  const PostVitalData = () => {
    const requiredFields = ["FrequencyType", "Frequency", "FrequencyTime"];
    const existing = requiredFields.filter((field) => !VitalFormData[field]);

    if (existing.length > 0) {
      alert("Please fill empty fields: " + existing.join(","));
    } else {

      const maxSelections = VitalFormData.Frequency.split("-").reduce(
        (acc, val) => acc + parseInt(val),
        0
      );
      const maxtime=VitalFormData.FrequencyTime.split(',').length
      if(maxSelections > maxtime){
        alert(`The selected frequency is ${maxSelections} but the selected time is ${maxtime}`)
      }else{
      
      const AllSendData = {
        ...VitalFormData,
        Frequency_Id:editrow,
        Status:'Active',
        Location: userRecord?.location,
        CapturedBy: userRecord?.username,
      };
      console.log('AllSendData',AllSendData)
      axios
        .post(
          `${UrlLink}Masters/${editrow?'insert_frequency_masters':'insert_frequency_masters'}`,
          AllSendData
        )
        .then((response) => {
          console.log(response);
          if(response.data?.message){
            alert(response.data?.message)
          }
          cleardata();
          setSelectedTimes([])
          setGetDataState(!getdatastate);
          seteditrow(null)
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }
  };

 



  return (
    <>
                <div className="common_center_tag">
                    <span> Frequency Master</span>
                </div>
                <br />
      <div className="RegisFormcon">

          {Object.keys(VitalFormData).map((labelname, index) => (
            <div className="RegisForm_1" key={index}>
              <label>
                {formatLabel(labelname)} <span>:</span>
              </label>
              {labelname === "FrequencyType" ? (
                <select
                  name={labelname}
                  value={VitalFormData[labelname]}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="BeforeFood">BeforeFood</option>
                  <option value="AfterFood">AfterFood</option>
                </select>
              ) : (
                <>
                  <input
                    type="text"
                    name={labelname}
                    readOnly={labelname === "FrequencyTime"}
                    // list={labelname === "Frequency" ? "frequencyList" : ""}
                    onKeyDown={blockInvalidChar}
                    value={VitalFormData[labelname]}
                    onChange={handleInputChange}
                  />
                  {/* {labelname === "Frequency" && (
                    <datalist id="frequencyList">
                      <option value="1-0-1"/>
                    </datalist>
                  )} */}
                </>
              )}
            </div>
          ))}
        </div>
        <br />
        <div
          style={{
            display: "grid",
            placeItems: "center",
            width: "100%",
            gap: "10px",
          }}
        >
          <span style={{ color: "grey", fontSize: "16px", fontWeight: "600" }}>
            Time Frequency
          </span>
          <div className="Timeselectorr">
            {timeOptions.map((time) => (
              
              <span
                key={time}
                className={
                  selectedTimes.includes(''+time) ? "Timeselected" : "Timeenabled"
                }
                onClick={() => toggleTimeSelection(""+time)}
              >
                {time}{console.log('time ---',time,selectedTimes.includes(''+time))}
              </span>
            ))}
          </div>
        </div>
        <br />
        <div style={{ display: "grid", placeItems: "center", width: "100%" }}>
          <button className="btn-add" onClick={PostVitalData}>
            {editrow?'Update':'Add'}
          </button>
        </div>
        {summa.length > 0 &&
                    <ReactGrid columns={dynamicColumns} RowData={summa} />
                }
      

      <ToastContainer />
    </>
  );
}

