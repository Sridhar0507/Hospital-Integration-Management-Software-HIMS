import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { FaLocationDot } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "../../Assets/profileimg.jpeg";
import "./Header.css";
import axios from "axios";

const NewHeader = () => {
  const navigate = useNavigate();
  const dispatchvalue = useDispatch();
  const location = useLocation();
  const UserData = useSelector((state) => state.userRecord?.UserData);
  const Usersessionid = useSelector((state) => state.userRecord?.Usersessionid);
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const ClinicDetails = useSelector((state) => state.userRecord?.ClinicDetails);
  const [Locationoptions, setLocationOptions] = useState([]);
  const SidebarToggle = useSelector((state) => state.userRecord?.SidebarToggle);

  const handleToggleClick = () => {
    dispatchvalue({ type: "SidebarToggle", value: !SidebarToggle });
  };

  useEffect(() => {
    if (UserData?.username?.trim()) {
      axios
        .get(
          `${UrlLink}Masters/get_Location_data_for_login?username=${UserData?.username}`, {
          headers: {          
              'Apikey': '11b8e78a-77f7-4a11-bf8e-48c783214ded',
              'Apipassword': 'v7!yePC1KZX>r#4.=RPC'
          }
        }
        )
        .then((response) => {
          const data = response.data;
          
          if (Array.isArray(data)) {
            setLocationOptions(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching Location options:", error);
          setLocationOptions([]); // Reset Location options in case of error
        });
    }
  }, [UserData?.username, UrlLink]);

  const [Locationget, setLocationget] = useState("");

  useEffect(() => {
    setLocationget(UserData?.location);
  }, [UserData?.location]);

  const handleLocationChange = (locval) => {
    const locid = parseInt(locval);
    setLocationget(locid);
    const data = { ...UserData, location: locid };
    axios
      .post(`${UrlLink}Masters/location_Change`, data, {
        headers: {
          'Apikey': UserData.api_key,
          'Apipassword': UserData.api_password,
          'Sessionid': Usersessionid.session_id
        }
      })
      .then((response) => {
        const resdata = response.data.token;
        localStorage.setItem("Chrrtoken", resdata);
        const storedToken = localStorage.getItem("Chrrtoken");
        if (storedToken) {
          const decodedToken = (token) => {
            const payloadBase64 = token.split(".")[1];
            const decodedPayload = atob(payloadBase64);
            return JSON.parse(decodedPayload);
          };
          const decodedTokenData = decodedToken(storedToken);

          dispatchvalue({ type: "UserData", value: decodedTokenData });
        } else {
          if (location.pathname !== "/") {
            navigate("/");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <div className="Header_comp">
      <div className="menu-link-wrapper" onClick={handleToggleClick}>
        <IconButton
          color="inherit"
          className={`menu-link ${SidebarToggle ? 'menu-trigger-open' : ''}`}
        >
          <div className="menu-link-wrapper">
            <div className={`menu-link ${SidebarToggle ? 'menu-trigger-open' : ''}`}>
              <span className="lines"></span>
            </div>
          </div>
        </IconButton>
      </div>

      {/* <div className="menu-link-wrapper" onClick={handleClick}>
          <div className={`menu-link ${isOpen ? "menu-trigger-open" : ""}`}>
            <span className="lines"></span>
          </div>
        </div> */}

      {ClinicDetails && (
        <div className="Header_comp_2">
          <div className="Header_comp_2_img">
            <img src={ClinicDetails?.Clogo} alt={ClinicDetails?.Cname} />
          </div>

          <span className="name_of_the3">{ClinicDetails?.Cname}</span>
        </div>
      )}
      <div className="Header_comp_3">
        <div className="Header_comp_3_loc">
          <FaLocationDot className="Header_comp_3_loc_icon" title="Location" />
          <select
            className=" Header_comp_3_loc_select"
            value={Locationget}
            onChange={(e) => handleLocationChange(e.target.value)}
          >
            {Locationoptions &&
              Locationoptions.map((p, index) => (
                <option key={index} value={p.id}>
                  {p.name}
                </option>
              ))}
          </select>
        </div>
        <div
          className="Header_comp_3_img"
          title="Profile"
          onClick={() => {
            navigate("/Home/Profile");
          }}
        >
          <img src={profileImg} alt="Profile" />
        </div>
      </div>
    </div>
  );
};

export default NewHeader;
