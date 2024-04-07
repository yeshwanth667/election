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
import Navbar from "./components/Navbar";
import Footer from './components/Footer'


function App() {
  
  return (
    <>
    <BrowserRouter>
  
      <Routes>
        <Route path='/' element= {<Login />}/>
        <Route path="/search" element={<Search />} />
        <Route path="/edit" element={<Search />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/genderbased" element={<Genderbased />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/getallusers" element={<GetAllUsers />} />
        <Route path='/updatepassword/:userId' element={<UpdatePassword />} />
        <Route path='/emailverify/:email' element={<EmailVerify />} />
        <Route path='/about' element={<About />} />
        <Route path='/emailstatus' element={<EmailStatus />} />
        <Route path='/card' element={<Card />} />
        {/* <Route path='/footer' element={<Footer />} /> */}
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
    </>
  );
}

export default App;
