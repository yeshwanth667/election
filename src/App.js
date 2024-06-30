// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Genderbased from "./components/Genderbased";
// import Login from "./components/Login";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Dashboard from "./components/Dashboard";
// import GetAllUsers from "./components/GetAllUsers";
// import Signup from "./components/Signup";
// import Delete from "./components/Delete";
// import Search from "./components/Search";
// import UpdatePassword from "./components/UpdatePassword";
// import EmailVerify from "./components/EmailVerify";
// import About from "./components/About";
// import EmailStatus from "./components/EmailStatus";
// import Card from "./components/Card";

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/search" element={<Search />} />
//           <Route path="/edit" element={<Search />} />
//           <Route path="/Signup" element={<Signup />} />
//           <Route path="/delete" element={<Delete />} />
//           <Route path="/genderbased" element={<Genderbased />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/getallusers" element={<GetAllUsers />} />
//           <Route path="/updatepassword/:userId" element={<UpdatePassword />} />
//           <Route path="/emailverify/:email" element={<EmailVerify />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/emailstatus" element={<EmailStatus />} />
//           <Route path="/card" element={<Card />} />
//         </Routes>
//         <ToastContainer position="top-center" />
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;

//////////////////////////////////////////////////////////////////////////////////

// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Genderbased from "./components/Genderbased";
// import Login from "./components/Login";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Dashboard from "./components/Dashboard";
// import GetAllUsers from "./components/GetAllUsers";
// import Signup from "./components/Signup";
// import Delete from "./components/Delete";
// import Search from "./components/Search";
// import UpdatePassword from "./components/UpdatePassword";
// import EmailVerify from "./components/EmailVerify";
// import About from "./components/About";
// import EmailStatus from "./components/EmailStatus";
// import Card from "./components/Card";
// import React, { useState, useEffect } from "react";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   const [isServerRunning, setIsServerRunning] = useState(true);

//   useEffect(() => {
//     const checkServerStatus = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:7702/api/elections/checkServerStatus`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const responseData = await response.json();
//         console.log(responseData);

        
//         if (responseData.statusCode===200) {
//           setIsServerRunning(true);
//         } else {
//           setIsServerRunning(false);
//         }
//       } catch (error) {
        
//         setIsServerRunning(false);
//         console.error("Error checking server status:", error);
//       }
//     };

    
//     checkServerStatus();
//     const intervalId = setInterval(checkServerStatus, 180000);
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <>
//       {isServerRunning ? (
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Login />} />
//             <Route path="/search" element={<Search />} />
//             <Route path="/edit" element={<Search />} />
//             <Route path="/Signup" element={<Signup />} />
//             <Route path="/delete" element={<Delete />} />
//             <Route path="/genderbased" element={<Genderbased />} />
//             <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
//             <Route path="/getallusers" element={<GetAllUsers />} />
//             <Route
//               path="/updatepassword/:userId"
//               element={<UpdatePassword />}
//             />
//             <Route path="/emailverify/:email" element={<EmailVerify />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/emailstatus" element={<EmailStatus />} />
//             <Route path="/card" element={<Card />} />
//           </Routes>
//           <ToastContainer position="top-center" />
//         </BrowserRouter>
//       ) : (
//         <div>
//           Service Not Available...,Kindly come back later
//         </div>
//       )}
//     </>
//   );
// }

// export default App;



// ///////////////////////////////////////////////////////////////////////////////////////////


import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Genderbased from "./components/Genderbased";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard";
import GetAllUsers from "./components/GetAllUsers";
import Signup from "./components/Signup";
import Delete from "./components/Delete";
import Search from "./components/Search";
import UpdatePassword from "./components/UpdatePassword";
import EmailVerify from "./components/EmailVerify";
import About from "./components/About";
import EmailStatus from "./components/EmailStatus";
import Card from "./components/Card";
import React, { useState, useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isServerRunning, setIsServerRunning] = useState(true);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:7702/api/elections/checkServerStatus`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData = await response.json();
        console.log(responseData);

        if (responseData.statusCode === 200) {
          setIsServerRunning(true);
        } else {
          setIsServerRunning(false);
        }
      } catch (error) {
        setIsServerRunning(false);
        console.error("Error checking server status:", error);
      }
    };

    checkServerStatus();
    const intervalId = setInterval(checkServerStatus, 180000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {isServerRunning ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/search" element={<ProtectedRoute element={Search} />} />
            <Route path="/edit" element={<ProtectedRoute element={Search} />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/delete" element={<ProtectedRoute element={Delete} />} />
            <Route path="/genderbased" element={<ProtectedRoute element={Genderbased} />} />
            <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
            <Route path="/getallusers" element={<ProtectedRoute element={GetAllUsers} />} />
            <Route path="/updatepassword/:userId" element={<ProtectedRoute element={UpdatePassword} />} />
            <Route path="/emailverify/:email" element={<EmailVerify />} />
            <Route path="/about" element={<ProtectedRoute element={About} />} />
            <Route path="/emailstatus" element={<ProtectedRoute element={EmailStatus} />} />
            <Route path="/card" element={<ProtectedRoute element={Card} />} />
          </Routes>
          <ToastContainer position="top-center" />
        </BrowserRouter>
      ) : (
        <div>Service Not Available..., Kindly come back later</div>
      )}
    </>
  );
}

export default App;
