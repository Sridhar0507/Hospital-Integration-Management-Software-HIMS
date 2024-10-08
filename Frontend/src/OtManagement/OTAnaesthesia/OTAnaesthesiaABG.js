import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function OTAnaesthesiaABG() {
  const [tables, setTables] = useState([
    {
      time1: "",
      time2: "",
      time3: "",
      time4: "",
      time5: "",

      FiO21: "",
      FiO22: "",
      FiO23: "",
      FiO24: "",
      FiO25: "",

      pH1: "",
      pH2: "",
      pH3: "",
      pH4: "",
      pH5: "",

      PCO21: "",
      PCO22: "",
      PCO23: "",
      PCO24: "",
      PCO25: "",

      HCO31: "",
      HCO32: "",
      HCO33: "",
      HCO34: "",
      HCO35: "",

      Hb1: "",
      Hb2: "",
      Hb3: "",
      Hb4: "",
      Hb5: "",

      Na1: "",
      Na2: "",
      Na3: "",
      Na4: "",
      Na5: "",

      K1: "",
      K2: "",
      K3: "",
      K4: "",
      K5: "",

      Cl1: "",
      Cl2: "",
      Cl3: "",
      Cl4: "",
      Cl5: "",

      Ca1: "",
      Ca2: "",
      Ca3: "",
      Ca4: "",
      Ca5: "",

      Lactate1: "",
      Lactate2: "",
      Lactate3: "",
      Lactate4: "",
      Lactate5: "",

      Others1: "",
      Others2: "",
      Others3: "",
      Others4: "",
      Others5: "",
    },
  ]);

  const handleInputChangeTable = (tableIndex, key, value) => {
    const newTables = tables.map((table, index) => {
      if (index !== tableIndex) return table;
      return { ...table, [key]: value };
    });
    setTables(newTables);
  };

  const addTable = () => {
    setTables([...tables, {}]);
  };

  const deleteTable = () => {
    if (tables.length > 1) {
      const updatedTables = [...tables];
      updatedTables.pop();
      setTables(updatedTables);
    }
  };

  return (
    <div className="new-patient-registration-form">
      <h4
        style={{
          color: "var(--labelcolor)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "start",
          padding: "10px",
        }}
      >
        Intra - Operative ABG
      </h4>

      <div className="RegisFormcon">
        <div className="Selected-table-container">
          {tables.map((table, tableIndex) => (
            <div key={tableIndex}>
              <br />
              <h4
                style={{
                  color: "var(--labelcolor)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "start",
                  padding: "10px",
                }}
              >
                Table {tableIndex + 1}
              </h4>
              <table className="selected-medicine-table2">
                <thead>
                  <tr>
                    <th>Time</th>
                    {[1, 2, 3, 4, 5].map((inputIndex) => (
                      <td key={`time${inputIndex}`}>
                        <input
                          type="time"
                          className="chart_table_anathes"
                          value={table[`time${inputIndex}`] || ""}
                          onChange={(e) =>
                            handleInputChangeTable(
                              tableIndex,
                              `time${inputIndex}`,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th>FiO2</th>
                    {[1, 2, 3, 4, 5].map((inputIndex) => (
                      <td key={`FiO2${inputIndex}`}>
                        <input
                          type="text"
                          className="chart_table_anathes"
                          value={table[`FiO2${inputIndex}`] || ""}
                          onChange={(e) =>
                            handleInputChangeTable(
                              tableIndex,
                              `FiO2${inputIndex}`,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>pH</th>
                    {[1, 2, 3, 4, 5].map((inputIndex) => (
                      <td key={`pH${inputIndex}`}>
                        <input
                          type="text"
                          className="chart_table_anathes"
                          value={table[`pH${inputIndex}`] || ""}
                          onChange={(e) =>
                            handleInputChangeTable(
                              tableIndex,
                              `pH${inputIndex}`,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>PCO2</th>
                    {[1, 2, 3, 4, 5].map((inputIndex) => (
                      <td key={`PCO2${inputIndex}`}>
                        <input
                          type="text"
                          className="chart_table_anathes"
                          value={table[`PCO2${inputIndex}`] || ""}
                          onChange={(e) =>
                            handleInputChangeTable(
                              tableIndex,
                              `PCO2${inputIndex}`,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>HCO3</th>
                    {[1, 2, 3, 4, 5].map((inputIndex) => (
                      <td key={`HCO3${inputIndex}`}>
                        <input
                          type="text"
                          className="chart_table_anathes"
                          value={table[`HCO3${inputIndex}`] || ""}
                          onChange={(e) =>
                            handleInputChangeTable(
                              tableIndex,
                              `HCO3${inputIndex}`,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>Hb</th>
                    {[1, 2, 3, 4, 5].map((inputIndex) => (
                      <td key={`Hb${inputIndex}`}>
                        <input
                          type="text"
                          className="chart_table_anathes"
                          value={table[`Hb${inputIndex}`] || ""}
                          onChange={(e) =>
                            handleInputChangeTable(
                              tableIndex,
                              `Hb${inputIndex}`,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>Na+</th>
                    {[1, 2, 3, 4, 5].map((inputIndex) => (
                      <td key={`Na${inputIndex}`}>
                        <input
                          type="text"
                          className="chart_table_anathes"
                          value={table[`Na${inputIndex}`] || ""}
                          onChange={(e) =>
                            handleInputChangeTable(
                              tableIndex,
                              `Na${inputIndex}`,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>K+</th>
                    {[1, 2, 3, 4, 5].map((inputIndex) => (
                      <td key={`K${inputIndex}`}>
                        <input
                          type="text"
                          className="chart_table_anathes"
                          value={table[`K${inputIndex}`] || ""}
                          onChange={(e) =>
                            handleInputChangeTable(
                              tableIndex,
                              `K${inputIndex}`,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>Cl+</th>
                    {[1, 2, 3, 4, 5].map((inputIndex) => (
                      <td key={`Cl${inputIndex}`}>
                        <input
                          type="text"
                          className="chart_table_anathes"
                          value={table[`Cl${inputIndex}`] || ""}
                          onChange={(e) =>
                            handleInputChangeTable(
                              tableIndex,
                              `Cl${inputIndex}`,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>Ca++</th>
                    {[1, 2, 3, 4, 5].map((inputIndex) => (
                      <td key={`Ca${inputIndex}`}>
                        <input
                          type="text"
                          className="chart_table_anathes"
                          value={table[`Ca${inputIndex}`] || ""}
                          onChange={(e) =>
                            handleInputChangeTable(
                              tableIndex,
                              `Ca${inputIndex}`,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>Lactate</th>
                    {[1, 2, 3, 4, 5].map((inputIndex) => (
                      <td key={`Lactate${inputIndex}`}>
                        <input
                          type="text"
                          className="chart_table_anathes"
                          value={table[`Lactate${inputIndex}`] || ""}
                          onChange={(e) =>
                            handleInputChangeTable(
                              tableIndex,
                              `Lactate${inputIndex}`,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>Others</th>
                    {[1, 2, 3, 4, 5].map((inputIndex) => (
                      <td key={`Others${inputIndex}`}>
                        <input
                          type="text"
                          className="chart_table_anathes"
                          value={table[`Others${inputIndex}`] || ""}
                          onChange={(e) =>
                            handleInputChangeTable(
                              tableIndex,
                              `Others${inputIndex}`,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>
                </thead>
              </table>
              {tableIndex === tables.length - 1 && (
                <div className="Register_btn_con">
                  <button className="RegisterForm_1_btns" onClick={addTable}>
                    <AddCircleOutlineIcon />
                  </button>
                  <button className="RegisterForm_1_btns" onClick={deleteTable}>
                    <DeleteOutlineIcon />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <br />
      </div>
    </div>
  );
}

export default OTAnaesthesiaABG;
