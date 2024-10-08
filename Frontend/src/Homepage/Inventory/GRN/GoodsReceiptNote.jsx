
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ModelContainer from '../../OtherComponent/ModelContainer/ModelContainer';
import axios from 'axios';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import { useNavigate } from 'react-router-dom';



const GoodsReceiptNote = () => {

  const dispatchvalue = useDispatch();
  const UrlLink = useSelector(state => state.userRecord?.UrlLink);
  const toast = useSelector(state => state.userRecord?.toast);
  const userRecord = useSelector((state) => state.userRecord?.UserData);
  
  const navigate = useNavigate();

  const today = new Date();
  const currentDate = today.toISOString().split('T')[0];
    
  const [LocationData, setLocationData] = useState([]);

  const POdata = useSelector(state => state.Inventorydata?.GoodsReceiptNoteList);

  const [selectRoom2, setselectRoom2] = useState(false);
  
  const [SingleSupplier,setSingleSupplier]=useState({})

  const [PoItemlist,setPoItemlist]=useState([])

  const [GRNItemlist,setGRNItemlist]=useState([])

  // console.log('GRNItemlist',GRNItemlist);
  


  const [GRNState,setGRNState]=useState({
    GRNDate:currentDate,
    PONumber:'',
    SupplierCode:'',
    SupplierName:'',
    SupplierBillNumber:'',
    SupplierBillDate:'',
    SupplierBillDueDate:'',
    SupplierBillAmount:'',
    GRNLocation:'',
    ReceivingPersonName:'',
  })

  const[SupplierBillfile,setSupplierBillfile]=useState(null)

  const [Amountstate,setAmountstate]=useState({
    TaxableTotal:'',
    TaxTotal:'',
    TotalAmount:'',
    TotalDiscountMethod:'',
    TotalDiscountType:'',
    TotalDiscount:'',
    FinalTaxableTotal:'',
    FinalTaxTotal:'',
    FinalTotalAmount:'',
    RoundOff:'',
    NetAmount:'',
  })
  

const [GRNItemState,setGRNItemState]=useState({
  ItemCode:'',
  ItemName:'',
  GenericName: "",
  CompanyName:'',    
  ProductCategory:"",
  SubCategory:"",  
  Strength: "",
  UOM:"",
  HSNCode:'',
  DrugGroup:'',
  PackingType:'',
  PackingQty:'',      
  SellablePack:'',
  SellableQty:'',
  PurchasePack:'',  
  PackMRP:'',  
  PurchaseRatePerPackTaxable:'',   
  TaxType:'',
  TaxPercentage:'',
  PurchaseRatePerPack:'',
  OrderQty:'',
  BillQty:'',
  ReceivedQty:'',  
  PendingQty:'',   
  TotalSellableQty:'',
  SellableQtyMRP:'',
  TotalPackTaxableAmount:'',
  TotalTaxAmount:'',
  TotalPackAmount:'',
  BatchNo:'',
  ManufactureDate:'',
  ExpiryDate:'',
  DiscountMethod:'',
  DiscountType:'',
  Discount:'',
  FinalTotalPackTaxableAmount:'',
  FinalTotalTaxAmount:'',
  FinalTotalPackAmount:'',
})


const [POItemChange,setPOItemChange]=useState({
  PONumber: '',
  SupplierName: '',
  POItemId: '',
  ItemCode: '',
  ItemName: '',
  PurchasePack:'',
  OrderQty: '',
  ReceivedQty: '',
  BalanceQty: '',
  CancelQty:'',
  ItemStatus:'',
  Reason: '',
})




const ClearGRNItemState =()=>{

  setGRNItemState({
  ItemCode:'',
  ItemName:'',
  GenericName: "",
  CompanyName:'',    
  ProductCategory:"",
  SubCategory:"",  
  Strength: "",
  UOM:"",
  HSNCode:'',
  DrugGroup:'',
  PackingType:'',
  PackingQty:'',      
  SellablePack:'',
  SellableQty:'',
  PurchasePack:'',  
  PackMRP:'',  
  PurchaseRatePerPackTaxable:'',   
  TaxType:'',
  TaxPercentage:'',
  PurchaseRatePerPack:'',
  OrderQty:'',
  BillQty:'',
  ReceivedQty:'',  
  PendingQty:'',   
  TotalSellableQty:'',
  SellableQtyMRP:'',
  TotalPackTaxableAmount:'',
  TotalTaxAmount:'',
  TotalPackAmount:'',
  BatchNo:'',
  ManufactureDate:'',
  ExpiryDate:'',
  DiscountMethod:'',
  DiscountType:'',
  Discount:'',
  FinalTotalPackTaxableAmount:'',
  FinalTotalTaxAmount:'',
  FinalTotalPackAmount:'',
  })

}





const clearRemovedata =()=>{
  setPOItemChange({
    PONumber: '',
    SupplierName: '',
    POItemId: '',
    ItemCode: '',
    ItemName: '',
    PurchasePack:'',
    OrderQty: '',
    ReceivedQty: '',
    BalanceQty: '',
    CancelQty:'',
    ItemStatus:'',
    Reason: '',
  })
}


// ------------------------Total Amount-------------------


useEffect(()=>{

  if(GRNItemlist && GRNItemlist.length !==0){

    let STaxableTotal= 0;
    let STaxTotal = 0;
    let STotalAmount =0;
    

    GRNItemlist.forEach((item)=>{
      STaxableTotal += +item.FinalTotalPackTaxableAmount;
      STaxTotal += +item.FinalTotalTaxAmount;
      STotalAmount += +item.FinalTotalPackAmount;
    })

    const OneConv1 = Math.round(STotalAmount).toFixed(2);
    const SecConv1 = OneConv1 - STotalAmount;

    console.log('Round',SecConv1);
    

    setAmountstate((prev)=>({
      ...prev,
      TaxableTotal:STaxableTotal,
      TaxTotal:STaxTotal,
      TotalAmount:STotalAmount,
      FinalTaxableTotal:STaxableTotal,
      FinalTaxTotal:STaxTotal,
      FinalTotalAmount:STotalAmount,
      RoundOff:SecConv1.toFixed(2),
      NetAmount:OneConv1,
    }))

  }
  else{
    setAmountstate({
      TaxableTotal:'',
      TaxTotal:'',
      TotalAmount:'',
      TotalDiscountMethod:'',
      TotalDiscountType:'',
      TotalDiscount:'',
      FinalTaxableTotal:'',
      FinalTaxTotal:'',
      FinalTotalAmount:'',
      RoundOff:'',
      NetAmount:'',
    })
  }

},[GRNItemlist])



useEffect(()=>{
  axios.get(`${UrlLink}Masters/Location_Detials_link`)
        .then((res) => {
            const ress = res.data
            setLocationData(ress)
        })
        .catch((err) => {
            console.log(err);
        })


    
},[UrlLink])

useEffect(()=>{

  if(POdata && Object.keys(POdata).length !==0)
  {
    // console.log('POdata',POdata);

    

    axios.get(`${UrlLink}Masters/Supplier_Master_Link?SupplierId=${POdata.SupplierId}`)
    .then((res)=>{
        console.log('pppp',res.data);
        let Objdata=res.data

        if(Objdata && Object.keys(Objdata).length > 3)
        {
          setSingleSupplier(Objdata)
        }

    })
    .catch((err)=>{
        console.log(err);
        
    })

    setGRNState((prev)=>({
      ...prev,
      PONumber:POdata.id,
      SupplierCode:POdata.SupplierId,
      SupplierName:POdata.SupplierName,
      GRNLocation:POdata.ShippingLocation,
    }))

    if(POdata.Item_Details.length !==0){
      setPoItemlist(POdata.Item_Details)
    }
    else{
      setPoItemlist([])
    }
   

  }

},[POdata])

const formatLabel = (label) => {

  if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
      return label
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .replace(/^./, (str) => str.toUpperCase());
  } else {
      return label;
  }
};


