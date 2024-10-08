import React, { useEffect, useState } from "react";
import "./DoctorCalendar.css";
import Months from "./Months";
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from "../../OtherComponent/ReactGrid/ReactGrid";
import axios from "axios";
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';


const DoctorCalender = () => {

  const UrlLink = useSelector(state => state.userRecord?.UrlLink);
  const DoctorListId = useSelector(state => state.userRecord?.DoctorListId);
 
  console.log('DoctorListttttt',DoctorListId);
  


  const [selectedOptioncalender, setSelectedOptioncalender] =
    useState("Monthly");
  const [DoctorDetails, setDoctorDetials] = useState(null);
  const handleCalenderOptionChange = (e) => {
    setSelectedOptioncalender(e.target.value);
  };

  useEffect (() =>{
    if (DoctorListId && DoctorListId.DoctorId){
      axios.get(`${UrlLink}Masters/doctor_Ratecard_details_view_by_doctor_id?DoctorId=${DoctorListId.DoctorId}`)
        .then((res)=>{
          const result = res.data
          console.log('Doctorrrrrrr',result);
          setDoctorDetials(result)
        })
        .catch((e)=>{
          console.log(e);
        })
    }
  },[UrlLink,DoctorListId]);


  return (
    <>
      <div className="Main_container_app">
        <h3>Doctor Calender</h3>
        <div className="common_center_tag">
          <span>Doctor Id : {DoctorDetails?.id}</span>
          <br />
          <span>Doctor Name : {DoctorDetails?.doctor_name}</span>
        </div>
        <Months />
      </div>
    </>
  );
};

export default DoctorCalender;
