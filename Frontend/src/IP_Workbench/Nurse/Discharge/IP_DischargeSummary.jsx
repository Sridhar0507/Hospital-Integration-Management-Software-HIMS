import React, { useState, useEffect ,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import './IP_DischargeSummary.css';
import SignatureCanvas from "react-signature-canvas";
import { useReactToPrint } from "react-to-print";

import ReactGrid from '../../../OtherComponent/ReactGrid/ReactGrid';
import ToastAlert from '../../../OtherComponent/ToastContainer/ToastAlert';


const PrintContent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} id="reactprintcontent">
      {props.children}
    </div>
  );
});


const IP_DischargeSummary = () => {
    const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
    const IP_DoctorWorkbenchNavigation = useSelector((state) => state.Frontoffice?.IP_DoctorWorkbenchNavigation);
      
    console.log(IP_DoctorWorkbenchNavigation,'IP_DoctorWorkbenchNavigation');
    
    // const RadiologyWorkbenchNavigation = useSelector(state => state.Frontoffice?.RadiologyWorkbenchNavigation);
    const RadiologyWorkbenchNavigation = useSelector(state => state.Frontoffice?.RadiologyWorkbenchNavigation);
      
    console.log(RadiologyWorkbenchNavigation,'RadiologyWorkbenchNavigation');
    
    const pagewidth = useSelector(state => state.userRecord?.pagewidth);

    const [AssesmentData, setAssesmentData] = useState([]);
    const [PrescriptionData, setPrescriptionData] = useState([]);
    const [DamaData, setDamaData] = useState([]);
    const [DoctorData, setDoctorData] = useState([]);
    const [RadiologyData, setRadiologyData] = useState([])
    const [LabData, setLabData] = useState([])

    console.log(DoctorData,'DoctorData');
    

    const [currentDate, setCurrentDate] = useState("");

    const [finalDiagnosis, setFinalDiagnosis] = useState("");
    const [presentingComplaints, setPresentingComplaints] = useState("");
    const [vitals, setVitals] = useState("");
    const [treatmentGiven, setTreatmentGiven] = useState("");
    const [dischargeNotes, setDischargeNotes] = useState("");
    const [doctorSchedule, setDoctorSchedule] = useState("");
    
    const [Radiology, setRadiology] = useState("");
    const [Lab, setLab] = useState("");

    const [showDetails, setShowDetails] = useState(false);

    const componentRef = useRef();
    const [isPrintButtonVisible, setIsPrintButtonVisible] = useState(true);

  
    console.log(RadiologyData,'RadiologyData');


    // const [isPrintButtonVisible, setIsPrintButtonVisible] = useState(true);
    // const componentRef = useRef();


    useEffect(() => {
      // Get the current date
      const today = new Date();
      
      // Format the date (e.g., 'MM/DD/YYYY' or 'DD/MM/YYYY')
      const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  
      // Set the formatted date to state
      setCurrentDate(formattedDate);
    }, []);

    const [PatientDischargeData, setPatientDischargeData] = useState([])
    
    console.log(PatientDischargeData,'PatientDischargeData');

    
    const [expanded, setExpanded] = useState(false);
  
    const handleAccordionClick = () => {
      setExpanded(!expanded); // Toggle the expanded state when accordion is clicked
    };

    const signatureRef = useRef(null);
   
    const clearSignature = () => {
      signatureRef.current.clear();
    };
  
    const saveSignature = () => {
      console.log("Signature saved");
    };

    


      useEffect(() => {
        axios
          .get(`${UrlLink}Ip_Workbench/IP_Assesment_details_Link`, {
            params: {
              RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId,
            },
          })
          .then((res) => {
            const ress = res.data;
            console.log(res.data);
            setAssesmentData(ress);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [UrlLink,IP_DoctorWorkbenchNavigation?.RegistrationId]);
    


      useEffect(() => {
        if (AssesmentData.length > 0) {
          
          const latestFinalDiagnosis = AssesmentData[AssesmentData.length - 1].FinalDiagnosis;
          setFinalDiagnosis(latestFinalDiagnosis); 

          const latestAssessment = AssesmentData[AssesmentData.length - 1];

          // Set presenting complaints
          const presentingComplaintsData = ` ${latestAssessment.PresentingComplaints}\n\n` +
            ` ${latestAssessment.DetailsPresentingComplaints}\n\n` +
            ` ${latestAssessment.HistoryOf}`;
          setPresentingComplaints(presentingComplaintsData);

          // Set vitals
          const vitalsData = `Temperature: ${latestAssessment.Temperature}  ` +
            `PulseRate: ${latestAssessment.PulseRate}  ` +
            `SPO2: ${latestAssessment.SPO2}  ` +
            `HeartRate: ${latestAssessment.HeartRate}  ` +
            `RR: ${latestAssessment.RR}  ` +
            `BP: ${latestAssessment.BP}  ` +
            `Height: ${latestAssessment.Height}  ` +
            `Weight: ${latestAssessment.Weight}  ` +
            `BMI: ${latestAssessment.BMI}  ` +
            `WC: ${latestAssessment.WC}  ` +
            `HC: ${latestAssessment.HC}  ` +
            `BSL: ${latestAssessment.BSL}  \n\n` +
            `Cvs: ${latestAssessment.Cvs} \n\n` +
            `Pupil: ${latestAssessment.Pupil} \n\n` +
            `Ul Rt: ${latestAssessment.UlRt}, Ul Lt: ${latestAssessment.UlLt}, ` +
            `Ll Rt: ${latestAssessment.LlRt}, Ll Lt: ${latestAssessment.LlLt}, ` +
            `Rt: ${latestAssessment.Rt}, Lt: ${latestAssessment.Lt} \n\n` +
            `Rs: ${latestAssessment.Rs}  \n\n` +
            `Pa: ${latestAssessment.Pa}  \n\n` +
            `Cns: ${latestAssessment.Cns}`;
          setVitals(vitalsData);

          // Set treatment given
          setTreatmentGiven(latestAssessment.TreatmentGiven);
        
        
        }
      }, [AssesmentData]);



      const handleDiagnosisChange = (event) => {
        setFinalDiagnosis(event.target.value);
      };

      useEffect(() => {
        if (RadiologyData.length > 0) {
            const allRadiologyDetails = RadiologyData.map((entry, index) => {
                return (
                    `Date: ${entry.ReportDate || 'N/A'}  ` +
                    `Test Name: ${entry.TestName || 'N/A'}  ` +
                    `SubTest Name: ${entry.SubTestName || 'N/A'}  ` +
                    `Report: ${entry.Report || 'No report available'}  \n` 
                );
            }).join('');  // Combine all records into one string
    
            setRadiology(allRadiologyDetails); // Update state with the formatted details
        }
    }, [RadiologyData]);
    
     
    useEffect(() =>{
      if(LabData.length > 0){
        const LabReportDetails = LabData.map((entry,indx) => {
          return(
            `Date: ${entry.report_date || 'N/A'}  `+
            `Test Name: ${entry.test_name || 'N/A'}  `+
            `Value: ${entry.value || 'N/A'}  \n`
          );
        }).join('');
        setLab(LabReportDetails);
      }
    },[LabData]);

    const LabColumns = [
      {
          key: 'id',
          name: 'S.No',
          frozen: true
      },
    
      {
          key: 'test_name',
          name: 'test_name',
          frozen: true
      },
      
      {
          key: 'value',
          name: 'value',
      },
    
      {
          key: 'report_date',
          name: 'report_date',
      },
      {
          key: 'report_time',
          name: 'report_time',
      },
    
  ]

    const prepareTableData = () => {
      const tableData = {};
      const uniqueDates = new Set();
  
      LabData.forEach(item => {
          const { report_date, test_name, value } = item;
  
          // Add the date to the uniqueDates set
          uniqueDates.add(report_date);
  
          // Initialize the row for test_name if it doesn't exist
          if (!tableData[test_name]) {
              tableData[test_name] = {};
          }
  
          // Assign the value for the test_name and report_date
          tableData[test_name][report_date] = value || 'N/A';  // Set 'N/A' if value is empty
      });
  
      return { tableData, uniqueDates: Array.from(uniqueDates) };
  };
  
  // Prepare tableData and uniqueDates
  const { tableData, uniqueDates } = prepareTableData();
  


  useEffect(() => {
        axios
          .get(`${UrlLink}Ip_Workbench/IP_ProgressNotes_Details_Link`, {
            params: {
              RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId,
            },
          })
          .then((res) => {
            const ress = res.data;
            console.log(res.data,'Prescription');
            setPrescriptionData(ress);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [UrlLink,IP_DoctorWorkbenchNavigation?.RegistrationId]);
      
      useEffect(() => {
        axios
          .get(`${UrlLink}Ip_Workbench/IP_Dama_Details_Link`, {
            params: {
              RegistrationId: IP_DoctorWorkbenchNavigation?.RegistrationId,
            },
          })
          .then((res) => {
            const ress = res.data;
            console.log(res.data,'Dama');
            setDamaData(ress);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [UrlLink,IP_DoctorWorkbenchNavigation?.RegistrationId]);


    
      // useEffect(() => {
      //   let combinedNotes = "";
        
      //   // Include Dama Data
      //   if (DamaData.length > 0) {
      //     const damaNotes = DamaData.map(
      //       (dama) => `Reasons for DAMA: ${dama.Reasons}\n\n`
      //     ).join("\n");

      //     combinedNotes += `\n\n${damaNotes}`;
      //   }
      //   // Include Prescription Data
      //   if (PrescriptionData.length > 0) {
      //     const notes = PrescriptionData.map(
      //       (prescription) =>
      //         ` ${prescription.ProgressNotes}\n\n ${prescription.TreatmentNotes}`
      //     ).join("\n\n");
    
      //     combinedNotes += notes;
      //   }
    
       
    
      //   setDischargeNotes(combinedNotes);

      // }, [PrescriptionData, DamaData]);


      useEffect(() => {
        let combinedNotes = "";
        
        // Get the last element from DamaData if available
        if (DamaData.length > 0) {
            const lastDama = DamaData[DamaData.length - 1];
            const damaNotes = `Reasons for DAMA: ${lastDama.Reasons}\n\n`;
            combinedNotes += `\n\n${damaNotes}`;
        }
    
        // Get the last element from PrescriptionData if available
        if (PrescriptionData.length > 0) {
            const lastPrescription = PrescriptionData[PrescriptionData.length - 1];
            const notes = ` ${lastPrescription.ProgressNotes}\n\n ${lastPrescription.TreatmentNotes}`;
            combinedNotes += notes;
        }
    
        setDischargeNotes(combinedNotes);
    
    }, [PrescriptionData, DamaData]);
    

      useEffect(() => {
        axios.get(`${UrlLink}Ip_Workbench/IP_DischargeRequest_Details_Link`,{params:{RegistrationId:IP_DoctorWorkbenchNavigation?.RegistrationId}})
            .then((res) => {
                const ress = res.data;
                console.log(ress,'resssss');
                setPatientDischargeData(ress);
               
            })
            .catch((err) => {
                console.log(err);
            });
      }, [UrlLink]);

      
      useEffect(() => {
        if (IP_DoctorWorkbenchNavigation?.DoctorId) { // Check if DoctorId exists
          axios
            .get(`${UrlLink}Masters/get_DoctorSchedule_details`, {
              params: { DoctorId: IP_DoctorWorkbenchNavigation.DoctorId }, // Correct path for DoctorId
            })
            .then((res) => {
              const ress = res.data;
              console.log(ress, 'Doctor details');
              setDoctorData(ress);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }, [UrlLink, IP_DoctorWorkbenchNavigation?.DoctorId]); // Add DoctorId to dependencies
  
      
      
     //Radiology Details.......................
      

      useEffect(() => {
        if (IP_DoctorWorkbenchNavigation?.pk) { // Ensure pk exists
            const params = {
                Register_Id: IP_DoctorWorkbenchNavigation.pk,
                RegisterType: "IP"
            };

            axios.get(`${UrlLink}OP/Radiology_Complete_Details_Link`, { params })
                .then((res) => {
                    const ress = res.data;
                    console.log("Response Data:", ress);
                    setRadiologyData(ress); // Update state with the response
                })
                .catch((err) => {
                    console.error("Error fetching data:", err);
                });
        }
    }, [UrlLink, IP_DoctorWorkbenchNavigation?.pk]); // Add pk to the dependency array






      useEffect(() => {
          if (IP_DoctorWorkbenchNavigation?.DoctorId) {
              axios
                  .get(`${UrlLink}Masters/get_DoctorSchedule_details`, {
                      params: { DoctorId: IP_DoctorWorkbenchNavigation.DoctorId },
                  })
                  .then((res) => {
                      const ress = res.data.DoctorScheduleForm.Schedule;
                      console.log(ress, 'Doctor details');
                      setDoctorData(ress);
                      
                      // Format the schedule for display, showing only working days
                      const formattedSchedule = ress
                      .filter(schedule => schedule.working === 'yes') // Filter out only 'yes' working days
                      .map(schedule => {
                        const workingTime = ` ${schedule.starting_time} to ${schedule.ending_time}`;
                        return `${schedule.days}: ${workingTime}`;
                      })
                      .join("\n"); // Join the formatted schedule for multiple days

                      setDoctorSchedule(formattedSchedule); // Update state with formatted schedule
                  })
                  .catch((err) => {
                      console.log(err);
                  });
          }
      }, [UrlLink, IP_DoctorWorkbenchNavigation?.DoctorId]);




      useEffect(() => {
        // Define the params object to include RegistrationId
        const params = {
            Register_Id: IP_DoctorWorkbenchNavigation?.RegistrationId,
            RegisterType: "IP"
        };
    
        axios.get(`${UrlLink}OP/lab_report_details_view`, { params })
            .then((res) => {
                console.log("Response Lab Report:", res.data);
                
                // Extract report date
                const rawReportDate = res.data.lab_report_entry.report_date;
                const rawReportTime = res.data.lab_report_entry.report_time;
                const dateObject = new Date(rawReportDate);
                const formattedDate = dateObject.toISOString().split('T')[0]; // "YYYY-MM-DD"
        
                // Combine individual tests and favorite tests
                const combinedTests = [
                  ...res.data.individual_tests.map((test, idx) => ({
                    id: idx + 1,  // Add index for S.No
                    test_name: test.test_name,
                    value: test.value || 'N/A',
                    report_date: formattedDate,
                    report_time: rawReportTime
                  })),
                  ...res.data.favourite_tests.map((fav, idx) => ({
                    id: res.data.individual_tests.length + idx + 1, // Continue the S.No after individual tests
                    test_name: fav.test_name,
                    value: fav.value || 'N/A',
                    report_date: formattedDate,
                    report_time: rawReportTime

                  }))
                ];
    
                // Update state with combined tests
                setLabData(combinedTests);
    
               
    
                console.log("Combined Tests:", combinedTests);
            })
            .catch((err) => {
                console.error("Error fetching lab report details:", err);
            });
    }, [UrlLink, IP_DoctorWorkbenchNavigation?.RegistrationId]);

    


  // const handlePrint = useReactToPrint({
      //     setShowDetails(true),
      //     content: () => componentRef.current,
      // });


    

  const handlePrint2 = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: async () => {
      // Additional action after printing, if needed
    },
  });
  const Submitalldata = () => {
    setIsPrintButtonVisible(false);
    setTimeout(() => {
      handlePrint2();
      setIsPrintButtonVisible(true); // Resetting print button visibility
    }, 500); 
  };

    

      
  return (
    <>
    {isPrintButtonVisible ? (
      <>
      <div className="Main_container_app">

      {/* Patient Details */}

      <br/>

          {/* Final Diagnosis */}

          <div className="RegisFormcon_1">

            <div className="text_adjust">
              <label htmlFor="finalDiagnosis">
                Final Diagnosis <span>:</span>{" "}
              </label>
              <textarea
                name="finalDiagnosis"
                id="finalDiagnosis"
                value={finalDiagnosis}
                onChange={handleDiagnosisChange}
              />

            </div> 


          </div>

          {/* H/O Present Illness */}

          <div className="RegisFormcon_1">
            <div className="Otdoctor_intra_Con_2">
              <div className="common_center_tag">
                <span> H/O Present Illness</span>
              </div>
              
              <textarea
                name="combinedField"
                id="combinedField"
                value={presentingComplaints}
                onChange={(e) => setPresentingComplaints(e.target.value)}
                
              />
            </div>
          </div>

          {/* On Admission Examination */}

          <div className="RegisFormcon_1">

            <div className="Otdoctor_intra_Con_2">
              <div className="common_center_tag">
                <span> On admission examination</span>
              </div>
              
              <textarea
                name="OnAdmissionExamination"
                id="OnAdmissionExamination"
                value={vitals}
                onChange={(e) => setVitals(e.target.value)}
              />
              

            </div> 


          </div>

          {/* Radiology Details */}

          <div className="RegisFormcon_1">

            <div className="Otdoctor_intra_Con_2">
              <div className="common_center_tag">
                <span> Radiology Details</span>
              </div>
              
              <textarea
                name="RadiologyDetails"
                id="RadiologyDetails"
                value={Radiology}
                onChange={(e) => setRadiology(e.target.value)}
                rows={10} // Optional: Adjust rows for better display
                style={{ width: '100%' }} // Optional: Full width textarea
              />
              

            </div> 


          </div>
         
         {/* Lab Details */}

         {/* <div className="RegisFormcon_1">

            <div className="Otdoctor_intra_Con_2">
              <div className="common_center_tag">
                <span>Lab Details</span>
              </div>
              
              <textarea
                name="LabDetails"
                id="LabDetails"
                value={Lab}
                onChange={(e) => setLab(e.target.value)}
                rows={10} // Optional: Adjust rows for better display
                style={{ width: '100%' }} // Optional: Full width textarea
              />
              

            </div> 


          </div> */}

          {/* <div className="RegisFormcon_1">
            <div className="Otdoctor_intra_Con_2">
                <div className="common_center_tag">
                    <span>Lab Details</span>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Test Name</th>
                            <th>Value</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {LabData.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.test_name || 'N/A'}</td>
                                <td>{entry.value || 'N/A'}</td>
                                <td>{entry.report_date || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div> */}


        
        <div className="RegisFormcon_1">
            <div className="Otdoctor_intra_Con_2">
                <div className="common_center_tag">
                    <span>Lab Details</span>
                </div>
                {LabData.length >= 0 &&
            <ReactGrid columns={LabColumns} RowData={LabData} />
        }
            </div>
        </div>


          {/* <div className="RegisFormcon_1">
            <div className="Otdoctor_intra_Con_2">
                <div className="common_center_tag">
                    <span>Lab Details</span>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
        <thead>
            <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>Test Name</th>
                {uniqueDates.map((date, index) => (
                    <th key={index} style={{ border: '1px solid black', padding: '8px' }}>{date}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {Object.keys(tableData).map((testName, index) => (
                <tr key={index}>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{testName}</td>
                    {uniqueDates.map((date, idx) => (
                        <td key={idx} style={{ border: '1px solid black', padding: '8px' }}>
                            {tableData[testName][date] || 'N/A'}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>

            </div>
        </div> */}
         
         


          {/* <div className="RegisFormcon_1">
            <div className="Otdoctor_intra_Con_2">
                <div className="common_center_tag">
                    <span>Lab Details</span>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Test Name</th>
                            {uniqueDates.map(date => (
                                <th key={date}>{date}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(tableData).map(([test_name, dates]) => (
                            <tr key={test_name}>
                                <td>{test_name}</td>
                                {uniqueDates.map(date => (
                                    <td key={date} style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                                        {dates[date] !== undefined ? dates[date] : '-'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div> */}



          {/* Treatment Given */}

          <div className="RegisFormcon_1">

            <div className="text_adjust">
              <label htmlFor="finalDiagnosis">
              Treatment Given <span>:</span>{" "}
              </label>
              <textarea
                name="finalDiagnosis"
                id="finalDiagnosis"
                value={treatmentGiven}
                onChange={(e) => setTreatmentGiven(e.target.value)}
              />

            </div> 


          </div>


          {/* Prescription - Progress Notes */}
          {/* Course in Ward */}
        
          <div className="RegisFormcon_1">

            <div className="Otdoctor_intra_Con_2">
              <div className="common_center_tag">
                <span> Course in Ward</span>
              </div>
              
              <textarea
                name="notes"
                id="notes"
                value={dischargeNotes}
                onChange={(e) => setDischargeNotes(e.target.value)}
              />


            </div> 


          </div>

          {/* Condition on Discharge */}
          <div className="RegisFormcon_1">
            <div className="text_adjust">
              
              <label htmlFor="ConditionDischarge">
              Condition On Discharge <span>:</span>{" "}
              </label>
              
              <textarea
                name="ConditionDischarge"
                id="ConditionDischarge"
                
              />


            </div> 
          </div>

          {/* Follow Up  */}

          <div className="RegisFormcon_1">
            <div className="text_adjust">
              
              <label htmlFor="Followup">
              Follow Up<span>:</span>{" "}
              </label>
              
              <textarea
                name="Followup"
                id="Followup"
                
              />

                <label htmlFor="followupDate">
                    Followup Date <span>:</span>
                  </label>
                  <input
                    type="date"
                    id="followupDate"
                    name="followupDate"
                    

                  />
              
            </div> 
            
          </div>

          {/* Advise on Discharge  */}

          <div className="RegisFormcon_1">
            <div className="text_adjust">
              
              <label htmlFor="AdviseonDischarge">
              Advise on Discharge<span>:</span>{" "}
              </label>
              
              <textarea
                name="AdviseonDischarge"
                id="AdviseonDischarge"
                
              />
            </div> 
          </div>

          {/* Dcotors Schedule  */}


          <div className="RegisFormcon_1">
            <div className="text_adjust">
              <label htmlFor="finalDiagnosis">
                Doctor Schedule <span>:</span>{" "}
              </label>
                
                
                <textarea
                    name="doctorSchedule"
                    id="doctorSchedule"
                    value={doctorSchedule} // Use doctorSchedule here
                    // onChange={(e) => setDoctorSchedule(e.target.value)} // Optional: If you want users to edit
                />
            </div>
          </div>


          {/* Advise on Discharge  */}

          <div className="RegisFormcon_1">
            <div className="text_adjust">
              
              <label htmlFor="OtherClinic">
              Other Clinic OPD Contact<span>:</span>{" "}
              </label>
              
              <textarea
                name="OtherClinic"
                id="OtherClinic"
                
              />
            </div> 
          </div>

          <div className="RegisForm_1 signature-align">
                <div className="">
                  <div>
                    <SignatureCanvas
                      ref={signatureRef}
                      penColor="black"
                      canvasProps={{
                        width: 190,
                        height: 100,
                        className: "sigCanvas2",
                        
                      }}
                    />
                  </div>
                  <h5 style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>Signature</h5>

                  <div className="Register_btn_con">
                    <button className="RegisterForm_1_btns" onClick={clearSignature}>
                      Clear
                    </button>
                    <button className="RegisterForm_1_btns" onClick={saveSignature}>
                      Save
                    </button>
                  </div>

                </div>


          </div>
            <br/><br/>

            {isPrintButtonVisible && (

              <div className="Main_container_Btn">
                  <button onClick={Submitalldata}>Print</button>
              </div>

              )}

           
{/* 
      <div className="Main_container_Btn">
          <button onClick={handlePrint2}>Print</button>
      </div> */}

      </div>

   
</>
    ) : (

      <>

        {/* Patient Details */}

      




        <PrintContent
            ref={componentRef}
            style={{
              marginTop: "50px",
              display: "flex",
              justifyContent: "center",
            }}

          //   willReadFrequently={true}
          >

          {/* {showDetails && ( */}
          <div className="Print_ot_all_div" id="reactprintcontent">


              <div className="patient_basic_details">
                <div>
                  
                  <div className="align_label">
                    <label htmlFor="PatientName">
                      Patient Name <span>:</span>{" "}
                    </label>
                    <span className="patient_labels" htmlFor="PatientName">
                      {IP_DoctorWorkbenchNavigation?.PatientName}

                    </span>

                  </div><br/>

                  <div className="align_label">
                    <label htmlFor="Age">
                      Age <span>:</span>{" "}
                    </label>
                    <span className="patient_labels" htmlFor="Age">
                      {IP_DoctorWorkbenchNavigation?.Age}
                    </span>
                  </div><br/>

                  <div className="align_label">
                    <label htmlFor="Age">
                      Gender <span>:</span>{" "}
                    </label>
                    <span className="patient_labels" htmlFor="Gender">
                      {IP_DoctorWorkbenchNavigation?.Gender}
                    </span>
                  </div><br/>

                  <div className="align_label">
                    <label htmlFor="BedNo">
                      Bed No <span>:</span>{" "}
                    </label>
                    <span className="patient_labels" htmlFor="BedNo">
                      {IP_DoctorWorkbenchNavigation?.BedNo}
                    </span>
                  </div><br/>

                  <div className="align_label">
                    <label htmlFor="Age">
                    PhoneNo <span>:</span>{" "}
                    </label>
                    <span className="patient_labels" htmlFor="PhoneNo">
                      {IP_DoctorWorkbenchNavigation?.PhoneNo}
                    </span>
                  </div><br/>

                  <div className="align_label">
                    <label htmlFor="Address">
                    Address <span>:</span>{" "}
                    </label>
                    <span className="patient_labels" htmlFor="Address">
                      {IP_DoctorWorkbenchNavigation?.Address}
                    </span>
                  </div><br/>

                </div>

                <div>
                    <div className="align_label">
                      <label htmlFor="RegistrationId">
                      In Patient No <span>:</span>{" "}
                      </label>
                      <span className="patient_labels" htmlFor="RegistrationId">
                        {IP_DoctorWorkbenchNavigation?.RegistrationId}
                      </span>
                    </div><br/>

                    <div className="align_label">
                      <label htmlFor="CurrDate">
                      Admit Date <span>:</span>{" "}
                      </label>
                      <span className="patient_labels" htmlFor="CurrDate">
                        {IP_DoctorWorkbenchNavigation?.CurrDate}
                      </span>
                    </div><br/>

                    <div className="align_label">
                      <label htmlFor="CurrTime">
                      Time <span>:</span>{" "}
                      </label>
                      <span className="patient_labels" htmlFor="CurrTime">
                        {IP_DoctorWorkbenchNavigation?.CurrTime}
                      </span>
                    </div><br/>

                    <div className="align_label">
                      <label htmlFor="CurrDate">
                      Discharge date <span>:</span>{" "}
                      </label>
                      <span className="patient_labels" htmlFor="CurrDate">
                        {currentDate}
                      </span>
                    </div><br/>

                    <div className="align_label">
                      <label htmlFor="DoctorName">
                      Primary Dr Name <span>:</span>{" "}
                      </label>
                      <span className="patient_labels" htmlFor="DoctorName">
                        {IP_DoctorWorkbenchNavigation?.DoctorName}
                      </span>
                    </div><br/>


                  



                </div>
              </div>
          {/* )} */}

          
            {/* Final Diagnosis */}

            <div className="RegisFormcon_1">

              <div className="text_adjust">
                <label htmlFor="finalDiagnosis">
                  Final Diagnosis <span>:</span>{" "}
                </label>
                <textarea
                  name="finalDiagnosis"
                  id="finalDiagnosis"
                  value={finalDiagnosis}
                  onChange={handleDiagnosisChange}
                />

              </div> 


            </div>

            {/* H/O Present Illness */}

            <div className="RegisFormcon_1">
              <div className="Otdoctor_intra_Con_2">
                <div className="common_center_tag">
                  <span> H/O Present Illness</span>
                </div>
                
                <textarea
                  name="combinedField"
                  id="combinedField"
                  value={presentingComplaints}
                  onChange={(e) => setPresentingComplaints(e.target.value)}
                  
                />
              </div>
            </div>

            {/* On Admission Examination */}

            <div className="RegisFormcon_1">

              <div className="Otdoctor_intra_Con_2">
                <div className="common_center_tag">
                  <span> On admission examination</span>
                </div>
                
                <textarea
                  name="OnAdmissionExamination"
                  id="OnAdmissionExamination"
                  value={vitals}
                  onChange={(e) => setVitals(e.target.value)}
                />
                

              </div> 


            </div>

            {/* Treatment Given */}

            <div className="RegisFormcon_1">

              <div className="text_adjust">
                <label htmlFor="finalDiagnosis">
                Treatment Given <span>:</span>{" "}
                </label>
                <textarea
                  name="finalDiagnosis"
                  id="finalDiagnosis"
                  value={treatmentGiven}
                  onChange={(e) => setTreatmentGiven(e.target.value)}
                />

              </div> 


            </div>


            {/* Prescription - Progress Notes */}
            {/* Course in Ward */}
          
            <div className="RegisFormcon_1">

              <div className="Otdoctor_intra_Con_2">
                <div className="common_center_tag">
                  <span> Course in Ward</span>
                </div>
                
                <textarea
                  name="notes"
                  id="notes"
                  value={dischargeNotes}
                  onChange={(e) => setDischargeNotes(e.target.value)}
                />


              </div> 


            </div>

            {/* Condition on Discharge */}
            <div className="RegisFormcon_1">
              <div className="text_adjust">
                
                <label htmlFor="ConditionDischarge">
                Condition On Discharge <span>:</span>{" "}
                </label>
                
                <textarea
                  name="ConditionDischarge"
                  id="ConditionDischarge"
                  
                />


              </div> 
            </div>

            {/* Follow Up  */}

            <div className="RegisFormcon_1">
              <div className="text_adjust">
                
                <label htmlFor="Followup">
                Follow Up<span>:</span>{" "}
                </label>
                
                <textarea
                  name="Followup"
                  id="Followup"
                  
                />

                  <label htmlFor="followupDate">
                      Followup Date <span>:</span>
                    </label>
                    <input
                      type="date"
                      id="followupDate"
                      name="followupDate"
                      

                    />
                
              </div> 
              
            </div>

            {/* Advise on Discharge  */}

            <div className="RegisFormcon_1">
              <div className="text_adjust">
                
                <label htmlFor="AdviseonDischarge">
                Advise on Discharge<span>:</span>{" "}
                </label>
                
                <textarea
                  name="AdviseonDischarge"
                  id="AdviseonDischarge"
                  
                />
              </div> 
            </div>

            {/* Dcotors Schedule  */}


            <div className="RegisFormcon_1">
              <div className="text_adjust">
                <label htmlFor="finalDiagnosis">
                  Doctor Schedule <span>:</span>{" "}
                </label>
                  
                  
                  <textarea
                      name="doctorSchedule"
                      id="doctorSchedule"
                      value={doctorSchedule} // Use doctorSchedule here
                      // onChange={(e) => setDoctorSchedule(e.target.value)} // Optional: If you want users to edit
                  />
              </div>
            </div>


            {/* Advise on Discharge  */}

            <div className="RegisFormcon_1">
              <div className="text_adjust">
                
                <label htmlFor="OtherClinic">
                Other Clinic OPD Contact<span>:</span>{" "}
                </label>
                
                <textarea
                  name="OtherClinic"
                  id="OtherClinic"
                  
                />
              </div> 
            </div>

            <div className="RegisForm_1 signature-align" >
                  <div className="" >
                    <div>
                      <SignatureCanvas
                        ref={signatureRef}
                        penColor="black"
                        canvasProps={{
                          width: 190,
                          height: 100,
                          className: "sigCanvas2",
                          
                        }}
                      />
                    </div>
                    {/* <h5 style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>Signature</h5>

                    <div className="Register_btn_con">
                      <button className="RegisterForm_1_btns" onClick={clearSignature}>
                        Clear
                      </button>
                      <button className="RegisterForm_1_btns" onClick={saveSignature}>
                        Save
                      </button>
                    </div> */}

                  </div>


            </div>
            </div>
              <br/><br/>


        </PrintContent>      
   
     </>

    )}

    

    </>
  )
}

export default IP_DischargeSummary;