const getInputType = (name) => {
  if(['GRNDate','SupplierBillDate','SupplierBillDueDate','ManufactureDate','ExpiryDate'].includes(name)) return 'date';
  if (['Strength','PackingQty','SellableQty','BillQty','OrderQty','ReceivedQty','PendingQty','TotalSellableQty','SellableQtyMRP','PurchaseRatePerPack','PurchaseRatePerPackTaxable',
    'PackMRP','Discount','TaxPercentage','TotalPackTaxableAmount','TotalTaxAmount','TotalPackAmount','SupplierBillAmount','GrandTotal','GstTotal','TotalDiscount','RoundOff','NetAmount'].includes(name)) return 'number';
  return 'text';
  };

const HandeleOnchange=(e)=>{

  const{name,value}=e.target

  if(name === 'SupplierBillNumber'){
    setGRNState((prev)=>({
      ...prev,
      [name]:value.toUpperCase(),
    }))
  }
  else if(name === 'SupplierBillDate') {
    const paymentTermsDays = SingleSupplier.PaymentTerms;  // Assuming PaymentTerms is a number representing days
    const supplierBillDate = new Date(value);  // Convert the input value to a Date object

    // Calculate the due date by adding payment terms to the bill date
    const dueDate = new Date(supplierBillDate);
    dueDate.setDate(supplierBillDate.getDate() + paymentTermsDays);

    // Format the due date as needed (e.g., YYYY-MM-DD)
    const formattedDueDate = dueDate.toISOString().split('T')[0];

    setGRNState((prev) => ({
        ...prev,
        [name]: value,  // This sets the SupplierBillDate
        SupplierBillDueDate: formattedDueDate,  // Set the calculated due date
    }));
  }
  else
  {
    setGRNState((prev)=>({
      ...prev,
      [name]:value,
    }))

  }

}





