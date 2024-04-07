import React, { useState } from 'react';
import './Sidebar.css'
import { Link } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";
import { TbGenderEpicene } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { FaRegFilePdf } from "react-icons/fa6";


function Sidebar({isOpen}) {
  const [expanded, setExpanded] = useState(true);
  const [expanded1, setExpanded1] = useState(true);

  //const sidebarClass = isOpen ? "collapse d-lg-block sidebar collapse bg-white show" : "collapse d-lg-block sidebar collapse bg-white";

  return (
    <nav id="sidebarMenu" className={`sidebar ${isOpen ? 'show' : ''}`}>
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3 mt-4">
          {/* Collapse 1 */}
          <a className="list-group-item list-group-item-action py-2 ripple" aria-current="true"
            onClick={() => setExpanded(!expanded)} aria-expanded={expanded ? 'true' : 'false'}
            aria-controls="collapseExample1">
            <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Expanded menu</span>
          </a>
          {/* Collapsed content */}
          <ul id="collapseExample1" className={`collapse ${expanded ? 'show' : ''} list-group list-group-flush`}>
            <li style={{margin:'12px'}} className="list-group-item py-1">
             <Link style={{textDecoration:'none',fontSize:'17px'}} to='/genderbased'><TbGenderEpicene /> Gender Based</Link>
            </li>
            <li style={{margin:'12px'}} className="list-group-item py-1 ">
              <Link style={{textDecoration:'none',fontSize:'17px'}} to='/getallusers'><FaUsers /> Get all Users</Link>
            </li>
            <li style={{margin:'12px'}} className="list-group-item py-1">
              <Link style={{textDecoration:'none',fontSize:'17px'}} to='/delete'><MdDelete /> Delete Contact</Link>
            </li>
            <li style={{margin:'12px'}} className="list-group-item py-1">
              <Link style={{textDecoration:'none',fontSize:'17px'}} to='/search'><FaSearch /> Search Contact</Link>
            </li>
            <li style={{margin:'12px'}} className="list-group-item py-1">
              <Link style={{textDecoration:'none',fontSize:'17px'}} to='/emailstatus'><GrStatusGood /> Email Status Report</Link>
            </li>
            <li style={{margin:'12px'}} className="list-group-item py-1">
              <Link to='/card' style={{textDecoration:'none',fontSize:'17px'}}><FaRegFilePdf /> Verify Person for Voter card</Link>
            </li>
          </ul>
          {/* Collapse 1 */}

          {/* Collapse 2 */}
          {/* <a className="list-group-item list-group-item-action py-2 ripple" aria-current="true"
            onClick={() => setExpanded1(!expanded1)} aria-expanded={expanded1 ? 'true' : 'false'}
            aria-controls="collapseExample2">
            <i className="fas fa-chart-area fa-fw me-3"></i><span>Collapsed menu</span>
          </a> */}
          {/* Collapsed content */}
          {/* <ul id="collapseExample2" className={`collapse ${expanded1 ? 'show' : ''} list-group list-group-flush`}>
            <li className="list-group-item text-primary py-1">
              <Link style={{textDecoration:'none',fontSize:'17px'}} to='/updatepassword' className="text-reset"><MdSecurityUpdateGood /> Update Password</Link>
            </li>
            <li className="list-group-item text-primary py-1">
              <Link style={{textDecoration:'none',fontSize:'18px'}} className="text-reset"><MdLockReset /> Reset Password</Link>
            </li>
          </ul> */}
          {/* Collapse 2 */}
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;


// import React from 'react';
// import './Sidebar.css';
// import { Link } from 'react-router-dom';
// import { FaUsers } from "react-icons/fa";
// import { TbGenderEpicene } from "react-icons/tb";
// import { MdDelete } from "react-icons/md";
// import { FaSearch } from "react-icons/fa";
// import { GrStatusGood } from "react-icons/gr";
// import { FaRegFilePdf } from "react-icons/fa6";

// function Sidebar({ isOpen }) {
//   return (
//     <nav id="sidebarMenu" className={`sidebar ${isOpen ? 'show' : ''}`}>
//       <div className="position-sticky">
//         <div className="list-group list-group-flush mx-3 mt-4">
//           <Link to='/genderbased' className="list-group-item py-1"><TbGenderEpicene /> Gender Based</Link>
//           <Link to='/getallusers' className="list-group-item py-1"><FaUsers /> Get all Users</Link>
//           <Link to='/delete' className="list-group-item py-1"><MdDelete /> Delete Contact</Link>
//           <Link to='/search' className="list-group-item py-1"><FaSearch /> Search Contact</Link>
//           <Link to='/emailstatus' className="list-group-item py-1"><GrStatusGood /> Email Status Report</Link>
//           <Link to='/card' className="list-group-item py-1"><FaRegFilePdf /> Verify Person for Voter card</Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Sidebar;
