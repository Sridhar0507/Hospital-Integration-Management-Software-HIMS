import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';



const ICU_Mlc = () => {

    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    const userRecord = useSelector(state => state.userRecord?.UserData);
    const toast = useSelector(state => state.userRecord?.toast);
    const dispatch = useDispatch();


    const IpNurseQueSelectedRow = {
        Booking_Id: '1001A',  // Replace with actual data or initialize as needed
        PatientId: '1',
        PatientName: 'diya'
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

    console.log(Mlc,'Mlccccccccc')

    const [MlcGet,setMlcGet] = useState(false);

    useEffect(() => {
        if (IpNurseQueSelectedRow?.Booking_Id) {
            axios.get(`http://127.0.0.1:8000/IP/Mlc_Details_Link?Booking_Id=${IpNurseQueSelectedRow.Booking_Id}`)
                .then((response) => {
                    const data = response.data[0];  // Assuming it returns an array with a single object
                    console.log("Fetched Mlc data:", data);

                    setMlc({
                        MlcNo: data?.MlcNo || '',
                        MlcInfoDate: data?.MlcInfoDate || '',
                        MlcInfoTime: data?.MlcInfoTime || '',
                        InformedBy: data?.InformedBy || '',
                        MlcSendTime: data?.MlcSendTime || '',
                        Reason: data?.Reason || '',
                        Type: data?.Type || '',
                        PoliceStationName: data?.PoliceStationName || '',
                        ConsultantName: data?.ConsultantName || '',
                        RmoName: data?.RmoName || '',
                        MlcCopyReceiveTime: data?.MlcCopyReceiveTime || '',
                        ReceivedBySister: data?.ReceivedBySister || '',
                        ReceptionStaffName: data?.ReceptionStaffName || '',
                        InchargeName: data?.InchargeName || '',
                        Remarks: data?.Remarks || '',
                    });

                    console.log("Fetched data:", data);
                })
                .catch((error) => {
                    console.log('Error fetching data:', error);
                })
                .finally(() => {
                    setMlcGet(false);
                });
        }
    }, [IpNurseQueSelectedRow?.Booking_Id, MlcGet]);  // Dependency array with IpNurseQueSelectedRow.Booking_Id


    const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

    const formatLabel = (label) => {
      if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
        return label
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .replace(/^./, (str) => str.toUpperCase());
      } else {
        return label;
      }
    };
  

    const handleMlcChange = (e) => {
        const { name, value } = e.target;
        setMlc(prev => ({
          ...prev,
          [name]: value
        }));
      };


      
  const handleDocVitalSubmit = () => {
    const requiredFields = [
      "MlcNo", "MlcInfoDate", "MlcInfoTime", "InformedBy", "MlcSendTime",
      "Reason", "Type", "PoliceStationName", "ConsultantName", "RmoName",
      "MlcCopyReceiveTime", "ReceivedBySister", "ReceptionStaffName", "InchargeName", 
      "Remarks"
     
    ];

    const missingFields = requiredFields.filter(field => !Mlc[field]);
    if (missingFields.length > 0) {
      alert(`Please fill empty fields: ${missingFields.join(", ")}`);
    } else {
      const Allsenddata = {
        ...Mlc,
        PatientId : IpNurseQueSelectedRow?.PatientId,
        Booking_Id : IpNurseQueSelectedRow?.Booking_Id,
        PatientName : IpNurseQueSelectedRow?.PatientName,
        Location: userRecord?.location || 'chennai',
        CreatedBy: userRecord?.username || 'admin',
        
      };

      axios.post(`${UrlLink}IP/Mlc_Details_Link`, Allsenddata)
        .then((res) => {
          const resData = res.data;

          const type = Object.keys(resData)[0];
          const message = Object.values(resData)[0];
          const toastData = {
            message: message,
            type: type,
          };

          dispatch({ type: 'toast', value: toastData });
          MlcGet(true);
         
         
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  return (
    <>
    <div className="Main_container_app">

      <div className="form-section5">
       

        <div className="RegisFormcon_1">
          <div className="RegisForm_1">
            <label htmlFor="MlcNo">MLC No <span>:</span></label>
            <input
              type="text"
              id="MlcNo"
              name="MlcNo"
              onChange={handleMlcChange}
              value={Mlc.MlcNo}
              required
            />
          </div>

          <div className="RegisForm_1">
            <label htmlFor="MlcInfoDate">MLC Info Date <span>:</span></label>
            <input
              type="date"
              id="MlcInfoDate"
              name="MlcInfoDate"
              onChange={handleMlcChange}
              value={Mlc.MlcInfoDate}
              required
            />
          </div>

          <div className="RegisForm_1">
            <label htmlFor="MlcInfoTime">MLC Info Time <span>:</span></label>
            <input
              type="time"
              id="MlcInfoTime"
              name="MlcInfoTime"
              onChange={handleMlcChange}
              value={Mlc.MlcInfoTime}
              required
            />
          </div>

          <div className="RegisForm_1">
            <label htmlFor="InformedBy">Informed By <span>:</span></label>
            <input
              type="text"
              id="InformedBy"
              name="InformedBy"
              onChange={handleMlcChange}
              value={Mlc.InformedBy}
              required
            />
          </div>

          <div className="RegisForm_1">
            <label htmlFor="MlcSendTime">MLC Send Time <span>:</span></label>
            <input
              type="time"
              id="MlcSendTime"
              name="MlcSendTime"
              onChange={handleMlcChange}
              value={Mlc.MlcSendTime}
              required
            />
          </div>

          <div className="RegisForm_1">
            <label htmlFor="Reason">Reason <span>:</span></label>
            <input
              type="text"
              id="Reason"
              name="Reason"
              onChange={handleMlcChange}
              value={Mlc.Reason}
              required
            />
          </div>

          <div className="RegisForm_1">
            <label htmlFor="Type">Type <span>:</span></label>
            <select
              id="Type"
              name="Type"
              onChange={handleMlcChange}
              value={Mlc.Type}
              required
            >
              <option value="online">Online</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          <div className="RegisForm_1">
            <label htmlFor="PoliceStationName">Police Station Name <span>:</span></label>
            <input
              type="text"
              id="PoliceStationName"
              name="PoliceStationName"
              onChange={handleMlcChange}
              value={Mlc.PoliceStationName}
              required
            />
          </div>

          <div className="RegisForm_1">
            <label htmlFor="ConsultantName">Consultant Name <span>:</span></label>
            <input
              type="text"
              id="ConsultantName"
              name="ConsultantName"
              onChange={handleMlcChange}
              value={Mlc.ConsultantName}
              required
            />
          </div>

          <div className="RegisForm_1">
            <label htmlFor="RmoName">RMO Name <span>:</span></label>
            <input
              type="text"
              id="RmoName"
              name="RmoName"
              onChange={handleMlcChange}
              value={Mlc.RmoName}
              required
            />
          </div>

          <div className="RegisForm_1">
            <label htmlFor="MlcCopyReceiveTime">MLC Copy Receive Time <span>:</span></label>
            <input
              type="time"
              id="MlcCopyReceiveTime"
              name="MlcCopyReceiveTime"
              onChange={handleMlcChange}
              value={Mlc.MlcCopyReceiveTime}
              required
            />
          </div>

          <div className="RegisForm_1">
            <label htmlFor="ReceivedBySister">Received By Sister <span>:</span></label>
            <input
              type="text"
              id="ReceivedBySister"
              name="ReceivedBySister"
              onChange={handleMlcChange}
              value={Mlc.ReceivedBySister}
              required
            />
          </div>

          <div className="RegisForm_1">
            <label htmlFor="ReceptionStaffName">Reception Staff Name <span>:</span></label>
            <input
              type="text"
              id="ReceptionStaffName"
              name="ReceptionStaffName"
              onChange={handleMlcChange}
              value={Mlc.ReceptionStaffName}
              required
            />
          </div>

          <div className="RegisForm_1">
            <label htmlFor="InchargeName">Incharge Name <span>:</span></label>
            <input
              type="text"
              id="InchargeName"
              name="InchargeName"
              onChange={handleMlcChange}
              value={Mlc.InchargeName}
              required
            />
          </div>

          <div className="RegisForm_1">
            <label htmlFor="Remarks">Remarks <span>:</span></label>
            <textarea
              id="Remarks"
              name="Remarks"
              onChange={handleMlcChange}
              value={Mlc.Remarks}
              required
            />
          </div>
        </div>
      </div>
    

    <div className="Main_container_Btn">
       <button className="RegisterForm_1_btns" onClick={handleDocVitalSubmit}>Submit</button>
     </div>
 

    </div>
    
    </>
  )
}

export default ICU_Mlc;