const HandelItemstate = (e) => {
  const { name, value, type, checked } = e.target;

  if (name === 'ReceivedQty') {
   
    if (+GRNItemState.BillQty < +value) {
      dispatchvalue({
        type: 'toast',
        value: { message: 'Received quantity cannot exceed the ordered quantity.', type: 'warn' },
      });
      return;
    }

    const PenQty = +GRNItemState.BillQty - +value;
    // console.log('00000kkk',PenQty);
    
    const TotalQty = GRNItemState.SellablePack === GRNItemState.PurchasePack
      ? +value
      : +GRNItemState.PackingQty * +value;

    const TotalPackTaxableAmount = GRNItemState.PurchaseRatePerPackTaxable * +value;
    const TaxAmount = TotalPackTaxableAmount * (GRNItemState.TaxPercentage / 100);
    const TotalPackAmount = GRNItemState.PurchaseRatePerPack * +value;

    setGRNItemState((prev) => ({
      ...prev,
      [name]: value,
      PendingQty: value ? PenQty : '',
      TotalSellableQty: value ? TotalQty : '',
      TotalPackTaxableAmount: value ? TotalPackTaxableAmount.toFixed(2) : '',
      TotalTaxAmount: value ? TaxAmount.toFixed(2) : '',
      TotalPackAmount: value ? TotalPackAmount.toFixed(2) : '',
      FinalTotalPackTaxableAmount:value ? TotalPackTaxableAmount.toFixed(2) : '',
      FinalTotalTaxAmount:value ? TaxAmount.toFixed(2) : '',
      FinalTotalPackAmount:value ? TotalPackAmount.toFixed(2) : '',
    }));

    return;
  }

  if (name === 'PackMRP') {
    const SellableQtyMRP = GRNItemState.SellablePack === GRNItemState.PurchasePack
      ? +value || ''
      : value ? (+value / +GRNItemState.PackingQty).toFixed(2) : '';

    setGRNItemState((prev) => ({
      ...prev,
      [name]: value,
      SellableQtyMRP,
    }));

    return;
  }

  if (name === 'PurchaseRatePerPackTaxable') {
    setGRNItemState((prev) => ({
      ...prev,
      [name]: value,
      TaxType: '',
      TaxPercentage: '',
      PurchaseRatePerPack: '',
      TotalPackTaxableAmount: '',
      TotalTaxAmount: '',
      TotalPackAmount: '',
      ReceivedQty: '',  
      PendingQty: '',  
    }));

    return;
  }

  if (name === 'TaxPercentage') {
    const TaxAmount = +GRNItemState.PurchaseRatePerPackTaxable * (value / 100);
    const TotalPackAmount = +GRNItemState.PurchaseRatePerPackTaxable + TaxAmount;

    setGRNItemState((prev) => ({
      ...prev,
      [name]: value,
      PurchaseRatePerPack: TotalPackAmount.toFixed(2),
      TotalPackTaxableAmount: '',
      TotalTaxAmount: '',
      TotalPackAmount: '',
      ReceivedQty: '',  
      PendingQty: '',  
    }));

    return;
  }

  if (name === 'BatchNo') {

    setGRNItemState((prev) => ({
      ...prev,
      [name]: value.toUpperCase(),
    }));

    return;
  }

  if (name === 'DiscountMethod') {

    setGRNItemState((prev) => ({
      ...prev,
      [name]: value,
      DiscountType:'',
      Discount:'',
      FinalTotalPackTaxableAmount: +GRNItemState.TotalPackTaxableAmount || '',
      FinalTotalTaxAmount: +GRNItemState.TotalTaxAmount || '',
      FinalTotalPackAmount:+GRNItemState.TotalPackAmount || '',
    }));


  return;
  }

  if (name === 'DiscountType') {

    setGRNItemState((prev) => ({
      ...prev,
      [name]: value,
      Discount:'',
      FinalTotalPackTaxableAmount: +GRNItemState.TotalPackTaxableAmount || '',
      FinalTotalTaxAmount: +GRNItemState.TotalTaxAmount || '',
      FinalTotalPackAmount: +GRNItemState.TotalPackAmount || '',
    }));


  return;
  }



 if (name === 'Discount') {

  
    if (GRNItemState.DiscountMethod === 'BeforeTax') {
      let TotalPackAm = +GRNItemState.TotalPackTaxableAmount;

      if (GRNItemState.DiscountType === 'Cash') {
        TotalPackAm -= +value;
      } else if (GRNItemState.DiscountType === 'Percentage') {
        TotalPackAm -= TotalPackAm * (+value / 100);
      }

      const TaxAmount = TotalPackAm * (GRNItemState.TaxPercentage / 100);
      const TotalPackAmount = TotalPackAm + TaxAmount;

      setGRNItemState((prev) => ({
        ...prev,
        [name]: value,
        FinalTotalPackTaxableAmount: TotalPackAm.toFixed(2) || '',
        FinalTotalTaxAmount: TaxAmount.toFixed(2) || '',
        FinalTotalPackAmount: TotalPackAmount.toFixed(2) || '',
      }));
    }
    else if(GRNItemState.DiscountMethod === 'AfterTax'){

      let TotalPackAm = +GRNItemState.TotalPackAmount 

      if (GRNItemState.DiscountType === 'Cash') {
        TotalPackAm -= +value;
      } else if (GRNItemState.DiscountType === 'Percentage') {
        TotalPackAm -= TotalPackAm * (+value / 100);
      }

      setGRNItemState((prev) => ({
        ...prev,
        [name]: value,
        FinalTotalPackTaxableAmount: +GRNItemState.TotalPackTaxableAmount || '',
        FinalTotalTaxAmount: +GRNItemState.TotalTaxAmount || '',
        FinalTotalPackAmount: TotalPackAm.toFixed(2) || '',
      }));

    }
  
  return;
  } 
  
  setGRNItemState((prev) => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value,
  }));
  
};






const HandelAmountState=(e)=>{

  const {name,value}=e.target

  if(name === 'TotalDiscountMethod'){

    setAmountstate((prev)=>({
      ...prev,
      [name]:value,
      TotalDiscountType:'',
      TotalDiscount:'',
    }))

  }
  else if(name === 'TotalDiscountType'){

    setAmountstate((prev)=>({
      ...prev,
      [name]:value,
      TotalDiscount:'',
    }))
  }
  else if (name === 'TotalDiscount') {

    if (Amountstate.TotalDiscountMethod === 'BeforeTax') {
      let TotalNet = +Amountstate.TaxableTotal || 0; 
  
      if (Amountstate.TotalDiscountType === 'Cash') {
        TotalNet -= +value;  
      } else if (Amountstate.TotalDiscountType === 'Percentage') {
        TotalNet -= TotalNet * (+value / 100);  
      }
  
      const TtaxAmount = (TotalNet * +Amountstate.TaxTotal) / +Amountstate.TaxableTotal
      const NetTotal = TotalNet + TtaxAmount;  

      const OneConv1 = Math.round(NetTotal).toFixed(2);
      const SecConv1 = OneConv1 - NetTotal;

  
      setAmountstate((prev) => ({
        ...prev,
        [name]: value,
        FinalTaxableTotal: value ? TotalNet.toFixed(2) : Amountstate.TaxableTotal,
        FinalTaxTotal: value ? TtaxAmount.toFixed(2) : Amountstate.TaxTotal,
        FinalTotalAmount: value ? NetTotal.toFixed(2) : Amountstate.TotalAmount,
        RoundOff:value ? SecConv1.toFixed(2) : '' ,
        NetAmount:value ? OneConv1 :  Amountstate.TotalAmount,
      }));
    } 
    
    else if (Amountstate.TotalDiscountMethod === 'AfterTax') {
      let FinTotal = +Amountstate.TotalAmount || 0;  // Ensure TotalAmount is a number
  
      if (Amountstate.TotalDiscountType === 'Cash') {
        FinTotal -= +value;  // Subtract cash discount from final total
      } else if (Amountstate.TotalDiscountType === 'Percentage') {
        FinTotal -= FinTotal * (+value / 100);  // Subtract percentage discount from final total
      }
      
      const OneConv1 = Math.round(FinTotal).toFixed(2);
      const SecConv1 = OneConv1 - FinTotal;
      // Update the state with the new calculated totals
      setAmountstate((prev) => ({
        ...prev,
        [name]: value,
        FinalTaxableTotal: (+Amountstate.TaxableTotal).toFixed(2) || '',
        FinalTaxTotal: (+Amountstate.TaxTotal).toFixed(2) || '',
        FinalTotalAmount: value ?  FinTotal.toFixed(2) : Amountstate.TotalAmount,
        RoundOff:value ? SecConv1.toFixed(2) : '' ,
        NetAmount:value ? OneConv1 :  Amountstate.TotalAmount,
      }));
    }
  }
  
  else{

    setAmountstate((prev)=>({
      ...prev,
      [name]:value,
    }))
  }

}


