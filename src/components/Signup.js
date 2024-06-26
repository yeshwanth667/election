import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiBaseUrl } from "../apiConfig";
import { Link, useNavigate } from "react-router-dom";
import mobile from "../Assets/mobile.jpg";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validation, validationchange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [genderError, setGenderError] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === "gender") {
      setGenderError(false); // Reset gender error when gender is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormSubmitted(true);
    const {
      fullName,
      address,
      dateOfBirth,
      gender,
      mobileNumber,
      password,
      email,
    } = formData;
    let isValid = true;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (fullName.length < 1 || address.length < 1 || mobileNumber.length < 1 || email.length < 1 || password.length < 1 ||dateOfBirth < 1 ) {
      toast.warning("Fields must not be empty");
      isValid = false;
    }
    else if  (!/^(?:[A-Z]\.\s*)*[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*$/.test(fullName) && !/^[A-Z](\.\s?[A-Z])*(\s[A-Z][a-z]+)+$/.test(fullName)) {
      toast.warning("The fullname should contain at least 2 words with each word starting with a capital letter or initial should be in capital letters");
      isValid = false;
    }
    else if (fullName.length < 4) {
      toast.warning("The fullname should contain atleast 4 characters");
      isValid = false;
    } else if (address.length < 6) {
      toast.warning("The Address should contain atleast 6 characters");
      isValid = false;
    } else if (mobileNumber.length > 10 || mobileNumber.length < 10) {
      toast.warning("Mobile number should contain 10 digits");
      isValid = false;
    } else if (gender === "") {
      toast.warning("Please select a gender");
      setGenderError(true); // Set gender error to true
      isValid = false;
      //isValid = false;
    } 
    // else if (!email.includes("@gmail.com")) {
    //   toast.warning("The email should contain @gmail.com");
    //   isValid = false;
    // }
     else if (!emailRegex.test(email)) {
      toast.warning("Please enter a valid email address");
      isValid = false;
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

      if (!password.match(passwordRegex)) {
        toast.warning(
          "Password should contain 1 lowercase,1 uppercase and 1 special character"
        );
        isValid = false;
      }
    }

    // const emailpattern = /^\w+@gmail\.com$/;

    if (isValid) {
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
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle password visibility
  };

  const today = new Date();
  today.setDate(today.getDate() - 1);
  const yesterday = today.toISOString().split("T")[0];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor:'#e3e3e3'
      }}
    >
      <section
        className="text-center"
        style={{ width: "100%", maxWidth: "800px", marginTop: "9%" }}
      >
        <div
          className="p-5 bg-image"
          style={{
            backgroundImage:
              "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
            height: "300px",
            backgroundSize: "cover", // Ensure the image covers the entire container
            backgroundPosition: "center", // Center the image
            marginTop: "-142px",
          }}
        ></div>

        {/* <img
          src={mobile}
          className="p-5 bg-image"
          alt="mobile"
          style={{
            height: "300px",
            backgroundSize: "cover", // Ensure the image covers the entire container
            backgroundPosition: "center", // Center the image
          }}
        ></img> */}

        <div
          className="card mx-4 mx-md-5 shadow-5-strong"
          style={{
            marginTop: "-209px",
            background: "hsla(0, 0%, 100%, 0.8)",
            backdropFilter: "blur(30px)",
            // marginTop:'-209px'
          }}
        >
          <div className="card-body py-5 px-md-5">
            <div className="row d-flex justify-content-center">
              <div style={{ width: "80%" }} className="col-lg-8">
                <h2 className="fw-bold mb-5">Sign up now</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label">
                          Full Name
                          <sup style={{ color: "red", fontSize: "16px" }}>
                            *
                          </sup>
                        </label>
                        <input
                          title="fullname"
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onMouseDown={(e) => validationchange(true)}
                          onChange={handleChange}
                          style={{
                            borderColor:
                              formSubmitted && formData.fullName === ""
                                ? "red"
                                : "",
                          }}
                          className="form-control"
                          //placeholder="Full Name Must Contain Atleast 4 Characters"
                        />
                        {/* {formData.fullName.length === 0 && validation && (
                          <span className="text-danger">Enter the name</span>
                        )} */}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label">
                          Address
                          <sup style={{ color: "red", fontSize: "16px" }}>
                            *
                          </sup>
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          onMouseDown={(e) => validationchange(true)}
                          style={{
                            borderColor:
                              formSubmitted && formData.address === ""
                                ? "red"
                                : "",
                          }}
                          className="form-control"
                          //placeholder="Address Must Contain Atleast 6 Characters"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label">
                          Date of Birth
                          <sup style={{ color: "red", fontSize: "16px" }}>
                            *
                          </sup>
                        </label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className="form-control"
                          max={yesterday}
                          style={{
                            borderColor:
                              formSubmitted && formData.dateOfBirth === ""
                                ? "red"
                                : "",
                          }}
                          //  placeholder="select the DOB"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label">
                          Mobile Number
                          <sup style={{ color: "red", fontSize: "16px" }}>
                            *
                          </sup>
                        </label>
                        <input
                          type="number"
                          id="mobileNumber"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          className="form-control"
                          style={{
                            borderColor:
                              formSubmitted && formData.mobileNumber === ""
                                ? "red"
                                : "",
                          }}
                          // placeholder="Enter Mobile number"
                        />
                        {/* {formData.mobileNumber.length === 0 && validation && (
                          <span className="text-danger">Mobile Number should contain 10 digits</span>
                        )} */}
                      </div>
                    </div>
                  </div>

                  
                  <div style={{ marginBottom: "4%", marginTop: "1%" }}>
                    <span
                      class="_5k_3 d-flex justify-content-around"
                      data-type="radio"
                      data-name="gender_wrapper"
                      id="u_0_o_AQ"
                    >
                      <div>
                      <span>Gender</span>
                      <sup style={{ color: "red", fontSize: "16px" }}>*</sup>
                      </div>
                      <span
                        style={{
                          // border: "2px solid #dee2e6",
                          border:
                              formSubmitted && formData.gender === ""
                                ? "2px solid red"
                                : "2px solid #dee2e6",
                          width: "23%",
                          borderRadius: "8%",
                          padding: "2px",
                        }}
                        class="_5k_2 _5dba"
                      >
                        <label class="_58mt me-2" for="u_0_4_su">
                          Female
                        </label>
                        <input
                          type="radio"
                          class="_8esa mt-2"
                          name="gender"
                          value="female"
                          id="u_0_4_su"
                          checked={formData.gender === "female"}
                          onChange={handleChange}
                        />
                      </span>
                      
                      <span
                        style={{
                          // border: "2px solid #dee2e6",
                          border:
                              formSubmitted && formData.gender === ""
                                ? "2px solid red"
                                : "2px solid #dee2e6",
                          width: "23%",
                          borderRadius: "8%",
                          padding: "2px",
                        }}
                        class="_5k_2 _5dba"
                      >
                        <label class="_58mt me-2" for="u_0_5_8C">
                          Male
                        </label>
                        <input
                          type="radio"
                          class="_8esa mt-2"
                          name="gender"
                          value="male"
                          id="u_0_5_8C"
                          checked={formData.gender === "male"}
                          onChange={handleChange}
                        />
                      </span>
                      <span
                        style={{
                          // border: "2px solid #dee2e6",
                          border:
                              formSubmitted && formData.gender === ""
                                ? "2px solid red"
                                : "2px solid #dee2e6",
                          width: "23%",
                          borderRadius: "8%",
                          padding: "2px",
                        }}
                        class="_5k_2 _5dba"
                      >
                        <label class="_58mt me-2" for="u_0_6_cW">
                          Custom
                        </label>
                        <input
                          type="radio"
                          class="_8esa mt-2"
                          name="gender"
                          value="other"
                          id="u_0_6_cW"
                          checked={formData.gender === "other"}
                          onChange={handleChange}
                        />
                      </span>
                    </span>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label">
                          Email
                          <sup style={{ color: "red", fontSize: "16px" }}>
                            *
                          </sup>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control"
                          style={{
                            borderColor:
                              formSubmitted && formData.email === ""
                                ? "red"
                                : "",
                          }}
                          //  placeholder="Enter the email address"
                        />
                        {/* {formData.email!=="" && validation && (
                          <span className="text-danger">The Gmail must contain @gmail.com</span>
                        )} */}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label">
                          Password
                          <sup style={{ color: "red", fontSize: "16px" }}>
                            *
                          </sup>
                        </label>
                        <div className="input-group">
                          <input
                            title="Password should contain 1 lowercase,1 uppercase
                          and 1 special character"
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onCopy={(e)=>e.preventDefault()}
                            onPaste={(e)=>e.preventDefault()}
                            onCut={(e)=>e.preventDefault()}
                            onDrop={(e)=>e.preventDefault()}
                            style={{
                              borderColor:
                                formSubmitted && formData.password === ""
                                  ? "red"
                                  : "",
                            }}
                            className="form-control"
                            //  placeholder="Min 8 characters required"
                          />

                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={handleTogglePasswordVisibility}
                          >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                          </button>
                          {/* {formData.password.length === 0 && validation && (
                            <span className="text-danger">
                              Password should contain 1 lowercase,1 uppercase
                              and 1 special character
                            </span>
                          )} */}
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

                  {loading && (
                    <p style={{ color: "red", textAlign: "center" }}>
                      Registering the User...
                    </p>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                    disabled={loading} //Disabling the button when loading
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
