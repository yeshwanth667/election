import React, { useState } from "react";
import { toast } from "react-toastify";
import Home from "./Home";
import "./Card.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import ECI from "../Assets/ECI.jpg";

const Card = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:7702/api/elections/validateUser/{mobileNumber}?mobileNumber=${mobileNumber}`,
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
      if (resData.statusCode === 200) {
        setUserData(resData);
        toast.success(resData.message);
        //setShowOtpField(true);
        setError(null);
      }
      else if(mobileNumber===""){
        toast.warning('Mobile number is required')
      } 
      else if(mobileNumber.length !==10){
        toast.warning('Mobile number must contain at least 10 digits')
      }
      else {
        setUserData(null);
        toast.error(resData.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user data");
      setUserData(null);
    }
  };

  const handleChange = (e) => {
    setMobileNumber(e.target.value);
  };

  function handleDownload() {
    const cardElement = document.getElementById("card");
    if (cardElement) {
      html2canvas(cardElement).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4"); 
        const imgWidth = 210; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(userData.data.mobileNumber);
      });
    } else {
      console.error("Element with id 'card' not found");
    }
  }

  

  return (
    <Home>
      <div>
        <label style={{ fontWeight: "bold", fontSize: "17px" }}>
          Enter the Mobile Number to View your Card
        </label>
        <input
          type="number"
          value={mobileNumber}
          onChange={handleChange}
          placeholder="Enter Mobile Number"
          className="form-control w-25 mb-2"
        />
        <button className="btn btn-success" onClick={handleSubmit}>
          Search
        </button>
        <div>
          {userData ? (
            <div id="card">
              <section>
                <div className="container py-5 h-75">
                  <div
                    className="row d-flex justify-content-center align-items-center h-100"
                    style={{ position: "relative", left: "-22%" }}
                  >
                    <div
                      className="col col-lg-6 mb-4 mb-lg-0"
                      style={{
                        width: "81%",
                        position: "relative",
                        right: "-11%",
                        marginTop:'-26px'
                      }}
                    >
                      <div
                        className="card mb-3"
                        style={{ borderRadius: ".5rem" }}
                      >
                        <div className="row g-0">
                          <div
                            className="col-md-4 gradient-custom text-center text-white"
                            style={{
                              borderTopLeftRadius: ".5rem",
                              borderBottomLeftRadius: ".5rem",
                            }}
                          >
                            <img
                              src={ECI}
                              alt="Avatar"
                              className="img-fluid my-5"
                              style={{ width: "80px" }}
                            />
                            <h6
                              style={{
                                color: "black",
                                marginTop: "-32px",
                                marginBottom: "25px",
                              }}
                            >
                              Reg.No :-{" "}
                              <b>
                                <em>{userData.data.userId}</em>
                              </b>
                            </h6>
                            <p style={{ color: "black" }}>
                              Mobile No:- {userData.data.mobileNumber}
                            </p>
                            <p style={{ color: "black" }}>
                              Age:- {userData.data.age} years
                            </p>
                            {/* <i className="far fa-edit mb-5"></i> */}
                          </div>
                          <div className="col-md-8">
                            <div className="card-body p-4">
                              <h6>Voter Information:-<span><em style={{fontSize:'19px'}}>{userData.data.fullName}</em></span></h6>
                              <hr className="mt-0 mb-4" />
                              <div className="row pt-1">
                                <div className="col-6 mb-3">
                                  <h6>Email</h6>
                                  <p style={{ color: "#2147dd" }}>
                                    {userData.data.email}
                                  </p>
                                </div>
                                <div className="col-6 mb-3">
                                  <h6>Gender</h6>
                                  <p className="text-muted">
                                    {userData.data.gender}
                                  </p>
                                </div>
                              </div>
                              {/* <h6>Projects</h6>
                              <hr className="mt-0 mb-4"/> */}
                              <div className="row pt-1">
                                <div className="col-6 mb-3">
                                  <h6>Address</h6>
                                  <p className="text-muted">
                                    {userData.data.address}
                                  </p>
                                </div>
                                <div className="col-6 mb-3">
                                  <h6>Date of Birth</h6>
                                  <p className="text-muted">
                                    {userData.data.dateOfBirth}
                                  </p>
                                </div>
                              </div>
                              {/* <div className="d-flex justify-content-start">
                                <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                                <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                                <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <p>{error}</p>
          )}
          {userData && (
            <div style={{marginTop:'-40px'}}>
              <button onClick={handleDownload} className="btn btn-primary me-4">
                Download
              </button>
              <button onClick={()=>setUserData(false)} className="btn btn-danger">Cancel</button>
            </div>
          )}
        </div>
      </div>
    </Home>
  );
};

export default Card;