const HandleOnchangePORemoveQty =(e)=>{

  const { name, value }=e.target

  if(name === 'CancelQty'){

    const CancelQty = +POItemChange.OrderQty - +value

    setPOItemChange((prev)=>({
      ...prev,
      [name]:value,
      BalanceQty:value? +CancelQty :'',
    }))
  }
  else{
    setPOItemChange((prev)=>({
      ...prev,
      [name]:value,
    }))
  }

}



const RemoveQtyFun =()=>{

console.log('hiii',POItemChange);

let requiredFields = [
  'BalanceQty',
  'CancelQty',
  'ItemStatus',
  'Reason',
];

let POItemChangeStateFields = requiredFields.filter((field) => !POItemChange[field]);

if(POItemChangeStateFields.length !== 0) {
  dispatchvalue({
    type: 'toast',
    value: {
      message: `Please fill out all required fields: ${POItemChangeStateFields.join(", ")}`,
      type: 'warn',
    },
  });
}
else{
  
  const RemovePoItemlist=PoItemlist.filter((ele,ind)=>{
    if(ele.ItemCode === POItemChange.ItemCode){  
      console.log('POItemChange.ReceivedQty',POItemChange.ReceivedQty);
          
      +POItemChange.ReceivedQty > 0? ele.Balance_Qty = 0 : ele.Balance_Qty = +ele.PurchaseQty - +POItemChange.CancelQty
      ele.PurchaseQty = +ele.PurchaseQty - +POItemChange.CancelQty
    } 

    return ele;

  })

  setPoItemlist(RemovePoItemlist)

  setselectRoom2(false)

  clearRemovedata()

}


}


const SaveGRNfunc =()=>{

  let SupprequiredFields =[
    'SupplierBillNumber',
    'SupplierBillDate',
    'SupplierBillDueDate',
    'SupplierBillAmount',
    'GRNLocation',
    'ReceivingPersonName',
  ]
  
  let SupplierField=SupprequiredFields.filter((field) => !GRNState[field])

  let PoItemlistcheck=PoItemlist.some((ele)=> +ele.Balance_Qty > 0)

  if(SupplierField.length !== 0) {
    dispatchvalue({
      type: 'toast',
      value: {
        message: `Please fill out all required fields: ${SupplierField.join(", ")}`,
        type: 'warn',
      },
    });
  }
  else if(PoItemlistcheck){

    dispatchvalue({
      type: 'toast',
      value: {
        message: `Please enter all quantities or cancel the items.`,
        type: 'warn',
      },
    });
  }
  else if(+GRNState.SupplierBillAmount !== +Amountstate.NetAmount){

    dispatchvalue({
      type: 'toast',
      value: {
        message: "Supplier Bill Amount and GRN Net Amount need to be the same.",
        type: 'warn',
      },
    });
  
  }
  else {

    let DiscTest= GRNItemlist.some((ele) =>
      ["BeforeTax", "AfterTax"].includes(ele.DiscountMethod))

    let BillDiscount = DiscTest ? "ItemDiscount" : +Amountstate.TotalDiscount >0 ? "OverallDiscount" : ''

    // let Senddata={
    //   GRNState:GRNState,
    //   SupplierBillfile:SupplierBillfile,
    //   GRNItemlist:GRNItemlist,
    //   Amountstate:Amountstate,
    //   BillDiscountMethod:BillDiscount,
    //   Created_by:userRecord?.username
    // }


    let Senddata = new FormData();
    
    Senddata.append('GRNState',JSON.stringify(GRNState))
    Senddata.append('SupplierBillfile',JSON.stringify(SupplierBillfile))
    Senddata.append('GRNItemlist', JSON.stringify(GRNItemlist));
    Senddata.append('Amountstate', JSON.stringify(Amountstate));
    Senddata.append('BillDiscountMethod', BillDiscount);
    Senddata.append('Created_by', userRecord?.username);

    axios.post(`${UrlLink}Inventory/GRN_Data_Insert_Link`,Senddata,{
      headers: {
        'Content-Type': 'multipart/form-data'
    }
    })
    .then((res)=>{
      console.log(res.data); 
      
      let resdata=res.data
      let type = Object.keys(resdata)[0]
      let mess = Object.values(resdata)[0]
      const tdata = {
          message: mess,
          type: type,
      }
      dispatchvalue({ type: 'toast', value: tdata });
      if(type ==='success'){
        navigate('/Home/PurchaseOrderList');
        }
    })
    .catch((err)=>{
      console.log(err);
      
    })

  }


 }
 






