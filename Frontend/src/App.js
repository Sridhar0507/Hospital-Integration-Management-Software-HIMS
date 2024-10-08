import React, { useCallback, useEffect, useRef,useState} from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../src/App.css';
import axios from 'axios';
import debounce from 'lodash.debounce';
import NotFound from './Homepage/404Page';
import LoginPage from './Homepage/LoginPage/LoginPage';
import HomePage from './Homepage/Homepage';
import HospitalDetials from './Masters/HospitalMaster/HospitalDetials';
import RoomMaster from './Masters/RoomMaster/RoomMaster';
import ReferalRoute from './Masters/ReferalRouteMaster/ReferalRoute';
import DoctorMaster from './Masters/DoctorMaster/DoctorMaster';
import DoctorList from './Masters/DoctorMaster/DoctorList';
import BasicMaster from './Masters/BasicMaster/BasicMaster';
import UserRegisterMaster from './Masters/UserRegisterMaster/UserRegisterMaster';
import UserRegisterList from './Masters/UserRegisterMaster/UserRegisterList';
import { useDispatch, useSelector } from 'react-redux';

import DoctorRatecardList from './Masters/DoctorMaster/DoctorRatecardList';
import EmgRegistration from './FrontOffice/EmgRegistration/EmgRegistration';
import RegistrationList from './FrontOffice/RegistrationList/RegistrationList';
import AppointmentRequestList from './FrontOffice/AppointmentRequestList/AppointmentRequestList';

import Medicine_rack_Master from './Masters/InventoryMaster/Medicine_rack_Master';
import Productmaster from './Masters/InventoryMaster/Productmaster';
import Productcategory from './Masters/InventoryMaster/Productcategory';
import ProductMasterList from './Masters/InventoryMaster/ProductMasterList';
import MedicalStockInsertmaster from './Masters/InventoryMaster/MedicalStockInsertmaster';
import SupplierMaster from './Masters/InventoryMaster/SupplierMaster';
import SupplierMasterList from './Masters/InventoryMaster/SupplierMasterList';
import TrayManagement from './Masters/InventoryMaster/TrayManagement';
import TrayManagementList from './Masters/InventoryMaster/TrayManagementList'

import PurchaseOrder from './Inventory/PurchaseOrder/PurchaseOrder';
import PurchaseOrderList from './Inventory/PurchaseOrder/PurchaseOrderList';

import GoodsReceiptNote from './Inventory/GRN/GoodsReceiptNote';


import GeneralBilling from './FrontOffice/Billing/GeneralBilling';
import GeneralBillingList from './FrontOffice/Billing/GeneralBillingList';


// ---------------------------ICU

import Dama from './IP/ICU_Management/ICU_Doctor/Dama';
import ICU_Mlc from './IP/ICU_Management/ICU_Doctor/ICU_Mlc';
import ICU_Assesment from './IP/ICU_Management/ICU_Doctor/ICU_Assesment';
import PreOperativeChecklistForm2 from './IP/ICU_Management/ICU_Doctor/PreOperativeChecklistForm2';
import PreOperativeChecklistForm from './IP/ICU_Management/ICU_Doctor/PreOperativeChecklistForm';
import PreOperativeIns from './IP/ICU_Management/ICU_Doctor/PreOperativeIns';
import WardPreOpChkList from './IP/ICU_Management/ICU_Doctor/WardPreOpChkList';

// ---------------------------Lenin

import LeninMaster from './Lenin_Management/LeninMaster';
import Lenin_DeptWise_MinMax from './Lenin_Management/Lenin_DeptWise_MinMax';
import Lenin_Stock from './Lenin_Management/Lenin_Stock';
import ServiceProcedureMaster from './Masters/ServiceProcedureMaster/ServiceProcedureMaster';
import ServiceProcedureRatecard from './Masters/ServiceProcedureMaster/ServiceProcedureRatecard';
import DoctorWorkbenchNavigation from './DoctorWorkBench/DoctorWorkbenchNavigation';

