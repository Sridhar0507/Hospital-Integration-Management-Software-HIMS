import React, { useEffect ,useRef} from "react";
import { useState } from "react";
import { format } from "date-fns";
import axios from "axios";
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
  
  const UrlLink = useSelector(state => state.userRecord?.UrlLink);
  const UserData = useSelector((state) => state.userRecord?.UserData);
  const OP_BillingData = useSelector((state)=> state.Frontoffice?.OPBillingData)
  const toast = useSelector(state => state.UserData?.toast);
  
  const navigate = useNavigate();

  const componentRef = useRef();

  
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const [billAmount, setBillAmount] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [PostInvoice, setPostInvoice] = useState(null);


  const [selectedOption, setSelectedOption] = useState('');
  
  const [Patient_list, setPatient_list] = useState([]);
  const [ServiceData, setServiceData] = useState([]);  
  const [Doctorsnames, setDoctorsnames] = useState([]);


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
    PatientCategory:"",
    InsuranceName: "",
    Gender: "",
    City: "",
    State: "",
    PatientAddress: "",
    Pincode: "",
  });

  const [NetAmount_CDmethod, setNetAmount_CDmethod] = useState({
    Method: "",
    Amount: "",
  });

  const [totalPaidAmount, settotalPaidAmount] = useState(0);

  const [SelectDatalist, setSelectDatalist] = useState([]);

  const currentDate = new Date();
  const Formdate=format(currentDate, "yyyy-MM-dd")
 

  const [BillingData, setBillingData] = useState({
    InvoiceNo:'',
    InvoiceDate:Formdate,
    DoctorName:'',
    DoctorId:'',
  });


  const [Uptateitem, setUptateitem] = useState(false)

  const [isPrintButtonVisible, setIsPrintButtonVisible] = useState(true);

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
  });


  const [SelectItemState, setSelectItemState] = useState({
    Servicecode: '',
    SelectItemName: '',    
    Rate: '',
    Charges: '',
    Amount: '',
    DiscountType: '',
    Discount: '',
    GST: '',
    Total: '',
    GSTamount: '',
    Quantity: '',
    DiscountAmount: '',
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

  

  useEffect(() => {
    const data = {
        PatientId: SelectedPatient_list.PatientId,
        PhoneNo: SelectedPatient_list.PhoneNumber,
        FirstName: SelectedPatient_list.PatientName,
    }
    axios.get(`${UrlLink}Frontoffice/Filter_Patient_data_For_Billing`, { params: data })
        .then((res) => {
            const data = res.data
            console.log('iiiiuuuuuu',data);
            setPatient_list(data)
        })
        .catch((err) => {
            console.log(err);
        })
}, [UrlLink, SelectedPatient_list.PatientId, SelectedPatient_list.PhoneNumber, SelectedPatient_list.PatientName]);


useEffect(()=>{

    axios.get(`${UrlLink}Frontoffice/get_doctor_personal_details`)
      .then((res) => {
          const data = res.data
          // console.log('iiii2222',data);          
          setDoctorsnames(data)
      })
      .catch((err) => {
          console.log(err);
      })

},[])


useEffect(()=>{

if(selectedOption ==='OPDServices' &&  SelectedPatient_list.PatientCategory !==''){

  axios.get(`${UrlLink}Frontoffice/get_merged_service_data`,{
    params:{
      PatientCategory:SelectedPatient_list.PatientCategory
    }
  })
  .then((res) => {
      const data = res.data
      console.log('iiii3333',data);
      
      setServiceData(data)
  })
  .catch((err) => {
      console.log(err);
  })

}


},[selectedOption,SelectedPatient_list.PatientCategory])


useEffect(() => {
  if (SelectedPatient_list.PatientId !== '' &&  SelectedPatient_list.PatientCategory !=='') {
    axios.get(`${UrlLink}Frontoffice/get_latest_appointment_for_patient`, {
      params: {
        PatientId: SelectedPatient_list.PatientId
      }
    }).then((res) => {
        const data = res.data;
        if(data){
          setSelectedPatient_list((prev)=>({
            ...prev,
            RegisterId:data.Registration_Id,
            VisitId:data.VisitId,
          }))
        }
      })
      .catch((err) => {
        console.error('Error fetching latest appointment:', err);
      });
  }
}, [SelectedPatient_list.PatientId]);

const handleOptionChange = (event) => {

  if(SelectedPatient_list.PatientCategory ===''){
    alert('Please select the Patient Category')
  }
  else{
    setSelectedOption(event.target.value);
  }
}
 


  const handleChangeBillingData =(e)=>{

    const {name,value}=e.target
    console.log('value',value);
    
    const finddata = Doctorsnames.find((ele) => ele.ShortName === value)

   if(finddata){
    setBillingData((prev)=>({
      ...prev,
      [name]:value,
      DoctorId:finddata.Doctor_ID,
    }))
   }else{
    setBillingData((prev)=>({
      ...prev,
      [name]:value,
      DoctorId:'',
    }))
   }

  }



  useEffect(()=>{

    if(Object.keys(OP_BillingData).length !==0 && SelectDatalist.length ===0){
      console.log('OP_BillingData',OP_BillingData);

      axios.get(`${UrlLink}Frontoffice/Get_OP_Billing_Details_SingleId`,{
        params: {
          QueueList_ID: OP_BillingData?.id
        }})
      .then((res)=>{
        let GetOPBillingdata = res.data
        if(Object.values(GetOPBillingdata).length > 5){
        console.log('veerrr000',GetOPBillingdata);

        setBillingData((prev)=>({
          ...prev,
          DoctorName:GetOPBillingdata.Doctor_ShortName,
          DoctorId:GetOPBillingdata.Doctor_ID,
        }))

        setSelectedPatient_list((prev)=>({
          ...prev,
          PatientId:GetOPBillingdata.PatientId,
          PatientName:GetOPBillingdata.Patient_Name,
          PhoneNumber:GetOPBillingdata.PhoneNo,
          PatientCategory:GetOPBillingdata.PatientCategory,
          Gender:GetOPBillingdata.Gender,
          City:GetOPBillingdata.City,
          State:GetOPBillingdata.State,
          PatientAddress:GetOPBillingdata.Area,
          Pincode:GetOPBillingdata.Pincode,
          RegisterId:GetOPBillingdata.Registration_Id,
          VisitId:GetOPBillingdata.VisitId,
          QueueList_ID:GetOPBillingdata.id
        }))
        
        let Adddata={
          ServiceType:GetOPBillingdata.Billing_Type,
          Servicecode: '',
          SelectItemName:GetOPBillingdata.ServiceName,    
          Rate: GetOPBillingdata.Service_Fee, 
          Charges: GetOPBillingdata.Service_Fee, 
          Amount: GetOPBillingdata.Service_Fee, 
          DiscountType: '',
          Discount: '',
          GST: '',
          Total:GetOPBillingdata.Service_Fee, 
          GSTamount: '',
          Quantity:1,
          DiscountAmount: '',
        }
  
        setSelectDatalist((prev)=>[
          ...prev,
          {S_No:prev.length+1,...Adddata}
        ])

        }
        
      })
      .catch((err) => {
        console.log(err);
    });
    
    
    

    
    }

  },[OP_BillingData])


  const Clearselectitems =()=>{
    setSelectItemState({
    Servicecode: '',
    SelectItemName: '',    
    Rate: '',
    Charges: '',
    Amount: '',
    DiscountType: '',
    Discount: '',
    GST: '',
    Total: '',
    GSTamount: '',
    Quantity: '',
    DiscountAmount: '',
    })

  }


  const Additemstobillfun=()=>{

    const requiredfields = [
      "SelectItemName",
      "Rate",
      "Quantity",
      "Charges",
      "Amount",
      "Total"];

    if (SelectItemState.DiscountType !== "") {
        requiredfields.push("Discount")
      }

    const existing = requiredfields.filter(
        (field) => !SelectItemState[field]
      );

    if (existing.length === 0) {


      let Checktest = SelectDatalist.some((ele) => {
        return ele.ServiceType === selectedOption
          && ele.SelectItemName === SelectItemState.SelectItemName
      })

      if (Checktest === true) {
        alert("Service Name already exists")
      }
      else {

        const listdata = {
          ServiceType: selectedOption,
          ...SelectItemState
        }

        setSelectDatalist((prev)=>[
          ...prev,
          {S_No:prev.length+1,...listdata}
        ])

        Clearselectitems()

      }
    
    }
    else {
      alert(`Please fill the required fields ${existing.join(",")}`);
    }
      

  }


  const Updateitems =()=>{

    const requiredfields = [
      "SelectItemName",
      "Rate",
      "Quantity",
      "Charges",
      "Amount",
      "Total"];

    if (SelectItemState.DiscountType !== "") {
        requiredfields.push("Discount")
      }

    const existing = requiredfields.filter(
        (field) => !SelectItemState[field]
      );

    if (existing.length === 0) {


      let Checktest = SelectDatalist.some((ele) => {
        return ele.ServiceType === selectedOption
          && ele.SelectItemName === SelectItemState.SelectItemName
          && ele.S_No !== SelectItemState.S_No
      })

      if (Checktest === true) {
        alert("Service Name already exists")
      }
      else {

        const listdata = {
          ServiceType: selectedOption,
          ...SelectItemState
        }

        setSelectDatalist((prev) =>
          prev.map((item) =>
            item.S_No === SelectItemState.S_No ? { ...item, ...listdata } : item
          )
        );
        Clearselectitems()
        setUptateitem(false)
      }
    
    }
    else {
      alert(`Please fill the required fields ${existing.join(",")}`);
    }

  }


  const Editbillingitem=(itmes)=>{
    setUptateitem(true)
    setBillAmount([])
    setSelectedOption(itmes.ServiceType)

    setSelectItemState((prev)=>({
      ...prev,
      Servicecode:itmes.Servicecode || '',
      SelectItemName:itmes.SelectItemName || '',
      Rate:itmes.Rate || '',
      Charges:itmes.Charges  || '',
      Amount:itmes.Amount || '',
      DiscountType: itmes.DiscountType || '',
      Discount: itmes.Discount || '',
      GST: itmes.GST || '',
      Total: itmes.Total || '',
      GSTamount: itmes.GSTamount || '',
      Quantity: itmes.Quantity || '',
      DiscountAmount: itmes.DiscountAmount || '',
      S_No: itmes.S_No || '',
    }))

  }

  const deletebillingitem =(row)=>{

    const S_No=row.S_No

    let Temp_delarr = SelectDatalist.filter((ele) => ele.S_No !== S_No);
    setSelectDatalist(
      Temp_delarr.map((item, index) => ({ ...item, S_No: index + 1 })));

    Clearselectitems()

    
  }


  useEffect(() => {
    let totalUnits = 0;
    let totalAmount = 0;
    let totalDiscount = 0;
    let totalGstamount = 0;
    let totalNetAmount = 0;
    let totalItems = 0;
  
    // Calculate totals from SelectDatalist
    SelectDatalist.forEach((item) => {
      totalUnits += +item.Quantity || 0;
      totalAmount += parseFloat(item.Charges) || 0;
      totalDiscount += parseFloat(item.DiscountAmount) || 0;
      totalGstamount += parseFloat(item.GSTamount) || 0;
      totalNetAmount += parseFloat(item.Total) || 0;
      totalItems += 1;
    });
  
    // Create a new state object with the calculated totals
    const newState = {
      totalUnits,
      totalAmount,
      totalDiscount,
      totalGstamount,
      totalNetAmount,
      totalItems,
    };
  
    const OneConv = Math.round(+newState.totalNetAmount).toFixed(2);
    const SecConv = OneConv - newState.totalNetAmount;
  
    // Check if NetAmount_CDmethod is valid
    if (
      NetAmount_CDmethod.Amount !== '' &&
      NetAmount_CDmethod.Method !== '' &&
      SelectDatalist.length !== 0
    ) {
      if (NetAmount_CDmethod.Method === 'Percentage') {
        totalDiscount = (newState.totalAmount * NetAmount_CDmethod.Amount) / 100;
      } else if (NetAmount_CDmethod.Method === 'Cash') {
        totalDiscount = NetAmount_CDmethod.Amount;
      }
  
  
      let TDamount = +newState.totalAmount - +totalDiscount;
  
      let TGst = (TDamount * totalGstamount) / newState.totalAmount || 0;
  
      let Tamount = TDamount + TGst;
  
      const OneConv1 = Math.round(Tamount).toFixed(2);
      const SecConv1 = OneConv1 - Tamount;
  
      setinitialState((prevState) => ({
        ...prevState,
        totalDiscount: +totalDiscount,
        totalTaxable: TDamount.toFixed(2),
        totalGstamount: TGst.toFixed(2),
        totalAmount: Tamount.toFixed(2),
        totalNetAmount: OneConv1,
        PaidAmount: (0).toFixed(2),
        BalanceAmount: OneConv1,
        Roundoff: SecConv1.toFixed(2),
      }));
    } else {
      setinitialState({
        totalItems: newState.totalItems,
        totalUnits: newState.totalUnits,
        totalDiscount: newState.totalDiscount,
        totalGstamount: newState.totalGstamount.toFixed(2),
        totalAmount: newState.totalNetAmount.toFixed(2),
        totalTaxable: newState.totalAmount.toFixed(2),
        totalNetAmount: OneConv,
        PaidAmount: (0).toFixed(2),
        BalanceAmount: OneConv,
        Roundoff: SecConv.toFixed(2),
      });
    }
  }, [NetAmount_CDmethod, SelectDatalist.length, SelectDatalist]);
  
  
  
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


    if (+totalPaidAmount !== +total_netamount) {
      if (name == "Billpay_method") {
        setFormAmount((prevState) => ({
          ...prevState, 
          [name]: value, 
        }));
      } else if (name === "paidamount") {
        if (billAmount.length > 0) {
          const amttt = parseFloat(total_netamount) - totalPaidAmount;
          if (+amttt >= +value) {
            setFormAmount((prevState) => ({
              ...prevState, 
              [name]: value, 
            }));
          } else {
            alert(`enter the Correct value blow the Net Amount ${amttt}`);
            setFormAmount((prevState) => ({
              ...prevState, 
              [name]: "",
            }));
          }
        } else {
          if (+total_netamount >= +value) {
            setFormAmount((prevState) => ({
              ...prevState,
              [name]: value, 
            }));
          } else {
            alert(
              `enter the Correct value blow the Net Amount ${total_netamount}`
            );
            setFormAmount((prevState) => ({
              ...prevState, 
              [name]: "",
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



 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setSelectedOption("")

      if(name === 'PatientId'){


        const Getdata=Patient_list.find((ele)=>ele.PatientId===value)

        if(Getdata){
            setSelectedPatient_list((prev) => ({
              ...prev,
              PatientId:Getdata?.PatientId,
              PatientName:Getdata?.FirstName,
              PhoneNumber:Getdata?.PhoneNo,
              Gender:Getdata.Gender,
              City:Getdata.City,
              State:Getdata.State,
              PatientAddress:Getdata?.Area,
              Pincode:Getdata.Pincode,
            }));

        }else{

          setSelectedPatient_list((prev) => ({
            ...prev,
            [name]:value,
            PatientName: "",
            PhoneNumber: "",
            PatientCategory:"",
            InsuranceName: "",
            Gender: "",
            City: "",
            State: "",
            PatientAddress: "",
            Pincode: "",        
          }));

        }
         
       }
      if (name === 'PatientName') {

        const Getdata=Patient_list.find((ele)=>ele.FirstName===value)

        if(Getdata){
            setSelectedPatient_list((prev) => ({
              ...prev,
              PatientId:Getdata?.PatientId,
              PatientName:Getdata?.FirstName,
              PhoneNumber:Getdata?.PhoneNo,
              Gender:Getdata.Gender,
              City:Getdata.City,
              State:Getdata.State,
              PatientAddress:Getdata?.Area,
              Pincode:Getdata.Pincode,
            }));

        }else{

        setSelectedPatient_list((prev) => ({
          ...prev,
          [name]:value,
          PatientId: "",
          PhoneNumber: "",
          PatientCategory:"",
          InsuranceName: "",
          Gender: "",
          City: "",
          State: "",
          PatientAddress: "",
          Pincode: "",        
        }));
      } 
     }
      else if (name === 'PhoneNumber') {

        const Getdata=Patient_list.find((ele)=>ele.PhoneNo === value)

        if(Getdata){
            setSelectedPatient_list((prev) => ({
              ...prev,
              PatientId:Getdata?.PatientId,
              PatientName:Getdata?.FirstName,
              PhoneNumber:Getdata?.PhoneNo,
              Gender:Getdata.Gender,
              City:Getdata.City,
              State:Getdata.State,
              PatientAddress:Getdata?.Area,
              Pincode:Getdata.Pincode,
            }));

        }
        else{
       
        setSelectedPatient_list((prev) => ({
          ...prev,
          [name]:value,
          PatientId: "",
          PatientName: "",
          PatientCategory:"",
          InsuranceName: "",
          Gender: "",
          City: "",
          State: "",
          PatientAddress: "",
          Pincode: "",        
        }));
      }
    }
    if(name === 'PatientCategory'){
      setSelectedPatient_list((prev) => ({
        ...prev,
        [name]: value,
      }));

    }
     else {
      setSelectedPatient_list((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


 

  const Submitalldata =()=>{
    let requiredfields1 = [
      "PatientId",
      "PatientName",
      "PhoneNumber",
      "Gender",
      "Pincode",
    ];

    const existing = requiredfields1.filter(
      (field) => !SelectedPatient_list[field]
    );

    if(existing.length !==0){
    alert(`Please fill the required fields ${existing.join(",")}`);
    }
    else if (SelectDatalist.length ===0){
    alert('Please fill the Item Detailes')
    }
    else if(billAmount.length ===0){
      alert('Please fill the Payment Detailes')
    }else if(BillingData.DoctorName === ''){
      alert('Please fill the DoctorName Detailes')
    }
    else{
      let senddata={
        billAmount:billAmount,
        SelectedPatient_list:SelectedPatient_list,
        NetAmount_CDmethod:NetAmount_CDmethod,
        SelectDatalist:SelectDatalist,
        BillingData:BillingData,
        initialState:initialState,
        Created_by: UserData?.username,
        Location: UserData?.location,
        selectedOption:selectedOption,
      }
  
      axios.post(`${UrlLink}Frontoffice/GeneralBilling_Link`,senddata)
      .then((res)=>{
        console.log(res.data);
        setPostInvoice(res.data.InvoiceNo);
        setIsPrintButtonVisible(false);
      })
      .catch((err)=>{
        console.log(err);        
      })
  

    }

    

  }


  useEffect(()=>{
      
    if(SelectItemState.SelectItemName !=='' && selectedOption === "OPDServices" && ServiceData.length !==0){
      const finddata = ServiceData.find((ele) => ele.Service_Name === SelectItemState.SelectItemName)

       if (finddata && Object.keys(finddata).length !== 0) {
       
        setSelectItemState((prev) => ({
          ...prev,
          Amount: finddata.General_fee,
          GST: finddata?.GstValue ==='Nill'? 0 : finddata?.GstValue,
          Rate: finddata.General_fee,
          Servicecode:finddata.Service_Id,
        }))
        
      }
      }
      else if(SelectItemState.Servicecode !=='' && selectedOption === "OPDServices" && ServiceData.length !==0){
        const finddata = ServiceData.find((ele) => ele.Service_Id === +SelectItemState.Servicecode)
  
         if (finddata && Object.keys(finddata).length !== 0) {
         
          setSelectItemState((prev) => ({
            ...prev,
            Amount: finddata.General_fee,
            GST: finddata?.GstValue ==='Nill'? 0 : finddata?.GstValue,
            Rate: finddata.General_fee,
            SelectItemName:finddata.Service_Name,
          }))
          
        }
        }

},[SelectItemState.SelectItemName,SelectItemState.Servicecode,ServiceData,selectedOption])






  const set_handleInputChange = (event) => {

    const { name, value } = event.target
    if (name === 'SelectItemName' && selectedOption === "Consultation") {
      setSelectItemState((prev) => ({
            ...prev,
            [name]:value,
            Charges: "",
            Servicecode: "",
            Amount: "",
            GST: "",
            Total: "",
            GSTamount: "",
            DiscountType: "",
            Discount: "",
            Quantity: '',
            Rate: '',
          }))
    }

    else if (name === 'SelectItemName' && selectedOption === "OPDServices") {


      setSelectItemState((prev) => ({
            ...prev,
            [name]:value,
            Charges: "",
            Servicecode: "",
            Amount: "",
            GST: "",
            Total: "",
            GSTamount: "",
            DiscountType: "",
            Discount: "",
            DiscountAmount: '',
            Quantity: '',
            Rate: '',
          }))


    }

    else if (name === 'Servicecode' && selectedOption === "OPDServices") {


      setSelectItemState((prev) => ({
            ...prev,
            [name]:value,
            Charges: "",
            SelectItemName: "",
            Amount: "",
            GST: "",
            Total: "",
            GSTamount: "",
            DiscountType: "",
            Discount: "",
            DiscountAmount: '',
            Quantity: '',
            Rate: '',
          }))


    }
 
 
     else if (name === 'SelectItemName' && selectedOption === "IPDServices") {

      const finddata = ServiceData.find((ele) => ele.OPDServicesName === value)

      if (finddata && Object.keys(finddata).length !== 0) {

        setSelectItemState((prev) => ({
          ...prev,
          [name]: value,
          Servicecode: finddata.Servicecode,
        }))
      }
      else {
        setSelectItemState((prev) => ({
          ...prev,
          [name]: value,
          Charges: "",
          Servicecode: "",
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
        
        const selectamount = (+SelectItemState.Rate * +SelectItemState.Quantity) - +value

        const gstAmount = (+selectamount * +SelectItemState.GST) / 100;
        const totalAmount = +selectamount + +gstAmount;



        setSelectItemState((prev) => ({
          ...prev,
          [name]: value,
          Amount: selectamount.toFixed(2),
          Total: totalAmount.toFixed(2),
          DiscountAmount: value,
          GSTamount: gstAmount || '',

        }))
      }

    } else if (name === 'Discount' && SelectItemState.DiscountType === "Percentage") {

      if (+value >= 100) {
        alert("Discount percentage cannot be greater than 99");
      } else {

        const selectdvalue = ((+SelectItemState.Rate * +SelectItemState.Quantity) * +value) / 100;
        const selectamount = (+SelectItemState.Rate * +SelectItemState.Quantity) - selectdvalue;

        const gstAmount = (selectamount * +SelectItemState.GST) / 100;
        const totalAmount = selectamount + gstAmount;

        setSelectItemState((prev) => ({
          ...prev,
          [name]: value,
          Amount: selectamount.toFixed(2),
          Total: totalAmount.toFixed(2),
          DiscountAmount: selectdvalue,
          GSTamount: gstAmount || '',
        }));

      }

    }
    else if (name === 'DiscountType') {

      const selectf = +SelectItemState.Rate * +SelectItemState.Quantity

      const gstAmount = (+selectf * +SelectItemState.GST) / 100;
      const totalAmount = +selectf + +gstAmount

      setSelectItemState((prev) => ({
        ...prev,
        [name]: value,
        Discount: '',
        DiscountAmount: '',
        Amount: selectf,
        Total: totalAmount,
      }))

    } else if (name === 'Quantity') {

      const clacses = +SelectItemState.Rate * +value

      const gstAmount = (+clacses * +SelectItemState.GST) / 100;
      const totalAmount = +clacses + +gstAmount;

      setSelectItemState((prev) => ({
        ...prev,
        [name]: value,
        Charges: clacses,
        Amount: clacses,
        Total: totalAmount,
        GSTamount: gstAmount || '',
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


  const handlePrint2 = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: async () => {
      // Additional action after printing, if needed
    },
  });

  const ForPrintData = () => {
    return (
      <div ref={componentRef}>


        <div className="billing-invoice_999" id="reactprintcontent">
          <div className="New_billlling_invoice_head">
            <div className="new_billing_logo_con">
              <img src={Clinic_Logo} alt="Medical logo" />
            </div>
            <div className="new_billing_address_1">
              <span>{ClinicDetials.ClinicName}ewdewdewewd</span>
              <div>
                <span>
                  {[ClinicDetials.ClinicAddress]
                    .filter((detail) => detail)
                    .join(", ")}
                </span>
                edwedewd
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
              efcvercferfcre
            </div>
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

            <div
              className="Register_btn_con"
              style={{
                color: "var(--ProjectColor)",
                fontWeight: 600,
                display: "flex",
                justifyContent: "center",
              }}
            >
              Billing Invoice
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
                <span>{BillingData.DoctorName}</span>
              </div>
              <div className="new_billing_div">
                <label>
                  Date <span>:</span>
                </label>
                <span>{BillingData.InvoiceDate}</span>
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
                {SelectDatalist.map((row, index) => {
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
                <span>{UserData?.username}</span>
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

            <div className="invoice_detials_total_1 neww_invoicedetials">
              <div className="total_con_bill">
                <div
                  className="bill_body dcerw3"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    // gap: "20px",
                  }}
                >
                  <label>
                    {" "}
                    Amount In Words<span>:</span>
                  </label>
                  <h4 style={{ color: "grey" }}>
                    {numberToWords(+initialState.totalNetAmount)}{" "}
                  </h4>
                </div>
              </div>
            </div>
            <br />
            <br />

            <div className="signature-section903e9">
              <p className="disclaimer2388">
                This page is created automatically without a signature.
              </p>
            </div>
          </div>

         
        </div>

        <div className="page-break3"></div>

        <div className="billing-invoice_999" id="reactprintcontent">
          <div className="New_billlling_invoice_head">
            <div className="new_billing_logo_con">
              <img src={Clinic_Logo} alt="Medical logo" />
            </div>
            <div className="new_billing_address_1">
              <span>{ClinicDetials.ClinicName}ewdewdewewd</span>
              <div>
                <span>
                  {[ClinicDetials.ClinicAddress]
                    .filter((detail) => detail)
                    .join(", ")}
                </span>
                edwedewd
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
              efcvercferfcre
            </div>
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

            <div
              className="Register_btn_con"
              style={{
                color: "var(--ProjectColor)",
                fontWeight: 600,
                display: "flex",
                justifyContent: "center",
              }}
            >
              Billing Invoice
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
                <span>{BillingData.DoctorName}</span>
              </div>
              <div className="new_billing_div">
                <label>
                  Date <span>:</span>
                </label>
                <span>{BillingData.InvoiceDate}</span>
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
                {SelectDatalist.map((row, index) => {
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
                <span>{UserData?.username}</span>
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

            <div className="invoice_detials_total_1 neww_invoicedetials">
              <div className="total_con_bill">
                <div
                  className="bill_body dcerw3"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    // gap: "20px",
                  }}
                >
                  <label>
                    {" "}
                    Amount In Words<span>:</span>
                  </label>
                  <h4 style={{ color: "grey" }}>
                    {numberToWords(+initialState.totalNetAmount)}{" "}
                  </h4>
                </div>
              </div>
            </div>
            <br />
            <br />

            <div className="signature-section903e9">
              <p className="disclaimer2388">
                This page is created automatically without a signature.
              </p>
            </div>
          </div>

         
        </div>

        <div className="Register_btn_con added_Register_btn_con">
            <button
              className="RegisterForm_1_btns jwedu6_99"
              onClick={handlePrint2}
            >
              Print
            </button>
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
                  <h3>Patient Detailes</h3>
                </div>

                <div className="invoice_firstpart added_ivce_fistprt">
                  <div className="RegisFormcon">
                    
                    {/* <div className="added_regisFrm1">
                      <label htmlFor="itemCode">
                        Invoice No<span>:</span>
                      </label>
                      <input
                        type="text"
                        value={BillingData.InvoiceNo}
                        name="InvoiceNo"
                        // readOnly
                        onChange={handleChangeBillingData}
                      />
                    </div> */}

                    <div className="added_regisFrm1">
                      <label htmlFor="itemCode">
                        Date<span>:</span>
                      </label>
                      <input
                        type="date"
                        name="InvoiceDate"
                        value={BillingData.InvoiceDate}
                        readOnly
                        onChange={handleChangeBillingData}
                      />
                    </div>

                    <div className="added_regisFrm1">
                      <label htmlFor="DoctorName">
                        Physician Name<span>:</span>
                      </label>
                      <input
                        // list="DoctorNameslist"
                        id="DoctorName"
                        name="DoctorName"
                        value={BillingData.DoctorName}
                        onChange={handleChangeBillingData}
                        list="DoctorName_list"
                        // disabled={Object.values(OP_BillingData).length !==0}
                      />
                        <datalist id="DoctorName_list">
                        {Doctorsnames.map((item, index) => (
                          <option
                            key={index}
                            value={item.ShortName}
                          ></option>
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
                          onChange={handleInputChange}
                          autoComplete="off"
                          disabled={Object.values(OP_BillingData).length !==0}
                        />
                      </div>

                      <datalist id="get_PatientId">
                        {Patient_list.map((item, index) => (
                          <option
                            key={index}
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
                          onChange={handleInputChange}
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

                    <div className="added_regisFrm1">
                      <label htmlFor="itemCode">
                        Patient Category<span>:</span>
                      </label>

                      <select
                          name="PatientCategory"
                          value={SelectedPatient_list.PatientCategory}
                          onChange={handleInputChange}
                        >
                          <option value="">select</option>
                          <option value="General">General</option>                          
                          <option value="Special">Special</option>
                          <option value="Insurance">Insurance</option>
                          <option value="Client">Client</option>
                          <option value="Donation">Donation</option>
                          <option value="Employee">Employee</option>
                          <option value="EmployeeRelation">EmployeeRelation</option>
                          <option value="Doctor">Doctor</option>
                          <option value="DoctorRelation">DoctorRelation</option>
                        </select>
                    </div>


                    <div className="added_regisFrm1">
                      <label htmlFor="itemCode">
                        Patient Address<span>:</span>
                      </label>
                      <input
                        name="PatientAddress"
                        type="text"
                        value={SelectedPatient_list.PatientAddress}
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                          onChange={handleInputChange}
                         disabled={Object.values(OP_BillingData).length !==0}
                        />
                        <datalist id="Phone_Number">
                          {Patient_list.map((item, index) => (
                            <option
                              key={item.PatientId}
                              value={item.PhoneNo}
                            >
                              {item.PhoneNo}
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
                      disabled
                    />
                    <label htmlFor="Consultation">Consultation</label>
                  </div>

                  <div className="added_regisFrm1">
                    <input
                      type="radio"
                      id="OPDServices"
                      name="OPDServices"
                      value="OPDServices"
                      checked={selectedOption === 'OPDServices'}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="OPDServices">OPD Services</label>
                  </div>
                  
                  <div className="added_regisFrm1">
                    <input
                      type="radio"
                      id="Diagnostic"
                      name="Diagnostic"
                      value="Diagnostic"
                      checked={selectedOption === 'Diagnostic'}
                      onChange={handleOptionChange}
                      readOnly
                    />
                    <label htmlFor="Diagnostic">Diagnostic</label>
                  </div>

                  <div className="added_regisFrm1">
                    <input
                      type="radio"
                      id="IPDServices"
                      name="serviceType"
                      value="IPDServices"
                      checked={selectedOption === 'IPDServices'}
                      onChange={handleOptionChange}
                      readOnly
                    />
                    <label htmlFor="IPDServices">IPD Services</label>
                  </div>

                  <div className="added_regisFrm1">
                    <input
                      type="radio"
                      id="Advance"
                      name="Advance"
                      value="Advance"
                      checked={selectedOption === 'Advance'}
                      onChange={handleOptionChange}
                      readOnly
                    />
                    <label htmlFor="Advance">Advance</label>
                  </div>
                </div>

                <br />

                <div className="RegisFormcon">

                {selectedOption !== 'Consultation' && <div className="added_regisFrm1">
                    <label htmlFor="F_ItemId">Service Code</label>
                    <input
                      type="text"
                      name="Servicecode"
                      value={SelectItemState.Servicecode}
                      onChange={set_handleInputChange}
                      list="SelectItemIdlist"
                    />
                    <datalist id="SelectItemIdlist">
                      {ServiceData.map((item, index) => (
                          <option
                            key={index + 'key'}
                            value={item.Service_Id}
                          >
                            {item.Service_Id}
                          </option>

                      ))}
                    </datalist>
                  </div>}

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
                          <option
                            key={index + 'key'}
                            value={item.Service_Name}
                          >
                            {item.Service_Name}
                          </option>

                      ))}
                    </datalist>
                  </div>

                  
              
                  
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
                          Qty
                        </label>
                        <input
                          type="number"
                          name="Quantity"
                          value={SelectItemState.Quantity}
                          onChange={set_handleInputChange}
                        />

                      </div>
                    
                  
                    <div className="added_regisFrm1">
                      <label htmlFor="F_ItemId">Charge</label>
                      <input
                        type="number"
                        name="Charges"
                        value={SelectItemState.Charges}
                        onChange={set_handleInputChange}
                        readOnly
                      />
                    </div>

                      <div className="added_regisFrm1">
                        <label htmlFor="CD_Method">Discount Type</label>
                        <select
                          name="DiscountType"
                          value={SelectItemState.DiscountType}
                          onChange={set_handleInputChange}
                          disabled={SelectItemState.Quantity === "" || ["Percentage", "Cash"].includes(
                            NetAmount_CDmethod.Method)}
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
                      {selectedOption !== 'Consultation' &&<div className="added_regisFrm1">
                        <label htmlFor="GST">GST</label>
                        <input
                          type="number"
                          name="GST"
                          value={SelectItemState.GST}
                          onChange={set_handleInputChange}
                          // readOnly
                        />
                      </div>}
                 

                  <div className="added_regisFrm1">
                    <label htmlFor="Total">Total</label>
                    <input
                      type="number"
                      name="Total"
                      id="Total"
                      value={SelectItemState.Total}
                      onChange={set_handleInputChange}
                      readOnly={selectedOption !== "IPDServices"}
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


         
            {/* -------------------------------------------- */}

            <div className="invoice_firstpart added_ivce_fistprt">
              <div className="Selected-table-container444 DEWSDXWED">

                <table className="selected-medicine-table222 EDWEDE">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Service Type</th>
                      <th>Service Name</th>
                      <th>Service Code</th>
                      <th>Charge</th>
                      <th>Quantity</th>
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
                    {SelectDatalist.map((row, index) => {
                      return (
                        <tr key={index}>
                          <td>{row.S_No}</td>
                          <td>{row.ServiceType}</td>
                          <td>{row.SelectItemName}</td>
                          <td>{row.Servicecode || '-'}</td>
                          <td>{row.Rate || '-'}</td>
                          <td>{row.Quantity || '-'}</td>
                          <td>{row.Charges || '-'}</td>
                          <td >
                            {row.DiscountType || '-'}
                          </td>
                          <td>
                            {row.Discount || '-'}
                          </td>

                          <td>{row.Total || '-'}</td>

                          <td>{`${row.GST || '-'}% - ${row.GSTamount || '-'}`}</td>

                          <td>{row.Total || '-'}</td>
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
                style={{ justifyContent: "center" }}
              >
                <div className="added_regisFrm1">
                  <label htmlFor="">
                    Total Discount<span>:</span>{" "}
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
                    disabled={SelectDatalist.some((ele) =>
                      ["Percentage", "Cash"].includes(ele.DiscountType)
                    ) || SelectDatalist.length === 0}
                  >
                    <option value="">Select</option>
                    <option value="Cash">Cash</option>
                    <option value="Percentage">Percentage</option>
                  </select>
                </div>
                <div className="cah-d-wth added_regisFrm1">
                  <label htmlFor="">
                    Discount Value<span>:</span>
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
                    disabled={SelectDatalist.some((ele) =>
                      ["Percentage", "Cash"].includes(ele.DiscountType)
                    )}
                  />
                </div>
              </div>
            </div>

              <br/>

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

        <ForPrintData />

      )}
    </>
  );
};

export default GeneralBilling;