const handlefileOnchange =(e)=>{

  const { name, value, files } = e.target


  if (files && files.length > 0) {
    let formattedValue = files[0];

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // Example max size of 5MB
    if (!allowedTypes.includes(formattedValue.type) || formattedValue.type === '') {
  
        const tdata = {
            message: 'Invalid file type. Please upload a PDF, JPEG, or PNG file.',
            type: 'warn'
        };
        dispatchvalue({ type: 'toast', value: tdata });

    } else {
        if (formattedValue.size > maxSize) {
            const tdata = {
                message: 'File size exceeds the limit of 5MB.',
                type: 'warn'
            };
            dispatchvalue({ type: 'toast', value: tdata });

        } else {
            const reader = new FileReader();
            reader.onload = () => {
              setSupplierBillfile(reader.result)
               
            };
            reader.readAsDataURL(formattedValue);




        }
    }

} else {
    const tdata = {
        message: 'No file selected. Please choose a file to upload.',
        type: 'warn'
    };
    dispatchvalue({ type: 'toast', value: tdata });
}

}




const Selectedfileview = (fileval) => {
  // console.log('fileval',fileval);
  
  if (fileval) {
      let tdata = {
          Isopen: false,
          content: null,
          type: 'image/jpg'
      };
      if (['data:image/jpeg;base64', 'data:image/jpg;base64'].includes(fileval?.split(',')[0])) {
          tdata = {
              Isopen: true,
              content: fileval,
              type: 'image/jpeg'
          };
      } else if (fileval?.split(',')[0] === 'data:image/png;base64') {
          tdata = {
              Isopen: true,
              content: fileval,
              type: 'image/png'
          };
      } else if (fileval?.split(',')[0] === 'data:application/pdf;base64') {
          tdata = {
              Isopen: true,
              content: fileval,
              type: 'application/pdf'
          };
      }

      dispatchvalue({ type: 'modelcon', value: tdata });
  } else {
      const tdata = {
          message: 'There is no file to view.',
          type: 'warn'
      };
      dispatchvalue({ type: 'toast', value: tdata });
  }
}




const HandelEditdata =(row)=>{

  // console.log(row,'row');

  ClearGRNItemState()
  

  if(row && Object.keys(row).length !==0){


    axios.get(`${UrlLink}Masters/Medical_ProductMaster_link?ItemCode=${row.ItemCode}`)
    .then((res)=>{
      let data =res.data

      // console.log('data=----',data);
      

      if(data && Object.keys(data).length > 3){


        if(data.Use_LeastSellablePack === row.PurchasePack){
          setGRNItemState((prev)=>({
            ...prev,
            SellableQtyMRP:+row.MRP || '',
          }))
        }
        else{
      
          let Tmrp=++row.MRP /  +data.PackingQty
      
          setGRNItemState((prev)=>({
            ...prev,
            SellableQtyMRP:row.MRP ? Tmrp.toFixed(2) : '',
          }))
      
        }

        setGRNItemState((prev)=>({
          ...prev,
          ItemCode:row.ItemCode,
          ItemName:row.ItemName,
          GenericName:row.GenericName,
          CompanyName:row.CompanyName,
          ProductCategory:row.ProductCategories,
          SubCategory:row.SubCategory,
          Strength:row.Strength,
          UOM:row.UOM,
          HSNCode:row.HSNCode,
          DrugGroup:data.Use_DrugGroup,
          PackingType:data.Use_PackingType,
          PackingQty:+data.PackingQty,
          SellablePack:data.Use_LeastSellablePack,
          SellableQty:+data.LeastSellableQty,
          PurchasePack:row.PurchasePack,
          OrderQty:+row.PurchaseQty,
          BillQty:+row.Balance_Qty,
          PendingQty:+row.Balance_Qty,
          PackMRP:+row.MRP,
          PurchaseRatePerPackTaxable:+row.PurchaseRateBeforeGST,
          TaxPercentage:row.GST,
          PurchaseRatePerPack:+row.PurchaseRateAfterGST,

        }))

      }
      

    })
    .catch((err)=>{
      console.log(err)
    })
   
    
  }

  

}



const HandelDeletePOdata =(row)=>{


  console.log('[[[[[[[[row]]]]]]]]',row);
  
  setselectRoom2(true)

  setPOItemChange((prev)=>({
    ...prev,
    PONumber:GRNState.PONumber,
    SupplierName:GRNState.SupplierName,
    POItemId:row.id,
    ItemCode:row.ItemCode,
    ItemName:row.ItemName,
    PurchasePack:row.PurchasePack,
    OrderQty:row.PurchaseQty,
    BalanceQty:row.Balance_Qty,
    ReceivedQty:row.Received_Qty,
    CancelQty:row.Balance_Qty,
  }))

}