// lab and radiology
import LabTest from "./OP/LabTest";
import RadiologyTest from "./OP/RadiologyTest";
import RadiologyMaster from "./Masters/RadiologyMaster/RadiologyMaster";
import LabMaster from "./Masters/LabMaster/LabMaster";

import RadiologyQueList from './Radiology/RadiologyQueList';
import RadiologyReportEntry from './Radiology/RadiologyReportEntry';

import WorkbenchQuelist from './DoctorWorkBench/WorkbenchQuelist';
import PrivacyPolicy from './Homepage/Footer/PrivacyPolicy';
import TermsOfUse from './Homepage/Footer/TermsOfUse';
import DoctorDashboard from './DoctorWorkBench/DoctorDashboard';
import Newregistration from './FrontOffice/Registration/Newregistration';

import NewRoomAvail from './Masters/RoomMaster/NewRoomAvail';

import LabQueuelist from './Lab/LabQueuelist';
import LabRequest from './Lab/LabRequest';
import LabCompletedlist from './Lab/LabCompletedlist';
import Labvalue from './Lab/Labvalue';
import Iprequestlist from './FrontOffice/RegistrationList/Iprequestlist';
// import RadiologyTest from "./OP/RadiologyTest"; 

import Mis_Navigation from './MIS_Report/Mis_Navigation';
import DoctorCalender from './Masters/DoctorMaster/DoctorCalender';
import InsClientDonationList from './Masters/InsuranceClientMaster/InsClientDonationList';
import InsClientDonationMaster from './Masters/InsuranceClientMaster/InsClientDonationMaster';
import ServiceProcedureMasterList from './Masters/ServiceProcedureMaster/ServiceProcedureMasterList';

import IP_DoctorWorkbenchNavigation from './IP_Workbench/Doctor/IP_DoctorWorkbenchNavigation';
import IP_WorkbenchQuelist from './IP_Workbench/Doctor/IP_WorkbenchQuelist';
import IP_NurseQueslist from './IP_Workbench/Nurse/IP_NurseQueslist';
import IP_BillingEntryQuelist from './IP_Workbench/Nurse/IP_BillingEntryQueulist';
import IP_BillingEntry from './IP_Workbench/Nurse/IP_BIllingEntry';
import IP_NurseWorkbenchNavigation from './IP_Workbench/Nurse/IP_NurseWorkbenchNavigation';
import Opdqueue from './FrontOffice/RegistrationList/Opdqueue';
import ConsentFormsMaster from './Masters/ConsentForms/ConsentFormsMaster';
import IpHandoverQue from './FrontOffice/RegistrationList/IpHandoverQue';
import IpHandoverWorkbench from './FrontOffice/RegistrationList/IpHandoverWorkbench';
import DutyRousterMaster from './Masters/HRMasters/DutyRousterMaster';
import EmployeeRegister from './HR/EmployeeRegister';
import SurgeryMaster from './Masters/SurgeryMaster/SurgeryMaster';
import MainDash from './DashBoard/components/MainDash/MainDash';
import PharmacyBillingLIst from './FrontOffice/OPPharmacy/PharmacyBillingLIst';
import PharmacyBilling from './FrontOffice/OPPharmacy/PharmacyBilling';
import Walkinbilling from './FrontOffice/OPPharmacy/Walkinbilling';
import IPPharmacyBillingList from './FrontOffice/IpPharmacy/IPPharmacyBillingList';
import IPBilling from './FrontOffice/IPBilling/IPBilling';
import IPBillingList from './FrontOffice/IPBilling/IPBillingList';

import FrequencyMaster from './Masters/RoomMaster/FrequencyMaster';
import Apprenewal from './Masters/BasicMaster/Apprenewal';
import IP_LabDischargeQueslist from './IP_Workbench/Nurse/Discharge/IP_LabDischargeQueslist';
import IP_RadiologyDischargeQueslist from './IP_Workbench/Nurse/Discharge/IP_RadiologyDischargeQueslist';
import IP_BillingDischargeQueslist from './IP_Workbench/Nurse/Discharge/IP_BillingDischargeQueslist';
import CasualityDocQuelist from './Casuality/Doctor/CasualityDocQuelist';
import CasualityNurseQuelist from './Casuality/Nurse/CasualityNurseQuelist';


