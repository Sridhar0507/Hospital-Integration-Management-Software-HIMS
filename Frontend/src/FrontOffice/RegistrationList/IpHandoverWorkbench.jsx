import React, { useState, useEffect, lazy, Suspense } from "react";
import "../../DoctorWorkBench/Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../DoctorWorkBench/TreatmentComponent.css";

const IpHandoverRoomDetials = lazy(() => import('./IpHandoverRoomDetials.jsx'));
const IpHandoverDetial = lazy(() => import('./IpHandoverDetial.jsx'));


const IpHandoverWorkbench = () => {
  const Registeredit = useSelector(state => state.Frontoffice?.Registeredit);


  const navigate = useNavigate();
  const [ActiveTab, setActiveTab] = useState('RoomChange')

  useEffect(() => {
    console.log(Registeredit);
    if (Object.keys(Registeredit).length === 0) {
      navigate('/Home/IpHandoverQue')
    }
  }, [Registeredit])

  return (

    <>
      <div className="Main_container_app">
        <div className="new-patient-registration-form">
          <br />
          <div className="dctr_info_up_head">
            <div className="RegisFormcon ">
              <div className="dctr_info_up_head22">

                <img src={Registeredit?.PatientProfile} alt="Default Patient Photo" />

                <label>Profile</label>
              </div>
            </div>

            <div className="RegisFormcon_1">
              <div className="RegisForm_1 ">
                <label htmlFor="PatientID">
                  Patient ID <span>:</span>
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="PatientID">
                  {Registeredit?.PatientId}
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="PatientName">
                  Patient Name <span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="PatientName">
                  {Registeredit?.PatientName}

                </span>
              </div>

              <div className="RegisForm_1 ">
                <label htmlFor="Age">
                  Age <span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="Age">
                  {Registeredit?.Age}
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="Gender">
                  Gender <span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="Gender">
                  {Registeredit?.Gender}
                </span>
              </div>
              <div className="RegisForm_1 ">
                <label htmlFor="Gender">
                  Blood Group <span>:</span>{" "}
                </label>
                <span className="dctr_wrbvh_pice" htmlFor="Gender">
                  {Registeredit?.BloodGroup}
                </span>
              </div>
            </div>
          </div>

          <br />
          <div className="RegisterTypecon">
            <div className="RegisterType">
              {["RoomChange", "HandoverDetials"].map((p, ind) => (
                <div className="registertypeval" key={ind}>
                  <input
                    type="radio"
                    id={p}
                    name="appointment_type"
                    checked={ActiveTab === p}
                    onChange={(e) => {
                      setActiveTab(e.target.value)

                    }}
                    value={p}
                  />
                  <label htmlFor={p}>
                    {p}
                  </label>
                </div>
              ))}
            </div>
          </div>

        </div>
        <Suspense fallback={<div>Loading...</div>}>

          {ActiveTab === "RoomChange" && <IpHandoverRoomDetials />}
          {ActiveTab === "HandoverDetials" && <IpHandoverDetial />}




        </Suspense>




      </div >

      

    </>
  );
}

export default IpHandoverWorkbench;

