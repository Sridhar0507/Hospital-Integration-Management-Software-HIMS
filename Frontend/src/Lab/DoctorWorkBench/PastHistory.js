import React, { useState, useEffect } from "react";
import "./Navigation.css";
import ToastAlert from '../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactGrid from '../OtherComponent/ReactGrid/ReactGrid';

import { ToastContainer, toast } from "react-toastify";
import { useDispatch,useSelector } from "react-redux";

import axios from 'axios';

function PastHistory() {
  const UrlLink = useSelector(state => state.userRecord?.UrlLink);
  const toast = useSelector(state => state.userRecord?.toast);
  const DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.DoctorWorkbenchNavigation);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const dispatch = useDispatch();


  

  const [PastHistoryform,setPastHistoryform]=useState({
    illnessordiseases:'No',
    illnessordiseasesText:'',
    surgerybefore:'No',
    surgerybeforeText:'',
    pressureorheartdiseases:'No',
    pressureorheartdiseasesText:'',
    stomachacidityproblem:'No',
    stomachacidityproblemText:'',
    allergicmedicine:'No',
    allergicmedicineText:'',
    drinkalcohol:'No',
    drinkalcoholText:'',
    smoke:'No',
    smokeText:'',
    diabetesorAsthmadisease:'No',
    diabetesorAsthmadiseaseText:'',
    localanesthesiabefore:'No',
    localanesthesiabeforeText:'',
    healthproblems:'No',
    healthproblemsText:'',
    regularbasis:'No',
    regularbasisText:'',
    allergicfood:'No',
    allergicfoodText:'',
    operativeinstuctions:'No',
    operativeinstuctionsText:'',
    Other:'',
  })


 

  const [gridData, setGridData] = useState([]);
  const [IsGetData, setIsGetData] = useState(false)
  const [IsViewMode, setIsViewMode] = useState(false)


  const PastHistorycolumns = [
    { key: 'id', name: 'S.No', frozen: true  },
    { key: 'VisitId', name: 'VisitId',frozen: true },
    { key: 'PrimaryDoctorId', name: 'PrimaryDoctorId',frozen: true },
    { key: 'PrimaryDoctorName', name: 'PrimaryDoctorName',frozen: true },
    { key: 'Date', name: 'Date',frozen: true },
    { key: 'Time', name: 'Time', frozen: true},
    { key: 'other', name: 'Other' },
    
    {
      key: 'view',
      name: 'View',
      renderCell: (params) => (
        <IconButton onClick={() => handleView(params.row)}>
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];



  useEffect(() => {
    axios.get(`${UrlLink}Workbench/Workbench_PastHistory_Details`,{params:{RegistrationId:DoctorWorkbenchNavigation?.pk}})
        .then((res) => {
            const ress = res.data
            console.log(ress)
            setGridData(ress)

        })
        .catch((err) => {
            console.log(err);
        })
  }, [UrlLink,DoctorWorkbenchNavigation,IsGetData])


 
  const handelOnchangeform =(e)=>{
    const {name,value}=e.target

    setPastHistoryform((pre)=>({
      ...pre,
      [name]:value,
    }))

  }

 // Handle setting the form data when viewing
const handleView = (data) => {
  setPastHistoryform({
      illnessordiseases: data.illnessordiseases || '',
      illnessordiseasesText: data.illnessordiseasesText || '',
      surgerybefore: data.surgerybefore || '',
      surgerybeforeText: data.surgerybeforeText || '',
      pressureorheartdiseases: data.pressureorheartdiseases || '',
      pressureorheartdiseasesText: data.pressureorheartdiseasesText || '',
      stomachacidityproblem: data.stomachacidityproblem || '',
      stomachacidityproblemText: data.stomachacidityproblemText || '',
      allergicmedicine: data.allergicmedicine || '',
      allergicmedicineText: data.allergicmedicineText || '',
      drinkalcohol: data.drinkalcohol || '',
      drinkalcoholText: data.drinkalcoholText || '',
      smoke: data.smoke || '',
      smokeText: data.smokeText || '',
      diabetesorAsthmadisease: data.diabetesorAsthmadisease || '',
      diabetesorAsthmadiseaseText: data.diabetesorAsthmadiseaseText || '',
      localanesthesiabefore: data.localanesthesiabefore || '',
      localanesthesiabeforeText: data.localanesthesiabeforeText || '',
      healthproblems: data.healthproblems || '',
      healthproblemsText: data.healthproblemsText || '',
      regularbasis: data.regularbasis || '',
      regularbasisText: data.regularbasisText || '',
      allergicfood: data.allergicfood || '',
      allergicfoodText: data.allergicfoodText || '',
      operativeinstuctions: data.operativeinstuctions || '',
      operativeinstuctionsText: data.operativeinstuctionsText || '',
      Other: data.other || '',
  });
  setIsViewMode(true);
};

// Handle clearing the form and resetting the view mode
const handleClear = () => {
  setPastHistoryform({
      illnessordiseases: '',
      illnessordiseasesText: '',
      surgerybefore: '',
      surgerybeforeText: '',
      pressureorheartdiseases: '',
      pressureorheartdiseasesText: '',
      stomachacidityproblem: '',
      stomachacidityproblemText: '',
      allergicmedicine: '',
      allergicmedicineText: '',
      drinkalcohol: '',
      drinkalcoholText: '',
      smoke: '',
      smokeText: '',
      diabetesorAsthmadisease: '',
      diabetesorAsthmadiseaseText: '',
      localanesthesiabefore: '',
      localanesthesiabeforeText: '',
      healthproblems: '',
      healthproblemsText: '',
      regularbasis: '',
      regularbasisText: '',
      allergicfood: '',
      allergicfoodText: '',
      operativeinstuctions: '',
      operativeinstuctionsText: '',
      Other: '',
  });
  setIsViewMode(false);
};



  
  const handleSubmit = () => {
    const dataToSend = {
      RegistrationId:DoctorWorkbenchNavigation?.pk,
      Created_By: userRecord?.username,
      ...PastHistoryform,
    };

    console.log(dataToSend,'dataToSend');

    axios.post(`${UrlLink}Workbench/Workbench_PastHistory_Details`, dataToSend)
      .then((res) => {
        const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
        dispatch({ type: 'toast', value: { message, type } });
        setIsGetData(prev =>!prev)
        handleClear();
                   
      })
      .catch((err) => console.log(err));

  };


  return (
    <>
   
      <div className="new-patient-registration-form">
        <div className="new-patient-info-container">
          <div className="new-custom-form-row width_pasthist">
            <label htmlFor="title" className="new-custom-label-title pasthist">
              Do you suffer from any illness or diseases ?
            </label>
            <div style={{display:'flex',gap:"20px"}}>
            <select
              id="Question 1 - cosmetic surgery"
              name="illnessordiseases"
              value={PastHistoryform.illnessordiseases}
              onChange={handelOnchangeform}
              className="new-custom-select-title"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

           
            <textarea
              className="area_pasthistory"
              id="Question 11 - Other"
              name="illnessordiseasesText"
              value={PastHistoryform.illnessordiseasesText}
              onChange={handelOnchangeform}
              disabled={PastHistoryform.illnessordiseases === "No"}
            ></textarea>
            </div>
          </div>
          <div className="new-custom-form-row width_pasthist">
            <label htmlFor="title" className="new-custom-label-title pasthist">
              Have you had any surgery before ?
            </label>
            <div style={{display:'flex',gap:"20px"}}>
            <select
              id="Question 2 - previous treatments adverse reaction"
              name="surgerybefore"
              value={PastHistoryform.surgerybefore}
              onChange={handelOnchangeform}
              className="new-custom-select-title"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <textarea
              className="area_pasthistory"
              id="Question 11 - Other"
              name="surgerybeforeText"
              value={PastHistoryform.surgerybeforeText}
              onChange={handelOnchangeform}
              disabled={PastHistoryform.surgerybefore === "No"}
            ></textarea>
            </div>
          </div>
        </div>
        <div className="new-patient-info-container">
          <div className="new-custom-form-row width_pasthist">
            <label htmlFor="title" className="new-custom-label-title pasthist">
              Did you have high blood pressure or heart diseases ?
            </label>
            <div style={{display:'flex',gap:"20px"}}>
            <select
              id="Question 3 - allergies to cosmetic products"
              name="pressureorheartdiseases"
              value={PastHistoryform.pressureorheartdiseases}
              onChange={handelOnchangeform}
              className="new-custom-select-title"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <textarea
              className="area_pasthistory"
              id="Question 11 - Other"
              name="pressureorheartdiseasesText"
              value={PastHistoryform.pressureorheartdiseasesText}
              onChange={handelOnchangeform}
              disabled={PastHistoryform.pressureorheartdiseases === "No"}
            ></textarea>
          </div>
          </div>

          <div className="new-custom-form-row width_pasthist">
            <label htmlFor="title" className="new-custom-label-title pasthist">
              Did you suffer from any stomach acidity problem ?
            </label>
            <div style={{display:'flex',gap:"20px"}}>
            <select
              id="Question 4 - On medications"
              name="stomachacidityproblem"
              value={PastHistoryform.stomachacidityproblem}
              onChange={handelOnchangeform}
              className="new-custom-select-title"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <textarea
              className="area_pasthistory"
              id="Question 11 - Other"
              name="stomachacidityproblemText"
              value={PastHistoryform.stomachacidityproblemText}
              onChange={handelOnchangeform}
              disabled={PastHistoryform.stomachacidityproblem === "No"}
            ></textarea>
          </div>
          </div>
        </div>
        <div className="new-patient-info-container">
          <div className="new-custom-form-row width_pasthist">
            <label htmlFor="title" className="new-custom-label-title pasthist">
              Are you allergic to any medicine ?
            </label>
            <div style={{display:'flex',gap:"20px"}}>
            <select
              id="Question 4 - On medications"
              name="allergicmedicine"
              value={PastHistoryform.allergicmedicine}
              onChange={handelOnchangeform}
              className="new-custom-select-title"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <textarea
              className="area_pasthistory"
              id="Question 5 - Allergies"
              name="allergicmedicineText"
              value={PastHistoryform.allergicmedicineText}
              onChange={handelOnchangeform}
              disabled={PastHistoryform.allergicmedicine === "No"}
            ></textarea>
          </div>
          </div>

          <div className="new-custom-form-row width_pasthist">
            <label htmlFor="title" className="new-custom-label-title pasthist">
              Do you drink alcohol ?
            </label>
            <div style={{display:'flex',gap:"20px"}}>
            <select
              id="Question 6 - Smoking Habits"
              className="new-custom-select-title"
              name="drinkalcohol"
              value={PastHistoryform.drinkalcohol}
              onChange={handelOnchangeform}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <textarea
              className="area_pasthistory"
              id="Question 5 - Allergies"
              name="drinkalcoholText"
              value={PastHistoryform.drinkalcoholText}
              onChange={handelOnchangeform}
              disabled={PastHistoryform.drinkalcohol === "No"}
            ></textarea>
          </div>
          </div>

        </div>
        <div className="new-patient-info-container">
          <div className="new-custom-form-row width_pasthist">
            
            <label htmlFor="title" className="new-custom-label-title pasthist">
              Do you smoke ?
            </label>
            <div style={{display:'flex',gap:"20px"}}>
            <select
              id="Question 6 - Smoking Habits"
              className="new-custom-select-title"
              name="smoke"
              value={PastHistoryform.smoke}
              onChange={handelOnchangeform}
            >
               <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <textarea
              className="area_pasthistory"
              id="Question 5 - Allergies"
              name="smokeText"
              value={PastHistoryform.smokeText}
              onChange={handelOnchangeform}
              disabled={PastHistoryform.smoke === "No"}
            ></textarea>
            </div>
          </div>
          <div className="new-custom-form-row width_pasthist">
            <label htmlFor="title" className="new-custom-label-title pasthist">
              Do you have diabetes/Asthma/any other disease ?
            </label>
            <div style={{display:'flex',gap:"20px"}}>
            <select
              id="Question 7 - Alcohol Consumptions"
              className="new-custom-select-title"
              name="diabetesorAsthmadisease"
              value={PastHistoryform.diabetesorAsthmadisease}
              onChange={handelOnchangeform}
            >
               <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <textarea
              className="area_pasthistory"
              id="Question 5 - Allergies"
              name="diabetesorAsthmadiseaseText"
              value={PastHistoryform.diabetesorAsthmadiseaseText}
              onChange={handelOnchangeform}
              disabled={PastHistoryform.diabetesorAsthmadisease === "No"}
            ></textarea>
          </div>
          </div>
        </div>
        <div className="new-patient-info-container">
          <div className="new-custom-form-row width_pasthist">
            <label htmlFor="title" className="new-custom-label-title pasthist">
             Have you had any local anesthesia before ?
            </label>
            <div style={{display:'flex',gap:"20px"}}>
            <select
              id="Question 8 - Pregnant"
              className="new-custom-select-title"
              name="localanesthesiabefore"
              value={PastHistoryform.localanesthesiabefore}
              onChange={handelOnchangeform}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <textarea
              className="area_pasthistory"
              id="Question 5 - Allergies"
              name="localanesthesiabeforeText"
              value={PastHistoryform.localanesthesiabeforeText}
              onChange={handelOnchangeform}
              disabled={PastHistoryform.localanesthesiabefore === "No"}
            ></textarea>
          </div>
          </div>

          <div className="new-custom-form-row width_pasthist">
            <label htmlFor="title" className="new-custom-label-title pasthist">
              Are you in medication for any health problems?
            </label>
            <div style={{display:'flex',gap:"20px"}}>
            <select
              id="Question 9 - breastfeeding"
              className="new-custom-select-title"
              name="healthproblems"
              value={PastHistoryform.healthproblems}
              onChange={handelOnchangeform}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <textarea
              className="area_pasthistory"
              id="Question 5 - Allergies"
              name="healthproblemsText"
              value={PastHistoryform.healthproblemsText}
              onChange={handelOnchangeform}
              disabled={PastHistoryform.healthproblems === "No"}
            ></textarea>
          </div>
          </div>
        </div>
        <div className="new-patient-info-container">
          <div className="new-custom-form-row width_pasthist">
            <label htmlFor="title" className="new-custom-label-title pasthist">
              Do you take any vitamin supplements or aspirin on regular basis ?
            </label>
            <div style={{display:'flex',gap:"20px"}}>
            <select
              id="Question 10 - Skin Type"
              className="new-custom-select-title"
              name="regularbasis"
              value={PastHistoryform.regularbasis}
              onChange={handelOnchangeform}
            >
               <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <textarea
              className="area_pasthistory"
              id="Question 5 - Allergies"
              name="regularbasisText"
              value={PastHistoryform.regularbasisText}
              onChange={handelOnchangeform}
              disabled={PastHistoryform.regularbasis === "No"}
            ></textarea>
          </div>
          </div>

          <div className="new-custom-form-row width_pasthist">
            <label htmlFor="title" className="new-custom-label-title pasthist">
             Are you allergic to any food ? <br/>
             please list all types of allergies if any
            </label>
            <div style={{display:'flex',gap:"20px"}}>
            <select
              id="Question 10 - Skin Type"
              className="new-custom-select-title"
              name="allergicfood"
              value={PastHistoryform.allergicfood}
              onChange={handelOnchangeform}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <textarea
              className="area_pasthistory"
              id="Question 11 - Other"
              name="allergicfoodText"
              value={PastHistoryform.allergicfoodText}
              onChange={handelOnchangeform}
              disabled={PastHistoryform.allergicfood === "No"}
            ></textarea>
          </div>
          </div>
        </div>
        <div className="new-patient-info-container">
          <div className="new-custom-form-row width_pasthist">
            <label htmlFor="title" className="new-custom-label-title pasthist">
              Have you received pre and post operative instuctions ?
            </label>
            <div style={{display:'flex',gap:"20px"}}>
            <select
              id="Question 10 - Skin Type"
              className="new-custom-select-title"
              name="operativeinstuctions"
              value={PastHistoryform.operativeinstuctions}
              onChange={handelOnchangeform}
            >
               <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <textarea
              className="area_pasthistory"
              id="Question 11 - Other"
              name="operativeinstuctionsText"
              value={PastHistoryform.operativeinstuctionsText}
              onChange={handelOnchangeform}
              disabled={PastHistoryform.operativeinstuctions === "No"}
            ></textarea>
            </div>
          </div>
          <div className="new-custom-form-row width_pasthist">
            <label htmlFor="title" className="new-custom-label-title pasthist">
              Other
            </label>
            <textarea
              className="area_pasthistory"
              id="Question 11 - Other"
              name="Other"
              value={PastHistoryform.Other}
              onChange={handelOnchangeform}
            ></textarea>
          </div>
        </div>
        {/* <div className="new-button-container">
          <button className="btncon_add prs-ad-sub-btn" onClick={handleSave}>
            Save
          </button>
        </div> */}
        <div className="Main_container_Btn">
            
          {IsViewMode && (
            <button onClick={handleClear}>Clear</button>
          )}
          {!IsViewMode && (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>

        {gridData.length > 0 &&
          <ReactGrid columns={PastHistorycolumns} RowData={gridData} />
        }

        <ToastAlert Message={toast.message} Type={toast.type} />


        {/* <ToastContainer /> */}
      </div>
    </>
  );
}

export default PastHistory;

