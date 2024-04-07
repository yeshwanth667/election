import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiBaseUrl } from "../apiConfig";
import { Link, useNavigate } from "react-router-dom";
import mobile from "../Assets/mobile.jpg";

const Signup = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validation, validationchange] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    dateOfBirth:"",
    gender: "",
    mobileNumber: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, address, dateOfBirth, gender, mobileNumber, password, email } =formData;
    if (fullName.length < 1 || address.length < 1) {
      toast.warning("Fields must not be empty");
      return;
    }

    if (fullName.length < 4) {
      toast.warning("The fullname should contain atleast 4 characters");
      return;
    }
    if (address.length < 6) {
      toast.warning("The Address should contain atleast 6 characters");
      return;
    }

    
    if(mobileNumber.length>10 || mobileNumber.length<10){
      toast.warning('Mobile number should contain 10 digits')
      return;
    }

    if(gender===""){
      toast.warning('Please select a gender')
      return;
    }

    if (!email.includes("@gmail.com")) {
      toast.warning("The email should contain @gmail.com");
      return;
    } 

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (!password.match(passwordRegex)) {
      toast.warning("Password should contain 1 lowercase,1 uppercase and 1 special character");
      return;
    }

    // const emailpattern = /^\w+@gmail\.com$/;   
    

    try {
      const response = await fetch(`${apiBaseUrl}/elections/addUser`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await response.json();
      console.log(resData);
      if (resData.statusCode === 201) {
        toast.success(resData.message);
        navigate("/");
      } else {
        toast.error(resData.message);
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to update user data`);
      }
    } catch (error) {
      console.error("Error submitting user data:", error);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle password visibility
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <section
        className="text-center"
        style={{ width: "100%", maxWidth: "800px" }}
      >
        {/* <div
          className="p-5 bg-image"
          style={{
            backgroundImage:
              "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
            height: "300px",
            backgroundSize: "cover", // Ensure the image covers the entire container
            backgroundPosition: "center", // Center the image
          }}
        ></div> */}

        <img
          src={mobile}
          className="p-5 bg-image"
          alt='mobile'
          style={{
            height: "300px",
            backgroundSize: "cover", // Ensure the image covers the entire container
            backgroundPosition: "center", // Center the image
          }}
        ></img>

        <div
          className="card mx-4 mx-md-5 shadow-5-strong"
          style={{
            marginTop: "-100px",
            background: "hsla(0, 0%, 100%, 0.8)",
            backdropFilter: "blur(30px)",
          }}
        >
          <div className="card-body py-5 px-md-5">
            <div className="row d-flex justify-content-center">
              <div style={{width:'80%'}} className="col-lg-8">
                <h2 className="fw-bold mb-5">Sign up now</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label">Full name<sup style={{color:'red',fontSize:"16px"}}>*</sup></label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onMouseDown={(e) => validationchange(true)}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Full Name Must Contain Atleast 4 Characters"
                        />
                        {/* {formData.fullName.length === 0 && validation && (
                          <span className="text-danger">Enter the name</span>
                        )} */}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label">Address<sup style={{color:'red',fontSize:"16px"}}>*</sup></label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          onMouseDown={(e) => validationchange(true)}
                          className="form-control"
                          placeholder="Address Must Contain Atleast 6 Characters"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label">Date of Birth<sup style={{color:'red',fontSize:"16px"}}>*</sup></label>
                        <input
                          required
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="select the DOB"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label">Mobile Number<sup style={{color:'red',fontSize:"16px"}}>*</sup></label>
                        <input
                          type="number"
                          id="mobileNumber"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter Mobile number"
                        />
                        {/* {formData.mobileNumber.length === 0 && validation && (
                          <span className="text-danger">Mobile Number should contain 10 digits</span>
                        )} */}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 d-flex justify-content-between">
                    <label className="form-label">Gender:<sup style={{color:'red',fontSize:"16px"}}>*</sup></label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="male">
                        Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="female">
                        Female
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="other"
                        checked={formData.gender === "other"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="other">
                        Other
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label">Email<sup style={{color:'red',fontSize:"16px"}}>*</sup></label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter the email address"
                        />
                        {/* {formData.email!=="" && validation && (
                          <span className="text-danger">The Gmail must contain @gmail.com</span>
                        )} */}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label">Password<sup style={{color:'red',fontSize:"16px"}}>*</sup></label>
                        <div className="input-group">
                          <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Min 8 characters required"
                          />
                          
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={handleTogglePasswordVisibility}
                          >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                          </button>
                          {formData.password.length === 0 && validation && (
                          <span className="text-danger">Password should contain 1 lowercase,1 uppercase and 1 special character</span>
                        )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="form-check d-flex justify-content-center mb-4">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example33"
                      checked
                    />
                    <label className="form-check-label" htmlFor="form2Example33">
                      Subscribe to our newsletter
                    </label>
                  </div> */}

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Sign up
                  </button>
                  <div>
                    <Link to="/">Already Registered?? click here to Login</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
