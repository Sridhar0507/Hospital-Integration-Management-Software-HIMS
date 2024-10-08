import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import axios from 'axios';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';


const IP_Doc_PreoperativeChecklist = () => {
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

    const [selectedOption, setSelectedOption] = useState({
      Date: "",
      Time: "",
      OperativeArea: "",
      OperativeAreaRemarks: "",
      Operativeinspected: "",
      OperativeinspectedRemarks: "",
      JewelleryRemoved: "",
      JewelleryRemovedRemarks: "",
      JewelleryTied: "",
      JewelleryTiesRemarks: "",
      NasogastricTube: "",
      NasogastricTubeRemarks: "",
      Falsetooth: "",
      FalsetoothRemarks: "",
      ColouredNail: "",
      ColouredNailRemarks: "",
      HairPrepared: "",
      HairPreparedRemarks: "",
      VoidedOrCatheroized: "",
      VoidedOrCatheroizedRemarks: "",
      VoidedAmount: "",
      VoidedTime: "",
      VaginalDouche: "",
      VaginalDoucheRemarks: "",
      Allergies: "",
      AllergiesRemarks: "",
      BathTaken: "",
      BathTakenRemarks: "",
      BloodRequirement: "",
      BloodRequirementRemarks: "",
      ConsentForm: "",
      ConsentFormRemarks: "",
      MorningTPR: "",
      MorningTPRRemarks: "",
      MorningSample: "",
      MorningSampleRemarks: "",
      XRayFilms: "",
      XRayFilmsRemarks: "",
      PreanaestheticMedication: "",
      PreanaestheticMedicationRemarks: "",
      SideRails: "",
      SideRailsRemarks: "",
      PulseRate: "",
      RespRate: "",
      IdentificationWristlet: "",
      IdentificationWristletRemarks: "",
      SpecialDrug: "",
      DutySisterName: "",
  
  
  });

    const handleCheckboxChange = (name, option) => {
        setSelectedOption((prevData) => ({
          ...prevData,
          [name]: option,
        }));
    };
    
      const handleTextareaChange = (name, value) => {
        setSelectedOption((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleInputChange = (name, value) => {
      setSelectedOption((prev) => ({
        ...prev,
        [name]: value,
      }));
    };


    const renderSection = (label, name) => (
      <div className="OtMangementForm_1 djkwked675 dedwe">
        <label className="jewj33j">
          {label}
          <span>:</span>
        </label>
    
        {/* Check if the field is 'VoidedAmount' or 'VoidedTime' */}
        {name === "VoidedAmount" || name === "PulseRate" || name === "RespRate"? (
          <div className="EWFERYU7KUILP7">
            <textarea
              id={`${name}Textarea`}
              name={name}
              value={selectedOption[name]}
              readOnly={IsViewMode}
              onChange={(e) => handleTextareaChange(name, e.target.value)}
              disabled={IsViewMode}
              // placeholder={`Enter ${label.toLowerCase()}`}
            />
          </div>
        ) : name === "VoidedTime" ? (
          <div className="EWFERYU7KUILP7">
            <input
              type="time"
              id={`${name}Time`}
              name={name}
              value={selectedOption[name]}
              readOnly={IsViewMode}
              onChange={(e) => handleInputChange(name, e.target.value)}
              disabled={IsViewMode}
            />
          </div>
        ) : (
          <div className="OtMangementForm_1_checkbox">
            <label htmlFor={`${name}Yes`}>
              <input
                type="checkbox"
                id={`${name}Yes`}
                name={name}
                value="Yes"
                readOnly={IsViewMode}
                checked={selectedOption[name] === "Yes"}
                onChange={() => handleCheckboxChange(name, "Yes")}
                disabled={IsViewMode}
              />
              Yes
            </label>
            <label htmlFor={`${name}No`}>
              <input
                type="checkbox"
                id={`${name}No`}
                name={name}
                value="No"
                readOnly={IsViewMode}
                checked={selectedOption[name] === "No"}
                onChange={() => handleCheckboxChange(name, "No")}
                disabled={IsViewMode}
              />
              No
            </label>
    
            <div className="EWFERYU7KUILP7">
              <label>
                Remarks<span>:</span>
              </label>
              <textarea
                value={selectedOption[`${name}Remarks`]}
                readOnly={IsViewMode}
                onChange={(e) => handleTextareaChange(`${name}Remarks`, e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    );


    const PreOpColumns = [
      {
          key: 'id',
          name: 'S.No',
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
      
      // { key: 'VisitId', name: 'VisitId',frozen: true },
      // { key: 'PrimaryDoctorName', name: 'Doctor Name',frozen: true },
    
      {
          key: 'CurrDate',
          name: 'Date',
          frozen: true
      },
      {
          key: 'CurrTime',
          name: 'Time',
          frozen: true
      },
     
     
      
  ]


    
    const [gridData, setGridData] = useState([])
    const [IsGetData, setIsGetData] = useState(false)

    const [IsViewMode, setIsViewMode] = useState(false)
  
    
    // const handleView = (data) => {
    //     setSelectedOption({
    //         Date: data.Date || '',
    //         Time: data.Time || '',
    //         OperativeArea: data.OperativeArea || '',
    //         OperativeAreaRemarks: data.OperativeAreaRemarks || '',
    //         Operativeinspected: data.Operativeinspected || '',
    //         OperativeinspectedRemarks: data.OperativeinspectedRemarks || '',
    //         JewelleryRemoved: data.JewelleryRemoved || '',
    //         JewelleryRemovedRemarks: data.JewelleryRemovedRemarks || '',
    //         JewelleryTied: data.JewelleryTied || '',
    //         JewelleryTiesRemarks: data.JewelleryTiesRemarks || '',
    //         NasogastricTube: data.NasogastricTube || '',
    //         NasogastricTubeRemarks: data.NasogastricTubeRemarks || '',
    //         Falsetooth: data.Falsetooth || '',
    //         FalsetoothRemarks: data.FalsetoothRemarks || '',
    //         ColouredNail: data.ColouredNail || '',
    //         ColouredNailRemarks: data.ColouredNailRemarks || '',
    //         HairPrepared: data.HairPrepared || '',
    //         HairPreparedRemarks: data.HairPreparedRemarks || '',
    //         VoidedAmount: data.VoidedAmount || '',
    //         VoidedAmountRemarks: data.VoidedAmountRemarks || '',
    //         VoidedTime: data.VoidedTime || '',
    //         VoidedTimeRemarks: data.VoidedTimeRemarks || '',
    //         VaginalDouche: data.VaginalDouche || '',
    //         VaginalDoucheRemarks: data.VaginalDoucheRemarks || '',
    //         Allergies: data.Allergies || '',
    //         AllergiesRemarks: data.AllergiesRemarks || '',
    //         BathTaken: data.BathTaken || '',
    //         BathTakenRemarks: data.BathTakenRemarks || '',
    //         BloodRequirement: data.BloodRequirement || '',
    //         BloodRequirementRemarks: data.BloodRequirementRemarks || '',
    //         ConsentForm: data.ConsentForm || '',
    //         ConsentFormRemarks: data.ConsentFormRemarks || '',
    //         MorningTPR: data.MorningTPR || '',
    //         MorningTPRRemarks: data.MorningTPRRemarks || '',
    //         MorningSample: data.MorningSample || '',
    //         MorningSampleRemarks: data.MorningSampleRemarks || '',
    //         XRayFilms: data.XRayFilms || '',
    //         XRayFilmsRemarks: data.XRayFilmsRemarks || '',
    //         PreanaestheticMedication: data.PreanaestheticMedication || '',
    //         PreanaestheticMedicationRemarks: data.PreanaestheticMedicationRemarks || '',
    //         SideRails: data.SideRails || '',
    //         SideRailsRemarks: data.SideRailsRemarks || '',
    //         PulseRate: data.PulseRate || '',
    //         PulseRateRemarks: data.PulseRateRemarks || '',
    //         RespRate: data.RespRate || '',
    //         RespRateRemarks: data.RespRateRemarks || '',
    //         IdentificationWristlet: data.IdentificationWristlet || '',
    //         IdentificationWristletRemarks: data.IdentificationWristletRemarks || '',
    //         SpecialDrug: data.SpecialDrug || '',
    //         DutySisterName: data.DutySisterName || '',
    //     });
    //     setIsViewMode(true);
    // };
    



    const handleView = (data) => {
        setSelectedOption((prev) => ({
            ...prev,
            ...data // Spread the data object to update only changed values
        }));
        setIsViewMode(true);
    };

    
    
    const handleClear = () => {
        setSelectedOption({
            Date: '',
            Time: '',
            OperativeArea: '',
            OperativeAreaRemarks: '',
            Operativeinspected: '',
            OperativeinspectedRemarks: '',
            JewelleryRemoved: '',
            JewelleryRemovedRemarks: '',
            JewelleryTied: '',
            JewelleryTiesRemarks: '',
            NasogastricTube: '',
            NasogastricTubeRemarks: '',
            Falsetooth: '',
            FalsetoothRemarks: '',
            ColouredNail: '',
            ColouredNailRemarks: '',
            HairPrepared: '',
            HairPreparedRemarks: '',
            VoidedAmount: '',
            VoidedAmountRemarks: '',
            VoidedTime: '',
            VoidedTimeRemarks: '',
            VaginalDouche: '',
            VaginalDoucheRemarks: '',
            Allergies: '',
            AllergiesRemarks: '',
            BathTaken: '',
            BathTakenRemarks: '',
            BloodRequirement: '',
            BloodRequirementRemarks: '',
            ConsentForm: '',
            ConsentFormRemarks: '',
            MorningTPR: '',
            MorningTPRRemarks: '',
            MorningSample: '',
            MorningSampleRemarks: '',
            XRayFilms: '',
            XRayFilmsRemarks: '',
            PreanaestheticMedication: '',
            PreanaestheticMedicationRemarks: '',
            SideRails: '',
            SideRailsRemarks: '',
            PulseRate: '',
            PulseRateRemarks: '',
            RespRate: '',
            RespRateRemarks: '',
            IdentificationWristlet: '',
            IdentificationWristletRemarks: '',
            SpecialDrug: '',
            DutySisterName: '',
        });
        setIsViewMode(false);
    };
    
    
    useEffect(() => {
        
      const RegistrationId = IP_DoctorWorkbenchNavigation?.RegistrationId;
      const departmentType = IP_DoctorWorkbenchNavigation?.RequestType;

      if (RegistrationId) {
        axios.get(`${UrlLink}Ip_Workbench/IP_PreOpChecklist_Details_Link`,{
          params:{
            RegistrationId: RegistrationId,
            DepartmentType: departmentType
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
  
    
    //   const handleSubmit = () => {
        
    //     console.log(IP_DoctorWorkbenchNavigation?.RegistrationId);
        
    //     const senddata={
    //         ...selectedOption,
    //         RegistrationId:IP_DoctorWorkbenchNavigation?.RegistrationId,
    //         Createdby:userRecord?.username,
    //         Type:'Nurse'
            
    //     }

    //     console.log(senddata,'senddata');
        
    //     axios.post(`${UrlLink}Ip_Workbench/IP_PreOpChecklist_Details_Link`, senddata)
    //     .then((res) => {
    //         const [type, message] = [Object.keys(res.data)[0], Object.values(res.data)[0]];
    //         dispatch({ type: 'toast', value: { message, type } });
    //         setIsGetData(prev => !prev);
    //         handleClear();
    //         })
    //         .catch((err) => console.log(err));
        
    // }


    // const Checkbox = ({ id, name, value, checked, onChange, label }) => (
    //     <label htmlFor={id}>
    //       <input
    //         type="checkbox"
    //         id={id}
    //         name={name}
    //         value={value}
    //         checked={checked}
    //         onChange={onChange}
    //       />
    //       {label}
    //     </label>
    //   );
      
    //   const RemarksTextarea = ({ value, onChange }) => (
    //     <div className="EWFERYU7KUILP7">
    //       <label>
    //         Remarks<span>:</span>
    //       </label>
    //       <textarea value={value} onChange={onChange}></textarea>
    //     </div>
    //   );
      
      const InputField = ({ label, type, value, onChange }) => (
        <div className="OtMangementForm_1 djkwked675 dedwe">
          <label className="jewj33j">{label}:</label>
          <input type={type} value={value} onChange={onChange} />
        </div>
      );
      
      const headerStyle = {
        color: "var(--labelcolor)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "start",
        padding: "10px",
      };
      
      const inputStyle = {
        border: "none",
        borderBottom: "2px solid var(--ProjectColor)",
        outline: "none",
      };



  return (
    <>
        <div className="Main_container_app">
            
                <div className="Supplier_Master_Container">
                <div className="Print_ot_all_div_rfve">
                    <h4 style={headerStyle}>Ward Preoperative Checklist</h4>
                    <InputField
                    label="Date"
                    type="date"
                    readOnly={IsViewMode}
                    value={selectedOption.Date}
                    onChange={(e) =>
                        setSelectedOption((prevData) => ({
                        ...prevData,
                        Date: e.target.value,
                        }))
                    }
                    />
                    <InputField
                    label="Time"
                    type="time"
                    value={selectedOption.Time}
                    readOnly={IsViewMode}
                    onChange={(e) =>
                        setSelectedOption((prevData) => ({
                        ...prevData,
                        Time: e.target.value,
                        }))
                    }
                    />
                    {renderSection("1. Operative area prepared", "OperativeArea")}
                    {renderSection("2. Operative area inspected", "Operativeinspected")}
                    {renderSection("3. Jewellery Removed & handed over", "JewelleryRemoved")}
                    {renderSection("4. Jewellery Tied on", "JewelleryTied")}
                    {renderSection("5. False tooth removed", "Falsetooth")}
                    {renderSection(
                    "6. Coloured nail polish removed (from at least 2 fingers)",
                    "ColouredNail"
                    )}
                    {renderSection("7. Hair prepared / Hairpins removed", "HairPrepared")}
                    {renderSection("8. Nasogastric tube passed", "NasogastricTube")}
                    {renderSection("9. Voided or catheterized", "VoidedOrCatheroized")}
                    {renderSection("Amount", "VoidedAmount")}
                    {renderSection("Time", "VoidedTime")}
                    {renderSection(
                    "10. Vaginal douche / Bowel wash / Enema",
                    "VaginalDouche"
                    )}
                    {renderSection("11. Bath taken / Given", "BathTaken")}
                    {renderSection("12. Consent form signed & attached", "ConsentForm")}
                    {renderSection("13. Morning T.P.R. charted", "MorningTPR")}
                    {renderSection(
                    "14. Morning Urine / Blood sample sent Report on chart",
                    "MorningSample"
                    )}
                    {renderSection("15. X-ray films / CT Scan / MRI Films", "XRayFilms")}
                    {renderSection(
                    "16. Preanaesthetic medication Time",
                    "PreanaestheticMedication"
                    )}
                    {renderSection(
                    "17. Side rails applied after giving premedication",
                    "SideRails"
                    )}
                    {renderSection("18. Pulse rate after 30min of  premed", "PulseRate")}
                    {renderSection("19. Respiratory rate after 30 mins of premed", "RespRate")}
                    {renderSection("20. Identification wristlet applied", "IdentificationWristlet")}
                    <div className="OtMangementForm_1 djkwked675 dedwe ueuhuedj">
                    <label className="jewj33j hjwqhyss">
                        <p>19.</p> Special drugs / supplies being sent with patient (specify)
                        <span>:</span>
                    </label>
                    <div className="OtMangementForm_1_checkbox">
                        <textarea
                        className="hfdtrft5"
                        value={selectedOption.SpecialDrug}
                        readOnly={IsViewMode}
                        onChange={(e) =>
                            handleTextareaChange("SpecialDrug", e.target.value)
                        }
                        ></textarea>
                    </div>
                    </div>
                    <div className="OtMangementForm_1 djkwked675 dedwe">
                    <label className="jewj33j">Checked by (Duty Sister Name) - </label>
                    <input
                        type="text"
                        style={inputStyle}
                        value={selectedOption.DutySisterName}
                        readOnly={IsViewMode}
                        onChange={(e) =>
                        setSelectedOption((prevData) => ({
                            ...prevData,
                            DutySisterName: e.target.value,
                        }))
                        }
                    />
                    </div>
                </div>
                </div>
                <div className="Main_container_Btn">
            
                    {IsViewMode && (
                        <button onClick={handleClear}>Clear</button>
                    )}
                    {/* {!IsViewMode && (
                        <button onClick={handleSubmit}>Submit</button>
                    )} */}
                </div>

                {gridData.length >= 0 &&
                    <ReactGrid columns={PreOpColumns} RowData={gridData} />
                }

                <ToastAlert Message={toast.message} Type={toast.type} />

                
        </div>
    </>
    
  )
}

export default IP_Doc_PreoperativeChecklist;