const handelonAdd = () => {

  let requiredFields = [
    'PackMRP',
    'PurchaseRatePerPackTaxable',
    'TaxType',
    'TaxPercentage',
    'PurchaseRatePerPack',
    'ReceivedQty',
    'TotalSellableQty',
    'SellableQtyMRP',
    'TotalPackTaxableAmount',
    'TotalTaxAmount',
    'TotalPackAmount',
    'BatchNo',
    'ExpiryDate',
  ];

  let GRNItemStateFields = requiredFields.filter((field) => !GRNItemState[field]);
  
  if(GRNItemStateFields.length !== 0) {
    dispatchvalue({
      type: 'toast',
      value: {
        message: `Please fill out all required fields: ${GRNItemStateFields.join(", ")}`,
        type: 'warn',
      },
    });
  }

  else{



    const CheckDublicate =GRNItemlist.some((ele)=>ele.ItemCode === GRNItemState.ItemCode && ele.BatchNo === GRNItemState.BatchNo && +ele.id !== +GRNItemState.id)

    if(CheckDublicate){

      dispatchvalue({
        type: 'toast',
        value: {
          message: `This item with the same batch number has already been entered.`,
          type: 'warn',
        },
      });


    }
    else{
      
      const AdditemFun=()=>{


        const updatedPoItemlist = PoItemlist.map((ele) => {
          if (ele.ItemCode === GRNItemState.ItemCode) {
              return {
                  ...ele,
                  Received_Qty: +ele.PurchaseQty - +GRNItemState.PendingQty,
                  Balance_Qty: +GRNItemState.PendingQty,
              };
          }
          return ele;
        });
      
      
         
          //  console.log('CheckReceiveQty',CheckReceiveQty);
  
          if(GRNItemState.id){
            
            setPoItemlist(updatedPoItemlist)  
  
            setGRNItemlist((prev)=>
              prev.map((product)=> +product.id === +GRNItemState.id ? {...GRNItemState} : product)
            )
            ClearGRNItemState()
          }
          else{
  
            setPoItemlist(updatedPoItemlist)
        
            setGRNItemlist((prev)=>[
              ...prev,
              {id:prev.length+1,...GRNItemState}
            ])
            
            ClearGRNItemState() 
  
          }
        
        
      }
      
      // console.log('000---0000',GRNItemState.PendingQty,typeof(GRNItemState.PendingQty))
      if(GRNItemState.PendingQty){  

        let confirmCon = window.confirm(`Are you sure pending Qty is ${GRNItemState.PendingQty} Can I proceed to add the product?`);
        
        if(confirmCon){
          AdditemFun()
        }
          
      }
      else{
        AdditemFun()
      }
      

    

    }

   


  }






};



const PoItemcolumn=[
    {
      key:'id',
      name:'PO Item Id',
      frozen:true
    },
    {
      key:'ItemCode',
      name:'Item Code',
      frozen:true
    },
    {
      key:'ItemName',
      name:'Item Name',
      frozen:true
    },
    {
      key:'GenericName',
      name:'Generic Name',
      frozen:true
    },
    {
      key:'CompanyName',
      name:'Company Name',
      frozen:true
    },
    {
      key:'Strength',
      name:'Strength'
    },
    {
      key:'UOM',
      name:'UOM'
    },
    {
      key:'HSNCode',
      name:'HSN Code',
    },
    {
      key:'ProductCategories',
      name:'Product Categories',
    },
    {
      key:'SubCategory',
      name:'Sub Category',
    },
    {
      key:'PurchasePack',
      name:'PurchasePack'
    },
    {
      key:'PurchaseQty',
      name:'Purchase Qty'
    },
    {
      key:'Received_Qty',
      name:'Received Qty'
    },
    {
      key:'Balance_Qty',
      name:'Balance Qty'
    },
    {
      key:'Action',
      name:'Action',
      renderCell:(params) =>(
        +params.row.PurchaseQty === +params.row.Received_Qty ?
        <>
        No Action
        </>
        :
        <div style={{display:'flex'}}>
        <Button className="cell_btn" 
          onClick={()=>HandelEditdata(params.row)}               
          >
          <EditIcon className="check_box_clrr_cancell" />
          </Button>

          <Button className="cell_btn" 
          onClick={()=>HandelDeletePOdata(params.row)}               
          >
          <DeleteOutlineIcon className="check_box_clrr_cancell" />
          </Button>
        </div>
      )
    }



]


const HandelGrnItemEditdata =(row)=>{

  // console.log('row-----',row);




  setGRNItemState((prev)=>({
    ...prev,
    ...row,
  }))
  

}


const HandelGrnItemDeletedata = (row) => {


  // console.log('row---2D', row);
  // console.log('row---3D', +row.ReceivedQty, row.ItemCode);

  ClearGRNItemState()

  let ChangeQty = +row?.ReceivedQty; 
  let ChangeItemCode = row?.ItemCode;

  let UpdatePoItemlist = PoItemlist.map((ele) => {
    // console.log(ele.ItemCode ,'pppppp', ChangeItemCode);
    
    if (ele.ItemCode === ChangeItemCode) {
      ele.Balance_Qty = +ele.Balance_Qty + ChangeQty;
      ele.Received_Qty = +ele.Received_Qty - ChangeQty;
    }
    return ele;
  });

  setPoItemlist(UpdatePoItemlist);

  let updatedGRNItemlist = GRNItemlist.filter((ele) => ele.id !== row.id);

  let reorderedGRNItemlist = updatedGRNItemlist.map((ele, index) => ({
    ...ele,
    id: index + 1, 
  }));

  setGRNItemlist(reorderedGRNItemlist);
};








