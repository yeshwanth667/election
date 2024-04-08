import React, { useState } from "react";
import Home from "./Home";

const EmailStatus = () => {
  const [formData, setFormData] = useState({
    gender: "",
  });
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    try {
      if (value) {
        const response = await fetch(
          `http://localhost:7702/api/elections/getListOfUsers/{emailVerificationStatus}?status=${value}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch ${value} data`);
        }
        const resData = await response.json();
        console.log(resData);
        if (resData) {
          setUserData(resData.data);
          setError(null);
        } else {
          setUserData(null);
          setError(resData.data);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user data");
      setUserData(null);
    }
  };

  const totalCount = userData ? userData.length : 0;

  const cellStyle = {
    width: "25%", // Adjust the width as needed
    wordWrap: "break-word", // Allow long content to wrap
  };

  return (
    <>
      <Home>
        <div className="mb-4 me-3">
          <div className="d-flex justify-content-evenly" style={{width:'45%'}}>
          <label className="form-label"><b>Select the Verification Status:</b></label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="true"
                checked={formData.gender === "true"}
                onChange={handleChange}
                // disabled={formData.gender === "female"}
              />
              <label className="form-check-label" htmlFor="male">
                True
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="false"
                checked={formData.gender === "false"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="female">
                False
              </label>
            </div>
            {/* <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === "other"}
                onChange={handleChange}
                // disabled={formData.gender === "male" && formData.gender === "female"}
              />
              <label className="form-check-label" htmlFor="other">
                Other
              </label>
            </div> */}
          </div>
        </div>
        <div>
          {userData && (
            <>
              <p
                style={{
                  marginLeft: "82%",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Total Count of {formData.gender} Users: {totalCount}
              </p>{" "}
              {/* Display total count */}
              {userData.map((item) => (
                <div key={item.id}>
                  <h2>Details of the User:-{item.fullName}</h2>
                  <table className="table table-bordered border-primary">
                    <tbody>
                      <tr>
                        <td style={cellStyle}>Id:</td>
                        <td style={cellStyle}>{item.id}</td>
                      </tr>
                      <tr>
                        <td style={cellStyle}>FullName</td>
                        <td style={cellStyle}>{item.fullName}</td>
                      </tr>
                      {/* <tr>
                          <td style={cellStyle}>Age</td>
                          <td style={cellStyle}>{item.age}</td>
                        </tr> */}
                      <tr>
                        <td style={cellStyle}>Gender</td>
                        <td style={cellStyle}>{item.gender}</td>
                      </tr>
                      <tr>
                        <td style={cellStyle}>Address</td>
                        <td style={cellStyle}>{item.address}</td>
                      </tr>
                      <tr>
                        <td style={cellStyle}>Mobile Number</td>
                        <td style={cellStyle}>{item.mobileNumber}</td>
                      </tr>
                      <tr>
                        <td style={cellStyle}>Email</td>
                        <td style={cellStyle}>{item.email}</td>
                      </tr>
                      <tr>
                        <td style={cellStyle}>User Id</td>
                        <td style={cellStyle}>{item.userId}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </>
          )}
          {error && <p>{error}</p>}
        </div>
      </Home>
    </>
  );
};

export default EmailStatus;
