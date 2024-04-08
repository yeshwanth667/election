import React, { useState } from "react";
import Home from "./Home";

const GetAllUsers = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:7702/api/elections/getAllUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch user data`);
      }

      const resData = await response.json();
      console.log(resData);
      if (resData.data) {
        setUserData(resData.data);
        setError(null);
      } else {
        setUserData(null);
        setError(resData.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user data");
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  // CSS class for table cells
  const cellStyle = {

    width: "25%", // Adjust the width as needed
    wordWrap: "break-word", // Allow long content to wrap
  };

  // Calculate total count
  const totalCount = userData ? userData.length : 0;

  return (
    <>
      <Home>
        <h2>Click here to get list of all the Users</h2>
        <div>
          <div>
            <button onClick={handleSubmit} className="btn btn-success">
              Get All Users
            </button>
            <p style={{ fontSize: "25px" }} className="text text-danger">
              {loading && "Fetching Data...."}
            </p>
          </div>
          <div>
            {userData && (
              <>
                <p
                  style={{
                    marginLeft: "85%",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  Total Count of Users: {totalCount}
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
                        <tr>
                          <td style={cellStyle}>Age</td>
                          <td style={cellStyle}>{item.age}</td>
                        </tr>
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
        </div>
      </Home>
    </>
  );
};

export default GetAllUsers;
