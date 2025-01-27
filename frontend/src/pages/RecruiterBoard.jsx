// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Recruiter/Sidebar";

// const RecruiterBoard = () => {
//   return (
//     <div className="flex h-screen overflow-hidden">
//       <Sidebar />
//       <div className="flex-1 h-full overflow-y-auto hideScroll">
//         <Outlet/>
//       </div>
//     </div>
//   );
// };

// export default RecruiterBoard;

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Recruiter/Sidebar";
import { Button } from "primereact/button";
import { FaBars } from "react-icons/fa";

const RecruiterBoard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`fixed inset-y-0 left-0 z-40 transform bg-white shadow-lg transition-transform duration-300 md:relative md:translate-x-0 md:flex ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      <div className="flex-1 h-full overflow-y-auto hideScroll">
        {/* <div className="md:hidden fixed top-4 left-4 z-30">
          <button onClick={toggleSidebar}>
            <FaBars/>
          </button>
        </div> */}

        <Outlet context={{ toggleSidebar }} />
      </div>

      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default RecruiterBoard;

