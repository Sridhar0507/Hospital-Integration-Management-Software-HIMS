import React, { useEffect, useState } from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import Doctr from  '../../imgs/Doctr.jpg';
import Patnt from '../../imgs/Patnt.png'
import "../MainDash/MainDash.css";
import { useSelector } from "react-redux";
import Allergy from '../../imgs/Allergy.png';





const MainDash = () => {
  const isSidebarOpen = useSelector((state) => state.userRecord?.isSidebarOpen);


  const [openModal, setOpenModal] = useState(false);
  const handleEditClick = (params) => {
    setOpenModal(true);
  };

  return (
    <div className="MainDash">
      <h2>Dashboard</h2>

      <div className="profle_chryu_hd">
        <div className="profle_chryu_hd_111 mkk_p09">
          <img src={Doctr} alt="Profile" />

          <div className="iwjidwi9_p">
            <span>Prof. Dr. Gopal Raama Chandru</span>
            <span>OBSTETRICS AND GYNAECOLGY</span>
          </div>
        </div>

        <div className="profle_chryu_hd_111 profle_chryu_hd_222">
          <div className="jjnni_o2w">
            <img src={Patnt} alt="Profile" />
            <div className="mlo_092w_hesd">
              <div className="mlo_092w">
                <h4>
                  <span>20009992</span>- <span> BalaSubramaniyam </span>
                </h4>
                <h6>vadapalani ,4th street , chennai 600028</h6>
              </div>

              <div className="jnmiu_ii2">
                <div>
                  <div className="jnmiu_ii2_po">
                    <span>11/08/2001</span>
                    <span>22 Year(s)</span>
                    <span>9876543210</span>
                    <span>Male</span>
                    <span>Primary Dr</span>
                    <span>Blood Group</span>
                  </div>
                  </div>
                 
              </div>
            </div>
          </div>

          <div className="jhidusch_90">
            <button onClick={handleEditClick}> Allergy</button>

            {openModal && (
        <div
          className={
            isSidebarOpen ? "sideopen_showcamera_profile_chirayu" : "showcamera_profile_chirayu"
          }
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <div
            className="neww_chirayu"
            onClick={(e) => e.stopPropagation()}
            // style={{ backgroundImage: `url(${Allergy})`}}
          >
            <button className="modal-close-btnSS" onClick={() => setOpenModal(false)}>
      &times; {/* This is the "X" icon */}
    </button>
            <div className="judscy_uj11">
             
       
    <div className="wwdsdlm_o">
         Skin allergies occur when the skin reacts to an allergen, causing irritation, redness, itching, or swelling. This type of allergy can be triggered by various substances, including foods, plants, chemicals, or even the environment. 
         </div>
         </div>
           </div>
           </div>
             )}


            <div className="jjxss_07">
              <h4>
                Flagging<span>:</span>
              </h4>
              <h4
                style={{
                  width: "30px",
                  height: "20px",
                  backgroundColor: "green",
                }}
              ></h4>
            </div>

          </div>
        </div>
      </div>

      <br />

      <Cards />

      {/* <Table /> */}
    </div>
  );

};

export default MainDash;


