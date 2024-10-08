import React, { useCallback, useEffect, useState } from 'react'
import LoupeIcon from "@mui/icons-material/Loupe";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import ListIcon from '@mui/icons-material/List';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';





const PurchaseOrderList = () => {



  const navigate = useNavigate();

  const dispatchvalue = useDispatch();

  const today = new Date();
  const currentDate = today.toISOString().split('T')[0];

  const UrlLink = useSelector(state => state.userRecord?.UrlLink);
  const toast = useSelector(state => state.userRecord?.toast);

  const [PurchaseOrderList,setPurchaseOrderList]=useState([])

  const[supplierArray,setsupplierArray]=useState([])
  
  const [LocationData, setLocationData] = useState([]);

  const [Itemlist,setItemlist]=useState([])

  const [selectRoom, setselectRoom] = useState(false);


  const [SerchOptions,setSerchOptions] =useState({
    StatusCheck:'',
    DateType:'',
    CurrentDate:currentDate,
    FromDate:'',
    ToDate:'',
    SupplierId:'',
    SupplierName:'',
    BillingLocation:'',
    ShippingLocation:'',
  })



  const getPOdata = useCallback(()=>{

    axios.get(`${UrlLink}Inventory/PurchaseOrder_Report_Details`,{ params: SerchOptions })
    .then((res)=>{
      console.log('--ooo---',res.data);
      let Rdata=res.data
      if(Array.isArray(Rdata) && Rdata.length !==0){ 
        setPurchaseOrderList(Rdata)
      }
      else{
        setPurchaseOrderList([])
      }

    })
    .catch((err)=>{
      console.log(err);
      
    })

  },[UrlLink,SerchOptions])


  useEffect(()=>{

    axios.get(`${UrlLink}Masters/Supplier_Master_Link`)
    .then((res)=>{
        console.log('pppp',res.data);
        let Rdata=res.data
        if(Array.isArray(Rdata) && Rdata.length !==0){                
            setsupplierArray(Rdata)
        }else
        {
            setsupplierArray([])
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


},[UrlLink])



  useEffect(()=>{
    getPOdata()
  },[getPOdata])







  // const handleNewMaster = () => {    
  //   dispatchvalue({ type:'PurchaseOrderList', value: {} });
  //   navigate('/Home/PurchaseOrder');
  // };



  const ItemView =(row)=>{

    let Item=row.Item_Details

    if(Item && Item.length !==0)
    {
        setselectRoom(true)        
        setItemlist(Item)
    }
    else{

        const tdata = {
            message: 'There is no data to view.',
            type: 'warn'
        };
        dispatchvalue({ type: 'toast', value: tdata });

    }

}


const HandelEditdata =(row)=>{

  dispatchvalue({ type:'PurchaseOrderList', value: row });
  navigate('/Home/PurchaseOrder');

}


const HandelApprovedata =(row)=>{

  const POconfirm = window.confirm('Are You Sure You Want to Approve the Purchase Order?');

    if(POconfirm){

      let Senddata={
        EditStatus:'Waiting For GRN',
        PurchaseOrderNumber:row.id,
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
              getPOdata()
          })
          .catch((err)=>{
              console.log(err);            
          })
    }

}



const HandelGoToGrn=(row)=>{
  dispatchvalue({ type:'GoodsReceiptNoteList', value: row });
  navigate('/Home/GoodsReceiptNote');

}

  const PurchaseOrderColumn=[
    {
        key:'id',
        name:'P.O.Number',
        frozen: true
    },{
        key:'SupplierId',
        name:'Supplier Id',
        frozen: true
    },{
        key:'SupplierName',
        name:'Supplier Name',
        frozen: true
    },{
      key: 'OrderDate',
      name: 'Order Date',
      frozen: true,
      renderCell: (params) => {
        const date = new Date(params.row.OrderDate);
        const formattedDate = date.toLocaleDateString('en-GB'); 
        return <>{formattedDate}</>;
      }
    },
    {
      key: 'DeliveryDate',
      name: 'Delivery Date',
      frozen: true,
      renderCell: (params) => {
        const date = new Date(params.row.DeliveryDate);
        const formattedDate = date.toLocaleDateString('en-GB');
        return <>{formattedDate}</>;
      }
    },{
      key:'Item_Details',
      name:'Item Details',
      renderCell:(params)=>(
        <>
        <Button className="cell_btn" 
        onClick={()=>ItemView(params.row)}               
        >
        <ListIcon className="check_box_clrr_cancell" />
        </Button>
        </>
      )
    },{
        key:'SupplierMailId',
        name:'Supplier MailId',
       
    },{
        key:'SupplierContactNumber',
        name:'Contact Number',
        
    },{
        key:'SupplierContactPersion',
        name:' Contact Persion',
    },
    {
        key:'Use_BillingLocation',
        name:'Billing Location',
    },{
        key:'Use_ShippingLocation',
        name:'Shipping Location',
    },{
        key:'TotalOrderValue',
        name:'Total Order Value',
    },
    {
      key:'PO_Status',
      name:'Status',
   },
   {
      key:'Edit',
      name:'Edit',
      renderCell:(params)=>(
          <>
          {params.row.PO_Status === 'Waiting For Approve'?
          <Button className="cell_btn" 
          onClick={()=>HandelEditdata(params.row)}               
          >
          <EditIcon className="check_box_clrr_cancell" />
          </Button> :
          <>No Action</>}
          </>
      )
  },
  {
     key:'Action',
     name:'Action',
     renderCell:(params)=>(
         <>
         {params.row.PO_Status === 'Waiting For Approve'?
         <Button className="cell_btn" 
          onClick={()=>HandelApprovedata(params.row)}               
         >
         <CheckCircleOutlineIcon className="check_box_clrr_cancell" />
         </Button> :
         params.row.PO_Status === 'GRN Compleated'?
         <Button className="cell_btn"            
         >
          No Action
         </Button>
         :
         <Button className="cell_btn" 
          onClick={()=>HandelGoToGrn(params.row)}               
         >
         <span style={{color:'blue'}}>Go To GRN</span>
         </Button>}
         </>
     )
 }
   
]


const ItemColumn=[
  {
      key:'id',
      name:'Id',    
      frozen: true
  },{
      key:'ItemCode',
      name:'Item Code', 
      frozen: true
  },{
      key:'ItemName',
      name:'Item Name', 
      frozen: true
  },{
      key:'PurchasePack',
      name:'Pack Name',
  },{
      key:'MinimumPurchaseQty',
      name:'Minimum Purchase Qty',
  },{
    key:'MRP',
    name:'MRP',
  },{
      key:'PurchaseRateBeforeGST',
      name:'Purchase Rate BeforeGST',
  },{
      key:'GST',
      name:' GST',
  },{
      key:'PurchaseRateAfterGST',
      name:'Purchase Rate AfterGST',
  },{
    key:'PurchaseQty',
    name:'Purchase Qty',
  },{
    key:'TotalAmount',
    name:'TotalAmount',
  },{
    key:'Item_Status',
    name:'Status',
  }
  ]

  const Handeleonchange =(e)=>{

    const {name,value}=e.target

    if(name === 'SupplierId'){

    let Finddata=supplierArray.find((ele)=>ele.id === value)
    if(Finddata){
      setSerchOptions((prev)=>({
        ...prev,
        [name]:value,
        SupplierName:Finddata.SupplierName,
      }))
    }
    else{
      setSerchOptions((prev)=>({
        ...prev,
        [name]:value,
        SupplierName:'',
  
      }))
    }
    }
    if(name === 'SupplierName'){

      let Finddata=supplierArray.find((ele)=>ele.SupplierName === value)
      if(Finddata){
        setSerchOptions((prev)=>({
          ...prev,
          [name]:value,
          SupplierId:Finddata.id,
        }))
      }
      else{
        setSerchOptions((prev)=>({
          ...prev,
          [name]:value,
          SupplierId:'',
    
        }))
      }
      }
    else{
      setSerchOptions((prev)=>({
        ...prev,
        [name]:value
  
      }))
    }


  }


  return (
    <>
     <div className="Main_container_app">
      <h3>Purchase Order List</h3>
        <br/>
         <div className="RegisFormcon_1">
              <div className="RegisForm_1">
              <label>Status<span>:</span></label>

              <select
              name='StatusCheck'
              value={SerchOptions.StatusCheck}
              onChange={Handeleonchange}
              >
              <option value=''>Select</option>
              <option value='Waiting For Approve'>Waiting For Approve</option>
              <option value='Waiting For GRN'>Waiting For GRN</option>
              <option value='GRN Compleated'>GRN Compleated</option>

              </select>
              </div>

              <div className="RegisForm_1">
              <label>Date Type<span>:</span></label>
              <select
                name='DateType'
                value={SerchOptions.DateType}
                onChange={Handeleonchange}
                >
                <option value=''>Select</option>
                <option value='CurrentDate'>Current Date</option>
                <option value='Customize'>Customize</option>
                </select>
              </div>

             { SerchOptions.DateType === 'CurrentDate' ?
             <div className="RegisForm_1">
              <label>Current Date<span>:</span></label>
              <input
                type='date'
                name='CurrentDate'
                value={SerchOptions.CurrentDate}
                onChange={Handeleonchange}
                readOnly
                />
                
              </div>
              :
              <>
              <div className="RegisForm_1">
              <label>From Date<span>:</span></label>
              <input
                type='date'
                name='FromDate'
                value={SerchOptions.FromDate}
                onChange={Handeleonchange}
                />
                
              </div>


              <div className="RegisForm_1">
              <label>To Date<span>:</span></label>
              <input
                type='date'
                name='ToDate'
                value={SerchOptions.ToDate}
                onChange={Handeleonchange}
                min={SerchOptions.FromDate}
                />
                
              </div>
               </>}

              <div className="RegisForm_1">
              <label>Supplier Id<span>:</span></label>
              <input
                type='text'
                name='SupplierId'
                value={SerchOptions.SupplierId}
                onChange={Handeleonchange}
                list='SupplierIdList'
                />
                <datalist id='SupplierIdList'>
                {
                  supplierArray.map((ele,ind)=>(
                    <option key={ind+'key'} value={ele.id} ></option>
                  ))

                }
                </datalist>
                
              </div>


              <div className="RegisForm_1">
              <label>Supplier Name<span>:</span></label>
              <input
                type='text'
                name='SupplierName'
                value={SerchOptions.SupplierName}
                onChange={Handeleonchange}
                list='SupplierNameList'
                />
                <datalist id='SupplierNameList'>
                  {
                    supplierArray.map((ele,ind)=>(
                      <option key={ind+'key'} value={ele.SupplierName} ></option>
                    ))
                  }
                </datalist>
                
              </div>
              
              <div className="RegisForm_1">
              <label>Billing Location<span>:</span></label>
              <select
              id='BillingLocation'
              name='BillingLocation'
              value={SerchOptions.BillingLocation}
              onChange={Handeleonchange}
              >
              <option value=''>Select</option>
              {
              
              LocationData.map((ele,ind)=>(
                  <option key={ind+'key'} value={ele.id} >{ele.locationName}</option>
              ))

              }
              </select>
              </div>

              <div className="RegisForm_1">
              <label>Shipping Location<span>:</span></label>
              <select
              id='ShippingLocation'
              name='ShippingLocation'
              value={SerchOptions.ShippingLocation}
              onChange={Handeleonchange}
              >
              <option value=''>Select</option>
              {
              LocationData.map((ele,ind)=>(
                  <option key={ind+'key'} value={ele.id} >{ele.locationName}</option>
              ))

              }
              </select>
              </div>

              {/* <button
                  className="search_div_bar_btn_1"
                  onClick={handleNewMaster}
                  title="New Doctor Register"
              >
              <LoupeIcon />
              </button> */}
          </div>

          <br/>

          <ReactGrid columns={PurchaseOrderColumn} RowData={PurchaseOrderList} />


     </div>
     <ToastAlert Message={toast.message} Type={toast.type} />


            {selectRoom && Itemlist.length !==0 &&(
            <div className="loader" onClick={() => setselectRoom(false)}>
            <div className="loader_register_roomshow"   onClick={(e) => e.stopPropagation()}>
            <br/>
            
            <div className="common_center_tag">
                <span>Item Details</span>
            </div>
            <br/>
            <br/>

                <ReactGrid columns={ItemColumn} RowData={Itemlist} />
            </div>
            </div>
            )}
    </>
  )
}

export default PurchaseOrderList;