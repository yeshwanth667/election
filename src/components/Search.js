import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Home from "./Home";
import { FaCheck } from "react-icons/fa";

const Search = () => {
  const [formData, setFormData] = useState({
    id: "",
    mobileNumber: "",
    fullName: "",
    address: "",
    gender: "",
    age:"",
    password: "",
    dateOfBirth: "",
    email: "",
    userId: "",
    emailVerificationToken: "",
    createdDateTime: "",
  });

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [validation, setValidation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setEditMode(true);

    if (userData && userData.data) {
      const {
        fullName,
        address,
        gender,
        id,
        dateOfBirth,
        mobileNumber,
        password,
        email,
        age,
        userId,
        emailVerificationToken,
        emailVerificationStatus,
        createdDateTime,
      } = userData.data;
      setFormData({
        ...formData,
        id,
        fullName,
        address,
        gender,
        age,
        mobileNumber,
        password,
        dateOfBirth,
        email,
        userId,
        emailVerificationToken,
        emailVerificationStatus,
        createdDateTime,
      });
    }
  };

  const handleUpdate = async () => {
    const { mobileNumber, ...userData } = formData;
    try {
      const response = await fetch(
        `http://localhost:7702/api/elections/updateUser`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update user data`);
      }

      const resData = await response.json();
      if (resData.data) {
        setUserData(resData);
        setEditMode(false);
        setError(null);
        toast.success(resData.message);
      } else {
        setError(resData.message);
        toast.error(resData.message);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      setError("Error updating user data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { mobileNumber } = formData;
    if (mobileNumber.length > 10 || mobileNumber.length < 10) {
      toast.warning("Mobile number should contain 10 digits");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:7702/api/elections/getUserByMobile/${mobileNumber}`,
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
      if (resData.data) {
        setUserData(resData);
        setError(null);
      } else {
        setUserData(null);
        toast.error(resData.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user data");
      setUserData(null);
    }
  };

  return (
    <>
      <Home>
        <div className="ms-2">
          <form onSubmit={handleSubmit}>
            <div>
              <label style={{ fontWeight: "bold", fontSize: "17px" }}>
                Search for Mobile Number:
              </label>
              <input
                required
                type="number"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onMouseDown={(e) => setValidation(true)}
                onChange={handleChange}
                className="form-control w-25"
              />
              {formData.mobileNumber.length === 0 && validation && (
                <span className="text-danger mt-2">
                  Enter the Mobile Number
                </span>
              )}
              <div className="mt-3">
                <button className="btn btn-primary me-3" type="submit">
                  Search
                </button>
                {userData && !editMode && (
                  <button className="btn btn-primary me-3" onClick={handleEdit}>
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to="/edit"
                    >
                      Edit
                    </Link>
                  </button>
                )}
                {/* <Link to="/">Back to User Page</Link> */}
              </div>
            </div>
          </form>
          {userData && !editMode ? (
            <div>
              <h2>User Data</h2>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Full Name:</td>
                    <td>{userData.data.fullName}</td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td>{userData.data.address}</td>
                  </tr>
                  <tr>
                    <td>Date Of Birth</td>
                    <td>{userData.data.dateOfBirth}</td>
                  </tr>
                  <tr>
                    <td>Gender:</td>
                    <td>{userData.data.gender}</td>
                  </tr>
                  <tr>
                    <td>Mobile Number:</td>
                    <td>{userData.data.mobileNumber}</td>
                  </tr>
                  <tr>
                    <td>Age:</td>
                    <td>{userData.data.age}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              {editMode && (
                <div>
                  <h2>Edit User Data</h2>
                  <div className="row g-2">
                    <div className="col-md-6">
                      <div>
                        <label>Id:</label>
                        <input
                          disabled
                          type="text"
                          name="id"
                          value={formData.id} // Use formData state to populate input fields
                          onChange={handleChange}
                          className="form-control w-50" // Adjust width as needed
                        />
                      </div>
                      <div>
                        <label>Address:</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="form-control w-50" // Adjust width as needed
                        />
                      </div>
                      <div>
                        <label>Mobile Number:</label>
                        <input
                          disabled
                          type="text"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          className="form-control w-50 mb-2" // Adjust width as needed
                        />
                      </div>
                      {/* <div>
                        <label>User Id:</label>
                        <input
                          disabled
                          type="text"
                          name="text"
                          value={formData.userId}
                          onChange={handleChange}
                          className="form-control w-50 mb-2" // Adjust width as needed
                        />
                      </div> */}
                      {/* <div>
                        <label>Email Verification Token:</label>
                        <input
                          disabled
                          type="text"
                          name="text"
                          value={formData.emailVerificationToken}
                          onChange={handleChange}
                          className="form-control w-50 mb-2" // Adjust width as needed
                        />
                      </div> */}
                      <div>
                        <table>
                          <tbody>
                            <tr>
                              <th>Email Verification Status:</th>
                            </tr>
                            <tr>
                              <td>
                                <input
                                  disabled
                                  type="text"
                                  name="text"
                                  value={formData.emailVerificationStatus}
                                  onChange={handleChange}
                                  className="form-control w-100 mb-2" // Adjust width as needed
                                />
                              </td>
                              <td>
                                {formData.emailVerificationStatus && (
                                  <FaCheck style={{ color: "green" }} />
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* <div>
                        <label>Email Verification Status:</label>
                        <input
                          disabled
                          type="text"
                          name="text"
                          value={formData.emailVerificationStatus}
                          onChange={handleChange}
                          className="form-control w-50 mb-2" // Adjust width as needed
                        />
                        {formData.emailVerificationStatus && (
                          <span style={{ color: "green" }}>&#10004;</span> // This will render a tick symbol if emailVerificationStatus is true
                        )}
                      </div> */}
                    </div>
                    <div className="col-md-6">
                      <div>
                        <label>Full Name:</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName} // Use formData state to populate input fields
                          onChange={handleChange}
                          className="form-control w-50" // Adjust width as needed
                        />
                      </div>
                      <div>
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className="form-control w-50" // Adjust width as needed
                        />
                      </div>
                      {/* <div>
                        <label>Gender:</label>
                        <input
                          type="text"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="form-control w-50" // Adjust width as needed
                        />
                      </div> */}
                      <div className="mt-3 mb-4" style={{position:'relative',right:'9px'}} >
                        <div className="d-flex justify-content-around" style={{width:'33%'}}>
                          <label className="form-label mb-0">
                            <b>Gender:</b>
                          </label>
                          <div className="d-flex justify-content-between w-50">
                            <div className="form-check me-4">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formData.gender === "male"}
                                onChange={handleChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="male"
                              >
                                Male
                              </label>
                            </div>
                            <div className="form-check me-4">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formData.gender === "female"}
                                onChange={handleChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="female"
                              >
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
                              <label
                                className="form-check-label"
                                htmlFor="other"
                              >
                                Other
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <div>
                        <label>Password:</label>
                        <input
                          disabled
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="form-control w-50 mb-2" // Adjust width as needed
                        />
                      </div> */}
                      {/* <div>
                        <table>
                          <tbody>
                            <tr>
                              <th>Password</th>
                            </tr>
                            <tr>
                              <td>
                                <input
                                  disabled
                                  className="form-control w-100 mb-2" // Adjust width as needed
                                  type="password"
                                  name="password"
                                  value={formData.password}
                                  onChange={handleChange}
                                />
                              </td>
                              <td>
                                <Link to={`/updatepassword/${formData.userId}`}>
                                  Update
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div> */}
                      {/* <div>
                        <label>Created Date Time</label>
                        <input
                          disabled
                          type="text"
                          name="createdDateTime"
                          value={formData.createdDateTime}
                          onChange={handleChange}
                          className="form-control w-50 mb-2" // Adjust width as needed
                        />
                      </div> */}
                      <div>
                        <table>
                          <tbody>
                            <tr>
                              <th>Email</th>
                            </tr>
                            <tr>
                              <td>
                                <input
                                  disabled
                                  className="form-control w-100 mb-2" // Adjust width as needed
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                />
                              </td>
                              <td>
                                {!formData.emailVerificationStatus && (
                                  <Link to={`/emailverify/${formData.email}`}>
                                    Verify Email
                                  </Link>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn btn-warning me-3"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* {error && <h3 className="mt-3">{error}</h3>} */}
        </div>
      </Home>
    </>
  );
};

export default Search;
