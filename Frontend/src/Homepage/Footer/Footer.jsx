import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Footer() {
  const navigate = useNavigate();
  const dispatchvalue = useDispatch();

  const handlePrivacyPolicy = () => {
    navigate("/Home/Privacy-Policy");
  };

  const handleTermsOfUse = () => {
    navigate("/Home/Terms-of-Use");
  };

  const handleclosesidebar=()=>{
    dispatchvalue({type:'SidebarToggle',value:false})
  }

  return (
    <footer className="footer" onClick={handleclosesidebar}>
      <div className="footer-content">
        <div className="powered-by">
          Powered by{" "}
          <a
            href="https://www.vesoftometic.com"
            className="blossom-logo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vesoft
          </a>
        </div>

        <div className="footer-links">
          <div onClick={handlePrivacyPolicy}>Privacy Policy</div> |
          <div className="termsofuseclr" onClick={handleTermsOfUse}>
            Terms of Use
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
