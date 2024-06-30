// import React, { useState } from 'react';
// import './Sidebar.css';
// import { Link } from 'react-router-dom';
// import { FaUsers } from "react-icons/fa";
// import { TbGenderEpicene } from "react-icons/tb";
// import { MdDelete } from "react-icons/md";
// import { FaSearch } from "react-icons/fa";
// import { GrStatusGood } from "react-icons/gr";
// import { FaRegFilePdf } from "react-icons/fa6";

// function Sidebar({ isOpen }) {
//   const [expanded, setExpanded] = useState(true);

//   const toggleSidebar = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <>
//     <button className="toggle-btn btn btn-primary" onClick={toggleSidebar}>
//         Toggle Sidebar
//       </button>
//     <nav  id="sidebarMenu" className={`sidebar ${isOpen ? 'show' : ''}`}>
       
//       <div style={{position:'sticky',top:'18%'}} >
//         <div className="list-group list-group-flush mx-3 mt-4">
//           {/* Collapse 1 */}
//           <a className="list-group-item list-group-item-action py-2 ripple" aria-current="true"
//             onClick={toggleSidebar} aria-expanded={expanded ? 'true' : 'false'}
//             aria-controls="collapseExample1">
//             <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Expanded menu</span>
//           </a>
//           {/* Collapsed content */}
//           <ul id="collapseExample1" className={`collapse ${expanded ? 'show' : ''} list-group list-group-flush`}>
//             <li className="list-group-item py-1">
//               <Link to='/genderbased' className="text-decoration-none"><TbGenderEpicene /> Gender Based</Link>
//             </li>
//             <li className="list-group-item py-1 ">
//               <Link to='/getallusers' className="text-decoration-none"><FaUsers /> Get all Users</Link>
//             </li>
//             <li className="list-group-item py-1">
//               <Link to='/delete' className="text-decoration-none"><MdDelete /> Delete Contact</Link>
//             </li>
//             <li className="list-group-item py-1">
//               <Link to='/search' className="text-decoration-none"><FaSearch /> Search and Update Contact</Link>
//             </li>
//             <li className="list-group-item py-1">
//               <Link to='/emailstatus' className="text-decoration-none"><GrStatusGood /> Email Status Report</Link>
//             </li>
//             <li className="list-group-item py-1">
//               <Link to='/card' className="text-decoration-none"><FaRegFilePdf /> Verify Person for Voter card</Link>
//             </li>
//           </ul>
//           {/* Collapse 1 */}
//         </div>
//       </div>
//     </nav>
//     </>
//   );
// }

// export default Sidebar;

import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";
import { TbGenderEpicene } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { FaRegFilePdf } from "react-icons/fa6";
import { VscThreeBars } from "react-icons/vsc";

function Sidebar({ isOpen }) {
  const [expanded, setExpanded] = useState(true);


  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <button className="toggle-btn btn btn-danger" onClick={toggleSidebar}>
      <VscThreeBars />
      </button>
      <nav id="sidebarMenu" style={{backgroundImage: 'linear-gradient(to bottom right, #4e73df, #8da6df)',marginTop:'80px'}} className={`sidebar ${expanded ? 'show' : 'hide'}`}>
        <div style={{ position: 'sticky', top: '18%' }}>
          <div className="list-group list-group-flush mx-3 mt-4">
            <a className="list-group-item list-group-item-action py-2 ripple" aria-current="true"
              onClick={toggleSidebar} aria-expanded={expanded ? 'true' : 'false'}
              aria-controls="collapseExample1">
              <i className="fas fa-tachometer-alt fa-fw  me-3"></i><span>Menu bar</span>
            </a>
            <ul id="collapseExample1" className={`collapse ${expanded ? 'show' : ''} list-group list-group-flush`}>
              <li  className="list-group-item py-1">
                <Link  to='/genderbased' className="text-decoration-none"><TbGenderEpicene /> Gender Based</Link>
              </li>
              <li className="list-group-item py-1 ">
                <Link to='/getallusers' className="text-decoration-none"><FaUsers /> Get all Users</Link>
              </li>
              <li className="list-group-item py-1">
                <Link to='/delete' className="text-decoration-none"><MdDelete /> Delete Contact</Link>
              </li>
              <li className="list-group-item py-1">
                <Link to='/search' className="text-decoration-none"><FaSearch /> Search and Update Contact</Link>
              </li>
              <li className="list-group-item py-1">
                <Link to='/emailstatus' className="text-decoration-none"><GrStatusGood /> Email Status Report</Link>
              </li>
              <li className="list-group-item py-1">
                <Link to='/card' className="text-decoration-none"><FaRegFilePdf /> Verify Person for Voter card</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
