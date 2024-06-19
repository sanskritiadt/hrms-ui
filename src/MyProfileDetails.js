// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Nav,
//   NavItem,
//   NavLink,
//   TabContent,
//   TabPane,
// } from "reactstrap";
// import axios from 'axios'
// import { Link } from "react-router-dom";
// import EmpPersonalDetail from "./EmpPersonalDetail";

// export default function MyProfileDetails() {

//   const token = localStorage.getItem("response-token");
//   const EmpId = localStorage.getItem("EmpID");
//   const [activeTab, setActiveTab] = useState("home");
//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);

//   const toggleTab = (tab) => {
//     if (activeTab !== tab) setActiveTab(tab);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setScreenWidth(window.innerWidth);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);

//       axios.get(`/apigateway/hrms/employee/getById/${EmpId}`,{
//           headers:{
//           'Authorization' : `Bearer ${token}`
//       }}).then((response)=>{
//           console.log(response.data);
//           console.log("emp personal data");
//       }).catch((error)=>{
//           console.log(error);
//       })
//       }
//   },  []);

//   return (
//     <div style={{ width: screenWidth - 70 }}>
//       <div id="Nav" className="p-2 d-flex flex-row justify-content-evenly">
//         <Nav nav nav-tabs className=" p-3 mx-auto shadow-lg rounded-4 d-flex  justify-content-evenly" style={{width:'40rem'}}>
//           <NavItem >
//          <NavLink
//               tag={Link}
//               to={`/personal-details/${EmpId}`}
//               onClick={(e) => {
//                 e.preventDefault(); // Prevent default behavior
//                 toggleTab('home');
//               }}
//               className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
//             >
//               Personal Details
//             </NavLink>
//           </NavItem>
//           <NavItem>
//             <NavLink
//               href="#"
//               onClick={() => toggleTab("menu1")}
//               active={activeTab === "menu1"}
//             >
//               Payroll
//             </NavLink>
//           </NavItem>
//           <NavItem>
//             <NavLink
//               href="#"
//               onClick={() => toggleTab("menu2")}
//               active={activeTab === "menu2"}
//             >
//               Documents
//             </NavLink>
//           </NavItem>
//         </Nav>
//       </div>
//       <Container
//         id="page"
//         className=" d-flex  justify-content-center "
//       >
//         <TabContent
//           className="  d-flex justify-content-center"
//           activeTab={activeTab}
//         >
//           <TabPane tabId="home">
//             <EmpPersonalDetail/>
//           </TabPane>
//           <TabPane tabId="menu1">
//             <p>Content for Payroll tab.</p>
//           </TabPane>
//           <TabPane tabId="menu2">
//             <p>Content for Documents tab.</p>
//           </TabPane>
//         </TabContent>
//       </Container>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab, Container, Box } from "@mui/material";
import EmpPersonalDetail from "./EmpPersonalDetail";
import EmpPayrollDetail from "./EmpPayrollDetails";
import EmpDocuments from "./EmpDocuments";

export default function YourComponent() {
  const [activeTab, setActiveTab] = useState("one");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div style={{ width: screenWidth - 70 }}>
      <Container>
        <Box sx={{ borderBottom: 2, borderColor: 'divider', width: "100%" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="secondary tabs example"
          >
            <Tab value="one" label="Personal Details" />
            <Tab value="two" label="Payroll Details" />
            <Tab value="three" label="Documents" />
          </Tabs>
        </Box>
        <Container>
          {/* Content for each tab */}
          {activeTab === "one" && (
            <div>
              <EmpPersonalDetail />
            </div>
          )}
          {activeTab === "two" && (
            <div>
             <EmpPayrollDetail />
             
            </div>
          )}
          {activeTab === "three" && (
            <div>
              <EmpDocuments/>
              </div>
          )}
        </Container>
      </Container>
    </div>
  );
}
