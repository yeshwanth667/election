import React, { useState } from "react";
import Home from "./Home";
import { toast } from "react-toastify";
import { apiBaseUrl } from "../apiConfig";
import { useNavigate, useParams } from "react-router-dom";

const EmailVerify = () => {
  const [otp, setotp] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  //const email = sessionStorage.getItem("email");
  const { email } = useParams();
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email1: email,
      //otp1: otp,
    };
    console.log(data);

    try {
      const response = await fetch(
        `${apiBaseUrl}/elections/send-email/${data.email1}`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resData = await response.json();
      console.log(resData);

      if (resData.statusCode === 200) {
        toast.success(resData.message);
        setShowOtpField(true);
      } else {
        toast.error(resData.message);
      }

      //   if (!response.ok) {
      //     throw new Error(`Failed to update user data`);
      //   }
    } catch (error) {
      console.error("Error submitting user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    setLoading1(true);
    const data = {
      email: email,
      otp: otp,
    };
    console.log(data);

    try {
      const response = await fetch(`${apiBaseUrl}/elections/verify-otp`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await response.json();
      console.log(resData);

      if (resData.statusCode === 200) {
        toast.success(resData.message);
        navigate('/edit')
      } else {
        toast.error(resData.message);
      }

      //   if (!response.ok) {
      //     throw new Error(`Failed to update user data`);
      //   }
    } catch (error) {
      console.error("Error submitting user data:", error);
    }
    finally{
        setLoading1(false);
    }
  };

  return (
    <>
      <Home>
        <div className="container">
          <h3>Email Verification</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                disabled
                type="email"
                className="form-control w-25 mb-3"
                placeholder="Enter email"
                value={email}
                required
              />
              <p style={{ fontSize: "15px" }} className="text text-danger">
                {loading && "Sending OTP to the email address..."}
              </p>
              <button onClick={handleSubmit} className="btn btn-success">
                Get OTP
              </button>
            </div>
            {showOtpField && <div>
              <div className="form-group">
                <label>OTP</label>
                <input
                  type="text"
                  maxLength="6"
                  pattern="\d*"
                  className="form-control w-25 mb-3"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setotp(e.target.value)}
                  required
                />
              </div>
              <p style={{ fontSize: "15px" }} className="text text-danger">
                {loading1 && "Validating OTP...."}
              </p>
              <button
                type="submit"
                onClick={handleSubmit1}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>}
          </form>
        </div>
      </Home>
    </>
  );
};

export default EmailVerify;