// import OtRequest from './OtManagement/OtRequest';
// import OtQuelist from './OtManagement/OtQuelist';
// import OtConsentForm from './OtManagement/OtConsentForm';
// import OtDoctorQueueList from './OtManagement/OtDoctor/OtDoctorQueueList';
// import OtDoctorNavigation from './OtManagement/OtDoctor/OtDoctorNavigation';
// import OtDoctorPre from './OtManagement/OtDoctor/OtDoctorPre';
// import OtNursePre from './OtManagement/OtNurse/OtNursePre';
// import OtNurseQueList from './OtManagement/OtNurse/OtNurseQueList';
// import OtNurseeNavigation from './OtManagement/OtNurse/OtNurseeNavigation';
// import OtAnaesthesiaPre from './OtManagement/OTAnaesthesia/OtAnaesthesiaPre';
// import OtAnaesthesiaQueueList from './OtManagement/OTAnaesthesia/OtAnaesthesiaQueueList';
// import OtAnaesthesiaNavigation from './OtManagement/OTAnaesthesia/OtAnaesthesiaNavigation';
// import OTAanaesthesiaCapture from './OtManagement/OTAnaesthesia/OTAnaesthesiaCapture';




const App = () => {

  const inputsRef = useRef([]);


  const navigate = useNavigate();
  const location = useLocation();

  const [sessiontokenid,setSessionid] =useState(null)

  const dispatchvalue = useDispatch();
  const UrlLink = useSelector(state => state.userRecord?.UrlLink);
  const getsessionid = useCallback(() => {
    const storedToken = localStorage.getItem('Chrrtoken');
    if (storedToken) {
      const decodedToken = (token) => {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = atob(payloadBase64);
        return JSON.parse(decodedPayload);
      };
      const decodedTokenid = decodedToken(storedToken);
      setSessionid(decodedTokenid.session_id)
      console.log('decodedTokenData', decodedTokenid)
      dispatchvalue({ type: 'Usersessionid', value: decodedTokenid })
    } else {
      if (location.pathname !== '/') {
        navigate('/')
      }
    }
  }, [navigate, location.pathname, dispatchvalue])





  const getuserrecord = useCallback(() => {
    console.log(sessiontokenid)
    if (sessiontokenid) {
      console.log("jksjsjsjk")
      axios.get(`${UrlLink}Masters/get_data?sessionid=${sessiontokenid}`)
        .then(response => {
          const data1 = response.data.data;
  
          
  
          // Assuming data1 is the token
          
          dispatchvalue({ type: 'UserData', value: data1});
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          // Handle error here, maybe set an error state or show a message
        });
    } else {
      if (location.pathname !== '/') {
        navigate('/');
      }
    }
  }, [sessiontokenid, UrlLink, navigate, location.pathname, dispatchvalue]);

  useEffect(() => {
    axios
      .get(`${UrlLink}Masters/Hospital_Detials_link`)
      .then((response) => {
        if (response.data) {
          const { hospitalName, hospitalLogo, HospitalId } = response.data;
          if (hospitalName && hospitalLogo && HospitalId) {
            const datass = {
              id: HospitalId,
              Cname: hospitalName,
              Clogo: `data:image/*;base64,${hospitalLogo}`
            };
            dispatchvalue({ type: 'ClinicDetails', value: datass });
          } else {
            console.log('Data is null or incomplete');
          }
        } else {
          console.log('Response data is null');
          const datass = {
            id: '',
            Cname: '',
            Clogo: null
          };
          dispatchvalue({ type: 'ClinicDetails', value: datass });
        }
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [dispatchvalue, UrlLink]);

  useEffect(() => {
    const loc = location.pathname
    if (loc === '/') {
      localStorage.clear()
    }
    getsessionid();
    if (sessiontokenid){
      getuserrecord()
    }
   
  }, [location.pathname, navigate, getsessionid,getuserrecord,sessiontokenid])




  useEffect(() => {
    const inputs = inputsRef.current.querySelectorAll('input');
    inputs.forEach(input => {
      // Disable autocomplete
      input.setAttribute('autocomplete', 'off');

      // Prevent copying
      input.addEventListener('copy', (event) => {
        event.preventDefault();
      });

      // Prevent text selection
      input.addEventListener('selectstart', (event) => {
        event.preventDefault();
      });
    });

    // Clean up event listeners on component unmount
    return () => {
      inputs.forEach(input => {
        input.removeEventListener('copy', (event) => {
          event.preventDefault();
        });

        input.removeEventListener('selectstart', (event) => {
          event.preventDefault();
        });
      });
    };
  }, []);


  useEffect(() => {
    const handleResize = debounce(() => {
      if (inputsRef.current) {
        // Adjusting the grid ref without forceUpdate
        const width = inputsRef.current.offsetWidth
        dispatchvalue({ type: 'pagewidth', value: width });
      }
    }, 100);

    const currentGridRef = inputsRef.current;
    const resizeObserver = new ResizeObserver(handleResize);
    if (currentGridRef) {
      resizeObserver.observe(currentGridRef);
    }

    return () => {
      if (currentGridRef) {
        resizeObserver.unobserve(currentGridRef);
      }
      resizeObserver.disconnect();
    };
  }, []);


  return (
    <div ref={inputsRef} className='app_container'>
      <Routes>
        <Route path='/Home' element={<HomePage />}>

        <Route path='/Home/DashBoardDetails' element={<MainDash />} />
          {/* ---------------masters------------ */}
          <Route path='/Home/Hospital_detials' element={<HospitalDetials />} />
          <Route path='/Home/Room_Master' element={<RoomMaster />} />
          <Route path='/Home/Room_Management' element={<NewRoomAvail />} />
          <Route path='/Home/ReferalRoute_Master' element={<ReferalRoute />} />
          <Route path='/Home/Doctor_Master' element={<DoctorMaster />} />
          <Route path='/Home/DoctorList' element={<DoctorList />} />
          <Route path='/Home/DoctorRatecardList' element={<DoctorRatecardList />} />
          <Route path='/Home/Doctor_Calender' element={<DoctorCalender />} />

          <Route path='/Home/Basic_Master' element={<BasicMaster />} />
          <Route path='/Home/UserRegisterMaster' element={<UserRegisterMaster />} />
          <Route path='/Home/UserRegisterList' element={<UserRegisterList />} />



          <Route path='/Home/InsClientDonationList' element={<InsClientDonationList />} />
          <Route path='/Home/InsClientDonationMaster' element={<InsClientDonationMaster />} />

          <Route path='/Home/ServiceProcedureMaster' element={<ServiceProcedureMaster />} />
          <Route path='/Home/ServiceProcedureRatecard' element={<ServiceProcedureRatecard />} />
          <Route path='/Home/ServiceProcedureMasterList' element={<ServiceProcedureMasterList />} />


          <Route path='/Home/Radiology_Master' element={<RadiologyMaster />} />
          <Route path='/Home/Lab_Master' element={<LabMaster />} />

          <Route path='/Home/Medicine_rack_Master' element={<Medicine_rack_Master />} />
          <Route path='/Home/Productmaster' element={<Productmaster />} />
          <Route path='/Home/Productcategory' element={<Productcategory />} />
          <Route path='/Home/ProductMasterList' element={<ProductMasterList />} />
          <Route path='/Home/MedicalStockInsertmaster' element={<MedicalStockInsertmaster />} />

          <Route path='/Home/SupplierMaster' element={<SupplierMaster />} />
          <Route path='/Home/SupplierMasterList' element={<SupplierMasterList />} />

          <Route path='/Home/TrayManagement' element={<TrayManagement />} />
          <Route path='/Home/TrayManagementList' element={<TrayManagementList />} />

          <Route path='/Home/PurchaseOrder' element={<PurchaseOrder/>} />
          <Route path='/Home/PurchaseOrderList' element={<PurchaseOrderList/>} />

          <Route path='/Home/GoodsReceiptNote' element={<GoodsReceiptNote/>} />


          <Route path='/Home/Surgery_Master' element={<SurgeryMaster/>}/>
          <Route path='/Home/apprenewal' element={<Apprenewal/>}/>


          {/* ------------Master - Consent form master----------- */}

          <Route path='/Home/ConsentFormsMaster' element={<ConsentFormsMaster />} />

          {/* ---------------Duty rouster masters------------ */}
          <Route path='/Home/DutyRousterMaster' element={<DutyRousterMaster/>} />
          <Route path="/Home/FrequencyMaster" element={<FrequencyMaster />} />

          {/* ------------FrontOffice----------- */}
          {/* ------------Registration----------- */}
          <Route path="/Home/Registration" element={<Newregistration />} />
          <Route path="/Home/EmgRegistration" element={<EmgRegistration />} />
          <Route path="/Home/RegistrationList" element={<RegistrationList />} />
          <Route path="/Home/AppointmentRequestList" element={< AppointmentRequestList />} />

          <Route path="/Home/Iprequestlist" element={<Iprequestlist />} />
          <Route path="/Home/IpHandoverQue" element={<IpHandoverQue />} />
          <Route path="/Home/IpHandoverWorkbench" element={<IpHandoverWorkbench />} />
          <Route path="/Home/Opdqueue" element={<Opdqueue />} />

          <Route path="GeneralBillingList" element={<GeneralBillingList />} />
          <Route path="GeneralBilling" element={<GeneralBilling />} />


          <Route path="OPPharmachyBillingList" element={<PharmacyBillingLIst />} />
          <Route path="OPPharmachyBilling" element={<PharmacyBilling />} />
          <Route path="OPPharmachyWalkinBilling" element={<Walkinbilling />} />
          <Route path="IPPharmacyBillingList" element={<IPPharmacyBillingList />}/>
          <Route path="IPBilling" element={<IPBilling />}/>
          <Route path="IPBillingList" element={<IPBillingList />}/>


          {/* ------------Doctor Workbench----------- */}
          <Route path="/Home/WorkbenchQuelist" element={<WorkbenchQuelist />} />
          <Route path="/Home/DoctorWorkbenchNavigation" element={<DoctorWorkbenchNavigation />} />
          <Route path="/Home/LabTest" element={<LabTest />} />
          <Route path="/Home/RadiologyTest" element={<RadiologyTest />} />
          <Route path="Doctor-Dashboard" element={<DoctorDashboard />} />

          {/* ------------ IP Doctor Workbench----------- */}

          <Route path="IP_WorkbenchQuelist" element={<IP_WorkbenchQuelist />} />
          <Route path="IP_DoctorWorkbenchNavigation" element={<IP_DoctorWorkbenchNavigation />} />
          <Route path="IP_NurseQueslist" element={<IP_NurseQueslist />} />
          <Route path="IP_BillingEntryQuelist" element={<IP_BillingEntryQuelist />} />
          <Route path="IP_BillingEntry" element={<IP_BillingEntry />} />
          <Route path="IP_NurseWorkbenchNavigation" element={<IP_NurseWorkbenchNavigation />} />
          
          {/* ------------ Casuality Doctor Workbench----------- */}
          
          <Route path="CasualityDocQuelist" element={<CasualityDocQuelist />} />
          <Route path="CasualityNurseQuelist" element={<CasualityNurseQuelist />} />
          
          
          
          
          {/* ------------ICU Management ----------- */}



          <Route path="/Home/ICU_Mlc" element={<ICU_Mlc />} />
          <Route path="/Home/ICU_Assesment" element={<ICU_Assesment />} />
          <Route path="/Home/PreOperativeChecklistForm2" element={<PreOperativeChecklistForm2 />} />
          <Route path="/Home/PreOperativeChecklistForm" element={<PreOperativeChecklistForm />} />
          <Route path="/Home/PreOperativeIns" element={<PreOperativeIns />} />
          <Route path="/Home/WardPreOpChkList" element={<WardPreOpChkList />} />
          <Route path="/Home/Dama" element={<Dama />} />


          {/* ------------Lenin Management ----------- */}

          <Route path="/Home/LeninMaster" element={<LeninMaster />} />
          <Route path="/Home/Lenin_DeptWise_MinMax" element={<Lenin_DeptWise_MinMax />} />
          <Route path="/Home/Lenin_Stock" element={<Lenin_Stock />} />


          {/* ------------Doctor Workbench----------- */}
          <Route path="/Home/WorkbenchQuelist" element={<WorkbenchQuelist />} />
          <Route path="/Home/DoctorWorkbenchNavigation" element={<DoctorWorkbenchNavigation />} />
          <Route path="/Home/LabTest" element={<LabTest />} />
          <Route path="/Home/RadiologyTest" element={<RadiologyTest />} />
          {/* <Route path="Doctor-Dashboard" element={<DoctorDashboard/>} /> */}



          {/* --------------------------lab------------------ */}
          <Route path="/Home/LabQuelist" element={<LabQueuelist />} />
           <Route path="/Home/LabRequest" element={<LabRequest/>} />
           <Route path="/Home/Labvalue" element={<Labvalue/>} />
          <Route path="/Home/LabCompleted" element={<LabCompletedlist/>} />



          {/* ------------ IP Discharge Request----------- */}
                    
                    
          <Route path="IP_LabDischargeQueslist" element={<IP_LabDischargeQueslist />} />
          <Route path="IP_RadiologyDischargeQueslist" element={<IP_RadiologyDischargeQueslist />} />
          <Route path="IP_BillingDischargeQueslist" element={<IP_BillingDischargeQueslist/>}/>



 {/* OT_Management */}     
          {/* <Route path="OT_Room_Master" element={<OtRoomMaster />}/> */}
          {/* <Route path="OT-Management"element={<OtRequest />}/>
          <Route path="/Home/OT_Queue_List"element={<OtQuelist />}/>

          <Route path="/Home/OT_Queue_List"element={<OtConsentForm />}/>

          <Route path="/Home/Doctor_OueueList"element={<OtDoctorQueueList />}/>
          <Route path="/Home/OT_Doctor"element={<OtDoctorNavigation />}/>
          <Route path="/Home/OT_Queue_List"element={<OtDoctorPre />}/>

          <Route path="/Home/OT_Queue_List"element={<OtNursePre />}/>
          <Route path="/Home/Nurse_OueueList"element={<OtNurseQueList />}/>
          <Route path="/Home/OT_Nurse"element={<OtNurseeNavigation />}/>
       

          <Route path="/Home/OT_Queue_List"element={<OtAnaesthesiaPre />}/>
          <Route path="/Home/Anaesthesia_OueueList"element={<OtAnaesthesiaQueueList />}/>
          <Route path="/Home/OT_Anaesthesia"element={<OtAnaesthesiaNavigation />}/>
          <Route path="/Home/OT_Queue_List"element={<OTAanaesthesiaCapture />}/>
         */}


        <Route path="/Home/RadiologyQuelist" element={<RadiologyQueList />} />
        <Route path="/Home/RadiologyReportEntry" element={<RadiologyReportEntry />} />


              {/* --------------------------Radiology----------------- */}
              <Route path="/Home/RadiologyQuelist" element={<RadiologyQueList />} />
          {/* --------------------------MIS REPORT------------------ */}
          <Route path="/Home/Mis_Navigation" element={<Mis_Navigation />} />


              {/* --------------------------HR management----------------- */}
              <Route path="/Home/EmployeeRegister" element={<EmployeeRegister />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path='/' element={<LoginPage />} />
        {/* NotFound */}
        <Route path="*" element={<NotFound />} />


        <Route path="/Home/Privacy-Policy" element={<PrivacyPolicy />} />
        <Route path="/Home/Terms-of-Use" element={<TermsOfUse />} />


      </Routes>
    </div>
  )
}

export default App;