
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';



const PurchaseOrder = () => {


    const dispatchvalue = useDispatch();

    const navigate = useNavigate();


    const UrlLink = useSelector(state => state.userRecord?.UrlLink);
    
    const userRecord = useSelector((state) => state.userRecord?.UserData);

    const toast = useSelector(state => state.userRecord?.toast);

    const EdittData = useSelector(state => state.Inventorydata?.PurchaseOrderList);

    // console.log('223456',EdittData);    


    const[supplierArray,setsupplierArray]=useState([])

    const[Itemlist,setItemlist]=useState([])

    const [LocationData, setLocationData] = useState([]);

    const [Clinicarray, setClinicarray] = useState([]);

    const[SelectItemlist,setSelectItemlist]=useState([])

    console.log('SelectItemlist',SelectItemlist);
    

    const today = new Date();
    const currentDate = today.toISOString().split('T')[0];
    
    

    const [PurchaseOrder,setPurchaseOrder]=useState({
            SupplierId:'',
            SupplierName:'',
            SupplierMailId:'',
            SupplierContactNumber:'',
            SupplierContactPersion:'',
            OrderDate:currentDate,
            DeliveryDate:'',
            BillingLocation:'',
            BillingAddress:'',
            ShippingLocation:'',
            ShippingAddress:'',            
            TotalOrderValue:'',
        })

    const [ItemDetails,SetItemDetails]=useState({
        ItemCode:'',
        ItemName:'',
        GenericName: "",
        CompanyName:'',
        ProductCategories:'',
        SubCategory:"",  
        Strength: "",
        UOM:"",
        HSNCode:"",
        PurchasePack:'',
        MinimumPurchaseQty:'',
        MRP:'', 
        PurchaseRateBeforeGST:'',
        GST:'',
        PurchaseRateAfterGST:'',       
        PurchaseQty:'',
        TotalAmount:'',
    })
        


    useEffect(()=>{

    if(EdittData && Object.keys(EdittData).length !==0 && Clinicarray.length !==0)
    {


        const {id,
            Use_BillingLocation,
            Use_ShippingLocation,
            Item_Details,
            BillingLocation,
            ShippingLocation,
            PO_Status,
            ...rest}=EdittData;

        let BAddress=Clinicarray.find((ele)=>ele.location === BillingLocation)
        let SAddress=Clinicarray.find((ele)=>ele.location === ShippingLocation)
        
        if(BAddress && SAddress){

        setPurchaseOrder((prev)=>({
            PurchaseOrderNumber:id,
            ...prev,
            ...rest,
            BillingLocation:BillingLocation,
            BillingAddress:BAddress?.Address,
            ShippingLocation:ShippingLocation,
            ShippingAddress:SAddress?.Address,  
        }))
        }

        if(Item_Details && Item_Details.length !==0){

            const Clearedetail=Item_Details.map(item => {
                const { Item_Status, 
                        Reason,
                        Received_Qty,
                        Balance_Qty,          
                        ...rest } = item; 
                      return rest;
                });  

            setSelectItemlist(Clearedetail)
        }
        
    }


    },[EdittData,Clinicarray])

    

useEffect(()=>{

        axios.get(`${UrlLink}Masters/Supplier_Master_Link`)
        .then((res)=>{
            console.log('pppp----',res.data);
            let Rdata=res.data
            if(Array.isArray(Rdata) && Rdata.length !==0){                
                
                let StatusR=Rdata.filter((ele)=>ele.InActive === false)
                
                setsupplierArray(StatusR)
           
            }
        })
        .catch((err)=>{
            console.log(err);
            
        })


        axios.get(`${UrlLink}Masters/Location_Detials_link`)
        .then((res) => {
            const ress = res.data
            setLocationData(ress)
        })
        .catch((err) => {
            console.log(err);
        })

        axios.get(`${UrlLink}Inventory/ClinicAddress_Link`)
        .then((res) => {
            const result = res.data
            setClinicarray(result)
        })
        .catch((err) => {
            console.log(err);
        })


},[UrlLink])


useEffect(()=>{

    if(userRecord && Object.keys(userRecord).length !==0 
    && Clinicarray && Clinicarray.length !==0 && Object.keys(EdittData).length === 0) {
        
        let findAdd=Clinicarray.find((ele)=>ele.location === userRecord?.location)

        setPurchaseOrder((prev)=>({
            ...prev,
            BillingLocation:userRecord.location,
            BillingAddress:findAdd?.Address,
            ShippingLocation:userRecord.location,
            ShippingAddress:findAdd?.Address,
        }))
        
    }

},[userRecord,Clinicarray,EdittData])



useEffect(()=>{

    if(SelectItemlist && SelectItemlist.length !==0){

        const TotalNetAmount = SelectItemlist.reduce((accumulator, item) => accumulator + (+item.TotalAmount || 0), 0);
        console.log('TotalNetAmount---',TotalNetAmount);
        
        setPurchaseOrder((prev)=>({
            ...prev,
            TotalOrderValue:TotalNetAmount,
        }))
    }
    else{

        setPurchaseOrder((prev)=>({
            ...prev,
            TotalOrderValue:'',
        }))

    }

},[SelectItemlist])


    
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
        if (['SupplierMailId'].includes(name)) return 'email';
        if(['OrderDate','DeliveryDate'].includes(name)) return 'date';
        if (['SupplierContactNumber', 'TotalOrderValue','Strength','MinimumPurchaseQty','PurchaseRateBeforeGST',
            'GST','PurchaseRateAfterGST','MRP','PurchaseQty','TotalAmount'].includes(name)) return 'number';
        return 'text';
        };

        const calculateDeliveryDate = (orderDate, leadTime) => {
            // Ensure orderDate is properly converted to a Date object
            const orderDateObj = new window.Date(orderDate);
        
            // Create a new Date object for deliveryDate
            const deliveryDate = new window.Date(orderDateObj);
        
            // Add the leadTime to the orderDate
            deliveryDate.setDate(orderDateObj.getDate() + leadTime);
        
            // Format the new DeliveryDate to "yyyy-MM-dd"
            const formattedDeliveryDate = deliveryDate.toISOString().split('T')[0];
        
            return formattedDeliveryDate;
}



    useEffect(()=>{

        if(PurchaseOrder.SupplierId !== '' && supplierArray.length !==0)
        {
            let Finddata=supplierArray.find((ele)=>ele.id === PurchaseOrder.SupplierId)
            // console.log('jjjjjjjj',Finddata);
            if(Finddata){

                const Clearedetail=Finddata.Item_details.filter((ele)=>ele.InActive === false).map(item => {
                    const { PrevRateWithGst, 
                            Prev_PurchaseRateBeforeGST,
                            Prev_GST,
                            Prev_PurchaseRateAfterGST,
                            Prev_MRP,
                            id,       
                            SupplierPoductId,
                            InActive,
                            ...rest } = item; 
                          return rest;
                    });      

             setItemlist(Clearedetail)
            }
            else{
              setItemlist([])
            }
        }

    },[PurchaseOrder?.SupplierId,supplierArray])


    const HadelonchageSupplier = async (e)=>{
        const {name,value}=e.target

       if(name === 'SupplierId'){

        let Finddata=supplierArray.find((ele)=>ele.id === value)

        if(Finddata){
            

            const dateCalulation= calculateDeliveryDate(currentDate,Finddata.LeadTime)
            
            // console.log('datess',dateCalulation);
                
            setPurchaseOrder((prev)=>({
                ...prev,
                [name]:value,
                SupplierName:Finddata.SupplierName,
                SupplierMailId:Finddata.EmailAddress,
                SupplierContactNumber:+Finddata.ContactNumber,
                SupplierContactPersion:Finddata.ContactPersion,
                DeliveryDate:dateCalulation,

            }))


        }
        else{
            setItemlist([])
            setSelectItemlist([])
            ClearProductList()

            setPurchaseOrder((prev)=>({
                ...prev,
                [name]:value,
                SupplierName:'',
                SupplierMailId:'',
                SupplierContactNumber:'',
                SupplierContactPersion:'',
                DeliveryDate:'',
            }))

        }



       }
       else if(name === 'SupplierName'){

        let Finddata=supplierArray.find((ele)=>ele.SupplierName === value)

        if(Finddata){
            setItemlist(Finddata.Item_details)

            const dateCalulation= calculateDeliveryDate(currentDate,Finddata.LeadTime)

            setPurchaseOrder((prev)=>({
                ...prev,
                [name]:value,
                SupplierId:Finddata.id,
                SupplierMailId:Finddata.EmailAddress,
                SupplierContactNumber:+Finddata.ContactNumber,
                SupplierContactPersion:Finddata.ContactPersion,
                DeliveryDate:dateCalulation,
            }))


        }
        else{

            setItemlist([])
            setSelectItemlist([])
            ClearProductList()



            setPurchaseOrder((prev)=>({
                ...prev,
                [name]:value,
                SupplierId:'',
                SupplierMailId:'',
                SupplierContactNumber:'',
                SupplierContactPersion:'',
            }))

        }
       }

       else if(name === 'ShippingLocation'){

        // console.log('value00',value);
        

        let findAdd=Clinicarray.find((ele)=>ele.location === +value)

        setPurchaseOrder((prev)=>({
            ...prev,
            [name]:value,
            ShippingAddress:findAdd?.Address,
        }))

       }
       else{
        setPurchaseOrder((prev)=>({
            ...prev,
            [name]:value
        }))
       }


    }


    const HandleItemChange =(e)=>{

        const{name,value}=e.target

        if(name === 'ItemCode'){

            let findItem=Itemlist?.find((ele)=>ele.ItemCode === value)

            if(findItem){

                const { id ,PackName,MinimumPurchasePack ,MinimumPurchaseQty ,...rest}=findItem;

                SetItemDetails((prev)=>({
                    ...prev,
                    ...rest,  
                    PurchasePack:PackName,
                    MinimumPurchaseQty:MinimumPurchaseQty,
                }))
            }
            else{
                SetItemDetails((prev)=>({
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
                    PurchasePack:'',
                    MinimumPurchaseQty:'',
                    PurchaseRateBeforeGST:'',
                    GST:'',
                    PurchaseRateAfterGST:'',
                    MRP:'',        
                    PurchaseQty:'',
                    TotalAmount:'',
                }))
            }

        }
        else if(name === 'ItemName'){

            let findItem=Itemlist?.find((ele)=>ele.ItemName === value)

            if(findItem){

                const { id ,PackName,MinimumPurchasePack ,MinimumPurchaseQty ,...rest}=findItem;

                SetItemDetails((prev)=>({
                    ...prev,
                    ...rest,  
                    PurchasePack:PackName,
                    MinimumPurchaseQty:MinimumPurchaseQty,
                }))
            }
            else{
                SetItemDetails((prev)=>({
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
                    PurchasePack:'',
                    MinimumPurchaseQty:'',
                    PurchaseRateBeforeGST:'',
                    GST:'',
                    PurchaseRateAfterGST:'',
                    MRP:'',        
                    PurchaseQty:'',
                    TotalAmount:'',
                }))
            }

        }
        else if(name === 'PurchaseQty'){
            
            let Total =+ItemDetails?.PurchaseRateAfterGST * +value

            SetItemDetails((prev)=>({
                ...prev,
                [name]:value,
                TotalAmount:Total.toFixed(2) || '',
            })) 

        }
        else{
            SetItemDetails((prev)=>({
                ...prev,
                [name]:value
            }))
        }


       

    }

    const ClearProductList =()=>{
        SetItemDetails({
            ItemCode:'',
            ItemName:'',
            GenericName: "",
            CompanyName:'',
            ProductCategories:'',
            SubCategory:"",  
            Strength: "",
            UOM:"",
            HSNCode:"",
            PurchasePack:'',
            MinimumPurchaseQty:'',
            MRP:'',   
            PurchaseRateBeforeGST:'',
            GST:'',
            PurchaseRateAfterGST:'',     
            PurchaseQty:'',
            TotalAmount:'',
        })
    }



    const HandleAddProduct =()=>{
        let requiredFields =[
            'ItemCode',
            'ItemName',
            'PurchasePack',
            'MinimumPurchaseQty',
            'PurchaseRateBeforeGST',
            'GST',
            'PurchaseRateAfterGST',
            'MRP',
            'PurchaseQty',
            'TotalAmount'
        ]

        const missingFields = requiredFields.filter(
            (field) => !ItemDetails[field]
        )

        const CheckDub=SelectItemlist.some(
            (product)=> product.ItemCode === ItemDetails.ItemCode 
            && product?.id !== ItemDetails?.id)
            
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
                if(ItemDetails.id){
                    
                    setSelectItemlist((prev)=>
                        prev.map((Product)=>
                            Product.id === ItemDetails.id ? {...ItemDetails} : Product)
                    )
                    ClearProductList();
                }
                else{
                    setSelectItemlist((prev)=>[
                        ...prev,
                        {
                            ...ItemDetails,
                            id:prev.length+1,
                        }
                    ])
                    ClearProductList();
                }
              }

    }

    const HandelEditdata =(row)=>{
        
        SetItemDetails({
            ...row
          })
    
    }

    const HandelDeletdata = (row) => {
        ClearProductList();

        const updatedArray = SelectItemlist.filter((ele) => ele.id !== row.id);
        
        const reindexedArray = updatedArray.map((item, index) => ({
            ...item,
            id:index + 1,
        }));

        setSelectItemlist(reindexedArray);
    };


