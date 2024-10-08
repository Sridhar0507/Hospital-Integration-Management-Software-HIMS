import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoupeIcon from "@mui/icons-material/Loupe";
import { useNavigate } from 'react-router-dom';
import ReactGrid from '../../OtherComponent/ReactGrid/ReactGrid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import ModelContainer from '../../OtherComponent/ModelContainer/ModelContainer';
import ToastAlert from '../../OtherComponent/ToastContainer/ToastAlert';
import ListIcon from '@mui/icons-material/List';


const SupplierMasterList = () => {


const dispatchvalue = useDispatch();

const toast = useSelector(state => state.userRecord?.toast);
const UrlLink = useSelector(state => state.userRecord?.UrlLink);

const navigate = useNavigate();


const [SearchQuery, setSearchQuery] = useState('');
const[supplierArray,setsupplierArray]=useState([])
const[FilteredRows,setFilteredRows]=useState([])

const [selectRoom, setselectRoom] = useState(false);

const [selectRoom2, setselectRoom2] = useState(false);


const[Itemlist,setItemlist]=useState([])

const[Banklist,setBanklist]=useState([])




const handleNewMaster = () => {    
    dispatchvalue({ type:'SupplierMasterStore', value: {} });
    navigate('/Home/SupplierMaster');
};



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


    },[UrlLink])


    useEffect(() => {
        const lowerCaseQuery = SearchQuery.toLowerCase();
        const filteredData = supplierArray.filter((row) => {
          const lowerCaseid = row.id.toLowerCase();
          const lowerCaseSupplierName = row.SupplierName.toLowerCase();
          const ContactNumber = row.ContactNumber.toLowerCase(); 
    
          return (
            lowerCaseid.includes(lowerCaseQuery) ||
            lowerCaseSupplierName.includes(lowerCaseQuery) ||
            ContactNumber.includes(lowerCaseQuery)
          );
        });
    
        setFilteredRows(filteredData);
      }, [SearchQuery, supplierArray]);
    
    
    const HandelViewdata = useCallback((fileval)=>{

        // console.log('uuu',fileval);

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

            console.log('tdata',tdata);
            
            dispatchvalue({ type: 'modelcon', value: tdata });
        } else {
            const tdata = {
                message: 'There is no file to view.',
                type: 'warn'
            };
            dispatchvalue({ type: 'toast', value: tdata });
        }
        

    },[dispatchvalue])



    const ItemView =(row)=>{

        let Item=row.Item_details

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

    const BankView=(row)=>{
        
        let Item=row.Bank_Details

        if(Item && Item.length !==0)
        {
        setselectRoom2(true)
        setBanklist(Item)
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
    dispatchvalue({ type:'SupplierMasterStore', value: row });
    navigate('/Home/SupplierMaster');
    }


    const SupplierColumn=[
        {
            key:'id',
            name:'Supplier Id',
            frozen: true
        },{
            key:'SupplierName',
            name:'Supplier Name',
            frozen: true
        },{
            key:'SupplierType',
            name:'Supplier Type',
            frozen: true
        },{
            key:'ContactPersion',
            name:'Contact Persion',
            frozen: true
        },{
            key:'ContactNumber',
            name:'Contact Number',
            frozen: true
        },{
            key:'EmailAddress',
            name:' Email',
            frozen: true
        },{
            key:'Address',
            name:'Address',
        },{
            key:'RegistrationNumber',
            name:'Registr No',
        },{
            key:'GSTNumber',
            name:'GST Number',
        },{
            key:'PANNumber',
            name:'PAN Number',
        },{
            key:'PaymentTerms',
            name:'Payment Terms',
        },{
            key:'CreditLimit',
            name:'Credit Limit',
        },{
            key:'LeadTime',
            name:'Lead Time',
        },{
            key:'PreferredSupplier',
            name:'Preferred Supplier',
            renderCell:(params)=>(
                <>
                {params.row.PreferredSupplier ? "Yes" : "No"}
                </>
            )
        },{
            key:'InActive',
            name:'InActive',
            renderCell:(params)=>(
                <>
                {params.row.InActive ? "Yes" : "No"}
                </>
            )
        },{
            key:'Notes',
            name:'Notes',
        },{
            key:'PaymentMode',
            name:'PaymentMode',
        },{
            key:'FileAttachment',
            name:'Document',
            renderCell:(params)=>(
                <>
                <Button className="cell_btn" 
                onClick={()=>HandelViewdata(params.row.FileAttachment)}               
                >
                <VisibilityIcon className="check_box_clrr_cancell" />
                </Button>
                </>
            )
        },{
            key:'Item_details',
            name:'Item List',
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
            key:'Bank_Details',
            name:'Bank Details',
            renderCell:(params)=>(
                <>
                <Button className="cell_btn" 
                onClick={()=>BankView(params.row)}               
                >
                <ListIcon className="check_box_clrr_cancell" />
                </Button>
                </>
            )
        },{
            key:'Action',
            name:'Action',
            renderCell:(params)=>(
                <>
                <Button className="cell_btn" 
                onClick={()=>HandelEditdata(params.row)}               
                >
                <EditIcon className="check_box_clrr_cancell" />
                </Button>
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
    key:'PackName',
    name:'Minimum Purchase Pack',
},{
    key:'MinimumPurchaseQty',
    name:'Minimum Purchase Qty',
},{
    key:'Prev_PurchaseRateAfterGST',
    name:'Prev Rate WithGst',
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
    key:'MRP',
    name:'MRP',
},{
    key:'InActive',
    name:'InActive',
    renderCell:(params)=>(
        <>
        {params.row.InActive ? 'Yes':'No'}
        </>
    )
}
]

const BankColumn=[
    {
        key:'id',
        name:'Id',
    },{
        key:'BankName',
        name:'Bank Name',
    },{
        key:'AccountNumber',
        name:'AccountNumber',
    },{
        key:'IFSCCode',
        name:'IFSC Code',
    },{
        key:'BankBranch',
        name:'Bank Branch',
    },
   
]

  return (
    <>
      <div className="Main_container_app">
                <h3>Supplier Master List</h3>
                
                <div className="search_div_bar">
                    <div className="search_div_bar_inp_1">
                        <label>Search Here<span>:</span></label>
                        <input
                            type="text"
                            value={SearchQuery}
                            placeholder='Supplier ID,Supplier Name,contact Number'
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        className="search_div_bar_btn_1"
                        onClick={handleNewMaster}
                        title="New Doctor Register"
                    >
                        <LoupeIcon />
                    </button>
                </div>

                <br/>
                <ReactGrid columns={SupplierColumn} RowData={FilteredRows} />
            
            
            
            </div>
            <ToastAlert Message={toast.message} Type={toast.type} />
            <ModelContainer />


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

            {selectRoom2 && Banklist.length !==0 &&(
            <div className="loader" onClick={() => setselectRoom2(false)}>
            <div className="loader_register_roomshow"   onClick={(e) => e.stopPropagation()}>
            <br/>
            
            <div className="common_center_tag">
                <span>Bank Details</span>
            </div>
            <br/>
            <br/>

            
                <ReactGrid columns={BankColumn} RowData={Banklist} />
            </div>
            </div>
            )}

    </>
  )
}

export default SupplierMasterList;
