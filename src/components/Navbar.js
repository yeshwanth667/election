import React, { useState, useEffect } from "react";
import { useNavigate, Link as Page1 } from "react-router-dom";
import { Link } from "react-scroll";
import { format } from "date-fns";
import Modal from "./Modal";
import "./Navbar.css";
import ECI from "../Assets/ECI.jpg";
import { toast } from "react-toastify";
import pic from "../Assets/pic.jpg";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("");

  const userId1 = sessionStorage.getItem("userId");
  const userId = JSON.parse(userId1);

  const firstName = sessionStorage.getItem("userName");
  const fullName = JSON.parse(firstName);
  const welcomeMessage = fullName ? (
    <strong>Welcome {fullName}!</strong>
  ) : (
    <strong>Welcome Guest!</strong>
  );

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentDate = new Date();
  const formattedDate = format(currentDate, "dd-MMM-yyyy");

  const logoutHandler = () => {
    navigate("/");
    sessionStorage.clear();
    toast.info("Logged out Successfully");
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Navigate to the desired route based on the selected value
    if (selectedValue === "changePassword") {
      navigate(`/updatepassword/${userId}`);
    }
  };

  const handleServicesClick = () => {
    // Navigate to the dashboard
    navigate("/dashboard");

    setTimeout(() => {
      const servicesElement = document.getElementById("services")
      if (servicesElement) {
        servicesElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Adjust the delay as needed
  };

  const handleAboutClick = () => {
    // Navigate to the dashboard
    navigate("/dashboard");
    setTimeout(() => {
      const servicesElement = document.getElementById("dashboard");
      if (servicesElement) {
        servicesElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Adjust the delay as needed
  };

  const handleContactClick = () => {
    // Navigate to the dashboard
    navigate("/dashboard");
    setTimeout(() => {
      const servicesElement = document.getElementById("footer");
      if (servicesElement) {
        servicesElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Adjust the delay as needed
  };

  return (
    <>
      <nav
        style={{ border: "2px solid black" }}
        className="navbar navbar-expand-lg navbar-light bg-white fixed-top "
      >
        <div className="container-fluid">
          {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={()=>toggleSidebar(!isSidebarOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
          <a className="navbar-brand" href="#">
            <img
              src={ECI}
              width="96px"
              height="82px"
              alt="MDB Logo"
              loading="lazy"
            />
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul
              style={{
                backgroundColor: "#ce7d7d",
                marginLeft: "25px",
                height: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
              className="navbar-nav  me-auto w-50"
            >
              <li className="nav-item">
                <Page1
                  activeClass="active"
                  to="/dashboard"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="nav-link"
                >
                  Home
                </Page1>
              </li>
              <li className="nav-item">
                <Link
                  activeClass="active"
                  to="dashboard"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="nav-link"
                  onClick={handleAboutClick}
                  //className={`nav-link ${activeSection === "dashboard" ? "active" : ""} ${isAboutActive ? "about-active" : ""}`}
                  // onSetActive={handleSetActive}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  activeClass="active"
                  to="services"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="nav-link"
                  onClick={handleServicesClick}
                >
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <select
                  style={{
                    marginTop: "4px",
                    backgroundColor: "#ce7d7d",
                    color: "black",
                    fontSize: "18px",
                  }}
                  value={selectedOption}
                  className="form-select"
                  aria-label="More Services"
                  //onChange={(e) => (window.location.href = e.target.value)}
                  onChange={handleChange}
                >
                  <option
                    style={{ backgroundColor: "white", color: "black" }}
                    value="More Services"
                  >
                    More Services
                  </option>
                  <option
                    style={{ backgroundColor: "white", color: "black" }}
                    value="changePassword"
                  >
                    Change Password
                  </option>
                </select>
              </li>
              <li className="nav-item">
                <Link
                  activeClass="footer"
                  to="footer"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="nav-link"
                  onClick={handleContactClick}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li style={{ textAlign: "center" }} className="nav-item">
                <div className="me-3">{welcomeMessage}</div>
                <div
                  style={{ color: "black", fontSize: "17px" }}
                  className="nav-link"
                >
                  <b>
                    {[formattedDate]} [{time.toLocaleTimeString()}]{" "}
                  </b>
                </div>
              </li>
              <li className="nav-item text-center">
                <img
                  src={pic}
                  className="mt-1"
                  style={{ width: "30px", height: "30px", cursor: "pointer" }}
                  alt="contact"
                  onClick={toggleModal}
                />
                <div>Your Profile</div>
              </li>
              <li className="nav-item">
                <button
                  onClick={logoutHandler}
                  className="btn btn-danger ms-lg-3"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={toggleModal} />
        {/* <Dashboard isAboutActive={isAboutActive} /> */}
        {/* <Dashboard highlighted={highlighted} /> */}
      </nav>
    </>
  );
}

export default Navbar;