const SelectItemlistColumn =[
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
        key:'PurchasePack',
        name:'Purchase Pack'
    },
    {
      key:'MinimumPurchaseQty',
      name:'Pack Qty'
    },
    {
        key:'MRP',
        name:'MRP'
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
      key:'PurchaseQty',
      name:'Purchase Qty'
    },
    {
     key:'TotalAmount',
     name:'Total Amount'
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
          <Button className="cell_btn" 
            onClick={()=>HandelDeletdata(Params.row)}               
            >
            <DeleteOutlineIcon className="check_box_clrr_cancell" />
          </Button>
        </>
      )
    }
    
    
]


const SavePurchaseOrder =()=>{


    let requiredFields =[
        'SupplierName',
        'SupplierMailId',
        'SupplierContactNumber',
        'SupplierContactPersion',
        'OrderDate',
        'DeliveryDate',
        'BillingLocation',
        'BillingAddress',
        'ShippingLocation',
        'ShippingAddress',
        'TotalOrderValue'
    ]

    let missingFields =requiredFields.filter(
        (field)=>!PurchaseOrder[field]
    )

    if(missingFields.length !==0){

        const tdata={
          message: `Please fill out all required fields: ${missingFields.join(", ")}`,
          type: 'warn',
        }
        dispatchvalue({ type: 'toast', value: tdata });
    
    }
    else
    {
        let Senddata={
            ...PurchaseOrder,
            SelectItemlist:SelectItemlist,
            Create_by:userRecord?.username,
        }


        axios.post(`${UrlLink}Inventory/PurchaseOrder_Link`,Senddata)
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
                dispatchvalue({ type:'PurchaseOrderList', value: {} })
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
        <h3>Purchase Order</h3>

        <br/>

        <div className="RegisFormcon_1">

        {
            Object.keys(PurchaseOrder).map((StateName,Index)=>{
                           
                
                return(
                    <div className="RegisForm_1" key={Index+'key'}>
                        
                        <label htmlFor={StateName}>{formatLabel(StateName)} :</label>

                        
                        
                        
                        
                        {['BillingLocation','ShippingLocation'].includes(StateName) ?
                        
                        <select
                        type={getInputType(StateName)}
                        id={StateName}
                        name={StateName}
                        value={PurchaseOrder[StateName]}
                        onChange={HadelonchageSupplier}
                        disabled={StateName === 'BillingLocation'}
                        >
                        {
                        LocationData.map((ele,ind)=>(
                            <option key={ind+'key'} value={ele.id} >{ele.locationName}</option>
                        ))

                        }
                        </select>

                        :
                        
                        ['BillingAddress','ShippingAddress'].includes(StateName) ?

                        <textarea
                        type={getInputType(StateName)}
                        id={StateName}
                        name={StateName}
                        value={PurchaseOrder[StateName]}
                        onChange={HadelonchageSupplier}
                        disabled
                        >

                        </textarea>
                        :
                        <input
                         type={getInputType(StateName)}
                         id={StateName}
                         name={StateName}
                         value={PurchaseOrder[StateName]}
                         onChange={HadelonchageSupplier}
                         list={StateName +'List'}
                         min={StateName === 'DeliveryDate' ? currentDate :''}
                         disabled={!['SupplierId','SupplierName','ShippingLocation'].includes(StateName)}
                        />
                         }

                        {['SupplierId','SupplierName'].includes(StateName) ? <datalist id={StateName +'List'}>
                        {
                            supplierArray.map((option,index)=>(
                            <option key={index+'key'} value={StateName === 'SupplierId' ? option.id : option.SupplierName}>
                            </option>
                            ))
                        }
                        </datalist> : <></>}

                    </div>
                )
            })
        }
        

        </div>

        <br/>

        <div className="common_center_tag">
            <span>Item Details</span>
        </div>

        <br/>

        <div className="RegisFormcon_1">

        {
            Object.keys(ItemDetails).filter((ele)=>ele !== 'id').map((StateName2,Index)=>{
                return(
                    <div className="RegisForm_1" key={Index+'key'}>

                    <label htmlFor={StateName2}>{formatLabel(StateName2)} :</label>
                    
                    <input
                     type={getInputType(StateName2)}
                     id={StateName2}
                     name={StateName2}
                     value={ItemDetails[StateName2]}
                     onChange={HandleItemChange}
                     list={StateName2+'List'}
                     disabled={!['PurchaseQty','ItemCode','ItemName'].includes(StateName2)}
                    />

                   { ['ItemCode','ItemName'].includes(StateName2) ?
                    
                    <datalist id={StateName2+'List'}> 
                    {
                        Itemlist.map((ele,ind)=>(
                            <option key={ind+'key'} value={StateName2 === 'ItemCode' ? ele.ItemCode :ele.ItemName}></option>
                        ))
                    }
                    </datalist>
                    :
                    <></>
                    }

                    
                    </div>
                )
            })
        }

        </div>


      
      <br/>
      <div className="Main_container_Btn">
        <button onClick={HandleAddProduct}>
           {ItemDetails.id? 'Update' : 'Add'}
        </button>
        </div>
        <br/>

        {SelectItemlist.length !== 0 && <ReactGrid columns={SelectItemlistColumn} RowData={SelectItemlist} /> }
        <br/>
        
        {SelectItemlist.length !== 0 &&
        <div className="Main_container_Btn" >
        <button onClick={SavePurchaseOrder}>
        {PurchaseOrder?.PurchaseOrderNumber? 'Update' : 'Save'}
           
        </button>
        </div>}
    </div>


      <ToastAlert Message={toast.message} Type={toast.type} />



    </>
  )
}

export default PurchaseOrder;