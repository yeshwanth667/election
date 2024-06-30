import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Home from "./Home";

const Delete = () => {
  const [formData, setFormData] = useState({
    mobileNumber: "",
  });

  const [validation, validationchange] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { mobileNumber } = formData;
    // if (mobileNumber.length === "" ) {
    //   toast.error("Fields must not be empty");
    //   return;
    // }
    if (mobileNumber.length < 10) {
      toast.error("Mobile Number should contain 10 digits");
      return;
    }

    if (window.confirm(`Do You want to remove?`)) {
      try {
        const response = await fetch(
          `http://localhost:7702/api/elections/deleteUser/${mobileNumber}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          const data = await response.json();
          toast.success(data.message);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    // try {
    //   const response = await fetch(
    //     `http://localhost:7702/api/elections/${mobileNumber}`,
    //     {
    //       method: "DELETE",                    //http://localhost:7702/api/elections/1234567892
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error(`Failed to update user data`);
    //   }

    //   const resData = await response.json();
    //   if (resData.data) {
    //     setUserData(resData);
    //     setError(null);
    //   } else {
    //     setUserData(null);
    //     setError(resData.message);
    //   }
    // } catch (error) {
    //   console.error("Error submitting user data:", error);
    //   setError("Error fetching user data");
    //   setUserData(null);
    // }
  };

  return (
    <>
    <Home>
      <div className="ms-2">
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ fontWeight: "bold", fontSize: "17px" }}>
              Delete User
            </label>
            <input
              required
              type="mobileNumber"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onMouseDown={(e) => validationchange(true)}
              onChange={handleChange}
              className="form-control w-25"
            />
            {formData.mobileNumber.length === 0 && validation && (
              <span className="text-danger mt-2">Enter the Mobile Number</span>
            )}
            <div className="mt-3">
              <button className=" btn btn-danger me-3" type="submit">
                Delete
              </button>
              <Link to="/dashboard">Back to User Page</Link>
            </div>
          </div>
        </form>
      </div>
      </Home>
    </>
  );
};

export default Delete;
