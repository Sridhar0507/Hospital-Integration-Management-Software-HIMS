import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import './GeneralBilling.css'
const GeneralBilling = () => {
  
  const userRecord = useSelector((state) => state.userRecord?.UserData);



  const urllink = useSelector((state) => state.userRecord?.UrlLink);

  const OP_BillingData = useSelector((state)=> state.Frontoffice?.OPBillingData)


  console.log(OP_BillingData,'ooooooo');
  


  const navigate = useNavigate();

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const [billAmount, setBillAmount] = useState([]);
  const [isEdit, setIsEdit] = useState(null);

  const [selectedOption, setSelectedOption] = useState('');
  const [ServiceData, setServiceData] = useState([]);

  //  console.log("selectedOption",selectedOption);

  useEffect(() => {
    setSelectedOption('Consultation')
  }, [])

  const [formAmount, setFormAmount] = useState({
    Billpay_method: "",
    CardType: "",
    ChequeNo: "",
    BankName: "",
    paidamount: "",
  });

  const [SelectedPatient_list, setSelectedPatient_list] = useState({
    PatientId: "",
    PatientName: "",
    PhoneNumber: "",
    PatientType: "",
    GSTnumber: "",
    InsuranceName: "",
    Gender: "",
    City: "",
    State: "",
    PatientAddress: "",
    Pincode: "",
  });


  const [Advancegetdata, setAdvancegetdata] = useState({})

  // console.log(Object.keys(Advancegetdata).length, Advancegetdata, '======');


  const [totalPaidAmount, settotalPaidAmount] = useState(0);
  const [Doctorsnames, setDoctorsnames] = useState([]);
  const [Dname, setDname] = useState("");
  const [PostInvoice, setPostInvoice] = useState(null);

  const [Data, setData] = useState([]);
  const [Billing_date, setBilling_date] = useState("");

  const [Uptateitem, setUptateitem] = useState(false)

  const [isPrintButtonVisible, setIsPrintButtonVisible] = useState(true);

  const [Patient_list, setPatient_list] = useState([]);
  // console.log('Data', Data)

  const [initialState, setinitialState] = useState({
    totalItems: 0,
    totalTaxable: 0,
    totalAmount: 0,
    totalDiscount: 0,
    totalGstamount: 0,
    totalUnits: 0,
    totalNetAmount: 0,
    PaidAmount: 0,
    BalanceAmount: 0,
    Roundoff: 0,
  });

  const [Clinic_Logo, setClinic_Logo] = useState(null);
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
    InvoiceNo: "",
  });

  const payment_method = ["Cash", "Card", "UPI", "Check"];

  const [SelectItemState, setSelectItemState] = useState({
    SelectItemName: '',
    Charges: '',
    SACcode: '',
    Amount: '',
    DiscountType: '',
    Discount: '',
    GST: '',
    Total: '',
    GSTamount: '',
    Sessions: '',
    DiscountAmount: '',
    Rate: '',
  })

  // console.log(SelectItemState,"------a");



  const numberToWords = (number) => {
    let num = parseInt(number.toString().split(".")[0]);
    if (num === 0) {
      return "Zero Rupees Only";
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
      "Ten",
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
      if (num <= 10 && num !== 0) return units[num];
      if (num < 20) return teens[num - 11];
      if (num < 100)
        return (
          tens[Math.floor(num / 10)] +
          (num % 10 !== 0 ? " " + units[num % 10] : "")
        );
      if (num < 1000)
        return (
          units[Math.floor(num / 100)] +
          " Hundred" +
          (num % 100 !== 0 ? " and " + convert(num % 100) : "")
        );
      if (num < 100000)
        return (
          convert(Math.floor(num / 1000)) +
          " Thousand" +
          (num % 1000 !== 0 ? " and " + convert(num % 1000) : "")
        );
      if (num < 10000000)
        return (
          convert(Math.floor(num / 100000)) +
          " Lakh" +
          (num % 100000 !== 0 ? " and " + convert(num % 100000) : "")
        );
    };

    return convert(num) + " Rupees  Only";
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    Clearselectitems()
  };




  useEffect(() => {
    const totalPaidAmount = billAmount
      .filter((_, indx) => indx !== isEdit)
      .reduce((total, ele) => +total + +ele.paidamount, 0);
    settotalPaidAmount(totalPaidAmount);

    setinitialState((prev) => ({
      ...prev,
      BalanceAmount: (
        parseFloat(Math.round(prev.totalNetAmount)) -
        parseFloat(totalPaidAmount)
      ).toFixed(2),
      PaidAmount: totalPaidAmount.toFixed(2),
    }));
  }, [billAmount, billAmount.length, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const total_netamount = Math.round(initialState.totalNetAmount).toFixed(2);

    // console.log(total_netamount, totalPaidAmount, "tttyyyyyyy");

    if (+totalPaidAmount !== +total_netamount) {
      if (name == "Billpay_method") {
        setFormAmount((prevState) => ({
          ...prevState, // Spread the previous state
          [name]: value, // Update the specific field based on the input's name attribute
        }));
      } else if (name === "paidamount") {
        if (billAmount.length > 0) {
          const amttt = parseFloat(total_netamount) - totalPaidAmount;
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


  useEffect(()=>{

    if(Object.values(OP_BillingData).length !==0 && OP_BillingData)
    {
     axios
      .get(
        `${urllink}GeneralBilling/getallPendingVisits/${OP_BillingData?.VisitID}/${OP_BillingData?.PatientID}`
      )
      .then((response) => {
        const Data = response.data;
        console.log('0088',Data);

        const mappedData = Data.map((item, index) => ({
          S_No: index + 1,
          ServiceType:item.ServiceType === "DoctorConsultation" ? 'Consultation' : 'Procedure',
          ServiceName: item.ServiceType === "DoctorConsultation" ? item.DoctorName : item.ProcedureName,
          TherapistName:item.ServiceType === "DoctorConsultation" ? item.DoctorName : item.ProcedureName,
          SACcode: item.SACcode,
          DiscountType: '',
          Discount: '',
          Gstchargep: '',
          Gstamount: '',
          Session: '',
          TotalAmount: '',
          Total: '',
          DiscountAmount: '',
          Rate: '',
        }));
        // console.log('mappedData',mappedData);
        
        setData(mappedData)       
      })
      .catch((error) => {
        console.error(error);
      });


      axios
        .get(
          `${urllink}doctorsworkbench/get_doctorname?patientid=${OP_BillingData?.PatientID}&visitid=${+OP_BillingData?.VisitID}`
        )
        .then((response) => {
          if (response.data.length !== 0) {
            const data = response.data[0].DoctorName;
            console.log('9900',data);
            setDname(data)
          }
          else{
            setDname('')
          }
        })
        .catch((error) => {
          console.error(error);
        });


        axios
        .get(
          `${urllink}patientmanagement/get_communication_address_billing?Patient_Id=${OP_BillingData?.PatientID}`
        )
        .then((response) => {
          const data = response.data[0];
          console.log("1234",data);
          setSelectedPatient_list({
            PatientId: data.PatientID,
            PhoneNumber: data.PhoneNumber,
            PatientType: data.PatientType,
            GSTnumber: data.GSTnumber,
            PatientName: data.FirstName + " " + data.LastName,
            Gender: data.Gender,
            City: data.City,
            State: data.State,
            PatientAddress: data.Street,
            Pincode: data.Pincode,
          });
        })
        .catch((error) => {
          console.error(error);
        });
  
      
    }

    
  },[OP_BillingData])

  useEffect(() => {
    axios
      .get(`${urllink}usercontrol/get_doctor_info?location=${userRecord?.location}`)
      .then((response) => {
        // console.log(response.data,"-----");
        setDoctorsnames(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userRecord?.location]);

  useEffect(() => {
    axios
      .get(`${urllink}patientmanagement/get_personal_info`)
      .then((response) => {
        const personalInfo = response.data;

        axios
          .get(`${urllink}patientmanagement/get_communication_address`)
          .then((addressResponse) => {
            const addressInfo = addressResponse.data;

            const mergedData = personalInfo.map((personalItem) => {
              const matchingAddressItem = addressInfo.find(
                (addressItem) =>
                  addressItem.PatientID === personalItem.PatientID
              );

              return {
                ...personalItem,
                ...matchingAddressItem,
              };
            });

            setPatient_list(mergedData);
          })
          .catch((addressError) => {
            console.error("Error fetching address info:", addressError);
          });
      })
      .catch((error) => {
        console.error("Error fetching personal info:", error);
      });
  }, []);

  useEffect(() => {
    let totalUnits = 0;
    let totalAmount = 0;
    let totalDiscount = 0;
    let totalGstamount = 0;
    let totalNetAmount = 0;
    let totalItems = 0;

    // Iterate through the Data array using forEach
    Data.forEach((item) => {

      // console.log("----items",item , parseFloat(item.Charge));

      totalUnits += +item.Session || 0;
      totalAmount += parseFloat(item.Charge) || 0;
      totalDiscount += parseFloat(item.DiscountAmount) || 0;
      totalGstamount += parseFloat(item.Gstamount) || 0;
      totalNetAmount += parseFloat(item.Total) || 0;
      totalItems += 1;
    });

    // Create a new state object with the accumulated values
    const newState = {
      totalUnits,
      totalAmount,
      totalDiscount,
      totalGstamount,
      totalNetAmount,
      totalItems,
    };

    // console.log("newState-------",newState);
    const OneConv = Math.round(+newState.totalNetAmount).toFixed(2);
    const SecConv = OneConv - newState.totalNetAmount;

    // console.log(OneConv, SecConv, "SEcOut");

    setinitialState({
      totalItems: newState.totalItems,
      totalUnits: newState.totalUnits,
      totalDiscount: newState.totalDiscount,
      totalGstamount: newState.totalGstamount,
      totalAmount: newState.totalNetAmount.toFixed(2),
      totalTaxable: newState.totalAmount.toFixed(2),
      totalNetAmount: OneConv,
      PaidAmount: (0).toFixed(2),
      BalanceAmount: OneConv,
      Roundoff: SecConv.toFixed(2),
    });
  }, [Data.length, Data]);


  const AddAdvancetoPayment = () => {

    if (+initialState.totalNetAmount < +Advancegetdata.Balanceamount) {

      let Balance = +Advancegetdata.Balanceamount - +initialState.totalNetAmount

      setAdvancegetdata((prev) => ({
        ...prev,
        Balanceamount: Balance,
      }))

      let addpaymrnt = {
        Billpay_method: "Advance",
        CardType: "",
        ChequeNo: "",
        BankName: "",
        paidamount: initialState.totalNetAmount,
      }

      setBillAmount((prev) => [...prev, addpaymrnt]);

    } else {
      let addpaymrnt = {
        Billpay_method: "Advance",
        CardType: "",
        ChequeNo: "",
        BankName: "",
        paidamount: Advancegetdata.Balanceamount,
      }

      setBillAmount((prev) => [...prev, addpaymrnt]);
    }


  }




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

    console.log(index, '---');

    const item = billAmount[index];

    if (item.Billpay_method === "Advance") {


      let Remove = billAmount.filter((ele) => ele.Billpay_method !== 'Advance')
      setBillAmount(Remove)

    } else {
      setIsEdit(index);
      const item = billAmount[index];
      setFormAmount({
        ...item,
      });
    }
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

  const Clearselectitems = () => {

    setSelectItemState({
      SelectItemName: '',
      Charges: '',
      SACcode: '',
      Amount: '',
      DiscountType: '',
      Discount: '',
      GST: '',
      Total: '',
      GSTamount: '',
      Sessions: '',
      DiscountAmount: '',
      Rate: '',
    })

  }


  const handleInputChange = (name, value) => {
    if (name === "PatientId") {
      const selectedPatient = Patient_list.find(
        (ele) => ele.PatientID === value
      );

      if (selectedPatient && Object.keys(selectedPatient).length !== 0) {
        setSelectedPatient_list((prevData) => ({
          ...prevData,
          [name]: value,
          PatientName: selectedPatient.FirstName,
          PatientAge: selectedPatient.Age,
          Gender: selectedPatient.Gender,
          PatientAddress: selectedPatient.PatientAddress,
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
      const selectedPatient = Patient_list.find(
        (ele) => ele.PhoneNumber === value
      );
      // console.log('selectedPatient',selectedPatient)

      if (selectedPatient && Object.keys(selectedPatient).length !== 0) {
        setSelectedPatient_list((prevData) => ({
          ...prevData,
          [name]: value,
          PatientId: selectedPatient.PatientID,
          PatientName: selectedPatient.FirstName,
          PatientAge: selectedPatient.Age,
          Gender: selectedPatient.Gender,
          PatientAddress: selectedPatient.PatientAddress,
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
      const selectedPatient = Patient_list.find(
        (ele) => ele.FirstName === value
      );
      // console.log('selectedPatient',selectedPatient)

      if (selectedPatient && Object.keys(selectedPatient).length !== 0) {
        setSelectedPatient_list((prevData) => ({
          ...prevData,
          [name]: value,
          PatientId: selectedPatient.PatientID,
          PatientAge: selectedPatient.Age,
          Gender: selectedPatient.Gender,
          PatientAddress: selectedPatient.PatientAddress,
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
    
    if(selectedOption !== ''){
      getServicedata()
    }
  
  }, [selectedOption])


  const getServicedata = () => {
    if (Object.keys(userRecord).length !== 0) {

      axios.get(`${urllink}usercontrol/get_service_charge?Location=${userRecord?.location}`)
        .then((res) => {

          // console.log('output',res.data)

          if (res.data.length !== 0) {

            const nameSelect = selectedOption === "Consultation" ? "DoctorConsultation" : "Procedure"

            const filterdata = res.data.filter((ele) => ele.ServiceType === nameSelect)
            // console.log("filterdata",filterdata);
            setServiceData(filterdata)
          } else {
            setServiceData([])
          }
        })
        .catch((err) => {
          console.log(err);
        })

    }
  }



  const Additemstobillfun = () => {

    const requiredfields = [
      "SelectItemName",
      "SACcode",
      "Total"];

    if (selectedOption === "Consultation") {
      requiredfields.push("Charges", "Amount", "GST")
    }

    if (selectedOption === "Procedure") {
      requiredfields.push("Charges", "Amount", "GST", "Sessions", "Rate")
    }

    if (SelectItemState.DiscountType !== "") {
      requiredfields.push("Discount")
    }

    const existing = requiredfields.filter(
      (field) => !SelectItemState[field]
    );

    if (existing.length === 0) {

      let Checktest = Data.some((ele) => {
        return ele.ServiceType === selectedOption
          && ele.ServiceName === SelectItemState.SelectItemName
      })

      // console.log("Checktest",Checktest);
      if (Checktest === true) {
        alert("Service Name already exists")
      }
      else {
        const listdata = {
          ServiceType: selectedOption,
          SACcode: SelectItemState.SACcode,
          ServiceName: SelectItemState.SelectItemName,
          TherapistName: SelectItemState.SelectItemName,
          Charge: SelectItemState.Charges,
          DiscountType: SelectItemState.DiscountType,
          Discount: SelectItemState.Discount,
          Gstchargep: SelectItemState.GST,
          Gstamount: SelectItemState.GSTamount,
          Session: SelectItemState.Sessions,
          TotalAmount: SelectItemState.Amount,
          Total: SelectItemState.Total,
          DiscountAmount: SelectItemState.DiscountAmount,
          Rate: SelectItemState.Rate,
        }


        setData((prevData) => [
          ...prevData,
          { S_No: prevData.length + 1, ...listdata },
        ]);

        Clearselectitems()
      }


    }
    else {
      alert(`please fill the required fields ${existing.join(",")}`);
    }


  }

  const Updateitems = () => {


    const requiredfields = [
      "SelectItemName",
      "SACcode",
      "Total"];

    if (selectedOption === "Consultation") {
      requiredfields.push("Charges", "Amount", "GST")
    }

    if (selectedOption === "Procedure") {
      requiredfields.push("Charges", "Amount", "GST", "Sessions", "Rate")
    }

    if (SelectItemState.DiscountType !== "") {
      requiredfields.push("Discount")
    }

    const existing = requiredfields.filter(
      (field) => !SelectItemState[field]
    );

    if (existing.length === 0) {

      const listdata = {
        S_No: SelectItemState.S_No,
        ServiceType: selectedOption,
        SACcode: SelectItemState.SACcode,
        ServiceName: SelectItemState.SelectItemName,
        TherapistName: SelectItemState.SelectItemName,
        Charge: SelectItemState.Charges,
        DiscountType: SelectItemState.DiscountType,
        Discount: SelectItemState.Discount,
        Gstchargep: SelectItemState.GST,
        Gstamount: SelectItemState.GSTamount,
        Session: SelectItemState.Sessions,
        TotalAmount: SelectItemState.Amount,
        Total: SelectItemState.Total,
        DiscountAmount: SelectItemState.DiscountAmount,
        Rate: SelectItemState.Rate,
      }


      setData((prevData) =>
        prevData.map((item) =>
          item.S_No === SelectItemState.S_No ? { ...item, ...listdata } : item
        )
      );
      Clearselectitems()
    }
    else {
      alert(`please fill the required fields ${existing.join(",")}`);
    }



  }








  useEffect(() => {
    const currentDate = new Date();
    setBilling_date(format(currentDate, "dd-MM-yyyy"));

    // clinic detials
    axios
      .get(`${urllink}usercontrol/getClinic?location=${userRecord.location}`)
      .then((response) => {
        const data = response.data[0];

        if (data) {
          const addressComponents = [data.doorNo, data.area].filter((component) => component);

          setClinicDetials((prev) => ({
            ...prev,
            ClinicAddress: addressComponents.join(", "),
            ClinicGST: data.gstno || prev.ClinicGST,
            ClinicCity: data.city || prev.ClinicCity,
            ClinicState: data.state || prev.ClinicState,
            ClinicCode: data.pincode || prev.ClinicCode,
            ClinicMobileNo: data.phoneNo || prev.ClinicMobileNo,
            ClinicLandLineNo: data.landline || prev.ClinicLandLineNo,
            ClinicMailID: data.email || prev.ClinicMailID,
          }));

          if (data.Clinic_Logo) {
            setClinic_Logo(`data:image/png;base64,${data.Clinic_Logo}`);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });

      
    axios
      .get(`${urllink}usercontrol/getAccountsetting`)
      .then((response) => {
        const data = response.data;
        if (data) {
          setClinicDetials((prev) => ({
            ...prev,
            ClinicName: data.Clinic_Name,
            ClinicLogo: `data:image/png;base64,${data.Clinic_Logo}`,
          }));
        }
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${urllink}GeneralBilling/get_Overall_table_invoice?location=${userRecord.location}`)
      .then((response) => {
        const data = response.data;
        if (data) {
          setClinicDetials((prev) => ({
            ...prev,
            InvoiceNo: data.nextInvoiceNumber,
          }));
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }, [userRecord?.location]);



  

  useEffect(() => {
    if (PostInvoice) {
      handlePrint();
    }
  }, [PostInvoice]);
  

  const Submitalldata = () => {

    const summafunc = () => {
      if (!SelectedPatient_list?.PatientId || !SelectedPatient_list?.PatientName) {
        alert("Please select a patient name.");
        return; // Exit the function if the condition is met
      }

      const SelectedPatient_listAll = {
        payments: billAmount,
        InvoiceNo: ClinicDetials.InvoiceNo,
        Billing_date: Billing_date,
        Doctor_name: Dname,
        PatientId: SelectedPatient_list?.PatientId,
        VisitId: OP_BillingData.VisitID || 0,
        PatientName: SelectedPatient_list.PatientName,
        PatientAge: SelectedPatient_list.Age || '',
        PatientType: SelectedPatient_list.PatientType,
        GSTnumber: SelectedPatient_list.GSTnumber,
        PatientAddress: SelectedPatient_list.PatientAddress || '',
        BilledBy: userRecord.username,
        location: userRecord.location,
        City: SelectedPatient_list.City,
        State: SelectedPatient_list.State,
        Pincode: SelectedPatient_list.Pincode,
        PhoneNumber: SelectedPatient_list.PhoneNumber,
        items: initialState.totalItems,
        unit: initialState.totalUnits,
        Amount: initialState.totalAmount,
        CashDiscount: initialState.totalDiscount,
        GSTAmount: initialState.totalGstamount,
        Net_Amount: initialState.totalNetAmount,
        Paid_Amount: initialState.PaidAmount,
        Balance_Amount: initialState.BalanceAmount,
        Roundoff: initialState.Roundoff,
        Status: parseInt(initialState.BalanceAmount) === 0 ? "Paid" : "Due",
        Amount_in_Words: numberToWords(
          Math.round(initialState.totalNetAmount * 100) / 100
        ),
        Billing_itemtable: Data
      };

      console.log(SelectedPatient_listAll, "SelectedPatient_listAll");
      console.log(SelectedPatient_listAll.Billing_itemtable, "SelectedPatient_listAll");

      if (billAmount.length !== 0) {


        axios
          .post(`${urllink}GeneralBilling/Post_overallBilling_table`, SelectedPatient_listAll)
          .then((response) => {
            console.log(response);
            const billing_Invoicenumber = response.data?.message;

            const apiUrl = `${urllink}GeneralBilling/overall_amount_table`;
            const submissionData = {
              InvoiceNo: billing_Invoicenumber, // Assuming ClinicDetails is accessible
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
              .then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
            setIsPrintButtonVisible(false);
            setTimeout(() => {
              setPostInvoice(billing_Invoicenumber);
            }, 500);
          })
          .catch((error) => {
            console.error(error);
          });




      } else {
        alert("Please pay some amount of the invoice amount.");
      }
    };
    if (parseFloat(initialState.BalanceAmount) !== 0) {
      const resss = window.confirm(
        `Are you sure want to bill the invoivce , because the ${initialState.BalanceAmount} are in due`
      );
      if (resss) {
        summafunc();
      }
    } else {
      summafunc();
    }
  };


  const handlePrint = useReactToPrint({
    content: () => document.getElementById("reactprintcontent"),
    onBeforePrint: () => { },
    onAfterPrint: async () => {
      const printdata = document.getElementById("reactprintcontent");

      try {
        if (printdata) {
          const contentWidth = printdata.offsetWidth;
          const padding = 20;
          const pdfWidth = contentWidth + 2 * padding;
          const pdfHeight = contentWidth * 1.5;
          const pdf = new jsPDF({
            unit: "px",
            format: [pdfWidth, pdfHeight],
          });
          pdf.html(printdata, {
            x: padding,
            y: padding,
            callback: () => {
              const generatedPdfBlob = pdf.output("blob");

              // Construct the request body including previous state

              const finalData = {
                DefuldInvoicenumber: PostInvoice || "",
                PatientId: SelectedPatient_list?.PatientId || "",
                PatientName: SelectedPatient_list?.PatientName || "",
                Billing_date: Billing_date || "",
                PatientAge: SelectedPatient_list?.Age || "",
                BilledBy: userRecord?.username || "",
                location: userRecord?.location || "",
                BillType: "General",
                generatedPdfBlob: generatedPdfBlob,
              };

              axios
                .post(
                  `${urllink}Billinginvoice/post_overall_billingpdf`,
                  finalData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
                    },
                  }
                )
                .then((response) => {
                  setIsPrintButtonVisible(true);
                  navigate("/Home/Billing-Invoice");
                  setPostInvoice(null);
                })
                .catch((error) => {
                  console.error(error);
                });
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


  useEffect(()=>{
      
      if(SelectItemState.SelectItemName !=='' && selectedOption === "Consultation" && ServiceData.length !==0){
       
        const finddata = ServiceData.find((ele) => ele.DoctorName === SelectItemState.SelectItemName)

        if (finddata && Object.keys(finddata).length !== 0) {
          const gstAmount = (+finddata.GeneralCharge * +finddata.GSTCharge) / 100;
          const totalAmount = +finddata.GeneralCharge + +gstAmount;
  
          setSelectItemState((prev) => ({
            ...prev,
            Charges: finddata.GeneralCharge,
            SACcode: finddata.SACcode,
            Amount: finddata.GeneralCharge,
            GST: finddata.GSTCharge,
            Total: totalAmount.toFixed(2),
            GSTamount: gstAmount.toFixed(2),
          }))
        }
      

      }
      else if(SelectItemState.SelectItemName !=='' && selectedOption === "Procedure" && ServiceData.length !==0){
        const finddata = ServiceData.find((ele) => ele.ProcedureName === SelectItemState.SelectItemName)

         if (finddata && Object.keys(finddata).length !== 0) {
         
          setSelectItemState((prev) => ({
            ...prev,
            SACcode: finddata.SACcode,
            Amount: finddata.GeneralCharge,
            GST: finddata.GSTCharge,
            Rate: finddata.GeneralCharge,
          }))
          
        }
     
      
        }

  },[SelectItemState.SelectItemName,ServiceData,selectedOption])










  const set_handleInputChange = (event) => {

    const { name, value } = event.target
    if (name === 'SelectItemName' && selectedOption === "Consultation") {
      setSelectItemState((prev) => ({
            ...prev,
            [name]:value,
            Charges: "",
            SACcode: "",
            Amount: "",
            GST: "",
            Total: "",
            GSTamount: "",
            DiscountType: "",
            Discount: "",
            Rate: '',
          }))
    }

    else if (name === 'SelectItemName' && selectedOption === "Procedure") {


      setSelectItemState((prev) => ({
            ...prev,
            [name]:value,
            Charges: "",
            SACcode: "",
            Amount: "",
            GST: "",
            Total: "",
            GSTamount: "",
            DiscountType: "",
            Discount: "",
            DiscountAmount: '',
            Sessions: '',
            Rate: '',
          }))


    }
 
     else if (name === 'SelectItemName' && selectedOption === "Advance") {

      const finddata = ServiceData.find((ele) => ele.ProcedureName === value)

      if (finddata && Object.keys(finddata).length !== 0) {

        setSelectItemState((prev) => ({
          ...prev,
          [name]: value,
          SACcode: finddata.SACcode,
        }))
      }
      else {
        setSelectItemState((prev) => ({
          ...prev,
          [name]: value,
          Charges: "",
          SACcode: "",
          Amount: "",
          GST: "",
          Total: "",
          GSTamount: "",
          DiscountType: "",
          Discount: "",
          DiscountAmount: '',
          Rate: '',
        }))
      }
    }
    else if (name === 'Discount' && SelectItemState.DiscountType === "Cash") {

      if (+SelectItemState.Charges <= +value) {
        alert("Discount is larger than Total Amount")
      } else {
        const disam = +SelectItemState.Charges - +value

        const disam2 = (+SelectItemState.Rate * +SelectItemState.Sessions) - +value


        const selectamount = selectedOption === "Procedure" ? disam2 : disam

        const gstAmount = (+selectamount * +SelectItemState.GST) / 100;
        const totalAmount = +selectamount + +gstAmount;



        setSelectItemState((prev) => ({
          ...prev,
          [name]: value,
          Amount: selectamount.toFixed(2),
          Total: totalAmount.toFixed(2),
          DiscountAmount: value,
          GSTamount: gstAmount,

        }))
      }

    } else if (name === 'Discount' && SelectItemState.DiscountType === "Percentage") {

      if (+value >= 100) {
        alert("Discount percentage cannot be greater than 99");
      } else {
        const discountValue = (+SelectItemState.Charges * +value) / 100;
        const discountedAmount = +SelectItemState.Charges - discountValue;

        const discountValue2 = ((+SelectItemState.Rate * +SelectItemState.Sessions) * +value) / 100;
        const discountedAmount2 = (+SelectItemState.Rate * +SelectItemState.Sessions) - discountValue2;

        const selectdvalue = selectedOption === "Procedure" ? discountValue2 : discountValue


        const selectamount = selectedOption === "Procedure" ? discountedAmount2 : discountedAmount

        const gstAmount = (selectamount * +SelectItemState.GST) / 100;
        const totalAmount = selectamount + gstAmount;

        setSelectItemState((prev) => ({
          ...prev,
          [name]: value,
          Amount: selectamount.toFixed(2),
          Total: totalAmount.toFixed(2),
          DiscountAmount: selectdvalue,
          GSTamount: gstAmount,
        }));

      }

    }
    else if (name === 'DiscountType') {



      const first1 = SelectItemState.Charges

      const first2 = +SelectItemState.Rate * +SelectItemState.Sessions

      const selectf = selectedOption === "Procedure" ? first2 : first1


      const gstAmount = (+selectf * +SelectItemState.GST) / 100;
      const totalAmount = +selectf + +gstAmount;



      setSelectItemState((prev) => ({
        ...prev,
        [name]: value,
        Discount: '',
        DiscountAmount: '',
        Amount: selectf,
        Total: totalAmount,
      }))

    } else if (name === 'Sessions') {

      const clacses = +SelectItemState.Rate * +value

      const gstAmount = (+clacses * +SelectItemState.GST) / 100;
      const totalAmount = +clacses + +gstAmount;

      setSelectItemState((prev) => ({
        ...prev,
        [name]: value,
        Charges: clacses,
        Amount: clacses,
        Total: totalAmount,
        GSTamount: gstAmount,
        DiscountType: '',
        Discount: '',
      }))

    }
    else {
      setSelectItemState((prev) => ({
        ...prev,
        [name]: value,
      }))
    }


  }


  const Editbillingitem = (itmes) => {

    setUptateitem(true)
    setBillAmount([])
    setSelectedOption(itmes.ServiceType)
    setSelectItemState((prev) => ({
      ...prev,
      SelectItemName: itmes.ServiceName,
      Charges: itmes.Charge,
      SACcode: itmes.SACcode,
      Amount: itmes.TotalAmount,
      DiscountType: itmes.DiscountType,
      Discount: itmes.Discount,
      GST: itmes.Gstchargep,
      Total: itmes.Total,
      GSTamount: itmes.Gstamount,
      Sessions: itmes.Session,
      DiscountAmount: itmes.DiscountAmount,
      S_No: itmes.S_No,
      Rate: itmes.Rate,
    }))

  }

  const deletebillingitem = (row) => {

    console.log(row ,'pppppppppp');


    if(Object.keys(OP_BillingData).length !==0 && row){

      let RemoveItems ={
        patientid:OP_BillingData?.PatientID,
        visitid:OP_BillingData?.VisitID,
        ServiceType:row.ServiceType,
        ServiceName:row.ServiceName,
        SACcode:row.SACcode
      }

      axios.post(`${urllink}GeneralBilling/RemoveItemsFrombill`,RemoveItems)
      .then((res)=>{
        console.log(res.data);
      })
      .catch((err)=>{
        console.log(err);
        
      })
    }
    

    const S_No=row.S_No

    let Temp_delarr = Data.filter((ele) => ele.S_No !== S_No);
    setData(
      Temp_delarr.map((item, index) => ({ ...item, S_No: index + 1 }))
    );

    Clearselectitems()

  }
  useEffect(() => {
    if (SelectedPatient_list.PatientId !== '') {
      axios.get(`${urllink}GeneralBilling/getadvanceforpatient?patientid=${SelectedPatient_list.PatientId}`)
        .then((response) => {
          const responseData = response.data;
          console.log('responseData', responseData)

          if (Object.values(responseData).length > 5) {
            setAdvancegetdata(responseData)
          }
          else {
            setAdvancegetdata({})
          }

        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [SelectedPatient_list.PatientId, urllink]);

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
                  ClinicDetials.ClinicCode
                ]
                  .filter((detail) => detail)
                  .join(", ")}
              </span>
            </div>
            <div>
              {[
                ClinicDetials.ClinicMobileNo,
                ClinicDetials.ClinicLandLineNo,
                ClinicDetials.ClinicMailID
              ]
                .filter((detail) => detail)
                .join(" , ")}
            </div>
          </div>

        </div>
        <div
          className="Register_btn_con"
          style={{ color: "var(--ProjectColor)", fontWeight: 600 }}
        >
          Billing Invoice
        </div>
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
              <span>{SelectedPatient_list.Age}</span>
            </div>
            {SelectedPatient_list.PatientType === "BtoB" ? (
              <div className="new_billing_div">
                <label>
                  GST Number <span>:</span>
                </label>
                <span>{SelectedPatient_list.GSTnumber}</span>
              </div>
            ) : (
              <div className="new_billing_div">
                <label>
                  Gender <span>:</span>
                </label>
                <span>{SelectedPatient_list.Gender}</span>
              </div>
            )}
            <div className="new_billing_div">
              <label>
                Address <span>:</span>
              </label>
              <span>{SelectedPatient_list.City}</span>
            </div>
          </div>
          <div className="new_billing_address_2">
            <div className="new_billing_div">
              <label>
                Invoice No <span>:</span>
              </label>
              <span>{PostInvoice}</span>
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
              <span>{Dname}</span>
            </div>
            <div className="new_billing_div">
              <label>
                Date <span>:</span>
              </label>
              <span>{Billing_date}</span>
            </div>
            <div className="new_billing_div">
              <label>
                {" "}
                Patient Mobile No <span>:</span>
              </label>
              <span>{SelectedPatient_list.PhoneNumber}</span>
            </div>
          </div>
        </div>
        <br />
        <div className="new_billing_invoice_detials">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Service Type</th>
                <th>Service Name</th>
                <th>Charge / Unit</th>
                <th>Unit / Graft</th>
                <th>SAC Code</th>
                <th>Amount </th>
                <th>Discount Type</th>
                <th>Discount</th>
                <th>Taxable Amount </th>
                <th>GST Charge</th>
                <th>Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {Data.map((row, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.ServiceType}</td>
                    <td>{row.ServiceName}</td>
                    <td>{row.Charge}</td>
                    <td>{row.Session}</td>
                    <td>{row.SACcode}</td>
                    <td>{(row.Charge * row.Session).toFixed(2)}</td>
                    <td>{row.DiscountType}</td>
                    <td>{row.Discount}</td>
                    <td>{row.TotalAmount}</td>
                    <td>{`${row.Gstchargep}% - ${row.Gstamount}`}</td>
                    <td>{row.Total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <br />
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
              <span>{initialState.totalItems}</span>
            </div>
            <div className="bill_body">
              <label>
                {" "}
                Unit <span>:</span>
              </label>
              <span>{initialState.totalUnits}</span>
            </div>
            <div className="bill_body">
              <label>
                {" "}
                Amount <span>:</span>
              </label>
              <span>{initialState.totalAmount}</span>
            </div>

            <div className="bill_body">
              <label>
                {" "}
                Billed By <span>:</span>
              </label>
              <span>{userRecord.username}</span>
            </div>
            <div className="bill_body">
              <label>
                {" "}
                SGST <span>:</span>
              </label>
              <span>{initialState.totalGstamount / 2} </span>
            </div>
            <div className="bill_body">
              <label>
                {" "}
                CGST <span>:</span>
              </label>
              <span>{initialState.totalGstamount / 2} </span>
            </div>
            <div className="bill_body">
              <label>
                Net Amount <span>:</span>
              </label>
              <span>{initialState.totalNetAmount}</span>
            </div>
            <div className="bill_body">
              <label>
                Round Amount <span>:</span>
              </label>
              <span>{initialState.Roundoff}</span>
            </div>
            {billAmount.map((row, index) => (
              <div key={index} className="bill_body">
                {/* <div className="item-index">{index + 1}</div> */}
                <label>
                  {row.Billpay_method}
                  <span>:</span>
                </label>
                <span>{parseFloat(row.paidamount).toFixed(2)}</span>
              </div>
            ))}

            <div className="bill_body">
              <label>
                Paid Amount <span>:</span>
              </label>
              <span>{initialState.PaidAmount}</span>
            </div>
            <div className="bill_body">
              <label>
                Balance Amount <span>:</span>
              </label>
              <span>{initialState.BalanceAmount}</span>
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
                  {numberToWords(+initialState.totalNetAmount)}{" "}
                </span>
              </div>
            </div>
          </div>

          <div className="signature-section909">
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
        <div className="appointment">
          <div className="ADDED_QuickStock_container">
            <div className="QuickStock_container_header ">
              <h4>
                <ShoppingCartIcon /> Billing Invoice
              </h4>
            </div>

            <div className="mannual-header-with uiwe_uywg6">
              <div className="jkewdkx70_86">
                <div className="Billing_Invoice_header added_ivce_hed">
                  <h3>BILLING INVOICE</h3>
                </div>

                <div className="invoice_firstpart added_ivce_fistprt">
                  <div className="RegisFormcon">
                    <div className="added_regisFrm1">
                      <label htmlFor="itemCode">
                        Invoice No<span>:</span>
                      </label>
                      <input
                        type="text"
                        value={ClinicDetials.InvoiceNo}
                        name="DefuldInvoicenumber"
                        readOnly
                      />
                    </div>

                    <div className="added_regisFrm1">
                      <label htmlFor="itemCode">
                        Date<span>:</span>
                      </label>
                      <input
                        type="text"
                        name="Billing_date"
                        value={Billing_date}
                        readOnly
                      />
                    </div>

                    <div className="added_regisFrm1">
                      <label htmlFor="browser1">
                        Physician Name<span>:</span>
                      </label>
                      <input
                        list="DoctorNameslist"
                        id="browser1"
                        value={Dname}
                        onChange={(e) => setDname(e.target.value)}
                        disabled={Object.values(OP_BillingData).length !==0}
                      />
                      <datalist id="DoctorNameslist">
                        {Doctorsnames.map((item, index) => (
                          <option key={index + 'key'} value={item}></option>
                        ))}
                      </datalist>
                    </div>



                    <div className="added_regisFrm1">
                      <label htmlFor="get_PatientId">
                        Patient ID<span> :</span>
                      </label>

                      <div className="input-with-icon4">
                        <input
                          type="text"
                          value={SelectedPatient_list.PatientId}
                          name="PatientId"
                          list="get_PatientId"
                          onChange={(e) =>
                            handleInputChange("PatientId", e.target.value)
                          }
                          autoComplete="off"
                        disabled={Object.values(OP_BillingData).length !==0}
                        />
                      </div>

                      <datalist id="get_PatientId">
                        {Patient_list.map((item, index) => (
                          <option
                            key={item.PatientID}
                            value={item.PatientID}
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
                          autoComplete="off"
                        disabled={Object.values(OP_BillingData).length !==0}
                        />

                        <datalist id="FirstName_PatientId">
                          {Patient_list.map((item, index) => (
                            <option key={index} value={item.FirstName}>
                              {item.FirstName}
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
                          name="GSTnumber"
                          readOnly
                          onChange={(e) =>
                            handleInputChange("GSTnumber", e.target.value)
                          }
                        />
                      </div>
                    ) : (
                      <></>
                    )}

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
                          autoComplete="off"
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
                         disabled={Object.values(OP_BillingData).length !==0}
                        />
                        <datalist id="Phone_Number">
                          {Patient_list.map((item, index) => (
                            <option
                              key={item.PatientID}
                              value={item.PhoneNumber}
                            >
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
                    <input
                      type="radio"
                      id="Consultation"
                      name="serviceType"
                      value="Consultation"
                      checked={selectedOption === 'Consultation'}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="Consultation">Consultation</label>
                  </div>

                  <div className="added_regisFrm1">
                    <input
                      type="radio"
                      id="Procedure"
                      name="serviceType"
                      value="Procedure"
                      checked={selectedOption === 'Procedure'}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="Procedure">Procedure</label>
                  </div>
                  <div className="added_regisFrm1">
                    <input
                      type="radio"
                      id="advance"
                      name="serviceType"
                      value="Advance"
                      checked={selectedOption === 'Advance'}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="advance">Advance</label>
                  </div>
                </div>

                <br />

                <div className="RegisFormcon">

                  <div className="added_regisFrm1">
                    <label htmlFor="browser">Service Name</label>
                    <input
                      type="text"
                      list="SelectItemNamelist"
                      name="SelectItemName"
                      id="browser"
                      value={SelectItemState.SelectItemName}
                      onChange={set_handleInputChange}
                      autoComplete="off"
                    />
                    <datalist id="SelectItemNamelist">
                      {ServiceData.map((item, index) => (
                        selectedOption === "Consultation" ?
                          <option
                            key={index + 'key'}
                            value={item.DoctorName}
                          >
                            {item.DoctorName}
                          </option> :
                          <option
                            key={index + 'key'}
                            value={item.ProcedureName}
                          >
                            {item.ProcedureName}
                          </option>

                      ))}
                    </datalist>
                  </div>

                  <div className="added_regisFrm1">
                    <label htmlFor="F_ItemId">SAC Code</label>
                    <input
                      type="text"
                      name="SACcode"
                      value={SelectItemState.SACcode}
                      onChange={set_handleInputChange}
                      readOnly
                    />
                  </div>

                  {selectedOption === "Procedure" &&
                    <>
                      <div className="added_regisFrm1">
                        <label htmlFor="F_ItemId">Rate</label>
                        <input
                          type="number"
                          name="Rate"
                          value={SelectItemState.Rate}
                          onChange={set_handleInputChange}
                          readOnly
                        />

                      </div>


                      <div className="added_regisFrm1">
                        <label htmlFor="F_ItemId">
                          {SelectItemState.SelectItemName && SelectItemState.SelectItemName.includes("HT") ? 'Graft Count' : 'Sessions'}
                        </label>
                        <input
                          type="number"
                          name="Sessions"
                          value={SelectItemState.Sessions}
                          onChange={set_handleInputChange}
                        />

                      </div>
                    </>
                  }

                  {selectedOption !== "Advance" &&
                    <div className="added_regisFrm1">
                      <label htmlFor="F_ItemId">Charge</label>
                      <input
                        type="number"
                        name="Charges"
                        value={SelectItemState.Charges}
                        onChange={set_handleInputChange}
                        readOnly
                      />
                    </div>}



                  {selectedOption !== "Advance" &&

                    <>

                      <div className="added_regisFrm1">
                        <label htmlFor="CD_Method">Discount Type</label>
                        <select
                          name="DiscountType"
                          value={SelectItemState.DiscountType}
                          onChange={set_handleInputChange}
                          disabled={selectedOption === "Procedure" && SelectItemState.Sessions === ""}
                        >
                          <option value="">select</option>
                          <option value="Cash">Cash</option>
                          <option value="Percentage">Percentage</option>
                        </select>
                      </div>

                      <div className="added_regisFrm1">
                        <label htmlFor="Cash_Discount">Discount</label>
                        <input
                          type="number"
                          name="Discount"
                          value={SelectItemState.Discount}
                          onChange={set_handleInputChange}
                          disabled={!["Percentage", "Cash"].includes(
                            SelectItemState.DiscountType
                          )}
                        />
                      </div>
                      <div className="added_regisFrm1">
                        <label htmlFor="Amount">Amount</label>
                        <input
                          type="number"
                          name="Amount"
                          value={SelectItemState.Amount}
                          onChange={set_handleInputChange}
                          readOnly
                        />
                      </div>
                      <div className="added_regisFrm1">
                        <label htmlFor="GST">GST</label>
                        <input
                          type="number"
                          name="GST"
                          value={SelectItemState.GST}
                          onChange={set_handleInputChange}
                          readOnly
                        />
                      </div>

                    </>
                  }

                  <div className="added_regisFrm1">
                    <label htmlFor="Total">Total</label>
                    <input
                      type="number"
                      name="Total"
                      id="Total"
                      value={SelectItemState.Total}
                      onChange={set_handleInputChange}
                      readOnly={selectedOption !== "Advance"}
                    />
                  </div>


                </div>

                <div className="Register_btn_con added_Register_btn_con">
                  <button
                    className="RegisterForm_1_btns added_RegisterForm_1_btns"
                    onClick={Uptateitem ? Updateitems : Additemstobillfun}
                  >
                    {Uptateitem ? "Update" : "Add"}
                  </button>
                </div>
              </div>
            </div>
            <br />


            {/* --------------------------------------------- */}

            {Object.keys(Advancegetdata).length !== 0 ? <div className="invoice_firstpart added_ivce_fistprt">
              <div className="Selected-table-container444 DEWSDXWED">

                <table className="selected-medicine-table222 EDWEDE">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Service Type</th>
                      <th>Service Name</th>
                      <th>SAC Code</th>
                      <th>Total Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(Advancegetdata).length !== 0 &&

                      <tr>
                        <td>{Advancegetdata.serialno}</td>
                        <td>{Advancegetdata.service_Type}</td>
                        <td>{Advancegetdata.procedurename}</td>
                        <td>{Advancegetdata.SACcode}</td>
                        <td>{Advancegetdata.Balanceamount}</td>
                        <td>
                          <button
                            className="delnamebtn"
                            onClick={() => {
                              AddAdvancetoPayment();
                            }}
                          >
                            Apply
                          </button>
                        </td>
                      </tr>

                    }
                  </tbody>
                </table>

              </div>


            </div> : <></>}
            <br />


            {/* -------------------------------------------- */}

            <div className="invoice_firstpart added_ivce_fistprt">
              <div className="Selected-table-container444 DEWSDXWED">

                <table className="selected-medicine-table222 EDWEDE">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Service Type</th>
                      <th>Service Name</th>
                      <th>SAC Code</th>
                      <th>Charge</th>
                      <th>Unit / Graft</th>
                      <th>Amount </th>
                      <th>Discount Type</th>
                      <th>Discount</th>
                      <th>Taxable Amount </th>
                      <th>GST Charge</th>
                      <th>Net Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Data.map((row, index) => {
                      return (
                        <tr key={index}>
                          <td>{row.S_No}</td>
                          <td>{row.ServiceType}</td>
                          <td>{row.ServiceName}</td>
                          <td>{row.SACcode}</td>
                          <td>{row.ServiceType==='Consultation'?row.Charge :row.Rate}</td>
                          <td>{row.Session}</td>
                          <td>{row.Charge}</td>
                          <td >
                            {row.DiscountType}
                          </td>
                          <td>
                            {row.Discount}
                          </td>

                          <td>{row.TotalAmount}</td>

                          <td>{`${row.Gstchargep}% - ${row.Gstamount}`}</td>

                          <td>{row.Total}</td>
                          <td>  <div className="Action_btns">
                            <button
                              className="delnamebtn"
                              onClick={() => {
                                Editbillingitem(row);
                              }}
                            >
                              <EditIcon />
                            </button>
                            <button
                              className="delnamebtn"
                              onClick={() => {
                                deletebillingitem(row);
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
                    <label>Items:</label>
                    <input value={initialState.totalItems} readOnly />
                  </div>
                  <div className="clm-itm-stl">
                    <label>Unit:</label>
                    <input value={initialState.totalUnits} readOnly />
                  </div>

                  <div className="clm-itm-stl">
                    <label>Taxable Amount:</label>
                    <input value={initialState.totalTaxable} readOnly />
                  </div>
                  <div className="clm-itm-stl">
                    <label>Cash Discount :</label>
                    <input value={initialState.totalDiscount} readOnly />
                  </div>
                  <div className="clm-itm-stl">
                    <label>GST Amount :</label>
                    <input value={initialState.totalGstamount} readOnly />
                  </div>

                  <div className="clm-itm-stl">
                    <label>Total Amount:</label>
                    <input value={initialState.totalAmount} readOnly />
                  </div>

                  <div className="clm-itm-stl">
                    <label>Round Off :</label>
                    <input value={initialState.Roundoff} readOnly />
                  </div>

                  <div className="clm-itm-stl">
                    <label>Net Amount :</label>
                    <input style={{ backgroundColor: "yellow" }} value={initialState.totalNetAmount} readOnly />
                  </div>


                  <div className="clm-itm-stl">
                    <label>Paid Amount :</label>
                    <input value={initialState.PaidAmount} readOnly />
                  </div>
                  <div className="clm-itm-stl">
                    <label>Balance Amount :</label>
                    <input value={initialState.BalanceAmount} readOnly />
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
                                  <button onClick={() => handleEdit(index)}>
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
                      style={{
                        color: "#808080b5",
                        padding: "0px 0px 0px 5px",
                      }}
                    >
                      {numberToWords(+initialState.totalNetAmount)}{" "}
                    </span>
                  </p>
                </div>
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
        </div>
      ) : (
        forPrintData()
      )}
    </>
  );
};

export default GeneralBilling;


// ------------------------------------------------------


                // 'InsuranceName':row.Registration_Id.InsuranceName,
                // 'InsuranceType':row.Registration_Id.InsuranceType,
                // 'ClientName':row.Registration_Id.ClientName,
                // 'ClientType':row.Registration_Id.ClientType,
                // 'ClientEmployeeId':row.Registration_Id.ClientEmployeeId,
                // 'ClientEmployeeDesignation':row.Registration_Id.ClientEmployeeDesignation,
                // 'ClientEmployeeRelation':row.Registration_Id.ClientEmployeeRelation,
                // 'EmployeeId':row.Registration_Id.EmployeeId,
                // 'EmployeeRelation':row.Registration_Id.EmployeeRelation,
                // 'IsMLC':row.Registration_Id.IsMLC,
                // 'Flagging':row.Registration_Id.Flagging,
                // 'IsReferral':row.Registration_Id.IsReferral,
                // 'ClientEmployeeDesignation':row.Registration_Id.ClientEmployeeDesignation,
                // 'Doctor_Ratecard_Id':row.Doctor_Ratecard_Id.RateCard_Id,
                // 'DoctorType':row.Doctor_Ratecard_Id.Doctor_ID.DoctorType,
                // 'General_Consultation_Fee':row.Doctor_Ratecard_Id.General_Consultation_Fee,
                // 'General_Follow_Up_Fee':row.Doctor_Ratecard_Id.General_Follow_Up_Fee,
                // 'General_Emg_Consulting_Fee':row.Doctor_Ratecard_Id.General_Emg_Consulting_Fee,
                // 'Special_Consultation_Fee':row.Doctor_Ratecard_Id.Special_Consultation_Fee,
                // 'Special_Follow_Up_Fee':row.Doctor_Ratecard_Id.Special_Follow_Up_Fee,
                // 'Special_Emg_Consulting_Fee':row.Doctor_Ratecard_Id.Special_Emg_Consulting_Fee