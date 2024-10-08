import React, { useEffect, useState } from "react";
import "./Preview.css";
import axios from "axios";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";

const Preview = () => {
  const [pdfBlob, setPdfBlob] = useState(null);

  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const [doctorsign, har] = useState(null);
  const formData = useSelector((state) => state.userRecord?.workbenchformData);
  const urllink = useSelector((state) => state.userRecord?.UrlLink);

  const [selectedDate, setSelectedDate] = useState(null);
  const [isPrintButtonVisible, setIsPrintButtonVisible] = useState(true);
  const [PreviewData, setPreviewData] = useState({});
  const [ClinicDetails, setClinicDetails] = useState({});
  const [appointmentDate, setAppointmentDate] = useState("");
  const [selectedVital, setSelectedVital] = useState([]);
  const [prescriptionData, setPrescriptionData] = useState([]);

  const [clinicLogo, setClinicLogo] = useState(null);

  useEffect(() => {
    axios
      .get(`${urllink}usercontrol/getClinic?location=${userRecord?.location}`)

      .then((response) => {
        const record = response.data[0];
        if (record) {
          setClinicDetails(record);
        } else {
          console.error("No clinic details found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    axios
      .get(`${urllink}usercontrol/getAccountsetting`)
      .then((response) => {
        if (response.data) {
          const firstClinic = response.data;
          setClinicLogo(`data:image/png;base64,${firstClinic.clinicLogo}`);
        } else {
          console.error("No record found");
        }
      })
      .catch((error) => console.error("Error fetching data"));
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setAppointmentDate(currentDate);
    setSelectedDate(new Date(), "Asia/Kolkata");
  }, []);

  const currdate = selectedDate && format(selectedDate, " dd / MM / yy");

  useEffect(() => {
    const storedFormData = formData;
    if (storedFormData) {
      setPreviewData(storedFormData);
    }
  }, []);
  // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    if (
      formData &&
      formData.PatientID &&
      formData.SerialNo &&
      formData.visitNo
    ) {
      axios
        .get(
          `${urllink}doctorsworkbench/get_for_preview?PatientID=${formData?.PatientID}`
        )
        .then((response) => {
          if (response.data && response.data.length > 0) {
            const data = response.data;
            console.log(data);
            setSelectedVital(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      axios
        .get(
          `${urllink}doctorsworkbench/prescription_forpreview?PatientID=${formData.PatientID}&visitID=${formData.visitNo}`
        )
        .then((response) => {
          if (response.data && response.data.length > 0) {
            setPrescriptionData(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching prescription data:", error);
        });
    }
  }, [formData.PatientID, formData, appointmentDate, formData.visitNo]);

  useEffect(() => {
    const doctorname = formData?.DoctorName;

    if (doctorname) {
      axios
        .get(`${urllink}usercontrol/get_doctor_sign?doctorname=${doctorname}`)
        .then((response) => {
          const data = response.data;

          har(data.doctor_sign);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [formData]);

  const handlePrint = useReactToPrint({
    content: () => document.getElementById("reactprintcontent"),
    onBeforePrint: () => {},
    onAfterPrint: async () => {
      setPdfBlob(null);
    },
    onAfterPrint: async () => {
      setPdfBlob(null);

      const printdata = document.getElementById("reactprintcontent");

      try {
        if (printdata) {
          const contentWidth = printdata.offsetWidth;
          const padding = 20; // Adjust the padding as needed
          const pdfWidth = contentWidth + 2 * padding; // Add padding to width
          const pdfHeight = contentWidth * 1.5; // Add padding to height
          const pdf = new jsPDF({
            unit: "px",
            format: [pdfWidth, pdfHeight],
          });
          pdf.html(printdata, {
            x: padding, // Set x-coordinate for content
            y: padding, // Set y-coordinate for content
            callback: () => {
              const generatedPdfBlob = pdf.output("blob");
              setPdfBlob(generatedPdfBlob);
            },
          });
        } else {
          throw new Error("Unable to get the target element");
        }
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    },
  });

  return (
    <div className="billing-invoice" id="reactprintcontent">
      <br />
      <div className="New_billlling_invoice_head">
        <div className="new_billing_logo_con">
          <img src={clinicLogo} alt="Medical logo" />
        </div>
        <div className="new_billing_address_1 ">
          <span className="dkjfiuw6">{ClinicDetails.concern_name}</span>

          <div>
            <span className="dkjfiuw6">
              {ClinicDetails.door_no +
                "," +
                ClinicDetails.street +
               
                ClinicDetails.area +
                "," +
                ClinicDetails.city +
                "," +
                ClinicDetails.state +
                "-" +
                ClinicDetails.pincode}
            </span>
          </div>
          <div>
            <span className="dkjfiuw6">{ClinicDetails.phone_no + " , "}</span>

            <span className="dkjfiuw6">{ClinicDetails.email}</span>
          </div>
        </div>
      </div>
      <div
        className="Register_btn_con"
        style={{ color: "var(--labelcolor)", fontWeight: 600 }}
      >
        Patient Preview
      </div>

      <div className="new_billing_address">
        <div className="new_billing_address_2">
          <div className="new_preview_div">
            <label>
              Patient Name <span>:</span>
            </label>
            <span className="dkjfiuw6">
              {selectedVital[0]?.Title} {selectedVital[0]?.FirstName}{" "}
              {selectedVital[0]?.LastName}
            </span>
          </div>
          <div className="new_preview_div">
            <label>
              Patient ID <span>:</span>
            </label>
            <span className="dkjfiuw6">{selectedVital[0]?.PatientID}</span>
          </div>
          <div className="new_preview_div">
            <label>
              Age <span>:</span>
            </label>
            <span className="dkjfiuw6">{selectedVital[0]?.Age}</span>
          </div>
          <div className="new_preview_div">
            <label>
              Gender <span>:</span>
            </label>
            <span className="dkjfiuw6">{selectedVital[0]?.Gender}</span>
          </div>
        </div>
        <div className="new_billing_address_2">
          <div className="new_preview_div">
            <label>
              Date <span>:</span>
            </label>
            <span className="dkjfiuw6">{currdate}</span>
          </div>
          <div className="new_preview_div">
            <label>
              Address <span>:</span>
            </label>
            <span className="dkjfiuw6">
              {selectedVital[0]?.City +
                "," +
                selectedVital[0]?.State +
                "-" +
                selectedVital[0]?.Pincode}
            </span>
          </div>

          <div className="new_preview_div">
            <label>
              {" "}
              Patient Mobile No <span>:</span>
            </label>
            <span className="dkjfiuw6">{selectedVital[0]?.PhoneNumber}</span>
          </div>

          {selectedVital.map((item, index) => (
              <div className="new_preview_div" key={index}>
                {item.Next_Appointment && (
                  <>
                  <label>
              Next Appointment <span>:</span>
            </label>
            <span className="dkjfiuw6">
              {item?.Next_Appointment}
            </span>
                  </>
                )}
              </div>
            ))}

         
        </div>
      </div>

      <div
        className="Register_btn_con"
        style={{ color: "var(--labelcolor)", fontWeight: 600 }}
      >
        Vital List
      </div>
      <div className="new_billing_invoice_detials">
        <table>
          <thead>
            <tr>
              <th>Pulse</th>
              <th>SPO2</th>
              <th>Heart Rate</th>
              <th>RR</th>
              <th>SBP</th>
              <th>DBP</th>
              <th>Position</th>
              <th>Part</th>
              <th>Method</th>
              <th>Weight(kg)</th>
              <th>Height(cm)</th>
              <th>HC (cm)</th>
              <th>WC (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{selectedVital[1]?.Pulse}</td>
              <td>{selectedVital[1]?.SPO2}</td>
              <td>{selectedVital[1]?.Heart_Rate}</td>
              <td>{selectedVital[1]?.RR}</td>
              <td>{selectedVital[1]?.SBP}</td>
              <td>{selectedVital[1]?.DBP}</td>
              <td>{selectedVital[1]?.Position}</td>
              <td>{selectedVital[1]?.Part}</td>
              <td>{selectedVital[1]?.Method}</td>
              <td>{selectedVital[1]?.WeightKg}</td>
              <td>{selectedVital[1]?.HeightCm}</td>
              <td>{selectedVital[1]?.HCCm}</td>
              <td>{selectedVital[1]?.WCCm}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        className="new_billing_invoice_detials "
        style={{ paddingBottom: "10px" }}
      ></div>
      <div
        className="Register_btn_con"
        style={{ color: "var(--labelcolor)", fontWeight: 600 }}
      >
        Prescription
      </div>
      <div className="new_billing_invoice_detials">
        <table>
          <thead>
            <tr>
              <th>Generic Name</th>
              <th>Item Name</th>

              <th>Dose</th>
              <th>Route</th>
              <th>Frequency</th>
              <th>Duration</th>
              <th>Qty</th>
              <th>Instruction</th>
            </tr>
          </thead>
          <tbody>
            {prescriptionData.map((medicine, index) => {
              return (
                <tr key={index}>
                  <td>{medicine.GenericName}</td>
                  <td>{medicine.ItemName}</td>

                  <td>{medicine.Dose}</td>
                  <td>{medicine.Route}</td>
                  <td>{medicine.Frequency}</td>
                  <td>{medicine.Duration}</td>
                  <td>{medicine.Qty}</td>
                  <td>{medicine.Instruction}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        className="new_billing_invoice_detials "
        style={{ paddingBottom: "10px" }}
      >
        <br />
        <div className="invoice_detials_total_1 neww_invoicedetials">
          <div className="total_con_bill">
            {selectedVital.map((item, index) => (
              <div className="bill_body bill_body32" key={index}>
                {item.Diagnosis && (
                  <>
                    <label>
                      Diagnosis <span>:</span>
                    </label>
                    <span className="dkjfiuw6">{item.Diagnosis}</span>
                  </>
                )}
              </div>
            ))}

            <br />
            {selectedVital.map((item, index) => (
              <div className="bill_body bill_body32" key={index}>
                {item.History && (
                  <>
                   <label>
                {" "}
                History <span>:</span>
              </label>
              <span className="dkjfiuw6">{item?.History}</span>
                  </>
                )}
              </div>
            ))}
            <br/>

            {selectedVital.map((item, index) => (
              <div className="bill_body bill_body32" key={index}>
                {item.Examination && (
                  <>
                  <label>
                {" "}
                Examination <span>:</span>
              </label>
              <span className="dkjfiuw6">{item?.Examination}</span>
                  </>
                )}
              </div>
            ))}

          
            <br />
            {selectedVital.map((item, index) => (
              <div className="bill_body bill_body32" key={index}>
                {item.Treatment_Procedure && (
                  <>
                 <label>
                {" "}
                Treatment Procedure <span>:</span>
              </label>
              <span className="dkjfiuw6">
                {item?.Treatment_Procedure}
              </span>
                  </>
                )}
              </div>
            ))}
           
          </div>
        </div>
      </div>

      <div className="total_con_bill234">
        <div className="bill_body3233">
          <label>
            Doctor Name <span>:</span>
          </label>
          <span className="dkjfiuw622">{formData.DoctorName}</span>
        </div>
        <br />
        <div className="bill_body3233">
          <label>
            {" "}
            Doctor sign <span>:</span>
          </label>
          <img
            src={doctorsign}
            alt="sign"
            style={{ width: "130px", height: "40px" }}
          />
        </div>
      </div>

      {isPrintButtonVisible && (
        <button
          className="print_button"
          onClick={() => {
            setTimeout(() => {
              handlePrint();
            }, 200);
          }}
        >
          Print Data
        </button>
      )}
    </div>
  );
};

export default Preview;
