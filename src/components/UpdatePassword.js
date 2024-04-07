import React, { useState } from "react";
import Home from "./Home.js";
import { apiBaseUrl } from "../apiConfig.js";
import { toast } from "react-toastify";
import { useNavigate,useParams} from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  // const userId = sessionStorage.getItem("userId");
  // const cleanedValue = userId.replace(/"/g, "");

  const {userId}=useParams();

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      console.log("Passwords do not match");
      setErrorMessage("Passwords do not match.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (!newPassword.match(passwordRegex)) {
      toast.warning("Password should contain 1 lowercase,1 uppercase and 1 special character");
      return;
    }

    // Create a data object with the user ID, old password, and new password
    const data = {
      userId,
      password: confirmPassword,
    };

    try {
      // Make a POST request to the API to update the password
      const response = await fetch(`${apiBaseUrl}/elections/updatePassword`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);

      if (responseData.statusCode===200) {
        toast.success(responseData.message);
        navigate("/");
      } else {
        toast.error(responseData.message);
        return;
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <Home>
      <div className="password-change-section">
        <h2>Change Password</h2>
        <div>
          <label>User Id:</label>
          <input
            disabled
            type="text"
            name="text"
            value={userId}
            className="form-control w-25 mb-2" // Adjust width as needed
          />
        </div>
        <div className="password-input">
          <label>New Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-control w-25 mb-2"
          />
        </div>
        <div className="password-input">
          <label>Confirm Password</label>
          <div style={{width:'26%'}} className="input-group">
            <input
              
              type={showPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control w-25 mb-4"
            />
            <button
              style={{height:'1%'}}
              className="btn btn-outline-secondary"
              type="button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <button className="btn btn-info" onClick={handlePasswordChange}>Change Password</button>
        {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
        {errorMessage && (
          <p className="error-message" style={{ color: "red" }}>
            {errorMessage}
          </p>
        )}

        {isPasswordChanged && <p>Password changed successfully!</p>}
      </div>
    </Home>
  );
}

export default UpdatePassword;
