import React, { useState, useEffect } from "react";
import "./Prescription.css";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToastAlert from "../OtherComponent/ToastContainer/ToastAlert";
import { useDispatch } from "react-redux";
const Prescription = () => {

  const toast = useSelector(state => state.userRecord?.toast);

  const userRecord = useSelector((state) => state.userRecord?.UserData);
  const DoctorWorkbenchNavigation = useSelector(state => state.Frontoffice?.DoctorWorkbenchNavigation);
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);

  const [type, setType] = useState("Intake");

  const [formDataPrescription, setFormDataPrescription] = useState({
    GenericName: "",
    ItemName: "",
    dose: "",
    route: "",
    qty: "",
    instruction: "",
    frequency: "",
    durationNumber: "",
    durationUnit: "days",
    itemtype: "",
  });

  const dispatchvalue = useDispatch();

  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [issuedmedicine, setIssuedmedicine] = useState({});
  const [prevmedicine, setPrevmedicine] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [genericName, setgenericName] = useState([]);


  const handlePageChange = (event, newType) => {
    if (newType !== null && newType !== type) {
      setType(newType);
    }
  };
  useEffect(() => {
    axios
      .get(`${UrlLink}Workbench/Medical_Stock_InsetLink_for_Prescription`)
      .then((response) => {
        console.log('response.data',);
        console.log('response.data', response.data);
        setgenericName(response.data)

        // Process the response data as needed
        // setgenericName(response.data.Generic_Name);
      })
      .catch((error) => {
        console.error("Error fetching generic names:", error);
        // Handle the error, e.g., show an error message to the user
      });
  }, [UrlLink]);

  
  const [IsViewMode, setIsViewMode] = useState(false)




  console.log('genericName', genericName);



  const handleClear = () => {
    setFormDataPrescription({
      GenericName: '',
      ItemName: '',
      dose: '',
      route: '',
      qty: '',
      instruction: '',
      frequency: '',
      durationNumber: '',
      durationUnit: 'days',
      itemtype: '',
    });
    setIsViewMode(false);
  };





  useEffect(() => {
    axios.get(`${UrlLink}Workbench/Workbench_Prescription_Details`, { params: { RegistrationId: DoctorWorkbenchNavigation?.pk } })
      .then((res) => {
        const ress = res.data
        console.log(res);
        setIssuedmedicine(ress)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [DoctorWorkbenchNavigation?.RegistrationId, UrlLink])


  useEffect(() => {
    axios.get(`${UrlLink}Workbench/Doctor_previous_prescripion_details`, { params: { RegistrationId: DoctorWorkbenchNavigation?.pk } })
      .then((response) => {
        console.log('response.data', response.data);

        setPrevmedicine(response.data);
      })
      .catch((error) => {
        console.error("Error fetching UOM:", error);
      });
  }, [DoctorWorkbenchNavigation, UrlLink]);





  const handleChange = (e) => {
    const { name, value } = e.target;


    setFormDataPrescription({
      ...formDataPrescription,
      [name]: value,
    });
    const { frequency, durationNumber, durationUnit, itemtype, GenericName } = {
      ...formDataPrescription,
      [name]: value,
    };
    if (name === "GenericName" && value === "") {

      setFormDataPrescription({
        GenericName: "",
        ItemName: "",
        dose: "",
        route: "",
        qty: "",
        instruction: "",
        frequency: "",
        durationNumber: "",
        durationUnit: "days",
        itemtype: ""
      });
    }

    if (name === "GenericName") {
      genericName.filter((p) => p.Generic_Name === GenericName).map((item) => (
        setFormDataPrescription(prev => ({
          ...prev,
          ItemName: item.Generic_Name,
          itemtype: item.Item_Type,
          dose: item.Dosage
        }))
      ))
    }

    if (itemtype === "Tablets" || itemtype === "TABLET") {
      console.log("hiiii");
      if (["frequency", "durationNumber", "durationUnit"].includes(name)) {
        if (!durationNumber || !durationUnit) {
          setFormDataPrescription((prevData) => ({
            ...prevData,
            qty: "",
          }));
          return;
        }


        const [morning, afternoon, night] = frequency.split("-");

        let times1 = parseInt(morning) + parseInt(afternoon) + parseInt(night);
        let times = 1;
        switch (durationUnit) {
          case "days":
            times = parseInt(durationNumber);
            break;
          case "weeks":
            times = parseInt(durationNumber) * 7;
            break;
          case "months":
            times = parseInt(durationNumber) * 30;
            break;

          default:
            return;
        }

        const qty = times1 * times;

        setFormDataPrescription((prevData) => ({
          ...prevData,
          qty: qty,
        }));
      }
    }
  };


  const addMedicine = () => {

    const medicineData = {
      id: selectedMedicines.length + 1,
      ...formDataPrescription,

    };

    const isDuplicate = selectedMedicines.some(
      (medicine) => medicine.ItemName === medicineData.ItemName
    );

    if (isDuplicate) {
      const tdata = {
        message: 'Medicine with the same Item Name is already added',
        type: 'warn',
      }
      dispatchvalue({ type: 'toast', value: tdata });

    } else {
      setSelectedMedicines([...selectedMedicines, medicineData]);
    }
    setFormDataPrescription({
      GenericName: "",
      ItemName: "",
      dose: "",
      route: "",
      qty: "",
      instruction: "",
      frequency: "",
      durationNumber: "",
      durationUnit: "days",
      itemtype: ""
    });

  };

  const updateMedicine = () => {
    // if (!validateForm()) {
    //   return;
    // }

    const updatedMedicines = [...selectedMedicines];
    updatedMedicines[editIndex] = {
      id: selectedMedicines[editIndex].id,
      ...formDataPrescription,

    };

    setSelectedMedicines(updatedMedicines);
    setEditIndex(null);

    // Clear form data after updating
    setFormDataPrescription({
      GenericName: "",
      ItemName: "",
      dose: "",
      route: "",
      qty: "",
      instruction: "",
      frequency: "",
      durationNumber: "",
      durationUnit: "days",
      itemtype: "",
    });
  };
  const addprevmedicine = (index, summa) => {
    const prevMedicine = prevmedicine[summa][index];
    console.log('prevMedicine', prevMedicine);

    setFormDataPrescription({
      GenericName: prevMedicine.GenericName,
      ItemName: prevMedicine.ItemName,
      dose: prevMedicine.Dose,
      route: prevMedicine.Route,
      qty: prevMedicine.Qty,
      instruction: prevMedicine.Instruction,
      frequency: prevMedicine.Frequency,
      durationNumber: prevMedicine.DurationNumber,
      durationUnit: "days",
      itemtype: prevMedicine.Itemtype,
    });
    setEditIndex(null); // Set to null since it's a new addition, not an edit
  };

  const handleEditMedicine = (index) => {
    // Set form data with selected medicine for editing
    const selectedMedicine = selectedMedicines[index];
    setFormDataPrescription({ ...selectedMedicine });
    setEditIndex(index);
  };

  const handleDeleteMedicine = (index) => {
    const updatedMedicines = selectedMedicines.filter((_, i) => i !== index);
    setSelectedMedicines(updatedMedicines);
    setEditIndex(null);
  };



  const handleSubmitButtonClick = () => {
    // Map the selectedMedicines array to the format expected by the backend
    const dataToSend = selectedMedicines.map((p) => ({
      RegistrationId: DoctorWorkbenchNavigation?.pk,
      created_by: userRecord?.username || '',
      GenericName: p.GenericName,
      ItemName: p.ItemName,
      itemtype: p.itemtype,
      dose: p.dose,
      route: p.route,
      frequency: p.frequency,
      duration: `${p.durationNumber} ${p.durationUnit}`,
      qty: p.qty,
      instruction: p.instruction,
      Doctor_id: DoctorWorkbenchNavigation?.DoctorName
    }));

    console.log(dataToSend, 'dataToSend');

    if (dataToSend.length !== 0) {
      axios
        .post(`${UrlLink}Workbench/Workbench_Prescription_Details`, dataToSend)
        .then((response) => {
          if (response.data.duplicate_item_names) {
            const duplicateItems = response.data.duplicate_item_names.join(", ");
            const tdata = {
              message: `Duplicate ItemNames found: ${duplicateItems}`,
              type: 'warn',
            }
            dispatchvalue({ type: 'toast', value: tdata });

            // warnmsg(`Duplicate ItemNames found: ${duplicateItems}`);

          } else {
            console.log(response.data.message);
            // successMsg(response.data.message);
            setSelectedMedicines([]);

            // setIsGetData(prev => !prev);


          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const tdata = {
        message: 'No Prescription Data To Save',
        type: 'warn',
      }
      dispatchvalue({ type: 'toast', value: tdata });


    }
  };



  return (
    <div className="for">
      <div className="RegisFormcon">
        <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
          <ToggleButtonGroup
            value={type}
            exclusive
            onChange={handlePageChange}
            aria-label="Platform"
          >
            <ToggleButton
              value="Intake"
              style={{
                height: "30px",
                width: "180px",
                backgroundColor:
                  type === "Intake"
                    ? "var(--selectbackgroundcolor)"
                    : "inherit",
              }}
              className="togglebutton_container"
            >
              Add Drugs
            </ToggleButton>
            <ToggleButton
              value="Output"
              style={{
                backgroundColor:
                  type === "Output"
                    ? "var(--selectbackgroundcolor)"
                    : "inherit",
                width: "180px",
                height: "30px",
              }}
              className="togglebutton_container"
            >
              View Drugs
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        {type === "Intake" && (
          <>
            <div className="RegisFormcon">



              {Object.keys(prevmedicine).length > 0 ? (
                <div className="for">
                  {Object.entries(prevmedicine).map(([createdBy, prescriptions]) => (
                    <div key={createdBy} className="Add_items_Purchase_Master">
                      <span>{`Given Medicine by Dr.${createdBy}`}</span>
                      <div className="Selected-table-container">
                        <table className="selected-medicine-table2">
                          <thead>
                            <tr>
                              <th id="slectbill_ins">GenericName</th>
                              <th id="slectbill_ins">ItemName</th>
                              <th id="slectbill_ins">Item Type</th>
                              <th id="slectbill_ins">Dose</th>
                              <th id="slectbill_ins">Route</th>
                              <th id="slectbill_ins">Frequency</th>
                              <th id="slectbill_ins">Duration</th>
                              <th id="slectbill_ins">Qty</th>
                              <th id="slectbill_ins">Instruction</th>
                              <th id="slectbill_ins">Action</th>

                            </tr>
                          </thead>
                          <tbody>
                            {prescriptions.map((issuedinfo, index) => (
                              <tr key={index}>
                                <td>{issuedinfo.GenericName}</td>
                                <td>{issuedinfo.ItemName}</td>
                                <td>{issuedinfo.Itemtype}</td>
                                <td>{issuedinfo.Dose}</td>
                                <td>{issuedinfo.Route}</td>
                                <td>{issuedinfo.Frequency}</td>
                                <td>{`${issuedinfo.DurationNumber} ${issuedinfo.DurationUnit}`}</td>
                                <td>{issuedinfo.Qty}</td>
                                <td>{issuedinfo.Instruction}</td>
                                <td>
                                  <button
                                    className="delnamebtn"
                                    onClick={() => addprevmedicine(index, createdBy)}
                                  >
                                    <AddIcon />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="DivCenter_container">
                No medication was issued during the previous visit.
                </div>
              )
              }

              <br></br>
             
              <div className="RegisFormcon_1">
                <div className="RegisForm_1">
                  <label htmlFor="title">
                    Generic Name<span>:</span>
                  </label>
                  <input
                    id="medicine"
                    name="GenericName"
                    value={formDataPrescription.GenericName}
                    onChange={handleChange}
                    list="GenericName-options"
                    autoComplete="off"
                  />
                  <datalist id="GenericName-options">
                    <option value="">Select</option>
                    {genericName.map((item, index) => (
                      <option key={index} value={item.Generic_Name}></option>
                    ))}
                  </datalist>
                </div>
                <div className="RegisForm_1">
                  <label htmlFor="title">
                    Item Name<span>:</span>
                  </label>
                  <input
                    id="medicine"
                    name="ItemName"
                    value={formDataPrescription.ItemName}
                    onChange={handleChange}
                    list="ItemName-options"
                    autoComplete="off"
                  />
                  {/* <datalist id="ItemName-options">
                    <option value="">Select</option>
                    {itemName.map((item, index) => (
                      <option key={index} value={item.ItemName}>
                        {`${item.ItemCode} | Av.Qty : ${item.AvailableQuantity} `}
                      </option>
                    ))}
                  </datalist> */}
                </div>
                <div className="RegisForm_1">
                  <label htmlFor="itemtype">
                    Item Type<span>:</span>
                  </label>
                  <input
                    id="itemtype"
                    name="itemtype"
                    value={formDataPrescription.itemtype}
                    onChange={handleChange}
                  // readOnly
                  />
                </div>
                <div className="RegisForm_1">
                  <label htmlFor="dose">
                    Dose<span>:</span>
                  </label>
                  <input
                    id="dose"
                    name="dose"
                    value={formDataPrescription.dose}
                    onChange={handleChange}
                  // readOnly
                  />
                </div>
                <div className="RegisForm_1">
                  <label htmlFor="title">
                    Route<span>:</span>
                  </label>
                  <select
                    id="route"
                    name="route"
                    value={formDataPrescription.route}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Oral">Oral</option>
                    <option value="Injection">Injection</option>
                    <option value="External">External</option>
                  </select>
                </div>
                <div className="RegisForm_1">
                  <label htmlFor="notes">
                    Frequency<span>:</span>
                  </label>
                  <select
                    id="frequency"
                    name="frequency"
                    rows="2"
                    value={formDataPrescription.frequency}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="0-0-1">0-0-1</option>
                    <option value="0-1-1">0-1-1</option>
                    <option value="1-1-1">1-1-1</option>
                    <option value="1-1-0">1-1-0</option>
                    <option value="1-0-1">1-0-1</option>
                    <option value="SOS">SOS</option>
                  </select>
                </div>
                <div className="RegisForm_1">
                  <label htmlFor="duration">
                    Duration<span>:</span>
                  </label>
                  <input
                    id="durationNumber"
                    name="durationNumber"
                    className="dura_with1"
                    value={formDataPrescription.durationNumber}
                    onChange={handleChange}
                    disabled={formDataPrescription.frequency === 'SOS'}
                  ></input>
                  <select
                    id="durationUnit"
                    name="durationUnit"
                    className="dura_with"
                    value={formDataPrescription.durationUnit}
                    onChange={handleChange}
                    disabled={formDataPrescription.frequency === 'SOS'}
                  >
                    {/* <option value="">Select</option> */}
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                  </select>
                </div>
                <div className="RegisForm_1">
                  <label htmlFor="title">
                    Qty<span>:</span>
                  </label>
                  <input
                    id="qty"
                    name="qty"
                    value={formDataPrescription.qty}
                    onChange={handleChange}
                    readOnly={
                      (formDataPrescription.itemtype === "Tablets" ||
                        formDataPrescription.itemtype === "Tablet") &&
                      formDataPrescription.itemtype !== ""
                    }
                    disabled={formDataPrescription.frequency === 'SOS'}
                  />
                </div>
                <div className="RegisForm_1">
                  <label htmlFor="instruction">
                    Instruction<span>:</span>
                  </label>
                  <textarea
                    id="instruction"
                    name="instruction"
                    rows="2"
                    value={formDataPrescription.instruction}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="Main_container_Btn">
                <button
                  className="RegisterForm_1_btns"
                  type="button"
                  onClick={editIndex !== null ? updateMedicine : addMedicine}
                >
                  {editIndex !== null ? "Update " : "Add "}
                </button>
              </div>
              {selectedMedicines.length > 0 && (
                <div className="for">
                  <div className="Add_items_Purchase_Master">
                    <span>Selected Medicine</span>
                  </div>
                  <div className="Selected-table-container">
                    <table className="selected-medicine-table2">
                      <thead>
                        <tr>
                          <th id="slectbill_ins">GenericName</th>
                          <th id="slectbill_ins">ItemName</th>
                          <th id="slectbill_ins">Item Type</th>
                          <th id="slectbill_ins">Dose</th>
                          <th id="slectbill_ins">Route</th>
                          <th id="slectbill_ins">Frequency</th>
                          <th id="slectbill_ins">Duration</th>
                          <th id="slectbill_ins">Qty</th>
                          <th id="slectbill_ins">Instruction</th>
                          <th id="slectbill_ins">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedMedicines.map((medicineInfo, index) => (
                          <tr key={index}>
                            <td>{medicineInfo.GenericName}</td>
                            <td>{medicineInfo.ItemName}</td>
                            <td>{medicineInfo.itemtype}</td>
                            <td>{medicineInfo.dose}</td>
                            <td>{medicineInfo.route}</td>
                            <td>{medicineInfo.frequency}</td>
                            <td>
                              {medicineInfo.durationNumber}{" "}
                              {medicineInfo.durationUnit}
                            </td>
                            <td>{medicineInfo.qty}</td>
                            <td>{medicineInfo.instruction}</td>
                            <td>
                              <button
                                className="delnamebtn"
                                onClick={() => handleEditMedicine(index)}
                              >
                                <EditIcon />
                              </button>
                              <button
                                className="delnamebtn"
                                onClick={() => handleDeleteMedicine(index)}
                              >
                                <DeleteIcon />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* {selectedMedicines.length > 0 && */}
              {/* <div className="Register_btn_con">
                  <button
                    className="RegisterForm_1_btns"
                    type="button"
                    onClick={handleSubmitButtonClick}
                  >
                    Submit
                  </button>
                </div> */}
              {selectedMedicines.length > 0 &&
                <div className="Main_container_Btn">

                  {IsViewMode && (
                    <button onClick={handleClear}>Clear</button>
                  )}
                  {!IsViewMode && (
                    <button onClick={handleSubmitButtonClick}>Submit</button>
                  )}
                </div>}

              {/* {gridData.length > 0 &&
                <ReactGrid columns={PrescriptionColumns} RowData={gridData} />
              } */}

              <ToastAlert Message={toast.message} Type={toast.type} />


            </div>
          </>
        )}
        {type === "Output" && (
          <>
            {Object.keys(issuedmedicine).length > 0 ? (
              <div className="for">
                {Object.entries(issuedmedicine).map(([createdBy, prescriptions]) => (
                  <div key={createdBy} className="Add_items_Purchase_Master">
                    <span>{`Given Medicine by Dr.${createdBy}`}</span>
                    <div className="Selected-table-container">
                      <table className="selected-medicine-table2">
                        <thead>
                          <tr>
                            <th id="slectbill_ins">GenericName</th>
                            <th id="slectbill_ins">ItemName</th>
                            <th id="slectbill_ins">Item Type</th>
                            <th id="slectbill_ins">Dose</th>
                            <th id="slectbill_ins">Route</th>
                            <th id="slectbill_ins">Frequency</th>
                            <th id="slectbill_ins">Duration</th>
                            <th id="slectbill_ins">Qty</th>
                            <th id="slectbill_ins">Instruction</th>
                          </tr>
                        </thead>
                        <tbody>
                          {prescriptions.map((issuedinfo, index) => (
                            <tr key={index}>
                              <td>{issuedinfo.GenericName}</td>
                              <td>{issuedinfo.ItemName}</td>
                              <td>{issuedinfo.Itemtype}</td>
                              <td>{issuedinfo.Dose}</td>
                              <td>{issuedinfo.Route}</td>
                              <td>{issuedinfo.Frequency}</td>
                              <td>{`${issuedinfo.DurationNumber} ${issuedinfo.DurationUnit}`}</td>
                              <td>{issuedinfo.Qty}</td>
                              <td>{issuedinfo.Instruction}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="DivCenter_container">
              No medication was issued during the Current visit.
              </div>
            )}
          </>
        )}


        <ToastAlert Message={toast.message} Type={toast.type} />
      </div>

      {/* {showConfirmationModal && ({type === "Output" && (
  <>
    {Object.keys(issuedmedicine).length > 0 ? (
      <div className="for">
        {Object.entries(issuedmedicine).map(([createdBy, prescriptions]) => (
          <div key={createdBy} className="Add_items_Purchase_Master">
            <span>{`Given Medicine by ${createdBy}`}</span>
            <div className="Selected-table-container">
              <table className="selected-medicine-table2">
                <thead>
                  <tr>
                    <th id="slectbill_ins">GenericName</th>
                    <th id="slectbill_ins">ItemName</th>
                    <th id="slectbill_ins">Item Type</th>
                    <th id="slectbill_ins">Dose</th>
                    <th id="slectbill_ins">Route</th>
                    <th id="slectbill_ins">Frequency</th>
                    <th id="slectbill_ins">Duration</th>
                    <th id="slectbill_ins">Qty</th>
                    <th id="slectbill_ins">Instruction</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map((issuedinfo, index) => (
                    <tr key={index}>
                      <td>{issuedinfo.GenericName}</td>
                      <td>{issuedinfo.ItemName}</td>
                      <td>{issuedinfo.Itemtype}</td>
                      <td>{issuedinfo.Dose}</td>
                      <td>{issuedinfo.Route}</td>
                      <td>{issuedinfo.Frequency}</td>
                      <td>{`${issuedinfo.DurationNumber} ${issuedinfo.DurationUnit}`}</td>
                      <td>{issuedinfo.Qty}</td>
                      <td>{issuedinfo.Instruction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="Add_items_Purchase_Master">
        <span>No Medicine Issued</span>
      </div>
    )}
  </>
)}

        <ConfirmationModal
          message="Do you want to continue?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )} */}

    </div>
  );
};

export default Prescription;


