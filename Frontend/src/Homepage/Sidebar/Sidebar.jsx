import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faStethoscope, faUserDoctor, faVialVirus, faFileZipper, faPersonWalkingArrowRight, faFlask, faRightFromBracket, faAngleDown, faSuitcaseMedical, faUserNinja, faPersonShelter, faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import axios from "axios";

const Sidebar = () => {
  const SidebarToggle = useSelector((state) => state.userRecord?.SidebarToggle);
  const UrlLink = useSelector(state => state.userRecord?.UrlLink);
  const  Usersessionid= useSelector((state) => state.userRecord?.Usersessionid);
  const UserData = useSelector((state) => state.userRecord?.UserData);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const navigate = useNavigate();
  const dispatchvalue = useDispatch()

  useEffect(() => {
    if (!SidebarToggle) {
      setOpenSubMenu(null); // Close all submenus when sidebar collapses
    }
  }, [SidebarToggle]);


  const handleSubMenuClick = (menu) => {
    if (SidebarToggle) {
      setOpenSubMenu(openSubMenu === menu ? null : menu);
    }
  };

  const handleLogoutClick = () => {
    const headers = {
      'Apikey': UserData.api_key,  // Use the actual API key from user data
      'Apipassword': UserData.api_password,  // Use the actual API password from user data
      'Sessionid': Usersessionid.session_id  // Use the actual session ID you want to pass
    };
    console.log(headers,"headers")
    axios.post(`${UrlLink}Masters/update_session`, {sessionid:Usersessionid.session_id}, { headers:{...headers} })
      .then(response => {
        console.log(response.data.message);
  
        // On successful logout, navigate to the login page and clear local storage
        navigate('/');
        localStorage.clear();
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  };


  const handlenavigateclick = (navval) => {
    navigate(`/Home/${navval}`);
    dispatchvalue({ type: 'SidebarToggle', value: false })
    dispatchvalue({ type: 'Registeredit', value: {} });
    dispatchvalue({ type: 'PurchaseOrderList', value: {} })

  };

  const handleIconClick = () => {
    if (!SidebarToggle) {
      dispatchvalue({ type: 'SidebarToggle', value: true });
    }
  };


  return (
    <div
      className={`Sidebar_container_con ${SidebarToggle ? "expanded" : "collapsed"}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Clinic Metrics */}
      <ul className="Sidebarmenuhover" onClick={() => handleSubMenuClick("subsidebarmenu1")}>
        <li onClick={handleIconClick} className="icon_tooltip">
          <FontAwesomeIcon icon={faStethoscope} className="inventory_sidebar_icon" />
          <span className="icon-name" onClick={() => handlenavigateclick('DashBoardDetails')}>Dash Board</span>
        </li>
      </ul>

      {/* Front Office */}
      <ul className="Sidebarmenuhover" onClick={() => handleSubMenuClick("subsidebarmenu2")}>
        <li onClick={handleIconClick} className={`icon_tooltip ${openSubMenu === "subsidebarmenu2" ? "active_act" : ""}`}>
          <FontAwesomeIcon icon={faUsers} className="inventory_sidebar_icon" />
          <span className="icon-name">Front Office</span>
          <FontAwesomeIcon icon={faAngleDown} className={`arrow-icon ${openSubMenu === "subsidebarmenu2" ? "arrow-rotate" : ""}`} />
        </li>
        {openSubMenu === "subsidebarmenu2" && (
          <ul className={`subSidebarmenuhover ${openSubMenu === "subsidebarmenu2" ? "show" : ""}`}>
            <li onClick={() => handlenavigateclick('Registration')}>
              <span className="icon-name">Registration</span>
            </li>
            <li onClick={() => handlenavigateclick('EmgRegistration')}>
              <span className="icon-name">EmgRegistration</span>
            </li>
            <li onClick={() => handlenavigateclick('RegistrationList')}>
              <span className="icon-name">Patient Register List</span>
            </li>
            <li onClick={() => handlenavigateclick("AppointmentRequestList")}>
              <span className="icon-name">Appointment Request List</span>
            </li>
            <li onClick={() => handlenavigateclick("Room_Management")}>
              <span className="icon-name">Room Management</span>
            </li>
            <li onClick={() => handlenavigateclick("Iprequestlist")}>
              <span className="icon-name">Ip Request List</span>
            </li>
            <li onClick={() => handlenavigateclick("IpHandoverQue")}>
              <span className="icon-name">Ip Handover List</span>
            </li>
            <li onClick={() => handlenavigateclick("GeneralBillingList")}>
              <span className="icon-name">General Billing</span>
            </li>

            <li onClick={() => handlenavigateclick("OPPharmachyBillingList")}>
              <span className="icon-name">OP Pharmachy Billing</span>
            </li>
            <li onClick={() => handlenavigateclick("IPPharmacyBillingList")}>
              <span className="icon-name">IP Pharmacy Billing</span>
            </li>
            <li onClick={() => handlenavigateclick("IPBillingList")}>
              <span className="icon-name">IP Billing</span>
            </li>
            <li onClick={() => handlenavigateclick("Opdqueue")}>
              <span className="icon-name">OPD Queue List</span>
            </li>
          </ul>
        )}
      </ul>

      {/* Doctor workbench */}
      <ul className="Sidebarmenuhover" onClick={() => handleSubMenuClick("subsidebarmenu7")}>
        <li onClick={handleIconClick} className={`icon_tooltip ${openSubMenu === "subsidebarmenu7" ? "active_act" : ""}`}>
          <FontAwesomeIcon icon={faUserDoctor} className="inventory_sidebar_icon" />
          <span className="icon-name">Doctor WorkBench</span>
          <FontAwesomeIcon icon={faAngleDown} className={`arrow-icon ${openSubMenu === "subsidebarmenu7" ? "arrow-rotate" : ""}`} />
        </li>
        {openSubMenu === "subsidebarmenu7" && (
          <ul className={`subSidebarmenuhover ${openSubMenu === "subsidebarmenu7" ? "show" : ""}`}>
            <li onClick={() => handlenavigateclick("WorkbenchQuelist")}>
              <span className="icon-name">OP QueList</span>
            </li>
            <li onClick={() => handlenavigateclick("IP_WorkbenchQuelist")}>
              <span className="icon-name"> IP QueList</span>
            </li>
            {/* <li onClick={() => handlenavigateclick("CasualityDocQuelist")}>
              <span className="icon-name"> Casuality QueList</span>
            </li> */}
            {/* <li onClick={() => handlenavigateclick("EmgRegistration")}>
              <span className="icon-name">EmgRegistration</span>
            </li>
            <li onClick={() => handlenavigateclick("RegistrationList")}>
              <span className="icon-name">Patient Register List</span>
            </li>
            <li onClick={() => handlenavigateclick("AppointmentRequestList")}>
              <span className="icon-name">Appointment Request List</span>
            </li> */}
          </ul>
        )}
      </ul>

      {/*IP Nurse Workbench */}
      <ul className="Sidebarmenuhover" onClick={() => handleSubMenuClick("subsidebarmenu10")}>
        <li onClick={handleIconClick} className={`icon_tooltip ${openSubMenu === "subsidebarmenu10" ? "active_act" : ""}`}>
          <FontAwesomeIcon icon={faPersonWalkingArrowRight} className="inventory_sidebar_icon" />
          <span className="icon-name">Nurse WorkBench</span>
          <FontAwesomeIcon icon={faAngleDown} className={`arrow-icon ${openSubMenu === "subsidebarmenu10" ? "arrow-rotate" : ""}`} />
        </li>
        {openSubMenu === "subsidebarmenu10" && (
          <ul className={`subSidebarmenuhover ${openSubMenu === "subsidebarmenu10" ? "show" : ""}`}>

            <li onClick={() => handlenavigateclick("IP_NurseQueslist")}>
              <span className="icon-name">  IP Que List</span>
            </li>
            <li onClick={() => handlenavigateclick("IP_BillingEntryQuelist")}>
              <span className="icon-name">  IP Bill Entry</span>
            </li>
            {/* <li onClick={() => handlenavigateclick("CasualityNurseQuelist")}>
              <span className="icon-name">  Casuality QueList</span>
            </li> */}

          </ul>
        )}
      </ul>

            {/* Discharge Request */}

            <ul className="Sidebarmenuhover" onClick={() => handleSubMenuClick("subsidebarmenu13")}>
              <li className={`icon_tooltip ${openSubMenu === "subsidebarmenu13" ? "active_act" : ""}`}>
                <FontAwesomeIcon icon={faVialVirus} className="inventory_sidebar_icon" />
                <span className="icon-name">Discharge Request</span>
                <FontAwesomeIcon icon={faAngleDown} className={`arrow-icon ${openSubMenu === "subsidebarmenu13" ? "arrow-rotate" : ""}`} />
              </li>
              {openSubMenu === "subsidebarmenu13" && (
                <ul className={`subSidebarmenuhover ${openSubMenu === "subsidebarmenu13" ? "show" : ""}`}>

                  <li onClick={() => handlenavigateclick("IP_LabDischargeQueslist")}>
                    <span className="icon-name">  Lab Discharge</span>
                  </li>
                  <li onClick={() => handlenavigateclick("IP_RadiologyDischargeQueslist")}>
                    <span className="icon-name">  Radiology Discharge</span>
                  </li>
                  <li onClick={() => handlenavigateclick("IP_BillingDischargeQueslist")}>
                    <span className="icon-name">  Billing Discharge</span>
                  </li>

                </ul>
              )}
            </ul>

      {/* Masters */}
      <ul className="Sidebarmenuhover" onClick={() => handleSubMenuClick("subsidebarmenu3")}>
        <li onClick={handleIconClick} className={`icon_tooltip ${openSubMenu === "subsidebarmenu3" ? "active_act" : ""}`}>
          <FontAwesomeIcon icon={faSuitcaseMedical} className="inventory_sidebar_icon" />
          <span className="icon-name">Masters</span>
          <FontAwesomeIcon icon={faAngleDown} className={`arrow-icon ${openSubMenu === "subsidebarmenu3" ? "arrow-rotate" : ""}`} />
        </li>
        {openSubMenu === "subsidebarmenu3" && (
          <ul className={`subSidebarmenuhover ${openSubMenu === "subsidebarmenu3" ? "show" : ""}`}>
            <li
              onClick={() => {
                handlenavigateclick("Hospital_detials");
              }}
            >
              <span className="icon-name">Hospital/clinic Master</span>
            </li>
            <li
              onClick={() => {
                handlenavigateclick("DutyRousterMaster");
              }}
            >
              <span className="icon-name">Duty Rouster Master</span>
            </li>
            <li
              onClick={() => {
                handlenavigateclick("ConsentFormsMaster");
              }}
            >
              <span className="icon-name">ConsentForms Master</span>
            </li>

            <li
              onClick={() => {
                handlenavigateclick("Room_Master");
              }}
            >
              <span className="icon-name">Room Master</span>
            </li>
            <li
              onClick={() => {
                handlenavigateclick("ReferalRoute_Master");
              }}
            >
              <span className="icon-name">Refferal Route Master</span>
            </li>
            <li
              onClick={() => {
                handlenavigateclick("DoctorList");
              }}
            >
              <span className="icon-name">Doctor Master</span>
            </li>
            <li
              onClick={() => {
                handlenavigateclick("Basic_Master");
              }}
            >
              <span className="icon-name">Basic Master</span>
            </li>
            <li
              onClick={() => {
                handlenavigateclick("UserRegisterList");
              }}
            >
              <span className="icon-name">User List</span>
            </li>

            <li
              onClick={() => {
                handlenavigateclick("InsClientDonationList");
              }}
            >
              <span className="icon-name">Insurance / Client / Donation  </span>
            </li>
            <li
              onClick={() => {
                handlenavigateclick("ServiceProcedureMasterList");
              }}
            >
              <span className="icon-name">Service / Procedure  </span>
            </li>
            <li
              onClick={() => {
                handlenavigateclick("Radiology_Master");
              }}
            >
              <span className="icon-name">Radiology Master</span>
            </li>
            <li
              onClick={() => {
                handlenavigateclick("Lab_Master");
              }}
            >
              <span className="icon-name">Lab Master</span>
            </li>
            <li
              onClick={() => {
                handlenavigateclick("Surgery_Master");
              }}
            >
              <span className="icon-name">Surgery Master</span>
            </li>
            <li
              onClick={() => {
                handlenavigateclick("FrequencyMaster");
              }}
            >
              <span className="icon-name">Frequency Master</span>
            </li>
            <li
              onClick={() => {
                handlenavigateclick("apprenewal");
              }}
            >
              <span className="icon-name">Software Renewal</span>
            </li>
          </ul>
        )}
      </ul>


      <ul className="Sidebarmenuhover" onClick={() => handleSubMenuClick("subsidebarmenu4")}>
        <li onClick={handleIconClick} className={`icon_tooltip ${openSubMenu === "subsidebarmenu4" ? "active_act" : ""}`}>
          <FontAwesomeIcon icon={faSuitcaseMedical} className="inventory_sidebar_icon" />
          <span className="icon-name">Inventory Masters</span>
          <FontAwesomeIcon icon={faAngleDown} className={`arrow-icon ${openSubMenu === "subsidebarmenu4" ? "arrow-rotate" : ""}`} />
        </li>
        {openSubMenu === "subsidebarmenu4" && (
          <ul className={`subSidebarmenuhover ${openSubMenu === "subsidebarmenu4" ? "show" : ""}`}>


            <li onClick={() => { handlenavigateclick("Medicine_rack_Master") }}>
              <span className="icon-name">Medicine Rack Master</span>
            </li>
            <li onClick={() => { handlenavigateclick("Productcategory") }}>
              <span className="icon-name">Category & Drug Group </span>
            </li>
            <li onClick={() => { handlenavigateclick("ProductMasterList") }}>
              <span className="icon-name">Product Master</span>
            </li>

            <li onClick={() => { handlenavigateclick("MedicalStockInsertmaster") }}>
              <span className="icon-name">Medical Stock</span>
            </li>

            <li onClick={() => { handlenavigateclick("TrayManagementList") }}>
              <span className="icon-name">Tray Management</span>
            </li>
            <li onClick={() => { handlenavigateclick("SupplierMasterList") }}>
              <span className="icon-name">Supplier Master</span>
            </li>
            <li onClick={() => { handlenavigateclick("PurchaseOrder") }}>
              <span className="icon-name">Purchase Order</span>
            </li>
            <li onClick={() => { handlenavigateclick("PurchaseOrderList") }}>
              <span className="icon-name">Purchase Order Lists</span>
            </li>


          </ul>
        )}
      </ul>



      {/* MIS Reports */}
      <ul className="Sidebarmenuhover" onClick={() => handleSubMenuClick("subsidebarmenu8")}>
        <li className={`icon_tooltip ${openSubMenu === "subsidebarmenu8" ? "active_act" : ""}`}>
          <FontAwesomeIcon icon={faFileZipper} className="inventory_sidebar_icon" />
          <span className="icon-name">MIS Reports</span>
          <FontAwesomeIcon icon={faAngleDown} className={`arrow-icon ${openSubMenu === "subsidebarmenu8" ? "arrow-rotate" : ""}`} />
        </li>
        {openSubMenu === "subsidebarmenu8" && (
          <ul className={`subSidebarmenuhover ${openSubMenu === "subsidebarmenu8" ? "show" : ""}`}>
            <li onClick={() => { handlenavigateclick("Mis_Navigation") }}>
              <span className="icon-name">OPD Reception</span>
            </li>

          </ul>
        )}
      </ul>



      {/* ICU Management */}
      {/* <ul className="Sidebarmenuhover" onClick={() => handleSubMenuClick("subsidebarmenu4")}>
        <li onClick={handleIconClick} className={`icon_tooltip ${openSubMenu === "subsidebarmenu4" ? "active_act" : ""}`}>
          <FontAwesomeIcon icon={faPersonShelter} className="inventory_sidebar_icon" />
          <span className="icon-name">ICU Management</span>
          <FontAwesomeIcon icon={faAngleDown} className={`arrow-icon ${openSubMenu === "subsidebarmenu4" ? "arrow-rotate" : ""}`} />
        </li>
        {openSubMenu === "subsidebarmenu4" && (
          <ul className={`subSidebarmenuhover ${openSubMenu === "subsidebarmenu4" ? "show" : ""}`}>
            <li onClick={() => { handlenavigateclick("ICU_Mlc") }}>
              <span className="icon-name">ICU_Mlc</span>
            </li>

            <li onClick={() => { handlenavigateclick("ICU_Assesment") }}>
              <span className="icon-name">ICU_Assesment</span>
            </li>

            <li onClick={() => { handlenavigateclick("PreOperativeChecklistForm2") }}>
              <span className="icon-name">PreOperativeChecklistForm2</span>
            </li>
            <li onClick={() => { handlenavigateclick("PreOperativeChecklistForm") }}>
              <span className="icon-name">PreOperativeChecklistForm</span>
            </li>
            <li onClick={() => { handlenavigateclick("PreOperativeIns") }}>
              <span className="icon-name">PreOperativeIns</span>
            </li>
            <li onClick={() => { handlenavigateclick("Dama") }}>
              <span className="icon-name">Dama</span>
            </li>

           
          </ul>
        )}
      </ul> */}



      {/* Lenin */}
      <ul className="Sidebarmenuhover" onClick={() => handleSubMenuClick("subsidebarmenu5")}>
        <li onClick={handleIconClick} className={`icon_tooltip ${openSubMenu === "subsidebarmenu5" ? "active_act" : ""}`}>
          <FontAwesomeIcon icon={faUserNinja} className="inventory_sidebar_icon" />
          <span className="icon-name">Lenin</span>
          <FontAwesomeIcon icon={faAngleDown} className={`arrow-icon ${openSubMenu === "subsidebarmenu5" ? "arrow-rotate" : ""}`} />
        </li>
        {openSubMenu === "subsidebarmenu5" && (
          <ul className={`subSidebarmenuhover ${openSubMenu === "subsidebarmenu5" ? "show" : ""}`}>
            <li onClick={() => { handlenavigateclick("LeninMaster") }}>
              <span className="icon-name">LeninMaster</span>
            </li>
            <li onClick={() => { handlenavigateclick("Lenin_DeptWise_MinMax") }}>
              <span className="icon-name">Lenin Dept Wise Min Max</span>
            </li>
            <li onClick={() => { handlenavigateclick("Lenin_Stock") }}>
              <span className="icon-name">Lenin Stock</span>
            </li>
          </ul>
        )}
      </ul>



      {/* OT Management */}
      {/* <ul className="Sidebarmenuhover" onClick={() => handleSubMenuClick("subsidebarmenu6")}>
        <li onClick={handleIconClick} className={`icon_tooltip ${openSubMenu === "subsidebarmenu6" ? "active_act" : ""}`}>
          <FontAwesomeIcon icon={faHeartPulse} className="inventory_sidebar_icon" />
          <span className="icon-name">OT Management</span>
          <FontAwesomeIcon icon={faAngleDown} className={`arrow-icon ${openSubMenu === "subsidebarmenu6" ? "arrow-rotate" : ""}`} />
        </li>
        {openSubMenu === "subsidebarmenu6" && (
          <ul className={`subSidebarmenuhover ${openSubMenu === "subsidebarmenu6" ? "show" : ""}`}>
            <li onClick={() => handlenavigateclick("Theatre_Booking")}>
            <span className="icon-name" >Theatre Booking</span>
            </li>

            <li onClick={() => handlenavigateclick("OT_Queue_List")}>
            <span className="icon-name" >OT Queue List </span>           
             </li>

            <li onClick={() => handlenavigateclick("Doctor_OueueList")}>
            <span className="icon-name" >Doctor OueueList </span>       
              </li>

            <li onClick={() => handlenavigateclick("OT_Doctor")}>
            <span className="icon-name" >OT Doctor </span>
                        </li>

            <li onClick={() => handlenavigateclick("Anaesthesia_OueueList")}>
            <span className="icon-name" >Anaesthesia OueueList </span>           
             </li>

            <li onClick={() => handlenavigateclick("OT_Anaesthesia")}>
            <span className="icon-name" >OT Anaesthesia </span>          
              </li>

              <li onClick={() => handlenavigateclick("Nurse_OueueList")}>
              <span className="icon-name" > Nurse OueueList </span>         
              </li>

              <li onClick={() => handlenavigateclick("OT_Nurse")}>
              <span className="icon-name" >OT Nurse </span>         
              </li>

              <li onClick={() => handlenavigateclick("OT_Biomedical")}>
              <span className="icon-name" >Ot Biomedical </span>        
              </li>

          </ul>
        )}
      </ul> */}




      {/* LAB Queue  */}


      <ul className="Sidebarmenuhover" onClick={() => handleSubMenuClick("subsidebarmenu11")}>
        <li className={`icon_tooltip ${openSubMenu === "subsidebarmenu11" ? "active_act" : ""}`}>
          <FontAwesomeIcon icon={faFlask} className="inventory_sidebar_icon" />
          <span className="icon-name">Lab</span>
          <FontAwesomeIcon icon={faAngleDown} className={`arrow-icon ${openSubMenu === "subsidebarmenu11" ? "arrow-rotate" : ""}`} />
        </li>
        {openSubMenu === "subsidebarmenu11" && (
          <ul className={`subSidebarmenuhover ${openSubMenu === "subsidebarmenu11" ? "show" : ""}`}>

            <li onClick={() => handlenavigateclick("LabQuelist")}>
              <span className="icon-name">Lab QueueList</span>
            </li>
            {/* <li onClick={() => handlenavigateclick("LabQuelist")}>
              <span className="icon-name">Lab Request List</span>
            </li> */}
                  {/* <li onClick={() => handlenavigateclick("LabQuelist")}>
              <span className="icon-name">Lab QueueList</span>
            </li> */}
            <li onClick={() => handlenavigateclick("LabCompleted")}>
              <span className="icon-name">Lab Completed List</span>
            </li>

          </ul>
        )}
      </ul>



      {/* RadiologyQueue */}

      <ul className="Sidebarmenuhover" onClick={() => handleSubMenuClick("subsidebarmenu9")}>
        <li className={`icon_tooltip ${openSubMenu === "subsidebarmenu9" ? "active_act" : ""}`}>
          <FontAwesomeIcon icon={faVialVirus} className="inventory_sidebar_icon" />
          <span className="icon-name">Radiology</span>
          <FontAwesomeIcon icon={faAngleDown} className={`arrow-icon ${openSubMenu === "subsidebarmenu9" ? "arrow-rotate" : ""}`} />
        </li>
        {openSubMenu === "subsidebarmenu9" && (
          <ul className={`subSidebarmenuhover ${openSubMenu === "subsidebarmenu9" ? "show" : ""}`}>

            <li onClick={() => handlenavigateclick("RadiologyQuelist")}>
              <span className="icon-name">Radiology QueueList</span>
            </li>


          </ul>
        )}
      </ul>


      {/* LogOut */}
      <ul className="Sidebarmenuhover" onClick={handleLogoutClick}>
        <li onClick={handleIconClick} className="icon_tooltip">
          <FontAwesomeIcon icon={faRightFromBracket} className="inventory_sidebar_icon" />
          <span className="icon-name">LogOut</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
