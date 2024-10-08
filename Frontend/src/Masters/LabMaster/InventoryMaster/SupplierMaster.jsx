
import React, { useEffect, useState } from 'react';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import {useSelector,useDispatch} from 'react-redux';
import ModelContainer from '../../OtherComponent/ModelContainer/ModelContainer';
import axios from 'axios';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const SupplierMaster = () => {

const dispatchvalue = useDispatch();
const navigate = useNavigate();

const toast = useSelector(state => state.userRecord?.toast);
const UrlLink = useSelector(state => state.userRecord?.UrlLink);
const userRecord = useSelector((state) => state.userRecord?.UserData);

const EdittData = useSelector(state => state.Inventorydata?.SupplierMasterStore);


const[ProductTypeArray,setProductTypeArray]=useState([])

const [ProductArray,setProductArray]=useState([])



const [SupplierMaster,setSupplierMaster]=useState({
    SupplierId:'',
    SupplierName:'',
    SupplierType:'',
    ContactPersion:'',
    ContactNumber:'',
    EmailAddress:'',
    Address:'',
    RegistrationNumber:'',
    GSTNumber:'',
    PANNumber:'',
    PaymentTerms:'', 
    CreditLimit:'',
    LeadTime:'',
    PreferredSupplier:'',
    InActive:'',
    Notes:'',
    PaymentMode:'',
})


const [FileAttachment,setFileAttachment]=useState(null)



const [SupplierBank,setSupplierBank]=useState({
  BankName:'',
  AccountNumber:'',
  IFSCCode:'',
  BankBranch:'',
})


const [SelectProductArray,setSelectProductArray]=useState([])

const [SupplierProductlist,setSupplierProductlist]=useState({
  ItemCode:'',
  ItemName:'',     
  GenericName: "",
  CompanyName:'',
  ProductCategories:'',
  SubCategory:"",  
  Strength: "",
  UOM:"",
  HSNCode:"",
  MinimumPurchasePack:'',
  MinimumPurchaseQty:'',
  PurchaseRateBeforeGST:'',
  GST:'',
  PurchaseRateAfterGST:'',
  MRP:'',
  InActive:''
})


useEffect(()=>{


  if(EdittData && Object.keys(EdittData).length !==0){
    console.log('EdittData',EdittData);  
    
    const{
      Bank_Details,
      Item_details,
      FileAttachment,
      id,
      ...rest

    }=EdittData;

    setSupplierMaster((prev)=>({
      ...prev,
      ...rest,
      SupplierId:id
    }))

    if(FileAttachment){
    setFileAttachment(FileAttachment)
    }

    if(Bank_Details && Bank_Details.length !==0)
    { 
      let Singledata=Bank_Details[0]

      const {id , ...rest} = Singledata
      
      setSupplierBank((prev)=>({
        ...prev,
        ...rest
      }))

    }

    if(Item_details && Item_details.length !==0){  
      
      const Clearedetail=Item_details.map(item => {
        const { PrevRateWithGst, 
                Prev_PurchaseRateBeforeGST,
                Prev_GST,
                Prev_PurchaseRateAfterGST,
                Prev_MRP,          
                ...rest } = item; 
              return rest;
        });      
      setSelectProductArray(Clearedetail)
    }


  }

},[EdittData])



useEffect(()=>{
  axios.get(`${UrlLink}Masters/ProductType_Master_lik`)
    .then((res)=>{
        console.log('lllloooo',res.data);
        let data=res.data

        if(Array.isArray(data) && data.length !==0){
            setProductTypeArray(data)
        }
        else{
            setProductTypeArray([])
        }

    })
    .catch((err)=>{
        console.log(err);
    })


    axios.get(`${UrlLink}Masters/Medical_ProductMaster_link`)
    .then((res)=>{
      let data =res.data

      if(Array.isArray(data) && data.length !==0){
        setProductArray(data)
      }
      else{
        setProductArray([])
      }


    })
    .catch((err)=>{
      console.log(err)
    })

},[UrlLink])

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

  if (['PreferredSupplier', 'InActive'].includes(name)) return 'checkbox';
  if (['ContactNumber', 'CreditLimit','AccountNumber','PaymentTerms','LeadTime','MinimumPurchaseQty','PurchaseRateBeforeGST','MRP'].includes(name)) return 'number';
  return 'text';
};


const ClearBankField=()=>{
  setSupplierBank({
    BankName:'',
    AccountNumber:'',
    IFSCCode:'',
    BankBranch:'',
  })
}


