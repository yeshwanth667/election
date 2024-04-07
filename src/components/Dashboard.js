import React,{useState,useEffect} from "react";
import Home from "./Home";
import Footer from "./Footer";

const Dashboard = ({ highlighted }) => {

  const dashboardStyle = {
    border: highlighted ? '2px solid red' : 'none',
    padding: '20px',
  };

  return (
    <>
      <Home>
        <h3
          style={{
            fontStyle: "italic",
            fontSize: "47px",
            marginBottom: "95px",
            textAlign: "center",
          }}
        >
          Welcome to the Election Management
        </h3>
        <div
          id="dashboard"
          style={dashboardStyle}
        >
          <h4 style={{ textAlign: "center", marginBottom: "30px" }}>
            About Our App
          </h4>
          <p
            style={{
              fontSize: "23px",
              marginTop: "50px",
              textAlign: "justify",
            }}
          >
            Our Election Management system offers a suite of APIs tailored to
            streamline every aspect of the electoral process. From user
            registration to result tabulation, our APIs empower administrators
            to manage voter data securely and ensure transparency and efficiency
            in elections. With features such as user registration,
            authentication, and candidate management.
          </p>
          <p style={{ fontSize: "23px", textAlign: "justify" }}>
            {" "}
            "Additionally, our APIs include functionalities for updating user
            details, sending OTPs for email verification, and validating user
            eligibility for voter cards, enhancing security and accessibility
            throughout the electoral journey. Whether it's retrieving voter
            information based on gender or deleting user records by mobile
            number.
          </p>
        </div>
        <h4 style={{ textAlign: "center", marginTop: "96px" }}>
          Services We Offer
        </h4>
        <div style={{ marginTop: "50px", fontSize: "23px" }} id="services">
          <ul>
            <b>Add User API:</b>
            <li>
              {" "}
              Description: This API is used to add a new user to the system.
            </li>
            <li>
              {" "}
              Input: It expects a JSON object containing user details such as
              full name, address, email, mobile number, gender, and password.
            </li>
          </ul>
          <ul>
            <b>Update User API:</b>{" "}
            <li>
              Description: This API is used to update the details of an existing
              user.
            </li>
            <li>
              {" "}
              Input: It expects a JSON object containing updated user details,
              including the user's email for identification.
            </li>
          </ul>
          <ul>
            <b>Get AllUsers API:</b>
            <li>
              {" "}
              Description: This API is used to retrieve the details of all users
              in the system.
            </li>
            <li> Input: It doesn't require any input parameters.</li>
          </ul>
          <ul>
            <b>Login API:</b>
            <li>
              {" "}
              Description: This API is used for user authentication and login.
            </li>
            <li>
              {" "}
              Input: It expects a JSON object containing the user's email and
              password.
            </li>
          </ul>
          <ul>
            <b>Update Password API:</b>{" "}
            <li>
              Description: This API is used to update the password of an
              existing user.
            </li>{" "}
            <li>
              Input: It expects a JSON object containing the user's ID and new
              password.
            </li>
          </ul>
          <ul>
            <b>Get User By Gender API:</b>{" "}
            <li>
              Description: This API is used to retrieve the details of users
              based on their gender.
            </li>{" "}
            <li>Input: It expects the gender as a path parameter. </li>
          </ul>
          <ul>
            <b>Validate User If He Eligible For Voter Card API:</b>{" "}
            <li>
              Description: This API is used to determine if a user is eligible
              to receive a voter card based on their age.
            </li>{" "}
            <li>
              Input: It expects the user's mobile number as a path parameter.
            </li>
          </ul>
          <ul>
            <b>Get List Of Users Based On Email Verification API:</b>{" "}
            <li>
              Description: This API is used to retrieve a list of users based on
              their email verification status.
            </li>{" "}
            <li>
              Input: It expects the email verification status as a path
              parameter.{" "}
            </li>
          </ul>
          <ul>
            <b>Get User By Mobile API:</b>{" "}
            <li>
              Description: This API is used to retrieve the details of a user
              based on their mobile number.
            </li>{" "}
            <li>Input: It expects the mobile number as a path parameter.</li>
          </ul>
          <ul>
            <b>Delete User By Mobile API:</b>
            <li>
              Description: This API is used to delete a user based on their
              mobile number.
            </li>{" "}
            <li style={{ marginBottom: "100px" }}>
              Input: It expects the mobile number as a path parameter.
            </li>
          </ul>
        </div>
      </Home>
      <Footer id="footer" />
    </>
  );
};

export default Dashboard;