const GRNItemcolumn=[
  {
    key:'id',
    name:'PO Item Id',
    frozen:true
  },
  {
    key:'ItemCode',
    name:'Item Code',
    frozen:true
  },
  {
    key:'ItemName',
    name:'Item Name',
    frozen:true
  },
  {
    key:'GenericName',
    name:'Generic Name',
    frozen:true
  },
  {
    key:'CompanyName',
    name:'Company Name',
    frozen:true
  },
  {
    key:'Strength',
    name:'Strength'
  },
  {
    key:'UOM',
    name:'UOM'
  },
  {
    key:'HSNCode',
    name:'HSN Code',
  },
  {
    key:'ProductCategory',
    name:'Product Categories',
  },
  {
    key:'SubCategory',
    name:'Sub Category',
  },
  {
    key:'PurchasePack',
    name:'PurchasePack'
  },
  {
    key:'PackMRP',
    name:'Pack MRP'
  },
  {
    key:'PurchaseRatePerPackTaxable',
    name:'PurchaseRate PerPack Taxable'
  },
  {
    key:'TaxType',
    name:'Tax Type'
  },
  {
    key:'TaxPercentage',
    name:'Tax Percentage'
  },
  {
    key:'PurchaseRatePerPack',
    name:'PurchaseRate PerPack'
  },
  {
    key:'OrderQty',
    name:'Order Qty'
  },
  {
    key:'ReceivedQty',
    name:'Received Qty'
  },
  {
    key:'PendingQty',
    name:'Pending Qty'
  },
  {
    key:'TotalSellableQty',
    name:'Total Sellable Qty'
  },
  {
    key:'SellableQtyMRP',
    name:'Sellable Qty MRP'
  },
  {
    key:'TotalPackTaxableAmount',
    name:'Total Taxable Amount'
  },
  {
    key:'TotalTaxAmount',
    name:'Total TaxAmount'
  },
  {
    key:'TotalPackAmount',
    name:'Total Amount'
  },
  {
    key:'BatchNo',
    name:'Batch No',
  },
  {
    key:'ManufactureDate',
    name:'Manufacture Date',
  },
  {
    key:'ExpiryDate',
    name:'Expiry Date',
  },
  {
    key:'DiscountMethod',
    name:'Discount Method',
  },
  {
    key:'DiscountType',
    name:'Discount Type',
  },
  {
    key:'Discount',
    name:'Discount',
  },
  {
    key:'FinalTotalPackTaxableAmount',
    name:'FinalTotalPackTaxableAmount',
  },
  {
    key:'FinalTotalTaxAmount',
    name:'FinalTotalTaxAmount',
  },
  {
    key:'FinalTotalPackAmount',
    name:'FinalTotalPackAmount',
  },
  {
    key:'Action',
    name:'Action',
    renderCell:(params) =>(
      <div style={{display:'flex'}}>
      <Button className="cell_btn" 
        onClick={()=>HandelGrnItemEditdata(params.row)}               
        >
        <EditIcon className="check_box_clrr_cancell" />
        </Button>
        <Button className="cell_btn" 
          onClick={()=>HandelGrnItemDeletedata(params.row)}               
          >
          <DeleteOutlineIcon className="check_box_clrr_cancell" />
          </Button>
        </div>
    )
  } 



]



  return (
    <>
    <div className="Main_container_app">
        <h3>Goods Receipt Note</h3>

        <br/>

        <div className="RegisFormcon_1">

          {
            Object.keys(GRNState).map((StateName,Index)=>{
              return(
                <div className="RegisForm_1" key={Index+'key'}>

                  <label htmlFor={StateName}>{formatLabel(StateName)} :</label>


                  {
                   StateName ==='GRNLocation'?

                  <select
                    type={getInputType(StateName)}
                    id={StateName}
                    name={StateName}
                    value={GRNState[StateName]}
                    onChange={HandeleOnchange}
                    disabled
                  >
                  <option value=''>Select</option>
                  {
                    LocationData.map((ele,ind)=>(
                      <option key={ind+'key'} value={ele.id} >{ele.locationName}</option>
                    ))
                  }
                  </select>
                  :
                  <input
                    type={getInputType(StateName)}
                    id={StateName}
                    name={StateName}
                    value={GRNState[StateName]}
                    onChange={HandeleOnchange}
                    max={StateName === 'SupplierBillDate' ? currentDate:'' }
                    disabled={['SupplierBillDueDate', 'GRNDate', 'PONumber', 'SupplierCode', 'SupplierName'].includes(StateName)} 
                  />
                  }
                </div>

              )})
          }

        <>
        <div className="RegisForm_1">
        <label htmlFor='SupplierBillfile'>File Attachment :</label>
          <input
              type='file'
              name='SupplierBillfile'
              accept='image/jpeg,image/png,application/pdf'
              required
              id='SupplierBillfile'
              autoComplete='off'
              onChange={handlefileOnchange}
              style={{ display: 'none' }}
          />
          <div style={{ width: '150px', display: 'flex', justifyContent: 'space-around' }}>
              <label
                  htmlFor='SupplierBillfile'
                  className="RegisterForm_1_btns choose_file_update"
              >
                  Choose File
              </label>
              <button className='fileviewbtn' 
              onClick={() => Selectedfileview(SupplierBillfile)}
              >view</button>

            </div>
          </div>
        </>
        </div>
        
        <br/>
        <div className="common_center_tag">
          <span>PO Product List</span>
        </div>
        <br/>
        
        <ReactGrid columns={PoItemcolumn} RowData={PoItemlist} />
        
        <br/>
        <div className="common_center_tag">
          <span>Product Entry Details</span>
        </div>

        <br/>
        
        <div className="RegisFormcon_1">

          {
            Object.keys(GRNItemState).filter((ele)=>ele !== 'id').map((StateName2,Index)=>{
              return(

                <div className="RegisForm_1" key={Index+'key'}>
                 <label htmlFor={StateName2}>{formatLabel(StateName2)} :</label>
                 
                 {['TaxType','TaxPercentage','DiscountMethod','DiscountType'].includes(StateName2)?

                 <select
                 type={getInputType(StateName2)}
                 id={StateName2}
                 name={StateName2}
                 value={GRNItemState[StateName2]} 
                 onChange={HandelItemstate}   
                 disabled={(GRNItemState.DiscountMethod === '' && StateName2 === 'DiscountType') ||
                  (GRNItemState.TotalPackTaxableAmount === '' && StateName2 === 'DiscountMethod') }

                 >
                  <option value=''>Select</option>
                  { StateName2 === 'TaxType' ?
                  <>
                  <option value='GST'>GST</option>
                  <option value='IGST'>IGST</option>
                  </>
                  :

                  StateName2 === 'TaxPercentage' ?
                  <>
                  <option value='Nill'>Nill</option>
                  <option value='5'>5%</option>
                  <option value='12'>12%</option>
                  <option value='18'>18%</option>
                  <option value='28'>28%</option>
                  </>
                  :
                  StateName2 === 'DiscountMethod' ?
                  <>
                  <option value='BeforeTax'>Before Tax</option>
                  <option value='AfterTax'>After Tax</option>
                  </>
                  :
                  <>
                  <option value='Cash'>Cash</option>
                  <option value='Percentage'>Percentage</option>
                  </>
                  }
                 </select>

                 :
                 <input
                 type={getInputType(StateName2)}
                 id={StateName2}
                 name={StateName2}
                 value={GRNItemState[StateName2]} 
                 onChange={HandelItemstate}
                 min={StateName2 === 'ExpiryDate' ? currentDate :''} 
                 max={StateName2 === 'ManufactureDate' ? currentDate :''}   
                 readOnly={(!['PackMRP','PurchaseRatePerPackTaxable','TaxType','TaxPercentage','PurchaseRatePerPack','ReceivedQty',
                  'BatchNo','ManufactureDate','ExpiryDate','DiscountMethod','DiscountType','Discount'].includes(StateName2)) || (GRNItemState.id? StateName2 === 'ReceivedQty' : '')}  
                  disabled={(GRNItemState.DiscountType === '' && StateName2 === 'Discount')}
                  />
                }
                </div>

              )})
          }

        </div> 

      <br/>

   


      <br/>
      
      <div className="Main_container_Btn">
        <button onClick={handelonAdd}>
           {GRNItemState.id ?'Update' : 'Add'}
        </button>
        </div>


        <br/>

        {GRNItemlist.length !==0 && 
        <ReactGrid columns={GRNItemcolumn} RowData={GRNItemlist} />}



        <br/>
        <br/>



        {/* {GRNItemlist.length !==0 &&  */}
        <div className="RegisFormcon_1">
          {
            Object.keys(Amountstate).map((StateName3,Index)=>{
              return(
                <div className="RegisForm_1" key={Index+'key'}>
                <label htmlFor={StateName3}>{formatLabel(StateName3)} :</label>
                
                {
                ['TotalDiscountMethod','TotalDiscountType'].includes(StateName3) ?

                <select
                 type={getInputType(StateName3)}
                 id={StateName3}
                 name={StateName3}
                 value={Amountstate[StateName3]} 
                 onChange={HandelAmountState}
                 disabled={(StateName3 === 'TotalDiscountType' && Amountstate.TotalDiscountMethod === '') ||
                  ( GRNItemlist.some((ele) =>
                    ["BeforeTax", "AfterTax"].includes(ele.DiscountMethod) ? StateName3 === 'TotalDiscountMethod' :'')
                  )
                 }             
                 >
                  <option value=''>Select</option>
                  {
                    StateName3 === 'TotalDiscountMethod' ?
                    <>
                    <option value='BeforeTax'>Before Tax</option>
                    <option value='AfterTax'>After Tax</option>
                    </>
                    :
                    <>
                    <option value='Cash'>Cash</option>
                    <option value='Percentage'>Percentage</option>
                    </>
                  }
                </select>
                
                :
                <input
                 type={getInputType(StateName3)}
                 id={StateName3}
                 name={StateName3}
                 value={Amountstate[StateName3]} 
                 onChange={HandelAmountState}
                 readOnly ={(StateName3 !== 'TotalDiscount') || 
                  (StateName3 === 'TotalDiscount' && Amountstate.TotalDiscountType === '')
                 }                
                 />
                }
                </div>
              )
            })
          }
        </div>

        <br/>

        <div className="Main_container_Btn">
          <button onClick={SaveGRNfunc}>
            Save
          </button>
          </div>
       

      </div>

      {selectRoom2 && PoItemlist.length !==0 &&(
       
            <div className="loader" onClick={() => setselectRoom2(false)}>
            <div className="loader_register_roomshow"   onClick={(e) => e.stopPropagation()}>
            <br/>
            

            <div className="Main_container_app">


            <div className="common_center_tag">
                <span>Purchase Order Item Quantity Edit</span>
            </div>
            <br/>
            <br/>

            <div className="RegisFormcon_1">

            {Object.keys(POItemChange).map((StateName,Index)=>{
              return(

                <div className="RegisForm_1" key={Index+'key'}>
                
                <label htmlFor={StateName}>{formatLabel(StateName)} :</label>
                
                {['ItemStatus'].includes(StateName) ?

                  <select
                   type={getInputType(StateName)}
                    id={StateName}
                    name={StateName}
                    value={POItemChange[StateName]}
                    onChange={HandleOnchangePORemoveQty}
                    disabled={POItemChange.CancelQty === '' ? StateName === 'ItemStatus' :''}
                  >
                    <option value=''>Select</option>
                    {                    
                      <>
                      <option value='Waiting For GRN'>Waiting For GRN</option>
                      <option value='Move To PO'>Move To PO</option>
                      <option value='Canceled'>Cancel</option>
                      </>
                    }

                    </select>

                    :
                    ['Reason'].includes(StateName) ?
                    <textarea
                    type={getInputType(StateName)}
                    id={StateName}
                    name={StateName}
                    value={POItemChange[StateName]}
                    onChange={HandleOnchangePORemoveQty}
                    >

                    </textarea>
                    :
                    <input
                    type={getInputType(StateName)}
                    id={StateName}
                    name={StateName}
                    value={POItemChange[StateName]}
                    readOnly={(!['CancelQty'].includes(StateName)) ||
                      (+POItemChange.ReceivedQty ? StateName ==='CancelQty' :'')
                    }
                    onChange={HandleOnchangePORemoveQty}
                  />

                }

                </div>
                

              )
             })

             }

          <br/>
                
                <div className="Main_container_Btn">
                  <button onClick={RemoveQtyFun}>
                    Save
                  </button>
                  </div>
            </div>
            </div>

            </div>
            </div>
    


            )}

      <ToastAlert Message={toast.message} Type={toast.type} />
      <ModelContainer />

    </>
  )
}

export default GoodsReceiptNote;