const handleInputChange =(e)=>{

  const { name, value, type, checked } = e.target;

  if(name === 'ContactNumber'){

    if(value.length > 10){

    const tdata = {
        message: 'ContactNumber only 10 degits numbers',
        type: 'warn'
    };
    dispatchvalue({ type: 'toast', value: tdata });

    }
   
    else
    {
      setSupplierMaster((prev)=>({
        ...prev,
        [name]:value
      }))
    }

  }
  else if (['SupplierName','RegistrationNumber','GSTNumber','PANNumber'].includes(name)){
      
    setSupplierMaster((prev)=>({  
      ...prev,
      [name]:value.toUpperCase()
    }))

  }
  else if(name === 'PaymentMode'){
    setSupplierMaster((prev)=>({  
      ...prev,
      [name]:value
    }))

    ClearBankField()

  }
  else{
    setSupplierMaster((prev)=>({
      ...prev,
      [name]:type === 'checkbox' ? checked : value
    }))
  }


}


const handleInputChangeBank =(e)=>
{
  const {name,value}=e.target

  setSupplierBank((prev)=>({
    ...prev,
    [name]:value.toUpperCase()
  }))

}


const handleInputChangeProduct =(e)=>{

  const { name, value, type, checked } = e.target;

  if(name === 'ItemCode')
  {
    let find=ProductArray.find((ele)=>ele.id === value)
    console.log('77777',find);
    
    if(find){
      setSupplierProductlist((prev)=>({
        ...prev,
        [name]:value,
        ItemName:find?.ItemName,  
        GenericName: find?.GenericName,
        CompanyName:find?.CompanyName,
        ProductCategories:find?.Use_ProductCategory,
        SubCategory:find?.Use_SubCategory,
        Strength: find?.Strength,
        UOM:find?.UOM,
        HSNCode:find?.HSNCode,
        MinimumPurchasePack:find?.PackingType,
        PackName:find?.Use_PackingType,
        MinimumPurchaseQty:'',
        PurchaseRateBeforeGST:'',
        GST:'',
        PurchaseRateAfterGST:'',
        MRP:'',
        InActive:''

      }))
    }else{
      setSupplierProductlist((prev)=>({
        ...prev,
        [name]:value,
        ItemName:'',     
        GenericName: "",
        CompanyName:'',
        ProductCategories:'',
        SubCategory:"",  
        Strength: "",
        UOM:"",
        HSNCode:"",
        MinimumPurchasePack:'',
        MinimumPurchaseQty:'',
        PurchaseRateBeforeGST:'',
        GST:'',
        PurchaseRateAfterGST:'',
        MRP:'',
        InActive:''

      }))
    }

  }
  else  if(name === 'ItemName')
    {
  
      let find=ProductArray.find((ele)=>ele.ItemName === value)
  
      if(find){
        setSupplierProductlist((prev)=>({
          ...prev,
          [name]:value,
          ItemCode:find?.id,  
          GenericName: find?.GenericName,
          CompanyName:find?.CompanyName,
          ProductCategories:find?.Use_ProductCategory,
          SubCategory:find?.Use_SubCategory,
          Strength: find?.Strength,
          UOM:find?.UOM,
          HSNCode:find?.HSNCode,
          MinimumPurchasePack:find?.PackingType,
          PackName:find?.Use_PackingType,
          MinimumPurchaseQty:'',
          PurchaseRateBeforeGST:'',
          GST:'',
          PurchaseRateAfterGST:'',
          MRP:'',
          InActive:''

        }))
      }else{
        setSupplierProductlist((prev)=>({
          ...prev,
          [name]:value,
          ItemCode:'',     
          GenericName: "",
          CompanyName:'',
          ProductCategories:'',
          SubCategory:"",  
          Strength: "",
          UOM:"",
          HSNCode:"",
          MinimumPurchasePack:'',
          MinimumPurchaseQty:'',
          PurchaseRateBeforeGST:'',
          GST:'',
          PurchaseRateAfterGST:'',
          MRP:'',
          InActive:''

        }))
      }
  
  }
 
  else if (name === 'MinimumPurchaseQty'){

    setSupplierProductlist((prev)=>({
      ...prev,
      [name]:value,
      PurchaseRateBeforeGST:'',
      GST:'',
      PurchaseRateAfterGST:'',
      MRP:'',      
      InActive:''
    }))

  }
  else if(name === 'PurchaseRateBeforeGST')
  {
    setSupplierProductlist((prev)=>({
      ...prev,
      [name]:value,
      GST:'',
      PurchaseRateAfterGST:'',
      MRP:'',      
      InActive:''
    }))
  }
  else if (name === 'GST'){

    let GSTValue = value ==='Nill' ? 'Nill' : +value

    if(GSTValue === 'Nill' || GSTValue === ''){

      setSupplierProductlist((prev)=>({
        ...prev,
        [name]:GSTValue,
        PurchaseRateAfterGST:+SupplierProductlist.PurchaseRateBeforeGST,
        InActive:''
      }))

    }else{

      let price1 = (SupplierProductlist.PurchaseRateBeforeGST * GSTValue) / 100;
      let totalAmount = +SupplierProductlist.PurchaseRateBeforeGST + price1;

    setSupplierProductlist((prev)=>({
      ...prev,
      [name]:GSTValue,
      PurchaseRateAfterGST:totalAmount.toFixed(2),
      InActive:''
    }))

    }

    

  }
  else
  {
    setSupplierProductlist((prev)=>({
      ...prev,
      [name]:type === 'checkbox' ? checked : value
    }))
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
              setFileAttachment(reader.result)
               
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
  console.log('fileval',fileval);
  
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



const ClearProductList = () => {
  setSupplierProductlist({
    ItemCode:'',
    ItemName:'',     
    GenericName: "",
    CompanyName:'',
    ProductCategories:'',
    SubCategory:"",  
    Strength: "",
    UOM:"",
    HSNCode:"",
    MinimumPurchasePack:'',
    MinimumPurchaseQty:'',
    PurchaseRateBeforeGST:'',
    GST:'',
    PurchaseRateAfterGST:'',
    MRP:'',
    InActive:'',

  });
}

const HandleAddProduct = () => {

  let requiredFields=[
    'ItemCode',
    'ItemName',
    'MinimumPurchasePack',
    'MinimumPurchaseQty',
    'PurchaseRateBeforeGST',
    'GST',
    'PurchaseRateAfterGST',
    'MRP'
  ]

  const missingFields = requiredFields.filter(
    (field) => !SupplierProductlist[field]
  );

  const CheckDub = SelectProductArray.some(
    (product) => product.ItemCode === SupplierProductlist.ItemCode && product?.id !== SupplierProductlist?.id
  );

  // console.log('CheckDub',CheckDub);
  

  if(missingFields.length !==0){

    const tdata={
      message: `Please fill out all required fields: ${missingFields.join(", ")}`,
      type: 'warn',
    }
    dispatchvalue({ type: 'toast', value: tdata });
  }
  else if (CheckDub){

    const tdata={
      message:`This Item Already Entered`,
      type: 'warn',
    }
    dispatchvalue({ type: 'toast', value: tdata });
  }
  else{

    if(SupplierProductlist.id){

      setSelectProductArray((prev)=>
        prev.map((product)=>
          product.id === SupplierProductlist.id ? {...SupplierProductlist} : product )
      )
      ClearProductList();
    }
    else{
      setSelectProductArray((prev) => [
        ...prev,
        {
          ...SupplierProductlist,
          id: prev.length + 1
        }
      ]);
    
      ClearProductList();
    }

  }

  
}


  // console.log('pppp',SelectProductArray);


  const HandelEditdata =(row)=>{

    setSupplierProductlist({
      ...row
    })
    
  
  }


  const HandelDeletdata = (row) => {
    ClearProductList();

    const updatedArray = SelectProductArray.filter((ele) => ele.id !== row.id);
    
    const reindexedArray = updatedArray.map((item, index) => ({
        ...item,
        id:index + 1,
    }));

    setSelectProductArray(reindexedArray);
};


  const SelectProductColumn=[
    {
        key:'id',
        name:'S.No',
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
        key:'PackName',
        name:'Purchase Pack'
    },
    {
      key:'MinimumPurchaseQty',
      name:'Pack Qty'
    },
    {
      key:'PurchaseRateBeforeGST',
      name:'Purchase Rate Before GST'
    },
    {
      key:'GST',
      name:'GST'
    },
    {
      key:'PurchaseRateAfterGST',
      name:'Purchase Rate After GST'
    },
    {
      key:'MRP',
      name:'MRP'
    },
    {
      key:'Action',
      name:'Action',
      renderCell:(Params)=>(
        <>
         <Button className="cell_btn" 
            onClick={()=>HandelEditdata(Params.row)}               
            >
            <EditIcon className="check_box_clrr_cancell" />
          </Button>
        {Params.row.SupplierPoductId ? <></> :
          <Button className="cell_btn" 
            onClick={()=>HandelDeletdata(Params.row)}               
            >
            <DeleteOutlineIcon className="check_box_clrr_cancell" />
          </Button>
          }
        </>
      )
    }
    
    
]



const SaveSupplierData=()=>{

  let requiredFields =[
      'SupplierName',
      'SupplierType',
      'ContactPersion',
      'ContactNumber',
      'EmailAddress',
      'Address',
      'RegistrationNumber',
      'GSTNumber',
      'PANNumber',
      'PaymentTerms',
      'CreditLimit',
      'LeadTime',
      'Notes',
      'PaymentMode'
  ]

  let missingFields = requiredFields.filter(
    (field)=>!SupplierMaster[field]);


  let BankrequiredFields=[
    'BankName',
    'AccountNumber',
    'IFSCCode',
    'BankBranch'
  ]

  let BankmissingFields = BankrequiredFields.filter(
    (field)=>!SupplierBank[field]);


  if(missingFields.length !==0){

    const tdata={
      message: `Please fill out all required fields: ${missingFields.join(", ")}`,
      type: 'warn',
    }
    dispatchvalue({ type: 'toast', value: tdata });

  }
  else if(SupplierMaster.PaymentMode ==='Online' && BankmissingFields.length !==0){

    const tdata={
      message: `Please fill out all required fields: ${BankmissingFields.join(", ")}`,
      type: 'warn',
    }
    dispatchvalue({ type: 'toast', value: tdata });
      
  }
  else
  {
    let Senddata = new FormData();

    console.log('SelectProductArray',SelectProductArray);
    
    Senddata.append('SupplierMaster', JSON.stringify(SupplierMaster));
    Senddata.append('SupplierBank', JSON.stringify(SupplierBank));
    Senddata.append('SelectProductArray', JSON.stringify(SelectProductArray));
    Senddata.append('created_by', userRecord?.username || '');
    
    if (FileAttachment) {      
      Senddata.append('FileAttachment', FileAttachment);
    }
      

    axios.post(`${UrlLink}Masters/Supplier_Master_Link`, Senddata, {
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
        navigate('/Home/SupplierMasterList');
        }
    })
    .catch((err)=>{
      console.log(err);      
    })
  }




}


  

  return (
    <>

      <div className="Main_container_app">
        <h3>Supplier Master</h3>


        <div className="common_center_tag">
                <span>Supplier Details</span>
        </div>
        
        <br/>

        <div className="RegisFormcon_1">
        {
          Object.keys(SupplierMaster).map((StateName,Index)=>{
            return(
              <div className="RegisForm_1" key={Index+'key'}>
                <label htmlFor={StateName}> {formatLabel(StateName)} {StateName ==='LeadTime' ? '(days)' : StateName ==='PaymentTerms' ?  '(Due days)' :''}:</label>
                
                
              {
              ['Address','Notes'].includes(StateName) ?
                
                <textarea
                id={StateName}
                name={StateName}
                value={SupplierMaster[StateName]}
                onChange={handleInputChange}
                />
                :
                ['PaymentMode','SupplierType'].includes(StateName) ?
                <select
                id={StateName}
                name={StateName}
                value={SupplierMaster[StateName]}
                onChange={handleInputChange}
                >
                <option value=''>Select</option>
                {StateName ==='PaymentMode' ? 
                <>
                <option value='Online'>Online</option>
                <option value='Offline'>Offline</option> 
                </>:
                <>
                <option value='Manufacturer'>Manufacturer</option>
                <option value='Distributor'>Distributor</option> 
                <option value='Wholesaler'>Wholesaler</option> 
                <option value='Retailer'>Retailer</option> 
                <option value='OEM'>OEM (Original Equipment Manufacturer)</option> 
                <option value='Vendor'>Vendor</option> 
                </>
                }
                </select>
                :
                <input
                type={getInputType(StateName)}
                id={StateName}
                name={StateName}
                value={SupplierMaster[StateName]}
                checked={StateName ==='PreferredSupplier' || StateName==='InActive' ? SupplierMaster[StateName] :''}
                onChange={handleInputChange}
                disabled={StateName ==='SupplierId'}
                />
                }
              </div>
            )
          })
        }
  
        <>
        <div className="RegisForm_1">
        <label htmlFor='FileAttachment'>File Attachment :</label>
          <input
              type='file'
              name='FileAttachment'
              accept='image/jpeg,image/png,application/pdf'
              required
              id='FileAttachment'
              autoComplete='off'
              onChange={handlefileOnchange}
              style={{ display: 'none' }}
          />
          <div style={{ width: '150px', display: 'flex', justifyContent: 'space-around' }}>
              <label
                  htmlFor='FileAttachment'
                  className="RegisterForm_1_btns choose_file_update"
              >
                  Choose File
              </label>
              <button className='fileviewbtn' 
              onClick={() => Selectedfileview(FileAttachment)}
              >view</button>

            </div>
          </div>

      </>
                   
      </div>

    {SupplierMaster.PaymentMode === 'Online' ?
      <>
      <br/>
      <div className="common_center_tag">
         <span>Bank Details</span>
      </div>
      <br/>
      <div className="RegisFormcon_1">
        {
          Object.keys(SupplierBank).map((StateName2,Index)=>{
            return(
              <div className="RegisForm_1" key={Index+'key'}>
                <label htmlFor={StateName2}> {formatLabel(StateName2)} :</label>
                <input
                  type={getInputType(StateName2)}
                  id={StateName2}
                  name={StateName2}
                  value={SupplierBank[StateName2]}
                  onChange={handleInputChangeBank}
                />

              </div>
            )
          })

        }
      </div>
      </>:<></>
    }

  <br/>

  <div className="common_center_tag">
    <span>Product Details</span>
  </div>
  <br/>
  <div className="RegisFormcon_1">


    {
      Object.keys(SupplierProductlist).filter((ele)=>ele !== 'PackName' && ele !== 'id').map((StateName3,Index)=>{
        return(
          <div className="RegisForm_1" key={Index+'key'}>
            <label htmlFor={StateName3}>{formatLabel(StateName3)} :</label>
          
          { ['MinimumPurchasePack','GST'].includes(StateName3) ?
            <select
            id={StateName3}
            name={StateName3}
            value={SupplierProductlist[StateName3]}
            onChange={handleInputChangeProduct}
            disabled={(SupplierProductlist.PurchaseRateBeforeGST === '' && (StateName3 === 'GST')) || StateName3 === 'MinimumPurchasePack' }
            >
            <option value=''>select</option>
            {StateName3 === 'MinimumPurchasePack' ?
              ProductTypeArray.filter((ele) => ele.Status === true).map((ele, ind) => (
                <option key={ind} value={ele.id}>{ele.ProductTypeName}</option>
              ))
              :
              <>
              <option value='Nill'>Nill</option>
              <option value='5'>5%</option>
              <option value='12'>12%</option>
              <option value='18'>18%</option>
              <option value='28'>28%</option>
              </>
            }
            </select>
            
              :
            <input
            type={getInputType(StateName3)}
            id={StateName3}
            name={StateName3}
            checked={StateName3==='InActive' ? SupplierProductlist[StateName3] :''}
            value={SupplierProductlist[StateName3]}
            onChange={handleInputChangeProduct}
            list={StateName3  === 'ItemCode' || StateName3  === 'ItemName'? StateName3+'List' :''}
            // readOnly={SupplierProductlist.SupplierPoductId ? ['ItemCode','ItemName','MinimumPurchaseQty'].includes(StateName3) :''}
            disabled={
              ['GenericName','SupplierPoductId','CompanyName', 'ProductCategories', 'SubCategory', 'Strength', 'UOM', 'HSNCode', 'PurchaseRateAfterGST'].includes(StateName3) }
            />
          }
          <datalist
                id={StateName3  === 'ItemCode' || StateName3  === 'ItemName'? StateName3+'List' :''}
                >
                 {
                    ProductArray.map((option,index)=>(
                    <option key={index} value={StateName3 === 'ItemCode' ? option.id : option.ItemName}>                         
                    </option>
                    ))
                 }   
                </datalist>
          </div>
        )
      })
    }


    
    </div>
    
      <br/>
      <div className="Main_container_Btn">
        <button  onClick={HandleAddProduct}>
           {SupplierProductlist.id? 'Update' : 'Add'}
        </button>
        </div>
      
      {SelectProductArray.length !== 0 && <ReactGrid columns={SelectProductColumn} RowData={SelectProductArray} /> }


      {SelectProductArray.length !== 0 && 
      <div className="Main_container_Btn">
        <button onClick={SaveSupplierData} >
          {SupplierMaster.SupplierId ? 'Update': 'Save'}
        </button>
        </div> }

      </div>
      <ToastAlert Message={toast.message} Type={toast.type} />
      <ModelContainer />
    </>
  )
}

export default SupplierMaster;
