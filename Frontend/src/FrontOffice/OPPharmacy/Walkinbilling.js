import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../../FrontOffice/Billing/GeneralBilling.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import Clinic_Logo from "../../Assets/logo.png";

function Walkinbilling() {
  // const [Clinic_Logo, setClinic_Logo] = useState(null);

  const navigate = useNavigate();
  // const dispatchvalue = useDispatch();

  const urllink = useSelector((state) => state.userRecord?.UrlLink);

  const [isPrintButtonVisible, setIsPrintButtonVisible] = useState(true);

  const [Billing_date, setBilling_date] = useState(new Date());

  const [billAmount, setBillAmount] = useState([]);

  const [isEdit, setIsEdit] = useState(null);
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  const [formAmount, setFormAmount] = useState({
    Billpay_method: "",
    CardType: "",
    BankName: "",
    ChequeNo: "",
    paidamount: "",
  });

  const userRecord = useSelector((state) => state.userRecord?.UserData);

  const FilteUser_Name = userRecord?.username;

  const User_Name = FilteUser_Name;
  const location = userRecord?.location;

  // const [DefuldInvoicenumber, setDefuldInvoicenumber] = useState(null);

  const [Patient_list, setPatient_list] = useState([]);

  const [getStockid_Name, setgetStockid_Name] = useState([]);

  const [Billing_itemtable, setBilling_itemtable] = useState([]);

  const [Billpay_method_amount, setBillpay_method_amount] = useState("");

  const [NetAmount_CDmethod, setNetAmount_CDmethod] = useState({
    Method: "",
    Amount: "",
  });

  // const [Doctorsnames, setDoctorsnames] = useState([]);

  const [SelectedPatient_list, setSelectedPatient_list] = useState({
    Doctor_name: "",
    PatientId: "",
    PatientName: "",
    PatientAge: "",
    PatientAddress: "",
    City: "",
    State: "",
    Pincode: "",
    PhoneNumber: "",
    GSTnumber: "",
    PatientType: "",
  });

  console.log();

  const [ClinicDetials, setClinicDetials] = useState({
    ClinicLogo: null,
    ClinicName: "",
    ClinicGST: "",
    ClinicAddress: "",
    ClinicCity: "",
    ClinicState: "",
    ClinicCode: "",
    ClinicMobileNo: "",
    ClinicLandLineNo: "",
    ClinicMailID: "",
  });

  const handleAmountSubmit = () => {
    const apiUrl = `${urllink}GeneralBilling/overall_amount_table`;
    const submissionData = {
      // InvoiceNo: DefuldInvoicenumber, // Assuming ClinicDetails is accessible
      payments: billAmount, // Submitting the entire array
      location: userRecord?.location, // Assuming userRecord is accessible
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    // Fetch personal info
    axios
      .get(`${urllink}Frontoffice/get_personal_info`)
      .then((response) => {
        console.log(response);
        const personalInfo = response.data;
        setPatient_list(personalInfo);
        // Fetch communication address info
        // axios
        //   .get(`${urllink}patientmanagement/get_communication_address`)
        //   .then((addressResponse) => {
        //     const addressInfo = addressResponse.data;

        //     // Merge data based on PatientID
        //     const mergedData = personalInfo.map((personalItem) => {
        //       const matchingAddressItem = addressInfo.find(
        //         (addressItem) =>
        //           addressItem.PatientID === personalItem.PatientID
        //       );

        //       return {
        //         ...personalItem,
        //         ...matchingAddressItem,
        //       };
        //     });

        //     // console.log('55555',mergedData)

        //     setPatient_list(mergedData);
        //   })
        //   .catch((addressError) => {
        //     console.error("Error fetching address info:", addressError);
        //     // Handle the error, e.g., show an error message to the user
        //   });
      })
      .catch((error) => {
        console.error("Error fetching personal info:", error);
        // Handle the error, e.g., show an error message to the user
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${urllink}usercontrol/get_doctor_info?location=${userRecord?.location}`
  //     )
  //     .then((response) => {
  //       console.log(response.data, "-----");
  //       setDoctorsnames(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [userRecord?.location]);

  useEffect(() => {
    const totalPaidAmount = billAmount
      .filter((_, indx) => indx !== isEdit)
      .reduce((total, ele) => +total + +ele.paidamount, 0);
    setBillpay_method_amount(totalPaidAmount);
    setSummary((prev) => ({
      ...prev,
      BalanceAmount: (
        parseFloat(prev.totalAmount) - parseFloat(totalPaidAmount)
      ).toFixed(2),
      PaidAmount: totalPaidAmount.toFixed(2),
    }));
  }, [billAmount, billAmount.length, isEdit]);

  const handleChange = (e) => {
    // Calculate the total paid amount

    const { name, value } = e.target; // Destructuring name and value from event target
    let total_netamount = summary.totalAmount;

    if (+Billpay_method_amount !== +total_netamount) {
      if (name == "Billpay_method") {
        setFormAmount((prevState) => ({
          ...prevState, // Spread the previous state
          [name]: value, // Update the specific field based on the input's name attribute
        }));
      } else if (name === "paidamount") {
        if (billAmount.length > 0) {
          const amttt = parseFloat(total_netamount) - +Billpay_method_amount;
          if (+amttt >= +value) {
            setFormAmount((prevState) => ({
              ...prevState, // Spread the previous state
              [name]: value, // Update the specific field based on the input's name attribute
            }));
          } else {
            alert(`enter the Correct value blow the Net Amount ${amttt}`);
            setFormAmount((prevState) => ({
              ...prevState, // Spread the previous state
              [name]: "", // Update the specific field based on the input's name attribute
            }));
          }
        } else {
          if (+total_netamount >= +value) {
            setFormAmount((prevState) => ({
              ...prevState, // Spread the previous state
              [name]: value, // Update the specific field based on the input's name attribute
            }));
          } else {
            alert(
              `enter the Correct value blow the Net Amount ${total_netamount}`
            );
            setFormAmount((prevState) => ({
              ...prevState, // Spread the previous state
              [name]: "", // Update the specific field based on the input's name attribute
            }));
          }
        }
      } else {
        setFormAmount((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      alert("No Balance Amount");
    }
  };

  const handleAdd = () => {
    let req = [];
    if (formAmount.Billpay_method === "Card") {
      req = ["Billpay_method", "CardType", "paidamount"];
    } else if (formAmount.Billpay_method === "Cheque") {
      req = ["Billpay_method", "ChequeNo", "BankName", "paidamount"];
    } else if (formAmount.Billpay_method === "OnlinePayment") {
      req = ["Billpay_method", "paidamount"];
    } else {
      req = ["Billpay_method", "paidamount"];
    }
    const missing = req.filter((row) => !formAmount[row]);
    if (missing.length === 0) {
      const exist = billAmount.find(
        (p) => p.Billpay_method === formAmount.Billpay_method
      );
      if (!exist) {
        setBillAmount((prev) => [...prev, formAmount]);
        setFormAmount({
          Billpay_method: "",
          CardType: "",
          ChequeNo: "",
          BankName: "",
          paidamount: "",
        });
      } else {
        alert("The Payment Method already exist");
      }
    } else {
      alert(`enter the required fields : ${missing.join(",")}`);
    }
  };

  const handleEdit = (index) => {
    setIsEdit(index);
    const item = billAmount[index];
    setFormAmount({
      ...item,
    });
  };

  const handleUpdate = () => {
    let req = [];
    if (formAmount.Billpay_method === "Card") {
      req = ["Billpay_method", "CardType", "paidamount"];
    } else if (formAmount.Billpay_method === "Cheque") {
      req = ["Billpay_method", "ChequeNo", "BankName", "paidamount"];
    } else if (formAmount.Billpay_method === "OnlinePayment") {
      req = ["Billpay_method", "paidamount"];
    } else {
      req = ["Billpay_method", "paidamount"];
    }
    const missing = req.filter((row) => !formAmount[row]);
    if (missing.length === 0) {
      const data = [...billAmount];
      data[isEdit] = formAmount;

      setBillAmount(data);
      setFormAmount({
        Billpay_method: "",
        CardType: "",
        ChequeNo: "",
        BankName: "",
        paidamount: "",
      });
      setIsEdit(null);
    } else {
      alert(`enter the required fields : ${missing.join(",")}`);
    }
  };

  // useEffect(() => {
  //   axios
  //     .get(`${urllink}Billinginvoice/get_PharmacyBilling_table_invoice`)
  //     .then((response) => {
  //       setDefuldInvoicenumber(response.data.nextInvoiceNumber);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  // useEffect(() => {
  //   // let DDD =Prescription_doctor.find((ele)=>{return ele})

  //   if(Object.keys(Patient_list).length!==0 && Prescription_doctor.length !==0){
  //     setSelectedPatient_list({
  //       Doctor_name: Prescription_doctor[0],
  //       PatientId: Patient_list.PatientID,
  //       PatientName: Patient_list.FirstName,
  //       PatientAge: Patient_list.Age,
  //       PatientAddress: Patient_list.Street,
  //       City: Patient_list.City,
  //       State: Patient_list.State,
  //       Pincode: Patient_list.Pincode,
  //       PhoneNumber: Patient_list.PhoneNumber,
  //     });
  //   }

  // }, [Patient_list, Prescription_doctor]);

  const [Single_row_data, setSingle_row_data] = useState({
    ItemId: "",
    ItemName: "",
    Generic: "",
    BatchNo: "",
    Exp_Date: "",
    Quantity: "",
    Billing_Quantity: "",
    Unit_Price: "",
    Amount: "",
    CD_Method: "",
    Cash_Discount: "",
    GST: "",
    Original_total: "",
    Total: "",
    CGST: "",
    SGST: "",
    GSTAmount: "",
    HSNCode: "",
  });

  // console.log("Single_row_data",Single_row_data);

  useEffect(() => {
    const location = userRecord?.location;
    axios
      .get(`${urllink}Frontoffice/get_quick_list?location=${location}`)
      .then((response) => {
        setgetStockid_Name(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userRecord]);

  useEffect(() => {
    if ((Single_row_data.BatchNo, Single_row_data.ItemName)) {
      let batchno = Single_row_data?.BatchNo.split("/")[0];
      axios
        .get(
          `${urllink}Frontoffice/get_name?ItemName=${Single_row_data.ItemName}&BatchNo=${batchno}&location=${userRecord?.location}`
        )
        .then((response) => {
          // Handle the response and update the state to set BatchNo values for the respective ItemName

          const temp = response.data[0].fields;

          const Exp_Status = response.data.find(
            (repeat) => repeat.ExpiryStatus === "NextExpiry"
          );

          if (Exp_Status) {
            const confirm = window.confirm(
              "The following tablets will expire within the next 2 weeks"
            );

            if (confirm === true) {
              setSingle_row_data((prevData) => ({
                ...prevData,
                ItemName: temp?.Item_Name,
                ItemId: temp?.Item_Code,
                Generic: temp?.Generic_Name,
                Exp_Date: temp?.ExpiryDate,
                Unit_Price: temp?.MRP_Per_Quantity,
                GST: temp?.Tax_Percentage,
                CGST: temp?.CGST,
                SGST: temp?.SGST,
                HSNCode: temp?.HSN_Code,
              }));
            } else {
              setSingle_row_data((prev) => ({
                ...prev,
                ItemId: "",
                ItemName: "",
                Generic: "",
                BatchNo: "",
                Exp_Date: "",
                Billing_Quantity: "",
                Unit_Price: "",
                Amount: "",
                CD_Method: "",
                Cash_Discount: "",
                GST: "",
                Original_total: "",
                Total: "",
                CGST: "",
                SGST: "",
                GSTAmount: "",
                HSNCode: "",
              }));
            }
          } else {
            setSingle_row_data((prevData) => ({
              ...prevData,
              ItemName: temp?.Item_Name,
              ItemId: temp?.Item_Code,
              Generic: temp?.Generic_Name,
              Exp_Date: temp?.ExpiryDate,
              Unit_Price: temp?.MRP_Per_Quantity,
              GST: temp?.Tax_Percentage,
              CGST: temp?.CGST,
              SGST: temp?.SGST,
              HSNCode: temp?.HSN_Code,
            }));
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setSingle_row_data((prev) => ({
        ...prev,
        ItemId: "",
        Generic: "",
        BatchNo: "",
        Exp_Date: "",
        Billing_Quantity: "",
        Unit_Price: "",
        Amount: "",
        CD_Method: "",
        Cash_Discount: "",
        GST: "",
        Original_total: "",
        Total: "",
        CGST: "",
        SGST: "",
        GSTAmount: "",
        HSNCode: "",
      }));
    }
  }, [Single_row_data.BatchNo, Single_row_data.ItemName, userRecord?.location]);

  useEffect(() => {
    let Billing_Quantity = +Single_row_data.Billing_Quantity || 0;
    let Unit_Price = parseFloat(Single_row_data.Unit_Price) || 0;
    let CD_Method = Single_row_data.CD_Method || 0;
    let CD_Amount = Single_row_data.Cash_Discount || 0;
    let GST = Single_row_data.GST || 0;
    let Amount = Unit_Price * Billing_Quantity || 0;
    let discountAmount = 0;
    if (CD_Method == "Percentage") {
      discountAmount = Amount - (Amount * CD_Amount) / 100;
    } else {
      discountAmount = Amount - CD_Amount;
    }
    let GSTAmount = (discountAmount * GST) / 100 || 0;
    let Total = discountAmount + GSTAmount || 0;
    setSingle_row_data((prevData) => ({
      ...prevData,
      Amount: parseFloat(Amount).toFixed(2),
      Original_total: parseFloat(discountAmount).toFixed(2),
      Total: parseFloat(Total).toFixed(2),
      GSTAmount: parseFloat(GSTAmount).toFixed(2),
    }));
  }, [
    Single_row_data.Billing_Quantity,
    Single_row_data.Unit_Price,
    Single_row_data.CD_Method,
    Single_row_data.Cash_Discount,
    Single_row_data.GST,
  ]);

  const set_handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "ItemName") {
      console.log("Splitvalue", value);

      let condition = value.includes(",");

      if (condition) {
        const newvalue = value.split(",");
        const updatevalue = newvalue[0];
        const updatevalue1 = newvalue[1];
        setSingle_row_data((prevData) => ({
          ...prevData,
          ItemName: updatevalue,
          BatchNo: updatevalue1,
        }));
      } else {
        setSingle_row_data((prevData) => ({
          ...prevData,
          ItemName: value,
        }));
      }
    } else if (name === "CD_Method") {
      setSingle_row_data((prevData) => ({
        ...prevData,
        [name]: value,
        Cash_Discount: "",
      }));
    } else if (name === "Cash_Discount") {
      if (Single_row_data.CD_Method === "") {
        alert("Please choose an Discount Type");
      } else {
        setSingle_row_data((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else if (name === "Billing_Quantity") {
      let QantyCheck = getStockid_Name.find(
        (ele) =>
          ele.ItemCode === Single_row_data.ItemId &&
          ele.BatchNo === Single_row_data.BatchNo
      );
      let AvailQty = QantyCheck?.AvailableQuantity;
      console.log("AvailQty", AvailQty);

      if (AvailQty !== undefined && AvailQty < value) {
        alert(`Available Quantity is ${AvailQty}`);
      } else {
        setSingle_row_data((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setSingle_row_data((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const Additemforbill = (No) => {
    if (Single_row_data.Billing_Quantity === "") {
      alert("Enter Billing Quantity");
    } else if (
      Single_row_data.CD_Method !== "" &&
      Single_row_data.Cash_Discount === ""
    ) {
      alert("Enter Discount Amount");
    } else {
      const Samedata = Billing_itemtable.findIndex(
        (repeat) => repeat.S_No === No
      );
      const updatedStockIdName = getStockid_Name.map((ele) => ({
        ...ele,
        AvailableQuantity:
          ele.BatchNo === parseInt(Single_row_data.BatchNo)
            ? ele.AvailableQuantity - parseInt(Single_row_data.Billing_Quantity)
            : ele.AvailableQuantity,
      }));

      setgetStockid_Name(updatedStockIdName);

      if (Samedata !== -1) {
        let upppdata = [...Billing_itemtable];
        upppdata[Samedata] = { S_No: No, ...Single_row_data };
        setBilling_itemtable(upppdata);
      } else {
        let dattt = Billing_itemtable.find(
          (p) => p.ItemName === Single_row_data.ItemName
        );
        console.log(dattt);
        if (dattt) {
          alert(` The Item Name already exists`);
        } else {
          const S_No = Billing_itemtable.length + 1;

          setBilling_itemtable((prevBillingItemTable) => [
            ...prevBillingItemTable,
            { S_No, ...Single_row_data },
          ]);
        }
      }
      setSingle_row_data({
        ItemId: "",
        ItemName: "",
        Generic: "",
        BatchNo: "",
        Exp_Date: "",
        Quantity: "",
        Billing_Quantity: "",
        Unit_Price: "",
        Amount: "",
        CD_Method: "",
        Cash_Discount: "",
        GST: "",
        Original_total: "",
        Total: "",
        GSTAmount: "",
        HSNCode: "",
      });
    }
  };

  const Editbillingitem = (single_Edit_data) => {
    console.log(single_Edit_data, "single_Edit_data");
    const updatedStockIdName = getStockid_Name.map((ele) => ({
      ...ele,
      AvailableQuantity:
        ele.BatchNo === parseInt(single_Edit_data.BatchNo)
          ? ele.AvailableQuantity + parseInt(single_Edit_data.Billing_Quantity)
          : ele.AvailableQuantity,
    }));

    setgetStockid_Name(updatedStockIdName);

    setSingle_row_data((prevData) => ({
      ...prevData,
      ItemId: single_Edit_data?.ItemId || "",
      ItemName: single_Edit_data?.ItemName || "",
      Quantity: single_Edit_data?.Quantity || "",
      Generic: single_Edit_data?.Generic || "",
      BatchNo: single_Edit_data?.BatchNo || "",
      Exp_Date: single_Edit_data?.Exp_Date || "",
      Billing_Quantity: single_Edit_data?.Billing_Quantity || "",
      Unit_Price: single_Edit_data?.Unit_Price || "",
      Amount: single_Edit_data?.Amount || "",
      CD_Method: single_Edit_data?.CD_Method || "",
      Cash_Discount: single_Edit_data?.Cash_Discount || "",
      GST: single_Edit_data?.GST || "",
      Original_total: single_Edit_data?.Original_total || "",
      Total: single_Edit_data?.Total || "",
      GSTAmount: single_Edit_data?.GSTAmount || "",
      S_No: single_Edit_data?.S_No,
      HSNCode: single_Edit_data?.HSNCode,
    }));
  };

  const deletebillingitem = (S_No) => {
    let Temp_delarr = Billing_itemtable.filter((ele) => ele.S_No !== S_No);

    // Add the modified array back to the state with the new S_No
    setBilling_itemtable(
      Temp_delarr.map((item, index) => ({ ...item, S_No: index + 1 }))
    );
  };

  const [summary, setSummary] = useState({
    totalItems: 0,
    totalQty: 0,
    totalBase: 0,
    Discount: 0,
    Amount: 0,
    SGSTval: 0,
    CGSTval: 0,
    GSTAmount: 0,
    totalAmount: 0,
    PaidAmount: 0,
    BalanceAmount: 0,
    Roundoff: 0,
  });

  useEffect(() => {
    let totalItems = 0;
    let totalQty = 0;
    let totalBase = 0;
    let Discount = 0;
    let Amount = 0;
    let SGSTval = 0;
    let CGSTval = 0;
    let GSTAmount = 0;
    let totalAmount = 0;
    Billing_itemtable.forEach((item) => {
      if (item.CD_Method === "Percentage") {
        Discount =
          (parseFloat(item.Amount) * parseFloat(item.CD_Amount)) / 100 || 0;
      } else {
        Discount = parseFloat(item.CD_Amount) || 0;
      }
      Discount += parseFloat(Discount) || 0;
      totalAmount += parseFloat(item.Total) || 0;
      Amount += parseFloat(item.Original_total) || 0;
      CGSTval += parseFloat(item.GSTAmount / 2) || 0;
      SGSTval += parseFloat(item.GSTAmount / 2) || 0;
      GSTAmount += parseFloat(item.GSTAmount) || 0;
      totalBase += parseFloat(item.Amount) || 0;
      totalQty += +item.Billing_Quantity || 0;
      totalItems += 1;
    });
    if (NetAmount_CDmethod.Amount && NetAmount_CDmethod.Method) {
      if (NetAmount_CDmethod.Method === "Percentage") {
        Discount = (totalBase * parseFloat(NetAmount_CDmethod.Amount)) / 100;
      } else {
        Discount = parseFloat(NetAmount_CDmethod.Amount);
      }
      Amount = totalBase - Discount || 0;
      let gatgst = parseInt((GSTAmount / Amount) * 100);
      GSTAmount = (Amount * gatgst) / 100 || 0;
      console.log(gatgst, "gatgst");
      CGSTval = GSTAmount / 2;
      SGSTval = GSTAmount / 2;
      totalAmount = Amount + GSTAmount;
    }
    const newState = {
      totalItems,
      totalQty,
      totalBase,
      Discount,
      Amount,
      SGSTval,
      CGSTval,
      GSTAmount,
      totalAmount,
    };
    setSummary({
      totalItems: newState.totalItems,
      totalQty: newState.totalQty,
      totalBase: newState.totalBase,
      Discount: newState.Discount,
      Amount: newState.Amount.toFixed(2),
      SGSTval: newState.SGSTval.toFixed(2),
      CGSTval: newState.CGSTval.toFixed(2),
      GSTAmount: newState.GSTAmount.toFixed(2),
      totalAmount: newState.totalAmount.toFixed(2),
    });
  }, [Billing_itemtable, NetAmount_CDmethod.Amount, NetAmount_CDmethod.Method]);

  useEffect(() => {
    if (summary.totalAmount) {
      let G_Total = parseFloat(summary.totalAmount);
      let roundedAmount = Math.round(G_Total);
      let difference = roundedAmount - G_Total;

      if (roundedAmount !== G_Total) {
        setSummary((prev) => ({
          ...prev,
          totalAmount: roundedAmount.toFixed(2),
          Roundoff: difference.toFixed(2),
        }));
      }
    }
  }, [summary.totalAmount]);

  const numberToWords = (number) => {
    let num = parseInt(number.toString().split(".")[0]);

    if (num === 0) {
      return "Zero";
    }

    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const convert = (num) => {
      // Check if num is NaN or not a valid number
      if (isNaN(num) || num < 0 || !Number.isInteger(num)) {
        return "Invalid input";
      }

      if (num === 0) return "Zero";
      if (num < 10) return units[num];
      if (num < 20) return teens[num - 10];
      if (num < 100)
        return (
          tens[Math.floor(num / 10)] +
          (num % 10 !== 0 ? " " + units[num % 10] : "")
        );
      if (num < 1000)
        return units[Math.floor(num / 100)] + " Hundred " + convert(num % 100);
      if (num < 1000000)
        return (
          convert(Math.floor(num / 1000)) + " Thousand " + convert(num % 1000)
        );
      return (
        convert(Math.floor(num / 1000000)) +
        " Million " +
        convert(num % 1000000)
      );
    };

    return convert(num);
  };

  const handleTotal_SelectCDMethod = (event) => {
    const { value } = event.target;
    setNetAmount_CDmethod(value);
  };

  const handleInputChange = (name, value) => {
    if (name === "PatientId") {
      const selectedPatient = Patient_list.find(
        (ele) => ele.PatientId === value
      );

      if (selectedPatient && Object.keys(selectedPatient).length !== 0) {
        setSelectedPatient_list((prevData) => ({
          ...prevData,
          [name]: value,
          PatientName: `${selectedPatient?.FirstName} ${selectedPatient?.MiddleName} ${selectedPatient?.SurName}`,
          PatientAge: selectedPatient.Age,
          Gender: selectedPatient.Gender,
          PatientAddress: selectedPatient.Street,
          City: selectedPatient.City,
          State: selectedPatient.State,
          Pincode: selectedPatient.Pincode,
          PhoneNumber: selectedPatient.PhoneNumber,
          GSTnumber: selectedPatient.ClientName,
          PatientType: selectedPatient.PatientType,
        }));
      } else {
        setSelectedPatient_list((prev) => ({
          ...prev,
          [name]: value,
          Doctor_name: "",
          PatientName: "",
          PatientAge: "",
          PatientAddress: "",
          City: "",
          State: "",
          Pincode: "",
          PhoneNumber: "",
          GSTnumber: "",
          PatientType: "",
        }));
      }
    } else if (name === "PhoneNumber") {
      const selectedPatient = Patient_list.find((ele) => ele.PhoneNo === value);
      // console.log('selectedPatient',selectedPatient)

      if (selectedPatient && Object.keys(selectedPatient).length !== 0) {
        setSelectedPatient_list((prevData) => ({
          ...prevData,
          [name]: value,
          PatientId: selectedPatient.PatientId,
          PatientName: `${selectedPatient?.FirstName} ${selectedPatient?.MiddleName} ${selectedPatient?.SurName}`,
          PatientAge: selectedPatient.Age,
          Gender: selectedPatient.Gender,
          PatientAddress: selectedPatient.Street,
          City: selectedPatient.City,
          State: selectedPatient.State,
          Pincode: selectedPatient.Pincode,
          GSTnumber: selectedPatient.ClientName,
          PatientType: selectedPatient.PatientType,
        }));
      } else {
        setSelectedPatient_list((prev) => ({
          ...prev,
          [name]: value,
          Doctor_name: "",
          PatientName: "",
          PatientAge: "",
          PatientAddress: "",
          City: "",
          State: "",
          Pincode: "",
          PatientId: "",
          GSTnumber: "",
          PatientType: "",
        }));
      }
    } else if (name === "PatientName") {
      console.log(value);
      const selectedPatient = Patient_list.find(
        (ele) => `${ele.FirstName} ${ele.MiddleName} ${ele.SurName}` === value
      );

      // console.log('selectedPatient',selectedPatient)

      if (selectedPatient && Object.keys(selectedPatient).length !== 0) {
        setSelectedPatient_list((prevData) => ({
          ...prevData,
          [name]: value,
          PatientId: selectedPatient.PatientID,
          PatientAge: selectedPatient.Age,
          Gender: selectedPatient.Gender,
          PatientAddress: selectedPatient.Street,
          City: selectedPatient.City,
          State: selectedPatient.State,
          Pincode: selectedPatient.Pincode,
          PhoneNumber: selectedPatient.PhoneNumber,
          GSTnumber: selectedPatient.ClientName,
          PatientType: selectedPatient.PatientType,
        }));
      } else {
        setSelectedPatient_list((prev) => ({
          ...prev,
          [name]: value,
          Doctor_name: "",
          PatientAge: "",
          PatientAddress: "",
          City: "",
          State: "",
          Pincode: "",
          PhoneNumber: "",
          PatientId: "",
          GSTnumber: "",
          PatientType: "",
        }));
      }
    } else {
      setSelectedPatient_list((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    setBillAmount([]);
    axios
      .get(`${urllink}Masters/Clinic_Detials_link`)
      .then((response) => {
        const clinicData = response.data[0];
        if (clinicData) {
          const addressComponents = [clinicData.DoorNo, clinicData.Area].filter(
            (component) => component
          );

          setClinicDetials((prev) => ({
            ...prev,
            ClinicAddress: addressComponents.join(", "),
            ClinicGST: clinicData.GSTNo || prev.ClinicGST,
            ClinicCity: clinicData.City || prev.ClinicCity,
            ClinicState: clinicData.State || prev.ClinicState,
            ClinicCode: clinicData.Pincode || prev.ClinicCode,
            ClinicMobileNo: clinicData.PhoneNo || prev.ClinicMobileNo,
            ClinicLandLineNo: clinicData.LandlineNo || prev.ClinicLandLineNo,
            ClinicMailID: clinicData.Mail || prev.ClinicMailID,
          }));
          // if (clinicData.Clinic_Logo) {
          //   setClinic_Logo(`data:image/png;base64,${clinicData.Clinic_Logo}`);
          // }
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // axios
    //   .get(`${urllink}usercontrol/getAccountsetting`)
    //   .then((response) => {
    //     const accountData = response.data;
    //     if (accountData) {
    //       setClinicDetials((prev) => ({
    //         ...prev,
    //         ClinicName: accountData.clinicName,
    //         ClinicLogo: `data:image/png;base64,${accountData.Clinic_Logo}`,
    //       }));
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }, [userRecord?.location]);

  const Submitalldata = () => {
    const summafunc = () => {
      if (billAmount.length === 0) {
        alert("Enter Bill Payment Detials");
      } else {
        let total_netamount = billAmount.reduce((total, ele) => {
          return +total + +ele.paidamount;
        }, 0);
        if (parseInt(total_netamount) === parseInt(summary.totalAmount)) {
          setIsPrintButtonVisible(false);
          setTimeout(() => {
            handlePrint();
          }, 1000);
        } else {
          alert("please collect the correct amount");
        }
      }
    };
    if (+summary.BalanceAmount === 0) {
      summafunc();
    } else {
      alert(`no due in the pharmacy billing`);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => document.getElementById("reactprintcontent"),
    onBeforePrint: () => {},
    onAfterPrint: async () => {
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

              //     const formData = new FormData();
              //     formData.append("DefuldInvoicenumber", DefuldInvoicenumber);
              //     formData.append(
              //       "SelectedPatient_list",
              //       JSON.stringify(SelectedPatient_list)
              //     );
              //     formData.append(
              //       "Billing_date",
              //       Billing_date.toISOString().split("T")[0]
              //     );
              //     formData.append("Billpay_method", formAmount.Billpay_method);
              //     formData.append("User_Name", User_Name);
              //     formData.append("location", location);
              //     formData.append("pdfData", generatedPdfBlob);
              //     formData.append("BillType", "Pharmacy-Manual");

              //     axios
              //       .post(`${urllink}Billinginvoice/Post_PharmacyBilling_table`, {
              //         payments: billAmount,
              //         DefuldInvoicenumber,
              //         SelectedPatient_list,
              //         Billing_date: Billing_date.toISOString().split("T")[0],
              //         // Billpay_method,
              //         NetAmount_CDmethod: NetAmount_CDmethod.Method,
              //         NetAmount_CDAmount: NetAmount_CDmethod.Amount,
              //         summary: { ...summary },
              //         // total_netamount,
              //         User_Name,
              //         location,
              //         amountInWords: numberToWords(
              //           Math.round(summary.totalAmount * 100) / 100
              //         ),
              //       })
              //       .then((res) => {
              //         axios
              //           .post(
              //             `${urllink}Billinginvoice/Post_PharmacyBilling_Items_table`,
              //             {
              //               DefuldInvoicenumber,
              //               Billing_itemtable,
              //               location,
              //             }
              //           )
              //           .then((res) => {
              //             axios
              //               .post(
              //                 `${urllink}Billinginvoice/post_pharmacy_billingpdf`,
              //                 formData
              //               )
              //               .then((response) => {
              //                 handleAmountSubmit();

              setIsPrintButtonVisible(true);
              navigate("/Home/OPPharmachyBillingList");
              //               })
              //               .catch((error) => {
              //                 console.error(error);
              //               });
              //           })
              //           .catch((error) => {
              //             console.error("Error inserting data:", error);
              //           });
              //       })
              //       .catch((error) => {
              //         console.error("Error inserting data:", error);
              //       });
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

  const forPrintData = () => {
    return (
      <div className="billing-invoice" id="reactprintcontent">
        <div className="New_billlling_invoice_head">
          <div className="new_billing_logo_con">
            <img src={Clinic_Logo} alt="Medical logo" />
          </div>
          <div className="new_billing_address_1">
            <span>{ClinicDetials.ClinicName}</span>
            <div>
              <span>
                {[ClinicDetials.ClinicAddress]
                  .filter((detail) => detail)
                  .join(", ")}
              </span>
              <span>
                {[
                  ClinicDetials.ClinicCity,
                  ClinicDetials.ClinicState,
                  ClinicDetials.ClinicCode,
                ]
                  .filter((detail) => detail)
                  .join(", ")}
              </span>
            </div>
            <div>
              {[
                ClinicDetials.ClinicMobileNo,
                ClinicDetials.ClinicLandLineNo,
                ClinicDetials.ClinicMailID,
              ]
                .filter((detail) => detail)
                .join(" , ")}
            </div>
          </div>
        </div>
        <div
          className="Register_btn_con added_Register_btn_con"
          style={{ color: "var(--ProjectColor)", fontWeight: 600 }}
        >
          Pharmacy Billing
        </div>
        <br />
        <div className="new_billing_address">
          <div className="new_billing_address_2">
            <div className="new_billing_div">
              <label>
                Patient Name <span>:</span>
              </label>
              <span>{SelectedPatient_list.PatientName}</span>
            </div>
            <div className="new_billing_div">
              <label>
                Patient ID <span>:</span>
              </label>
              <span>{SelectedPatient_list.PatientId}</span>
            </div>
            <div className="new_billing_div">
              <label>
                Age <span>:</span>
              </label>
              <span>{SelectedPatient_list.PatientAge}</span>
            </div>
            <div className="new_billing_div">
              <label>
                Gender <span>:</span>
              </label>
              <span>{Patient_list.Gender}</span>
            </div>
            <div className="new_billing_div">
              <label>
                Address <span>:</span>
              </label>
              <span>{SelectedPatient_list.City}</span>
            </div>
            <div className="new_billing_div">
              <label>
                {" "}
                Patient Mobile No <span>:</span>
              </label>
              <span>{SelectedPatient_list.PhoneNumber}</span>
            </div>
            {SelectedPatient_list.PatientType === "BtoB" ? (
              <div className="new_billing_div">
                <label>
                  {" "}
                  GST Number <span>:</span>
                </label>
                <span>{SelectedPatient_list.GSTnumber}</span>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="new_billing_address_2">
            <div className="new_billing_div">
              <label>
                Invoice No <span>:</span>
              </label>
              <span>{""}</span>
            </div>
            <div className="new_billing_div">
              <label>
                GSTIN No <span>:</span>
              </label>
              <span>{ClinicDetials.ClinicGST}</span>
            </div>
            <div className="new_billing_div">
              <label>
                Physician Name <span>:</span>
              </label>
              <span>{SelectedPatient_list.Doctor_name}</span>
            </div>
            <div className="new_billing_div">
              <label>
                Date <span>:</span>
              </label>
              <span>{Billing_date.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <br />

        <div className="Selected-table-container">
          <table className="selected-medicine-table2">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Item Name</th>
                <th>Batch/HSN No</th>
                <th>Exp Date</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
                <th>Discount</th>
                <th>Amount</th>
                <th>CGST %</th>
                <th>SGST %</th>
                <th>GSTAmount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {Billing_itemtable.map((medicineInfo, index) => {
                const CGST = medicineInfo.GST / 2 || 0;
                const SGST = medicineInfo.GST / 2 || 0;
                return (
                  <tr key={index}>
                    <td>{medicineInfo.S_No}</td>
                    <td>{medicineInfo.ItemName}</td>
                    <td>
                      {medicineInfo.BatchNo}/<br />
                      {medicineInfo.HSNCode}
                    </td>
                    <td>{medicineInfo.Exp_Date}</td>
                    <td>{medicineInfo.Billing_Quantity}</td>
                    <td>{medicineInfo.Unit_Price}</td>
                    <td>{medicineInfo.Amount}</td>
                    {medicineInfo.CD_Method === "Percentage" ? (
                      <td>{medicineInfo.Cash_Discount} % </td>
                    ) : medicineInfo.CD_Method === "Cash" ? (
                      <td> Rs. {medicineInfo.Cash_Discount}</td>
                    ) : (
                      <td>No Discount</td>
                    )}
                    <td>{medicineInfo.Original_total}</td>
                    <td>{CGST}%</td>
                    <td>{SGST}%</td>
                    <td>{medicineInfo.GSTAmount}</td>
                    <td>{medicineInfo.Total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div
          className="new_billing_invoice_detials "
          style={{ paddingBottom: "10px", height: "auto" }}
        >
          <div className="invoice_detials_total_1">
            <div className="bill_body">
              <label>
                {" "}
                Items <span>:</span>
              </label>
              <span>{summary.totalItems}</span>
            </div>
            <div className="bill_body">
              <label>
                {" "}
                Quantity <span>:</span>
              </label>
              <span>{summary.totalQty}</span>
            </div>
            <div className="bill_body">
              <label>
                {" "}
                MRP <span>:</span>
              </label>
              <span>{summary.totalBase}</span>
            </div>
            <div className="bill_body">
              <label>
                {" "}
                Discount <span>:</span>
              </label>
              <span>{summary.Discount}</span>
            </div>
            <div className="bill_body">
              <label>
                {" "}
                Amount <span>:</span>
              </label>
              <span>{summary.Amount}</span>
            </div>
            <div className="bill_body">
              <label>
                {" "}
                SGST <span>:</span>
              </label>
              <span>{summary.SGSTval / 2}</span>
            </div>
            <div className="bill_body">
              <label>
                {" "}
                CGST <span>:</span>
              </label>
              <span>{summary.CGSTval / 2}</span>
            </div>

            <div className="bill_body">
              <label>
                {" "}
                GST<span>:</span>
              </label>
              <span>{summary.GSTAmount}</span>
            </div>
            <div className="bill_body">
              <label>
                {" "}
                Net Amount <span>:</span>
              </label>
              <span>{summary.totalAmount}</span>
            </div>

            <div className="bill_body">
              <label>
                {" "}
                Roundoff<span>:</span>
              </label>
              <span>{summary.Roundoff} </span>
            </div>

            {billAmount.map((row, index) => (
              <div key={index} className="bill_body">
                <label>
                  {row.Billpay_method}
                  <span>:</span>
                </label>
                <span>{parseInt(row.paidamount).toFixed(2)}</span>
              </div>
            ))}
            <div className="bill_body">
              <label>
                Paid Amount <span>:</span>
              </label>
              <span>{summary.PaidAmount}</span>
            </div>
            <div className="bill_body">
              <label>
                Balance Amount <span>:</span>
              </label>
              <span>{summary.BalanceAmount}</span>
            </div>
          </div>
          <br />
          <div className="invoice_detials_total_1 neww_invoicedetials">
            <div className="total_con_bill">
              <div
                className="bill_body"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "20px",
                }}
              >
                <label>
                  {" "}
                  Amount In Words<span>:</span>
                </label>
                <span style={{ color: "grey" }}>
                  {numberToWords(+summary.totalAmount)}{" "}
                </span>
              </div>
              <br />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                display: "flex",
                fontSize: "11px",
                fontWeight: "bold",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
                color: "grey",
              }}
            >
              <label> Billed By :</label>
              <h3 style={{ fontSize: "14px" }}>{FilteUser_Name} </h3>
            </p>

            <p className="disclaimer23">
              This page is created automatically without a signature.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isPrintButtonVisible ? (
        <div className="new-patient-registration-form">
          <div className="QuickStock_container_header">
            <h4>
              <ShoppingCartIcon />
              OP Pharmacy Billing
            </h4>
          </div>

          <div className="mannual-header-with uiwe_uywg6">
            <div className="jkewdkx70_86">
              <div className="Billing_Invoice_header added_ivce_hed">
                <h4>MANUAL INVOICE</h4>
              </div>

              <div className="invoice_firstpart added_ivce_fistprt">
                <div className="RegisFormcon">
                  <div className="added_regisFrm1">
                    <label htmlFor="itemCode">
                      Invoice No<span>:</span>
                    </label>
                    <input
                      type="text"
                      // value=''
                      name="DefuldInvoicenumber"
                      readOnly
                    />
                  </div>

                  <div className="added_regisFrm1">
                    <label htmlFor="itemCode">
                      Date<span>:</span>
                    </label>
                    <input
                      type="Date"
                      name="Billing_date"
                      value={Billing_date.toISOString().split("T")[0]} // Convert to ISO string and extract the date part
                      onChange={(e) =>
                        setBilling_date(new Date(e.target.value))
                      }
                    />
                  </div>

                  <div className="added_regisFrm1">
                    <label htmlFor="itemCode">
                      Physician Name<span>:</span>
                    </label>
                    <input
                      // list="DoctorNames"
                      name="Doctor_name"
                      id="browser1"
                      value={SelectedPatient_list.Doctor_name}
                      onChange={(e) =>
                        handleInputChange("Doctor_name", e.target.value)
                      }
                    />
                    {/* <datalist id="DoctorNames">
                      {Doctorsnames.map((item, index) => (
                        <option key={index + "key"} value={item}></option>
                      ))}
                    </datalist> */}
                  </div>

                  <div className="added_regisFrm1">
                    <label htmlFor="get_PatientId">
                      Patient ID<span> :</span>
                    </label>

                    <div className="input-with-icon4">
                      <input
                        type="text"
                        defaultValue={SelectedPatient_list.PatientId}
                        name="PatientId"
                        list="get_PatientId"
                        onChange={(e) =>
                          handleInputChange("PatientId", e.target.value)
                        }
                      />
                    </div>

                    <datalist id="get_PatientId">
                      {Patient_list.map((item, index) => (
                        <option
                          key={item.PatientId}
                          value={item.PatientId}
                        ></option>
                      ))}
                    </datalist>
                  </div>

                  <div className="added_regisFrm1">
                    <label htmlFor="itemCode">
                      Patient Name<span>:</span>
                    </label>
                    <div>
                      <input
                        type="text"
                        value={SelectedPatient_list.PatientName}
                        name="PatientName"
                        list="FirstName_PatientId"
                        onChange={(e) =>
                          handleInputChange("PatientName", e.target.value)
                        }
                      />
                      {console.log(Patient_list)}
                      <datalist id="FirstName_PatientId">
                        {Patient_list.map((item, index) => (
                          <option
                            key={index}
                            value={`${item.FirstName} ${item.MiddleName} ${item.SurName}`}
                          >
                            {`${item.FirstName} ${item.MiddleName} ${item.SurName}`}
                          </option>
                        ))}
                      </datalist>
                    </div>
                  </div>

                  {SelectedPatient_list.PatientType === "BtoB" ? (
                    <div className="added_regisFrm1">
                      <label htmlFor="itemCode">
                        GST Number <span>:</span>
                      </label>
                      <input
                        type="text"
                        value={SelectedPatient_list.GSTnumber}
                        name="ClientName"
                        readOnly
                      />
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="added_regisFrm1">
                    <label htmlFor="itemCode">
                      Patient Age<span>:</span>
                    </label>
                    <input
                      type="number"
                      name="PatientAge"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      value={SelectedPatient_list.PatientAge}
                      onChange={(e) =>
                        handleInputChange("PatientAge", e.target.value)
                      }
                    />
                  </div>

                  <div className="added_regisFrm1">
                    <label htmlFor="itemCode">
                      Patient Address<span>:</span>
                    </label>
                    <input
                      name="PatientAddress"
                      type="text"
                      value={SelectedPatient_list.PatientAddress}
                      onChange={(e) =>
                        handleInputChange("PatientAddress", e.target.value)
                      }
                    />
                  </div>

                  <div className="added_regisFrm1">
                    <label htmlFor="itemCode">
                      City<span>:</span>{" "}
                    </label>
                    <input
                      name="City"
                      type="text"
                      value={SelectedPatient_list.City}
                      onChange={(e) =>
                        handleInputChange("City", e.target.value)
                      }
                    />
                  </div>

                  <div className="added_regisFrm1">
                    <label htmlFor="itemCode">
                      State<span>:</span>
                    </label>
                    <input
                      type="text"
                      value={SelectedPatient_list.State}
                      name="State"
                      onChange={(e) =>
                        handleInputChange("State", e.target.value)
                      }
                    />
                  </div>

                  <div className="added_regisFrm1">
                    <label htmlFor="itemCode">
                      Pincode<span>:</span>
                    </label>
                    <input
                      type="number"
                      value={SelectedPatient_list.Pincode}
                      name="Pincode"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      onChange={(e) =>
                        handleInputChange("Pincode", e.target.value)
                      }
                    />
                  </div>

                  <div className="added_regisFrm1">
                    <label htmlFor="itemCode">
                      Phone Number<span>:</span>
                    </label>
                    <div className="input-with-icon4">
                      <input
                        type="number"
                        value={SelectedPatient_list.PhoneNumber}
                        name="PhoneNumber"
                        list="Phone_Number"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        onChange={(e) =>
                          handleInputChange("PhoneNumber", e.target.value)
                        }
                      />
                      <datalist id="Phone_Number">
                        {Patient_list.map((item, index) => (
                          <option key={item.PatientID} value={item.PhoneNumber}>
                            {item.PhoneNumber}
                          </option>
                        ))}
                      </datalist>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="jkewdkx70_86">
              <div className="Add_items_Purchase_Master added_ivce_hed">
                <h4>ITEM DETAILES</h4>
              </div>

              <div className="RegisFormcon">
                <div className="added_regisFrm1">
                  <label htmlFor="browser">
                    Item Name <span>:</span>
                  </label>
                  <input
                    list="browsers"
                    name="ItemName"
                    id="browser"
                    value={Single_row_data.ItemName}
                    onChange={set_handleInputChange}
                    autoComplete="off"
                  />
                  <datalist id="browsers">
                    {Array.isArray(getStockid_Name) && getStockid_Name.map((item, index) => (
                      <option
                        key={index}
                        value={`${item.Item_Name},${item.Batch_No}`}
                      >
                        {`BatchNo:${item.Batch_No} | Ava.Qty:${
                          item.AvailableQuantity
                        } | MRP:${parseFloat(item.MRP_Per_Quantity).toFixed(
                          2
                        )}`}
                      </option>
                    ))}
                  </datalist>
                </div>
                <div className="added_regisFrm1">
                  <label htmlFor="F_ItemId">
                    Item Code<span>:</span>
                  </label>
                  <input
                    name="ItemId"
                    id="F_ItemId"
                    value={Single_row_data.ItemId}
                    onChange={set_handleInputChange}
                    readOnly
                  />
                </div>
                <div className="added_regisFrm1">
                  <label htmlFor="F_ItemId">
                    Generic Name<span>:</span>
                  </label>
                  <input
                    name="Generic"
                    id="Generic"
                    value={Single_row_data.Generic}
                    onChange={set_handleInputChange}
                    readOnly
                  />
                </div>
                <div className="added_regisFrm1">
                  <label htmlFor="BatchNo">
                    BatchNo<span>:</span>
                  </label>
                  <input
                    name="BatchNo"
                    id="BatchNo"
                    value={Single_row_data.BatchNo}
                    onChange={set_handleInputChange}
                    readOnly
                  />
                </div>
                <div className="added_regisFrm1">
                  <label htmlFor="Exp_Date">
                    Expiry Date<span>:</span>
                  </label>
                  <input
                    name="Exp_Date"
                    id="Exp_Date"
                    value={Single_row_data.Exp_Date}
                    onChange={set_handleInputChange}
                    readOnly
                  />
                </div>
                <div className="added_regisFrm1">
                  <label htmlFor="Quantity">
                    Quantity<span>:</span>
                  </label>
                  <input
                    name="Quantity"
                    id="Quantity"
                    value={Single_row_data.Quantity || "-"}
                    onChange={set_handleInputChange}
                    readOnly
                  />
                </div>
                <div className="added_regisFrm1">
                  <label htmlFor="Billing_Quantity">
                    Billing Quantity<span>:</span>
                  </label>
                  <input
                    name="Billing_Quantity"
                    id="Billing_Quantity"
                    value={Single_row_data.Billing_Quantity}
                    onChange={set_handleInputChange}
                  />
                </div>
                <div className="added_regisFrm1">
                  <label htmlFor="Unit_Price">
                    Unit Price<span>:</span>
                  </label>
                  <input
                    name="Unit_Price"
                    id="Unit_Price"
                    value={Single_row_data.Unit_Price}
                    onChange={set_handleInputChange}
                    readOnly
                  />
                </div>
                <div className="added_regisFrm1">
                  <label htmlFor="Amount">
                    Amount<span>:</span>
                  </label>
                  <input
                    name="Amount"
                    id="Amount"
                    value={Single_row_data.Amount}
                    onChange={set_handleInputChange}
                    readOnly
                  />
                </div>
                <div className="added_regisFrm1">
                  <label htmlFor="CD_Method">
                    Discount Type<span>:</span>
                  </label>
                  <select
                    name="CD_Method"
                    value={Single_row_data.CD_Method}
                    onChange={set_handleInputChange}
                    disabled={["Percentage", "Cash"].includes(
                      NetAmount_CDmethod.Method
                    )}
                  >
                    <option value="">Select</option>
                    <option value="Cash">Cash</option>
                    <option value="Percentage">Percentage</option>
                  </select>
                </div>
                <div className="added_regisFrm1">
                  <label htmlFor="Cash_Discount">
                    Discount<span>:</span>
                  </label>
                  <input
                    name="Cash_Discount"
                    id="Cash_Discount"
                    value={Single_row_data.Cash_Discount}
                    onChange={set_handleInputChange}
                    disabled={["Percentage", "Cash"].includes(
                      NetAmount_CDmethod.Method
                    )}
                  />
                </div>
                <div className="added_regisFrm1">
                  <label htmlFor="Original_total">
                    Discount Amount<span>:</span>
                  </label>
                  <input
                    name="Original_total"
                    id="Original_total"
                    value={Single_row_data.Original_total}
                    onChange={set_handleInputChange}
                    readOnly
                  />
                </div>
                <div className="added_regisFrm1">
                  <label htmlFor="GST">GST</label>
                  <input
                    name="GST"
                    id="GST"
                    value={Single_row_data.GST}
                    onChange={set_handleInputChange}
                    readOnly
                  />
                </div>
                <div className="added_regisFrm1">
                  <label htmlFor="Total">Total</label>
                  <input
                    name="Total"
                    id="Total"
                    value={Single_row_data.Total}
                    onChange={set_handleInputChange}
                    readOnly
                  />
                </div>
              </div>

              <div className="Register_btn_con added_Register_btn_con">
                <button
                  className="RegisterForm_1_btns added_RegisterForm_1_btns
                  "
                  onClick={() => Additemforbill(Single_row_data.S_No)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="for33">
            <div className="Add_items_Purchase_Master added_ivce_hed hjgyh">
              <h4>SELECTED MEDICINE</h4>
            </div>
          </div>
          <div className="Selected-table-container444 DEWSDXWED">
            <table className="selected-medicine-table222 EDWEDE">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Item Name</th>
                  <th>Batch/HSN No</th>
                  <th>Exp Date</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Amount</th>
                  <th>Discount</th>
                  <th>Amount</th>
                  <th>CGST %</th>
                  <th>SGST %</th>
                  <th>GSTAmount</th>
                  <th>Total</th>

                  <th className="hideDataForPrint">Action</th>
                </tr>
              </thead>

              <tbody>
                {Billing_itemtable.map((medicineInfo, index) => {
                  const CGST = medicineInfo.GST / 2 || 0;
                  const SGST = medicineInfo.GST / 2 || 0;

                  return (
                    <tr key={index}>
                      <td>{medicineInfo.S_No}</td>
                      <td>{medicineInfo.ItemName}</td>
                      <td>
                        {medicineInfo.BatchNo}/{medicineInfo.HSNCode}
                      </td>
                      <td>{medicineInfo.Exp_Date}</td>
                      <td>{medicineInfo.Billing_Quantity}</td>
                      <td>{medicineInfo.Unit_Price}</td>
                      <td>{medicineInfo.Amount}</td>
                      {medicineInfo.CD_Method === "Percentage" ? (
                        <td>{medicineInfo.Cash_Discount} % </td>
                      ) : medicineInfo.CD_Method === "Cash" ? (
                        <td> Rs. {medicineInfo.Cash_Discount}</td>
                      ) : (
                        <td>No Discount</td>
                      )}
                      <td>{medicineInfo.Original_total}</td>
                      <td>{CGST}%</td>
                      <td>{SGST}%</td>
                      <td>{medicineInfo.GSTAmount}</td>
                      <td>{medicineInfo.Total}</td>
                      <td>
                        <div className="Action_btns">
                          <button
                            className="delnamebtn"
                            onClick={() => {
                              Editbillingitem(medicineInfo);
                            }}
                          >
                            <EditIcon />
                          </button>
                          <button
                            className="delnamebtn"
                            onClick={() => {
                              deletebillingitem(medicineInfo.S_No);
                            }}
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <br></br>

          <div className="addded_sumry_contre">
            <div className="RegisFormcon" style={{ justifyContent: "center" }}>
              <div className="added_regisFrm1">
                <label htmlFor="">
                  CD Method<span>:</span>{" "}
                </label>
                <select
                  name="CDMethod"
                  value={NetAmount_CDmethod.Method}
                  onChange={(e) => {
                    setNetAmount_CDmethod((prev) => ({
                      ...prev,
                      Method: e.target.value,
                      Amount: "",
                    }));
                    setBillAmount([]);
                    setFormAmount({
                      Billpay_method: "",
                      CardType: "",

                      ChequeNo: "",
                      BankName: "",

                      paidamount: "",
                    });
                  }}
                  disabled={Billing_itemtable.some((ele) =>
                    ["Percentage", "Cash"].includes(ele.CD_Method)
                  )}
                >
                  <option value="">Select</option>
                  <option value="Cash">Cash</option>
                  <option value="Percentage">Percentage</option>
                </select>
              </div>

              <div className="added_regisFrm1">
                <label htmlFor="">
                  Cash Discount<span>:</span>
                </label>
                <input
                  type="number"
                  onKeyDown={blockInvalidChar}
                  name="CashDiscount"
                  value={NetAmount_CDmethod.Amount}
                  onChange={(e) => {
                    if (NetAmount_CDmethod.Method !== "") {
                      setNetAmount_CDmethod((prev) => ({
                        ...prev,
                        Amount: e.target.value,
                      }));
                      setBillAmount([]);
                      setFormAmount({
                        Billpay_method: "",
                        CardType: "",
                        ChequeNo: "",
                        BankName: "",

                        paidamount: "",
                      });
                    } else {
                      alert("Please Choose an Discount Method");
                    }
                  }}
                  disabled={Billing_itemtable.some((ele) =>
                    ["Percentage", "Cash"].includes(ele.CD_Method)
                  )}
                />
              </div>
            </div>
          </div>
          <br />
          <div className="summary-container addded_sumry_contre">
            <div
              className="RegisFormcon"
              style={{
                justifyContent: "center",
                rowGap: "8px",
                paddingTop: "5px",
              }}
            >
              <div className="clm-itm-stl">
                <label>ITEMS :</label>
                <input value={summary.totalItems} readOnly />
              </div>
              <div className="clm-itm-stl">
                <label>QTY :</label>
                <input value={summary.totalQty} readOnly />
              </div>
              <div className="clm-itm-stl">
                <label>BASE :</label>
                <input value={summary.totalBase} readOnly />
              </div>
              <div className="clm-itm-stl">
                <label>Discount :</label>
                <input value={summary.Discount} readOnly />
              </div>
              <div className="clm-itm-stl">
                <label>Amount :</label>
                <input value={summary.Amount} readOnly />
              </div>
              <div className="clm-itm-stl">
                <label>SGST:</label>
                <input value={summary.SGSTval} readOnly />
              </div>
              <div className="clm-itm-stl">
                <label>CGST :</label>
                <input value={summary.CGSTval} readOnly />
              </div>
              <div className="clm-itm-stl">
                <label>GST :</label>
                <input value={summary.GSTAmount} readOnly />
              </div>
              <div className="clm-itm-stl">
                <label>Net Amount :</label>
                <input
                  style={{ backgroundColor: "yellow" }}
                  value={summary.totalAmount}
                  readOnly
                />
              </div>

              <div className="clm-itm-stl">
                <label>
                  {" "}
                  Roundoff<span>:</span>
                </label>
                <input value={summary.Roundoff} readOnly />
              </div>
              <div className="clm-itm-stl">
                <label>Paid Amount :</label>
                <input value={summary.PaidAmount} readOnly />
              </div>
              <div className="clm-itm-stl">
                <label>Balance Amount :</label>
                <input value={summary.BalanceAmount} readOnly />
              </div>
            </div>
            <br />

            <div className="invoice-details edcwjkediu87">
              <div>
                <div
                  className="RegisFormcon"
                  style={{ justifyContent: "center", marginTop: "5px" }}
                >
                  <div className="clm-itm-stl">
                    <label>
                      Payment Method <span>:</span>
                    </label>
                    <select
                      name="Billpay_method"
                      value={formAmount.Billpay_method}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                      <option value="OnlinePayment">Online Payment</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                  </div>
                  {formAmount.Billpay_method === "Card" && (
                    <>
                      <div className="clm-itm-stl">
                        <label>
                          Card Type <span>:</span>
                        </label>
                        <select
                          name="CardType"
                          value={formAmount.CardType}
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
                          {["Debit", "Credit"].map((p, indx) => (
                            <option key={indx} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                  {formAmount.Billpay_method === "Cheque" && (
                    <>
                      <div className="clm-itm-stl">
                        <label>
                          Cheque No <span>:</span>
                        </label>
                        <input
                          type="number"
                          onKeyDown={blockInvalidChar}
                          name="ChequeNo"
                          value={formAmount.ChequeNo}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="clm-itm-stl">
                        <label>
                          Bank Name <span>:</span>
                        </label>
                        <input
                          type="text"
                          name="BankName"
                          value={formAmount.BankName}
                          onChange={handleChange}
                        />
                      </div>
                    </>
                  )}
                  {formAmount.Billpay_method === "OnlinePayment" && <></>}
                  <div className="clm-itm-stl">
                    <label>
                      Cash Amount <span>:</span>
                    </label>
                    <input
                      onKeyDown={blockInvalidChar}
                      type="number"
                      name="paidamount"
                      value={formAmount.paidamount}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="Register_btn_con added_Register_btn_con">
                  <button
                    className="RegisterForm_1_btns added_RegisterForm_1_btns"
                    onClick={isEdit !== null ? handleUpdate : handleAdd}
                  >
                    {isEdit !== null ? "Update" : "Add"}
                  </button>
                </div>
              </div>

              <div>
                {billAmount.length !== 0 && (
                  <div className="Selected-table-container444 DEWSDXWED">
                    <table className="selected-medicine-table222 EDWEDE">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Payment Type</th>
                          <th>Card Type</th>
                          <th>Cheque No</th>
                          <th>Bank Name</th>
                          <th>Amount</th>
                          <th>Action </th>
                        </tr>
                      </thead>
                      <tbody>
                        {billAmount.map((row, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row.Billpay_method}</td>
                            <td>{row.CardType || "-"}</td>
                            <td>{row.ChequeNo || "-"}</td>
                            <td>{row.BankName || "-"}</td>
                            <td>{row.paidamount}</td>
                            <td>
                              <button
                                className="delnamebtn"
                                onClick={() => handleEdit(index)}
                              >
                                <EditNoteIcon />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <div>
              <p>
                Amount in Words :{" "}
                <span
                  style={{ color: "#808080b5", padding: "0px 0px 0px 5px" }}
                >
                  {numberToWords(+summary.totalAmount || 0)}{" "}
                </span>
              </p>
            </div>
          </div>

          {isPrintButtonVisible && (
            <div className="Register_btn_con added_Register_btn_con">
              <button
                className="RegisterForm_1_btns added_RegisterForm_1_btns"
                onClick={Submitalldata}
              >
                Print
              </button>
            </div>
          )}
        </div>
      ) : (
        forPrintData()
      )}
    </>
  );
}

export default Walkinbilling;


