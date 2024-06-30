import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiBaseUrl } from "../apiConfig";
import { useNavigate, Link } from "react-router-dom";
import pic from "../Assets/pic.jpg";
import { IoReload } from "react-icons/io5";
//import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //const recaptchaRef = React.createRef();

  const generateCaptcha = () => {
    const operations = ["+"];
    const randomOperation =
      operations[Math.floor(Math.random() * operations.length)];
    const randomNum1 = Math.floor(Math.random() * 15);
    const randomNum2 = Math.floor(Math.random() * 15);

    setNum1(randomNum1);
    setNum2(randomNum2);
    setOperation(randomOperation);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormSubmitted(true); // Set form submission status to true
    const { email, password } = formData;

    let isValid = true;

    if (email.length === 0 || password.length === 0 ||captchaAnswer.length===0) {
      toast.warning("Fields must not be empty");
      isValid = false;
    }
    //  else if (!email.includes("@gmail.com")) {
    //   toast.warning("The email should contain @gmail.com");
    //   isValid = false;
    // } 
    else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
      if (!password.match(passwordRegex)) {
        toast.warning(
          "Password should contain 1 lowercase, 1 uppercase, and 1 special character"
        );
        isValid = false;
      }
    }

    let correctAnswer;
    switch (operation) {
      case "+":
        correctAnswer = num1 + num2;
        break;
      // case "-":
      //   correctAnswer = num1 - num2;
      //   break;
      // case "*":
      //   correctAnswer = num1 * num2;
      //   break;
      default:
        correctAnswer = null;
    }

    if (captchaAnswer.length > 0 && parseInt(captchaAnswer) !== correctAnswer) {
      setError("Incorrect CAPTCHA answer");
      generateCaptcha();
      setCaptchaAnswer("");
      setLoading(false);
      return;
    } else {
      // Handle successful login here
      setError("");
      //  alert("Login successful!");
    }

    if (isValid) {
      try {
        const response = await fetch(`${apiBaseUrl}/elections/login`, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const resData = await response.json();
        console.log(resData);

        if (resData.statusCode === 200) {
          // Storing data in session storage
          sessionStorage.setItem(
            "userName",
            JSON.stringify(resData.data.fullName)
          );
          sessionStorage.setItem("gender", JSON.stringify(resData.data.gender));
          sessionStorage.setItem(
            "address",
            JSON.stringify(resData.data.address)
          );
          sessionStorage.setItem(
            "mobileNumber",
            JSON.stringify(resData.data.mobileNumber)
          );
          sessionStorage.setItem("email", JSON.stringify(resData.data.email));
          sessionStorage.setItem("userId", JSON.stringify(resData.data.userId));
          sessionStorage.setItem(
            "token",
            JSON.stringify(resData.data.emailVerificationToken)
          );
          sessionStorage.setItem("age", JSON.stringify(resData.data.age));
          toast.success(resData.message);
          navigate("/dashboard");
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

  // const handleRecaptchaChange = (value) => {
  //   // Handle reCAPTCHA value change
  //   console.log("reCAPTCHA value:", value);
  // };

  return (
    <div style={styles.container}>
      <form
        onSubmit={handleSubmit}
        style={{
          border: "2px solid #a39c9c",
          borderRadius: "10px",
          padding: "4%",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <div style={styles.imageContainer}>
          <img src={pic} alt="login" style={styles.image} />
        </div>
        <p
          style={{
            display: "flex",
            justifyContent: "space-around",
            fontSize: "larger",
            fontWeight: "600",
          }}
        >
          Login to your Account
        </p>
        <div className="mb-4">
          <div className="form-outline">
            <label className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              style={{
                borderColor:
                  formSubmitted && formData.email === "" ? "red" : "",
              }}
            />
          </div>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Password</label>
          <div className="input-group">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              style={{
                borderColor:
                  formSubmitted && formData.password === "" ? "red" : "",
              }}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleTogglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* <div className="mb-2 me-2">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LeIJLspAAAAAAF157JnIeWdy2AUZDbLcvqBy3Cm"
            onChange={handleRecaptchaChange}
          />
        </div> */}

        <div className="form-outline input-group mb-2 me-2">
          <label
            className="form-label"
            style={{ marginTop: "5px", width: "30%" }}
          >
            {num1} {operation} {num2} =
          </label>
          <input
            type="text"
            value={captchaAnswer}
            onChange={(e) => setCaptchaAnswer(e.target.value)}
            className="form-control"
            placeholder="Enter the value"
            style={{
              borderColor:
                formSubmitted && captchaAnswer=== "" ? "red" : "",
            }}
            
          />
          
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={generateCaptcha}
          >
            {<IoReload />}
          </button>
        </div>
        <div style={{marginLeft:'30%',color:'red' }}>{error}</div>
        

        {loading && (
          <p style={{ color: "red", textAlign: "center" }}>Signing in...</p>
        )}
        <div className="row mt-4 mb-4">
          <button
            type="submit"
            style={{ width: "93%", marginLeft: "3%" }}
            className="btn btn-primary btn-block mb-4"
          >
            Sign in
          </button>

          <div className="mb-3 text-center">
            <Link to="/Signup">Not Registered?? Click here to Signup</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: "100px", // Adjust image size as needed
    height: "auto", // To maintain aspect ratio
  },
};

export default Login;

// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { apiBaseUrl } from "../apiConfig";
// import { useNavigate, Link } from "react-router-dom";
// import pic from "../Assets/pic.jpg";

// const Login = () => {
//   const navigate = useNavigate();
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = async (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (name === "email" && formSubmitted) {
//       // Check if the entered email exists in the database
//       try {
//         const response = await fetch(`${apiBaseUrl}/users/check-email/${value}`);
//         const data = await response.json();
//         if (!data.exists) {
//           toast.error("User does not exist");
//           // Clear the password field only if the user doesn't exist
//           setFormData((prevData) => ({ ...prevData, password: "" }));
//         }
//       } catch (error) {
//         console.error("Error checking email:", error);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setFormSubmitted(true); // Set form submission status to true
//     const { email, password } = formData;

//     // Validate email and password
//     let isValid = true;
//     if (email.length === 0 || password.length === 0) {
//       toast.warning("Fields must not be empty");
//       isValid = false;
//     } else if (!email.includes("@gmail.com")) {
//       toast.warning("The email should contain @gmail.com");
//       isValid = false;
//     } else {
//       const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
//       if (!password.match(passwordRegex)) {
//         toast.warning("Password should contain 1 lowercase, 1 uppercase, and 1 special character");
//         isValid = false;
//       }
//     }

//     if (isValid) {
//       // Proceed with form submission
//       try {
//         const response = await fetch(`${apiBaseUrl}/elections/login`, {
//           method: "POST",
//           body: JSON.stringify(formData),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         const resData = await response.json();
//         console.log(resData);

//         if (resData.statusCode === 200) {
//           // Storing data in session storage
//           sessionStorage.setItem("userName", JSON.stringify(resData.data.fullName));
//           sessionStorage.setItem("gender", JSON.stringify(resData.data.gender));
//           sessionStorage.setItem("address", JSON.stringify(resData.data.address));
//           sessionStorage.setItem("mobileNumber", JSON.stringify(resData.data.mobileNumber));
//           sessionStorage.setItem("email", JSON.stringify(resData.data.email));
//           sessionStorage.setItem("userId", JSON.stringify(resData.data.userId));
//           sessionStorage.setItem("token", JSON.stringify(resData.data.emailVerificationToken));
//           sessionStorage.setItem("age", JSON.stringify(resData.data.age));
//           toast.success(resData.message);
//           navigate("/dashboard");
//         } else {
//           toast.error(resData.message);
//         }

//         if (!response.ok) {
//           throw new Error(`Failed to update user data`);
//         }
//       } catch (error) {
//         console.error("Error submitting user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       setLoading(false);
//     }
//   };

//   const handleTogglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible); // Toggle password visibility
//   };

//   return (
//     <div style={styles.container}>
//       <form
//         onSubmit={handleSubmit}
//         style={{
//           border: "2px solid #a39c9c",
//           borderRadius: "10px",
//           padding: "4%",
//           width: "100%",
//           maxWidth: "400px",
//         }}
//       >
//         <div style={styles.imageContainer}>
//           <img src={pic} alt="login" style={styles.image} />
//         </div>
//         <p
//           style={{
//             display: "flex",
//             justifyContent: "space-around",
//             fontSize: "larger",
//             fontWeight: "600",
//           }}
//         >
//           Login to your Account
//         </p>
//         <div className="mb-4">
//           <div className="form-outline">
//             <label className="form-label">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="form-control"
//               value={formData.email}
//               onChange={handleChange}
//               style={{ borderColor: formSubmitted && formData.email === "" ? "red" : "" }}
//             />
//           </div>
//         </div>

//         <div className="form-outline mb-4">
//           <label className="form-label">Password</label>
//           <div className="input-group">
//             <input
//               type={passwordVisible ? "text" : "password"}
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="form-control"
//               style={{ borderColor: formSubmitted && formData.password === "" ? "red" : "" }}
//               disabled={formData.email === ""} // Disable password field if email is empty
//             />
//             <button
//               className="btn btn-outline-secondary"
//               type="button"
//               onClick={handleTogglePasswordVisibility}
//               disabled={formData.email === ""} // Disable toggle button if email is empty
//             >
//               {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>
//         </div>

//         {loading && (
//           <p style={{ color: "red", textAlign: "center" }}>Signing in...</p>
//         )}
//         <div className="row mb-4">
//           <button type="submit" className="btn btn-primary btn-block mb-4">
//             Sign in
//           </button>

//           <div className="mb-3 text-center">
//             <Link to="/Signup">Not Registered?? Click here to Signup</Link>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//   },
//   imageContainer: {
//     display: "flex",
//     justifyContent: "center",
//   },
//   image: {
//     width: "100px", // Adjust image size as needed
//     height: "auto", // To maintain aspect ratio
//   },
// };

// export default Login;
