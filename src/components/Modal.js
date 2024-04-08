import React from "react";
import "./Modal.css";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const firstName = sessionStorage.getItem("userName");
  const gender = sessionStorage.getItem("gender");
  const age = sessionStorage.getItem("age");
  const address = sessionStorage.getItem("address");
  const mobile = sessionStorage.getItem("mobileNumber");
  const email=sessionStorage.getItem("email");
  const userId=sessionStorage.getItem("userId")



  const fullName = JSON.parse(firstName);
  const gender1= JSON.parse(gender);
  const address1= JSON.parse(address)
  const mobile1= JSON.parse(mobile)
  const email1= JSON.parse(email);
  const userId1= JSON.parse(userId)
  const age1=JSON.parse(age);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          style={{ color: "black" }}
          className="close-button"
          onClick={onClose}
        >
          <IoClose />
        </button>
        <h4 style={{color:'black',textAlign:'center'}}>User Details</h4>
        <div style={{ color: "black" }}>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <b>Name:</b>
                </td>
                <td>{fullName}</td>
              </tr>
              <tr>
                <td>
                  <b>Gender:</b>
                </td>
                <td>{gender1}</td>
              </tr>
              <tr>
                <td><b>Age:</b></td>
                <td>{age1}</td>
              </tr>
              <tr>
                <td><b>Address:</b></td>
                <td>{address1}</td>
              </tr>
              <tr>
                <td><b>Phone no:</b></td>
                <td>{mobile1}</td>
              </tr>
              <tr>
                <td><b>Email</b></td>
                <td>{email1}</td>
              </tr>
              <tr>
                <td><b>User Id</b></td>
                <td>{userId1}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Modal;
