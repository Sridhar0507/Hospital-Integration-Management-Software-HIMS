import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import axios from 'axios';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';




const IP_NurseMlc = () => {
    const dispatch = useDispatch();
    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const toast = useSelector(state => state.userRecord?.toast);
    const IP_DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.IP_DoctorWorkbenchNavigation);
    console.log(IP_DoctorWorkbenchNavigation,'IP_DoctorWorkbenchNavigation');

    const userRecord = useSelector((state) => state.userRecord?.UserData);

    
    const formatLabel = (label) => {

        if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
            return label
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/^./, (str) => str.toUpperCase());
        } else {
            return label;
        }
    };

    const [Mlc,setMlc] = useState({
        MlcNo: "",
        MlcInfoDate: "",
        MlcInfoTime: "",
        InformedBy: "",
        MlcSendTime: "",
        Reason: "",
        Type: "",
        PoliceStationName: "",
        ConsultantName: "",
        RmoName: "",
        MlcCopyReceiveTime: "",
        ReceivedBySister: "",
        ReceptionStaffName: "",
        InchargeName: "",
        Remarks: "",
      
    })

    
    const [gridData, setGridData] = useState([])
    const [IsGetData, setIsGetData] = useState(false)

    const [IsViewMode, setIsViewMode] = useState(false)
  

    const MlcColumns = [
        {
            key: 'id',
            name: 'S.No',
            frozen: true
        },
        // { key: 'VisitId', name: 'VisitId',frozen: true },
        { key: 'PrimaryDoctorName', name: 'Doctor Name',frozen: true },
      
        {
            key: 'Date',
            name: 'Date',
            frozen: true
        },
        {
            key: 'Time',
            name: 'Time',
            frozen: true
        },
       
       
       
        {
            key: 'view',
            frozen: true,
            name: 'View',
            renderCell: (params) => (
              <IconButton onClick={() => handleView(params.row)}>
                <VisibilityIcon />
              </IconButton>
            ),
          },
        
    ]


    const handleView = (data) => {
        setMlc({
            MlcNo: data.MlcNo || '',
            MlcInfoDate: data.MlcInfoDate || '',
            MlcInfoTime: data.MlcInfoTime || '',
            InformedBy: data.InformedBy || '',
            MlcSendTime: data.MlcSendTime || '',
            Reason: data.Reason || '',
            Type: data.Type || '',
            PoliceStationName: data.PoliceStationName || '',
            ConsultantName: data.ConsultantName || '',
            RmoName: data.RmoName || '',
            MlcCopyReceiveTime: data.MlcCopyReceiveTime || '',
            ReceivedBySister: data.ReceivedBySister || '',
            ReceptionStaffName: data.ReceptionStaffName || '',
            InchargeName: data.InchargeName || '',
            Remarks: data.Remarks || '',
        });
        setIsViewMode(true);
    };

    
    const handleClear = () => {
        setMlc({
            MlcNo: "",
            MlcInfoDate: "",
            MlcInfoTime: "",
            InformedBy: "",
            MlcSendTime: "",
            Reason: "",
            Type: "",
            PoliceStationName: "",
            ConsultantName: "",
            RmoName: "",
            MlcCopyReceiveTime: "",
            ReceivedBySister: "",
            ReceptionStaffName: "",
            InchargeName: "",
            Remarks: "",
        });
        setIsViewMode(false);
    };

    
    useEffect(() => {

      const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
      const departmentType = IP_DoctorWorkbenchNavigation?.RequestType;

      
      if (RegistrationId) {
        axios.get(`${UrlLink}Ip_Workbench/IP_Mlc_Details_Link`,{
          params:{
            RegistrationId: RegistrationId,
            DepartmentType: departmentType,
            

          }})
            .then((res) => {
                const ress = res.data
                console.log(ress)
                setGridData(ress)
    
            })
            .catch((err) => {
                console.log(err);
            })
      }
    }, [UrlLink,IP_DoctorWorkbenchNavigation,IsGetData])
  
    
    

    const handleMlcChange = (e) => {
        const { name, value } = e.target;
        setMlc(prev => ({
          ...prev,
          [name]: value
        }));
      };



      const handleSubmit = () => {

        const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
        const DepartmentType = IP_DoctorWorkbenchNavigation?.RequestType;

        if (!RegistrationId) {
          dispatch({ type: 'toast', value: { message: 'Registration ID is missing', type: 'error' } });
          return;
      }
        console.log(IP_DoctorWorkbenchNavigation?.RegistrationId);
        
        const senddata={
            ...Mlc,
            RegistrationId,
            DepartmentType,
            Createdby:userRecord?.username,
            // Type:'Nurse'
            
        }

        console.log(senddata,'senddata');
        
        axios.post(`${UrlLink}Ip_Workbench/IP_Mlc_Details_Link`, senddata)
        .then((res) => {
            const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
            dispatch({ type: 'toast', value: { message, type } });
            setIsGetData(prev => !prev);
            handleClear();
            })
        .catch((err) => console.log(err));
        
    }







  return (
    <>
      <div className="Main_container_app">
        <div className="form-section5">
          <div className="common_center_tag">
            <h3>MLC Details</h3>
          </div>
          <br />

          <div className="RegisFormcon_1">
            {[
              { label: "MLC No", id: "MlcNo", type: "text" },
              { label: "MLC Info Date", id: "MlcInfoDate", type: "date" },
              { label: "MLC Info Time", id: "MlcInfoTime", type: "time" },
              { label: "Informed By", id: "InformedBy", type: "text" },
              { label: "MLC Send Time", id: "MlcSendTime", type: "time" },
              { label: "Reason", id: "Reason", type: "text" },
              { label: "Police Station Name", id: "PoliceStationName", type: "text" },
              { label: "Consultant Name", id: "ConsultantName", type: "text" },
              { label: "RMO Name", id: "RmoName", type: "text" },
              { label: "MLC Copy Receive Time", id: "MlcCopyReceiveTime", type: "time" },
              { label: "Received By Sister", id: "ReceivedBySister", type: "text" },
              { label: "Reception Staff Name", id: "ReceptionStaffName", type: "text" },
              { label: "Incharge Name", id: "InchargeName", type: "text" },
              { label: "Remarks", id: "Remarks", type: "textarea" },
            ].map((input) => (
              <div className="RegisForm_1" key={input.id}>
                <label htmlFor={input.id}>
                  {input.label} <span>:</span>
                </label>
                {input.type === "textarea" ? (
                  <textarea
                    id={input.id}
                    name={input.id}
                    onChange={handleMlcChange}
                    value={Mlc[input.id]}
                    required
                    readOnly={IsViewMode}

                  />
                ) : (
                  <input
                    type={input.type}
                    id={input.id}
                    name={input.id}
                    onChange={handleMlcChange}
                    value={Mlc[input.id]}
                    required
                    readOnly={IsViewMode}

                  />
                )}
              </div>
            ))}

            <div className="RegisForm_1">
              <label htmlFor="Type">Type <span>:</span></label>
              <select
                id="Type"
                name="Type"
                onChange={handleMlcChange}
                value={Mlc.Type}
                required
                readOnly={IsViewMode}
                disabled = {IsViewMode}
              >
                <option value="online" readOnly={IsViewMode}>Online</option>
                <option value="driver" readOnly={IsViewMode}>Driver</option>
              </select>
            </div>
          </div>
        </div>

        <div className="Main_container_Btn">
                
            {IsViewMode && (
                <button onClick={handleClear}>Clear</button>
            )}
            {!IsViewMode && (
                <button onClick={handleSubmit}>Submit</button>
            )}
        </div>

        {gridData.length >= 0 &&
            <ReactGrid columns={MlcColumns} RowData={gridData} />
        }

        <ToastAlert Message={toast.message} Type={toast.type} />

      </div>
    </>

  )
}

export default IP_NurseMlc;