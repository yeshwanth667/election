// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { apiBaseUrl } from "../apiConfig";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate=useNavigate();
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [formData, setFormData] = useState({

//     mobileNumber: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const {  mobileNumber, password } = formData;

//     const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/;

//     if (!password.match(passwordRegex)) {
//       toast.error("Invalid password");
//       return;
//     }

//     try {
//       const response = await fetch(`${apiBaseUrl}/elections/login`, {
//         method: "POST",
//         body: JSON.stringify(formData),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const resData = await response.json();
//       console.log(resData);

//       if(resData.statusCode===200){
//         toast.success(resData.message)
//         navigate('/getallusers')
//       }
//       else{
//         toast.error(resData.message);
//         return;
//       }

//       // if(resData.success){
//       //   <Link to='/search'></Link>
//       // }
//     //   else{
//     //     toast.success(resData.message);
//     //   }

//       if (!response.ok) {
//         throw new Error(`Failed to update user data`);
//       }
//     } catch (error) {
//       console.error("Error submitting user data:", error);
//     }
//   };

//   const handleTogglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible); // Toggle password visibility
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//       }}
//     >
//       <section
//         classNameName="text-center"
//         style={{ width: "100%", maxWidth: "800px" }}
//       >
//         <div
//           classNameName="p-5 bg-image"
//           style={{
//             backgroundImage:
//               "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
//             height: "300px",
//             backgroundSize: "cover", // Ensure the image covers the entire container
//             backgroundPosition: "center", // Center the image
//           }}
//         ></div>

//         <div
//           classNameName="card mx-4 mx-md-5 shadow-5-strong"
//           style={{
//             marginTop: "-100px",
//             background: "hsla(0, 0%, 100%, 0.8)",
//             backdropFilter: "blur(30px)",
//           }}
//         >
//           <div classNameName="card-body py-5 px-md-5">
//             <div classNameName="row d-flex justify-content-center">
//               <div classNameName="col-lg-8">
//                 <h2 classNameName="fw-bold mb-5">Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div classNameName="mb-4">
//                       <div classNameName="form-outline">
//                         <label classNameName="form-label">Mobile Number</label>
//                         <input
//                           type="number"
//                           id="mobileNumber"
//                           name="mobileNumber"
//                           value={formData.mobileNumber}
//                           onChange={handleChange}
//                           classNameName="form-control"
//                         />
//                       </div>
//                     </div>

//                   <div classNameName="form-outline mb-4">
//                     <label classNameName="form-label">Password</label>
//                     <div classNameName="input-group">
//                       <input
//                         type={passwordVisible ? "text" : "password"}
//                         id="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         classNameName="form-control"
//                       />
//                       <button
//                         classNameName="btn btn-outline-secondary"
//                         type="button"
//                         onClick={handleTogglePasswordVisibility}
//                       >
//                         {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//                       </button>
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     classNameName="btn btn-primary btn-block mb-4"
//                   >
//                     Login
//                   </button>

//                   <div><Link to='/Signup'>Not Registered?? Click here to Signup</Link></div>

//                   <div classNameName="text-center">
//                     <p>or login with:</p>
//                     <button
//                       type="button"
//                       classNameName="btn btn-link btn-floating mx-1"
//                     >
//                       <i classNameName="fab fa-facebook-f"></i>
//                     </button>

//                     <button
//                       type="button"
//                       classNameName="btn btn-link btn-floating mx-1"
//                     >
//                       <i classNameName="fab fa-google"></i>
//                     </button>

//                     <button
//                       type="button"
//                       classNameName="btn btn-link btn-floating mx-1"
//                     >
//                       <i classNameName="fab fa-twitter"></i>
//                     </button>

//                     <button
//                       type="button"
//                       classNameName="btn btn-link btn-floating mx-1"
//                     >
//                       <i classNameName="fab fa-github"></i>
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiBaseUrl } from "../apiConfig";
import { useNavigate,Link } from "react-router-dom";
import pic from "../Assets/pic.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email.includes("@gmail.com")) {
      toast.warning("The email should contain @gmail.com");
      return;
    } 
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (!password.match(passwordRegex)) {
      toast.warning("Password should contain 1 lowercase,1 uppercase and 1 special character");
      return;
    }

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
        sessionStorage.setItem('userName', JSON.stringify(resData.data.fullName));
        sessionStorage.setItem('gender',JSON.stringify(resData.data.gender));
        //sessionStorage.setItem('age',JSON.stringify(resData.data.age))
        sessionStorage.setItem('address',JSON.stringify(resData.data.address))
        sessionStorage.setItem('mobileNumber',JSON.stringify(resData.data.mobileNumber));
        sessionStorage.setItem('email',JSON.stringify(resData.data.email));
        sessionStorage.setItem('userId',JSON.stringify(resData.data.userId));
        sessionStorage.setItem('token',JSON.stringify(resData.data.emailVerificationToken));
        toast.success(resData.message);
        navigate("/dashboard");
      } else {
        toast.error(resData.message);
        return;
      }

      // if(resData.success){
      //   <Link to='/search'></Link>
      // }
      //   else{
      //     toast.success(resData.message);
      //   }

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
    <div style={styles.container}>
      <form
        onSubmit={handleSubmit}
        style={{ border: "1px solid #a39c9c",borderRadius:'10px', padding: "4%", width: "28%" }}
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
              value={formData.email}
              onChange={handleChange}
              className="form-control"
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

        <div className="row mb-4">
          {/* <div className="col d-flex justify-content-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="form2Example31"
                checked
              />
              <label className="form-check-label" for="form2Example31">
                {" "}
                Remember me{" "}
              </label>
            </div>
          </div> */}

          <button type="submit" className="btn btn-primary btn-block mb-4">
            Sign in
          </button>

          <div className="mb-3 text-center"><Link to='/Signup'>Not Registered?? Click here to Signup</Link></div>

          {/* <div className="text-center">
            <a href="#!">Forgot password?</a>
          </div> */}
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
