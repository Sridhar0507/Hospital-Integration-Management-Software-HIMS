import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./Homepage.css";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer/Footer";
import NewHeader from "./Header/NewHeader";

const HomePage = () => {
  // Get the sidebar toggle state from Redux
  const [openpreview, setopenpreview] = useState(false);

  const SidebarToggle = useSelector((state) => state.userRecord?.SidebarToggle);
  const dispatchvalue= useDispatch()

 useEffect(() => {
    if (SidebarToggle) {
      setopenpreview(true);
    } else {
      setopenpreview(false);
    }
  }, [SidebarToggle]);

  const handleclosesidebar = () => {
    if (SidebarToggle) {
      dispatchvalue({ type: 'SidebarToggle', value: false });
    }
  };


  return (
    <>
      <NewHeader />

      <div className="app_Sub_container">
        {/* Sidebar */}
        <div className={`sidebar ${SidebarToggle ? "expanded" : "collapsed"}`}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="Main_container_content" onClick={handleclosesidebar}>
          <Outlet />
          {openpreview && (
                <div
                    className={
                      SidebarToggle ? "sideopen_showcamera_profile ecfew334" : "showcamera_profile ecfew334_00"
                    }
                    onClick={() => { setopenpreview(false) }}
                >
                   
                </div>
)}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HomePage;
