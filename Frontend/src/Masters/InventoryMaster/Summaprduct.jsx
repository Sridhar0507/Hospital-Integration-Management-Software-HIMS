import { Checkbox } from '@mui/material';
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
    Strength: "",
    UOM:"",
    HSNCode:'',
    ProductCategory:"",
    DrugGroup:'',
    PurchasePack:'',
    PackDescription:'',
    MRP:'',
    TaxablePrice:'',
    GST:'',
    SellingPrice:'',
    DoctorPayable:'',
    MinimumQantity:'',
    MaximumQantity:'',
    IsConsumption:false,
    InActive:false
    })
    
    const [CategoryArray,setCategoryArray]=useState([])

    const[DrugGroupArray,setDrugGroupArray]=useState([])

    const [TrayArray,setTrayArray]=useState([])

    const [ShelfArray,setShelfArray]=useState([])

    const [RackArray,setRackArray]=useState([])

    const [ProductArray,setProductArray]=useState([])

    

    



    console.log('MediclProdutState',MediclProdutState);


    useEffect(()=>{

      if (Object.keys(EdittData).length !== 0) {
        const {
          Use_DrugGroup,
          Use_ProductCategory,
          Use_RackName,
          Use_ShelfName,
          Use_TrayName,
          id,
          ...rest
        } = EdittData;
        
        // console.log(rest.IsConsumption,typeof(rest.IsConsumption),'-----------');

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
          console.log('vvvvvvvvvvvvvv',res.data);
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

// ------------------------------------------------------

    axios.get(`${UrlLink}Masters/Rack_Detials_link`)
    .then((res)=>{
        // console.log('kkkk',res.data);

        let data =res.data

        if(Array.isArray(data) && data.length !==0){
            setRackArray(data)
        }
        else{
            setRackArray([])
        }

    })
    .catch((err)=>{
        console.log(err);
    })

// ------------------------------------------------------

    axios.get(`${UrlLink}Masters/Shelf_Detials_link`)
    .then((res)=>{
        let data =res.data

            if(Array.isArray(data) && data.length !==0){
                setShelfArray(data)
            }
            else{
                setShelfArray([])
            }

    })
    .catch((err)=>{
        console.log(err);
    })

// ------------------------------------------------------

    axios.get(`${UrlLink}Masters/Tray_Detials_link`)
    .then((res)=>{
        let data =res.data

      if(Array.isArray(data) && data.length !==0){
          setTrayArray(data)
      }
      else{
          setTrayArray([])
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
    if (['IsConsumption', 'InActive'].includes(name)) return 'checkbox';
    if (['Strength', 'PurchasePack', 'PackDescription','TaxablePrice','GST','SellingPrice',
       'MRP','DoctorPayable','MinimumQantity','MaximumQantity'].includes(name)) return 'number';
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
    else if(['RackName','ShelfName'].includes(name)){

      if(name === 'RackName'){
        setMediclProdutState((prev)=>({
            ...prev,
            [name]:value,
            ShelfName:'',
            TrayName:'',
        }))
      }else if(name === 'ShelfName'){
        setMediclProdutState((prev)=>({
          ...prev,
          [name]:value,
          TrayName:'',
      }))
      }

    }
    else if (name === 'GST'){

      let Tax_Amunt = (+MediclProdutState.TaxablePrice /100) * +value
      let Total_price=+MediclProdutState.TaxablePrice + Tax_Amunt
      
      
       if (+Total_price > +MediclProdutState.MRP)
        {
          const Condata = window.confirm(`Are you sure the selling price is greater than MRP? TotalAmount:${Total_price}`);

          if(Condata){
            setMediclProdutState((prev)=>({
              ...prev,
              [name]:value,
              SellingPrice:Total_price
             }))
      
          }else{
            setMediclProdutState((prev)=>({
              ...prev,
              [name]:'',
              SellingPrice:'',
              TaxablePrice:'',
             }))

          }
        }
        else if (+Total_price <  +MediclProdutState.MRP){

          let Condata = window.confirm(`Are you sure the selling price is less than MRP? TotalAmount: ${Total_price}`);
          
          if(Condata){
            setMediclProdutState((prev)=>({
              ...prev,
              [name]:value,
              SellingPrice:Total_price
             }))
      
          }else{
            setMediclProdutState((prev)=>({
              ...prev,
              [name]:'',
              SellingPrice:'',
              TaxablePrice:'',
             }))

          }
        }
        else{
          setMediclProdutState((prev)=>({
            ...prev,
            [name]:value,
            SellingPrice:Total_price
           }))
    
        }

    }
    else if (name === 'MRP'){
     
      setMediclProdutState((prev)=>({
        ...prev,
        [name]:value,        
        TaxablePrice:'',
        GST:'',
        SellingPrice:'',
       }))

    }
    else if (name === 'TaxablePrice'){
     
      setMediclProdutState((prev)=>({
        ...prev,
        [name]:value,        
        GST:'',
        SellingPrice:'',
       }))

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
      'Strength',
      'UOM',
      'HSNCode',
      'ProductCategory',
      'DrugGroup',
      'PurchasePack',
      'PackDescription',
      'MRP',
      'TaxablePrice',
      'GST',
      'SellingPrice',
      'DoctorPayable',
      'RackName',
      'ShelfName',
      'TrayName',
      'MinimumQantity',
      'MaximumQantity',
    ];

    const missingFields = requiredFields.filter(
      (field) => !MediclProdutState[field]
    );

    if(missingFields.length !==0){

      alert(`Please fill out all required fields: ${missingFields.join(", ")}`);

    }else{
      
      const removeSpaces = (str) => str.replace(/\s+/g, '');

      const result = ProductArray.some((ele) => {
        const isSameItem = 
          removeSpaces(ele.ItemName) === removeSpaces(MediclProdutState.ItemName) &&
          removeSpaces(ele.GenericName) === removeSpaces(MediclProdutState.GenericName) &&
          removeSpaces(ele.CompanyName) === removeSpaces(MediclProdutState.CompanyName);
      
        return MediclProdutState.ItemID !== '' ? (isSameItem && ele.id !== MediclProdutState.ItemID) : isSameItem;
      });

      // console.log('checkValue',result);

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
          
          
          
          <label htmlFor={StateName}>{StateName ==='HSNCode'?'HSN Code':formatLabel(StateName) } {StateName === 'DoctorPayable' ? '%' :''} :</label>
          
        {['ProductCategory','DrugGroup','GST','RackName','ShelfName','TrayName'].includes(StateName) ?
    
          <select
          id={StateName}
          name={StateName}
          value={MediclProdutState[StateName]}
          onChange={handleInputChange}
          >
          <option value=''>Select</option>

            {StateName ==='ProductCategory' ? CategoryArray.filter((ele)=>ele.Status === true).map((ele,ind)=>(
              <option key={ind} value={ele.id}>{ele.CategoryName}</option>
            )) :StateName ==='DrugGroup' ?DrugGroupArray.filter((ele)=>ele.Status === true).map((ele,ind)=>(
              <option key={ind} value={ele.id}>{ele.DrugGroupName}</option> 
            )):StateName ==='RackName' ?RackArray.filter((ele)=>ele.Status === true).map((ele,ind)=>(
              <option key={ind} value={ele.id}>{ele.RackName}</option> 
            )):StateName ==='ShelfName' ?ShelfArray.filter((ele)=>ele.Rack_Id === +MediclProdutState.RackName && ele.Status === true).map((ele,ind)=>(
              <option key={ind} value={ele.id}>{ele.Shelf_Name}</option> 
            )):StateName ==='TrayName' ?TrayArray.filter((ele)=>ele.Shelf_Id === +MediclProdutState.ShelfName && ele.Status === true).map((ele,ind)=>(
              <option key={ind} value={ele.id}>{ele.Tray_Name}</option> 
            )) :StateName ==='GST'? 
                <>
               <option value={0}>Nill</option>
               <option value={5}>5%</option>
               <option value={12}>12%</option>
               <option value={18}>18%</option>
               <option value={28}>28%</option>
               </>

             :''
            
            }

          </select>

         :
          
          <input
          type={getInputType(StateName)}
          id={StateName}
          name={StateName}
          value={MediclProdutState[StateName]}
          checked={StateName ==='IsConsumption' || StateName==='InActive' ? MediclProdutState[StateName] :''}
          onChange={handleInputChange}
          disabled={StateName === 'ItemID' || StateName === 'SellingPrice' || 
            (MediclProdutState.MRP === '' && ['TaxablePrice', 'SellingPrice'].includes(StateName))}
          
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




// @csrf_exempt
// @require_http_methods(["POST", "OPTIONS", "GET"])
// def Medical_ProductMaster_link(request):
//     if request.method == 'POST':
//         try:
//             data = json.loads(request.body)
//             print('data', data)

//             ItemID = data.get('ItemID')
//             ItemName = data.get('ItemName')
//             GenericName = data.get('GenericName')
//             CompanyName = data.get('CompanyName')
//             Strength = data.get('Strength')
//             UOM = data.get('UOM')
//             HSNCode = data.get('HSNCode')
//             ProductCategory = data.get('ProductCategory')
//             DrugGroup = data.get('DrugGroup')
//             PurchasePack = data.get('PurchasePack')
//             PurchasePackQty = data.get('PurchasePackQty')
//             ConvertPack = data.get('ConvertPack')
//             ConvertTotalQty = data.get('ConvertTotalQty')
//             LeastSellableQty = data.get('LeastSellableQty')
//             LeastSellablePack = data.get('LeastSellablePack')
//             RackName = data.get('RackName')
//             ShelfName = data.get('ShelfName')
//             TrayName = data.get('TrayName')
//             MinimumQantity = data.get('MinimumQty')
//             MaximumQantity = data.get('MaximumQty')
//             IsDistribution = data.get('IsDistribution')
//             InActive = data.get('InActive')
//             Create_by = data.get('created_by')

//             if ProductCategory:
//                 ProductCategory_instant = Medical_ProductCategory_Details.objects.get(pk=ProductCategory)
//             if DrugGroup:
//                 DrugGroup_instant = Drug_Group_Master_Details.objects.get(pk=DrugGroup)
//             if RackName:
//                 RackMaster_instant = Rack_Master_Detials.objects.get(pk=RackName)
//             if ShelfName:
//                 ShelfMaster_instant = Shelf_Master_Detials.objects.get(pk=ShelfName)
//             if TrayName:
//                 TrayMaster_instant = Tray_Master_Details.objects.get(pk=TrayName)
//             if PurchasePack:
//                 PurchasePack_instance=ProductType_Master_Details.objects.get(pk=PurchasePack)
//             if ConvertPack:
//                 ConvertPack_instance=ProductType_Master_Details.objects.get(pk=ConvertPack)
//             if LeastSellablePack:
//                 LeastSellablePack_instance=ProductType_Master_Details.objects.get(pk=LeastSellablePack)
            
            
//             if ItemID:
//                 # Update existing product
//                 product_instance = Medical_ProductMaster_Details.objects.get(pk=ItemID)
//                 product_instance.Item_Name = ItemName
//                 product_instance.Generic_Name = GenericName
//                 product_instance.CompanyName = CompanyName
//                 product_instance.Strength = Strength
//                 product_instance.UOM = UOM
//                 product_instance.HSN_Code = HSNCode
//                 product_instance.Product_Category = ProductCategory_instant
//                 product_instance.Drug_Group = DrugGroup_instant
//                 product_instance.Purchase_Pack = PurchasePack_instance
//                 product_instance.PurchasePackQty = PurchasePackQty
//                 product_instance.ConvertTotalQty = ConvertTotalQty
//                 product_instance.ConvertPack = ConvertPack_instance
//                 product_instance.LeastSellableQty = LeastSellableQty
//                 product_instance.LeastSellablePack = LeastSellablePack_instance
//                 product_instance.Rack_Name = RackMaster_instant
//                 product_instance.Shelf_Name = ShelfMaster_instant
//                 product_instance.Tray_Name = TrayMaster_instant
//                 product_instance.Minimum_Qantity = MinimumQantity
//                 product_instance.Maximum_Qantity = MaximumQantity
//                 product_instance.IsDistribution = IsDistribution
//                 product_instance.InActive = InActive
//                 product_instance.Create_by = Create_by
//                 product_instance.save()

//                 return JsonResponse({'message': 'Product master data updated successfully.'}, status=200)
//             else:
//                 # Create new product
//                 Medical_ProductMaster_instance = Medical_ProductMaster_Details(
//                     Item_Name=ItemName,
//                     Generic_Name=GenericName,
//                     CompanyName=CompanyName,
//                     Strength=Strength,
//                     UOM=UOM,
//                     HSN_Code=HSNCode,
//                     Product_Category=ProductCategory_instant,
//                     Drug_Group=DrugGroup_instant,
//                     Purchase_Pack=PurchasePack_instance,
//                     PurchasePackQty=PurchasePackQty,
//                     ConvertTotalQty=ConvertTotalQty,
//                     ConvertPack=ConvertPack_instance,
//                     LeastSellableQty=LeastSellableQty,
//                     LeastSellablePack=LeastSellablePack_instance,
//                     Rack_Name=RackMaster_instant,
//                     Shelf_Name=ShelfMaster_instant,
//                     Tray_Name=TrayMaster_instant,
//                     Minimum_Qantity=MinimumQantity,
//                     Maximum_Qantity=MaximumQantity,
//                     IsDistribution=IsDistribution,
//                     InActive=InActive,
//                     Create_by=Create_by
//                 )
//                 Medical_ProductMaster_instance.save()

//                 return JsonResponse({'message': 'Product master data saved successfully.'}, status=201)

//         except Exception as e:
//             print(f'An error occurred: {str(e)}')
//             return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
//     if request.method == 'GET':
//         try:
//             Medical_ProductMaster_instance = Medical_ProductMaster_Details.objects.all()
//             Medical_productArray = []

//             for row in Medical_ProductMaster_instance:
//                 medical_dict = {
//                     "id": row.Item_Id,
//                     "ItemName": row.Item_Name,
//                     "GenericName": row.Generic_Name,
//                     "CompanyName": row.CompanyName,
//                     "Strength": row.Strength,
//                     "UOM": row.UOM,
//                     "HSNCode": row.HSN_Code,
//                     "ProductCategory": row.Product_Category.ProductCategory_Id,
//                     "DrugGroup": row.Drug_Group.DrugGroup_Id,
//                     "Use_ProductCategory": row.Product_Category.ProductCategory_Name,
//                     "Use_DrugGroup": row.Drug_Group.DrugGroup_Name,
//                     "PurchasePack": row.Purchase_Pack.ProductType_Id,
//                     "Use_PurchasePack": row.Purchase_Pack.ProductType_Name,
//                     "PurchasePackQty": row.PurchasePackQty,
//                     "ConvertTotalQty": row.ConvertTotalQty,
//                     "ConvertPack": row.ConvertPack.ProductType_Id,
//                     "USe_ConvertPack": row.ConvertPack.ProductType_Name,
//                     "LeastSellableQty": row.LeastSellableQty,
//                     "LeastSellablePack": row.LeastSellablePack.ProductType_Id,
//                     "Use_LeastSellablePack": row.LeastSellablePack.ProductType_Name,
//                     "RackName": row.Rack_Name.Rack_Id,
//                     "ShelfName": row.Shelf_Name.Shelf_Id,
//                     "TrayName": row.Tray_Name.Tray_Id,
//                     "Use_RackName": row.Rack_Name.Rack_Name,
//                     "Use_ShelfName": row.Shelf_Name.Shelf_Name,
//                     "Use_TrayName": row.Tray_Name.Tray_Name,
//                     "MinimumQty": row.Minimum_Qantity,
//                     "MaximumQty": row.Maximum_Qantity,
//                     "IsDistribution": row.IsDistribution,
//                     "InActive": row.InActive,
//                 }
//                 Medical_productArray.append(medical_dict)

//             return JsonResponse(Medical_productArray, safe=False)    
        
//         except Exception as e:
//             print(f'An error occurred:{str(e)}')
//             return JsonResponse({'error':'An internal server error occurred'}, status=500)
    
//     return JsonResponse({'message': 'Invalid request method'}, status=405)

