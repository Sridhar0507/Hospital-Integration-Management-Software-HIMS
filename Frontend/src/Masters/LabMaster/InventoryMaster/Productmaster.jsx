// import { Checkbox } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {useSelector ,useDispatch} from 'react-redux';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import { useNavigate } from 'react-router-dom';


const Productmaster = () => {

  const UrlLink = useSelector(state => state.userRecord?.UrlLink);

  const toast = useSelector(state => state.userRecord?.toast);
  const userRecord = useSelector((state) => state.userRecord?.UserData);

  const EdittData = useSelector(state => state.Inventorydata?.MedicalProductMaster);


  const navigate = useNavigate();

  const dispatchvalue = useDispatch();



  
   const[MediclProdutState,setMediclProdutState] =useState({
    ItemID:'',
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
    LeastSellablePack:'',
    LeastSellableQty:'',
    MinimumQty:'',
    MaximumQty:'',
    Remarks:'',
    IsDistribution:false,
    InActive:false
    })
    
    const [CategoryArray,setCategoryArray]=useState([])

    const [SubCategoryArray,setSubCategoryArray]=useState([])

    const[DrugGroupArray,setDrugGroupArray]=useState([])

    const[ProductTypeArray,setProductTypeArray]=useState([])



    const [ProductArray,setProductArray]=useState([])

    

    



    console.log('MediclProdutState',MediclProdutState);


    useEffect(()=>{

      if (Object.keys(EdittData).length !== 0) {
        const {
          Use_PackingType,
          Use_LeastSellablePack,
          Use_DrugGroup,
          Use_ProductCategory,
          Use_SubCategory,
          id,
          ...rest
        } = EdittData;
        
        // console.log(rest.IsDistribution,typeof(rest.IsDistribution),'-----------');

        setMediclProdutState((prev) => ({
          ...prev,
          ...rest,
          ItemID: id,       
        }));
      }

    },[EdittData])


    useEffect(()=>{

      axios.get(`${UrlLink}Masters/ProductCategory_Master_link`)
      .then((res)=>{
          // console.log('vvvvvvvvvvvvvv',res.data);
          let data =res.data

          if(Array.isArray(data) && data.length !==0){
              setCategoryArray(data)
          }
          else{
              setCategoryArray([])
          }

      })
      .catch((err)=>{
          console.log(err);
      })



  // --------------------------------


  axios.get(`${UrlLink}Masters/SubCategory_Master_link`)
  .then((res)=>{
      // console.log('vvvvvvvvvvvvvv',res.data); 
      let data =res.data


      if(Array.isArray(data) && data.length !==0){
          setSubCategoryArray(data)
      }
      else{
          setSubCategoryArray([])
      }

  })
  .catch((err)=>{
      console.log(err);
  })

// ------------------------------------------------------

    axios.get(`${UrlLink}Masters/Drug_Group_link`)
    .then((res)=>{
        console.log(res.data);
        let data=res.data

        if(Array.isArray(data) && data.length !==0){
            setDrugGroupArray(data)
        }
        else{
        setDrugGroupArray([])
        }

    })
    .catch((err)=>{
        console.log(err);
    })


    // ------------------------------------------


    axios.get(`${UrlLink}Masters/ProductType_Master_lik`)
    .then((res)=>{
        console.log(res.data);
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
    },[UrlLink])


   
    const GetProductMaster =useCallback(()=>{
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
    },[])


    useEffect(()=>{
      GetProductMaster()
    },[GetProductMaster])


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
    if (['IsDistribution', 'InActive'].includes(name)) return 'checkbox';
    if (['Strength', 'PackingQty','LeastSellableQty','MinimumQty','MaximumQty'].includes(name)) return 'number';
    return 'text';
  };


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    

    if(['ItemName','GenericName','CompanyName'].includes(name)){

      let capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1)
      setMediclProdutState({
        ...MediclProdutState,
        [name]:capitalizedValue,
      });

    }
    else if(['UOM','HSNCode'].includes(name)){
      setMediclProdutState({
        ...MediclProdutState,
        [name]:value.toUpperCase().trim(),
      });
    } 
    else{
      setMediclProdutState({
        ...MediclProdutState,
        [name]: type === 'checkbox' ? checked : value,
      });
    }

    
  };


  const HandelSaveMasterData =()=>{

    const requiredFields = [
      'ItemName',
      'GenericName',
      'CompanyName',      
      'ProductCategory',
      'SubCategory',
      'Strength',
      'UOM',
      'HSNCode',
      'DrugGroup',
      'PackingType',
      'PackingQty',
      'LeastSellableQty',
      'LeastSellablePack',
      'MinimumQty',
      'MaximumQty',
      'Remarks',
    ];

    const missingFields = requiredFields.filter(
      (field) => !MediclProdutState[field]
    );

    if(missingFields.length !==0){

      const tdata = {
        message: `Please fill out all required fields: ${missingFields.join(", ")}`,
        type: 'warn',
    }
    dispatchvalue({ type: 'toast', value: tdata });

    }else{
      
      const removeSpaces = (str) => str.replace(/\s+/g, '');

      const result = ProductArray.some((ele) => {
        const isSameItem = 
          removeSpaces(ele.ItemName) === removeSpaces(MediclProdutState.ItemName) &&
          removeSpaces(ele.GenericName) === removeSpaces(MediclProdutState.GenericName) &&
          removeSpaces(ele.CompanyName) === removeSpaces(MediclProdutState.CompanyName);
      
        return MediclProdutState.ItemID !== '' ? (isSameItem && ele.id !== MediclProdutState.ItemID) : isSameItem;
      });


      if(result){

        const tdata = {
          message: `The Item Name are already present in the name ${MediclProdutState.ItemName}`,
          type: 'warn',
      }
      dispatchvalue({ type: 'toast', value: tdata });
      }
      else{
        let Senddata={
          ...MediclProdutState,
          created_by: userRecord?.username || '' ,
        }
  
        axios.post(`${UrlLink}Masters/Medical_ProductMaster_link`,Senddata)
        .then((res)=>{
          // console.log(res.data);
  
          let data = res.data
  
          let type = Object.keys(data)[0]
          let mess = Object.values(data)[0]
          const tdata = {
              message: mess,
              type: type,
          }
          dispatchvalue({ type: 'toast', value: tdata });          
          GetProductMaster()
          dispatchvalue({ type: 'MedicalProductMaster', value: {} });
          navigate('/Home/ProductMasterList');

        })
        .catch((err)=>{
          console.log(err);
        })
      }


    
  }


  
  }



  return (
    <>
     <div className="Main_container_app">
     <h3>Medicine Product Master</h3>

     <div className="RegisFormcon_1">

      {Object.keys(MediclProdutState).map((StateName,ind)=>(
        <div className="RegisForm_1" key={ind+'key'}>
          
          
          
          <label htmlFor={StateName}>{StateName ==='HSNCode'?'HSN Code':formatLabel(StateName) } {StateName === 'CompanyName' ? '(mfg.by)' : ''} :</label>
          
        {['ProductCategory','SubCategory','DrugGroup','PackingType','LeastSellablePack','ShelfName','TrayName'].includes(StateName) ?
    
          <select
          id={StateName}
          name={StateName}
          value={MediclProdutState[StateName]}
          onChange={handleInputChange}
          
          >
          <option value=''>Select</option>

          {StateName === 'ProductCategory' 
            ? CategoryArray.filter((ele) => ele.Status === true).map((ele, ind) => (
                <option key={ind} value={ele.id}>{ele.ProductCategoryName}</option>
              )) 
            :StateName === 'SubCategory' 
            ? SubCategoryArray.filter((ele) => ele.Status === true && ele.ProductCategoryId === +MediclProdutState.ProductCategory).map((ele, ind) => (
                <option key={ind} value={ele.id}>{ele.SubCategoryName}</option>
              )) 
            : StateName === 'DrugGroup' 
            ? DrugGroupArray.filter((ele) => ele.Status === true).map((ele, ind) => (
                <option key={ind} value={ele.id}>{ele.DrugGroupName}</option>
              ))
            : (StateName === 'PackingType' || StateName === 'LeastSellablePack')
            ? ProductTypeArray.filter((ele) => ele.Status === true).map((ele, ind) => (
                <option key={ind} value={ele.id}>{ele.ProductTypeName}</option>
              )) 
            : ''
          }

          </select>

         :
          
          <input
          type={getInputType(StateName)}
          id={StateName}
          name={StateName}
          value={MediclProdutState[StateName]}
          checked={StateName ==='IsDistribution' || StateName==='InActive' ? MediclProdutState[StateName] :''}
          onChange={handleInputChange}
          disabled={StateName === 'ItemID'}
          />}
        </div>
      ))

      }
      
     </div>

     <div className="Main_container_Btn">
        <button onClick={HandelSaveMasterData} >
          {MediclProdutState.ItemID ? "Update" : "Save"}
        </button>
        </div>

     </div>   

      <ToastAlert Message={toast.message} Type={toast.type} />

    </>
  )
}

export default Productmaster;
