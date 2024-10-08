import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactGrid from "../../OtherComponent/ReactGrid/ReactGrid";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import ToastAlert from "../../OtherComponent/ToastContainer/ToastAlert";
import axios from "axios";

const DutyRousterMaster = () => {
  const UrlLink = useSelector((state) => state.userRecord?.UrlLink);
  const dispatchvalue = useDispatch();
  const toast = useSelector((state) => state.userRecord?.toast);
  const [DutyRouster, setDutyRouster] = useState({
    DutyRousterId: "",
    Location: "",
    ShiftName: "",
    ShiftStartTime: "",
    ShiftEndTime: "",
  });

  const [DutyRousterData, setDutyRousterData] = useState([]);
  const [Locations, setLocations] = useState([]);
  const [DutyRousterGet, setDutyRousterGet] = useState(false);

  console.log("Location", Locations);
  console.log("DutyRousterData", DutyRousterData);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const formattedVal =
      name === "ShiftName"
        ? `${value.charAt(0).toUpperCase()}${value.slice(1)}`
        : value;
    setDutyRouster((prev) => ({
      ...prev,
      [name]: formattedVal,
    }));
  };

  const DutyRousterDataColumn = [
    {
      key: "id",
      name: "DutyRouster Id",
      frozen: true,
    },
    {
      key: "Location",
      name: "Location",
    },
    {
      key: "ShiftName",
      name: "Shift Name",
    },
    {
      key: "ShiftStartTime",
      name: "Shift Start Time",
    },
    {
      key: "ShiftEndTime",
      name: "Shift End Time",
    },
    {
      key: "Action",
      name: "Action",
      renderCell: (params) => {
        return (
          <>
            <Button
              className="cell_btn"
              onClick={() => handleEditDutyRouster(params.row)}
            >
              <EditIcon className="check_box_clrr_cancell" />
            </Button>
          </>
        );
      },
    },
  ];

  const handleEditDutyRouster = (params) => {
    console.log("paraaaaamssss", params);
    const location = Locations.find(
      (loc) => loc.locationName === params.Location
    );
    const { id, ...rest } = params;
    setDutyRouster((prev) => ({
      ...prev,
      DutyRousterId: id ? id : "",
      Location: location ? location.id : "",
      ShiftName: rest.ShiftName,
      ShiftStartTime: rest.ShiftStartTime,
      ShiftEndTime: rest.ShiftEndTime,
    }));
  };

  useEffect(() => {
    axios
      .get(`${UrlLink}Masters/Duty_rouster_master_link`)
      .then((response) => {
        const res = response.data;
        setDutyRousterData(res);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  }, [UrlLink, DutyRousterGet]);

  const handlesubmit = () => {
    console.log("Hiiiii");
    const exist = Object.keys(DutyRouster)
      .filter((p) => p !== "DutyRousterId", "")
      .filter((p) => !DutyRouster[p]);
    if (exist.length === 0) {
      const dataToSubmit = { ...DutyRouster };

      // Remove the DutyRousterId if it's empty (i.e., for new entries)
      if (!DutyRouster.DutyRousterId) {
        delete dataToSubmit.DutyRousterId;
      }
      axios
        .post(`${UrlLink}Masters/Duty_rouster_master_link`, dataToSubmit)
        .then((response) => {
          const res = response.data;
          const mess = Object.values(res)[0];
          const type = Object.keys(res)[0];
          console.log("Duty Rouster data is submitted", res);

          const tdata = {
            message: mess,
            type: type,
          };
          dispatchvalue({ type: "toast", value: tdata });
          setDutyRousterGet((prev) => !prev);
          setDutyRouster({
            DutyRousterId: "",
            Location: "",
            ShiftName: "",
            ShiftStartTime: "",
            ShiftEndTime: "",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      const tdata = {
        message: `Please provide ${exist.join(",")}.`,
        type: "warn",
      };
      dispatchvalue({ type: "toast", value: tdata });
    }
  };

  const formatLabel = (label) => {
    if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
      return label
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/^./, (str) => str.toUpperCase());
    } else {
      return label;
    }
  };

  useEffect(() => {
    axios
      .get(`${UrlLink}Masters/Location_Detials_link`)
      .then((res) => {
        const ress = res.data;

        setLocations(ress);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [UrlLink]);
  return (
    <>
      <div className="Main_container_app" id="scrollupppp">
        <h3>Duty Rouster Master</h3>
        <div className="RegisFormcon_1">
          {Object.keys(DutyRouster)
            .filter((f) => f !== "DutyRousterId")
            .map((field, ind) => (
              <div className="RegisForm_1" key={ind}>
                <label htmlFor={`${field}_${ind}_${field}`}>
                  {formatLabel(field)} <span>:</span>
                </label>
                {field === "Location" ? (
                  <select
                    name={field}
                    value={DutyRouster[field]}
                    id={`${field}_${ind}_${field}`}
                    onChange={handleOnChange}
                  >
                    <option value="">Select</option>
                    {Locations.map((p, ind) => (
                      <option value={p.id} key={ind}>
                        {p.locationName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={field}
                    value={DutyRouster[field]}
                    id={`${field}_${ind}_${field}`}
                    type={field === "ShiftName" ? "text" : "time"}
                    onChange={handleOnChange}
                  />
                )}
              </div>
            ))}
        </div>
        <div className="Main_container_Btn">
          <button onClick={handlesubmit}>
            {DutyRouster.DutyRousterId ? "Update" : "Save"}
          </button>
        </div>
      </div>
      <br />
      <ReactGrid columns={DutyRousterDataColumn} RowData={DutyRousterData} />
      <ToastAlert Message={toast.message} Type={toast.type} />
    </>
  );
};

export default DutyRousterMaster;
