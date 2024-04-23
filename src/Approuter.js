import React, { useState, useEffect } from "react";
import Empfunc from "./employeedetails";
import EditEmployee from "./EditEmployee";
import PositionDetails from "./Position";
import Login from "./login";
import CreatePosition from "./CreatePosition";
import Getinterviewdetails from "./Getinterview";
import HomePage2 from "./HomePage2";
import TimeSheet from "./TimeSheet";
import RegisterUser from "./RegisterUser";
import Payslipdetails from "./Payslipdetails";
import GetAllAttendance from "./GetAllAttendance";
import CreateExpense from "./CreateExpense";
import EditExpenses from "./EditExpenses";
import CreateInterview from "./CreateInterviewDetails";
import Capex from "./Capex";
import ClientInfoTable from "./GetClientInfo";
import Saveclientinfo from "./PostClientInfo";
import EditClient from "./EditClient";
import NewpassForm from "./NewpassForm";
import ForgotPassword from "./Forgotpass";
import SaveClientFormik from "./createclientformik";
import Getallexpenses from "./GetAllExpenses";
import AppNavbar from "./Navbar2";
import ChangepasswordForm from "./ChangePassword";
import CandidateDetails from "./GetCandidatedetails";
import InterviewCandidate from "./CreateCandidatedetails";
import GetAllEmpAttendance from "./GetAllEmpAttendance";
import EditCandidate from "./EditCandidate";
import EditInterviewDetails from "./EditInterviewDetails";
import LeaveTest from "./Leave";
import { Route, Routes } from "react-router-dom";
import SideBar from "./SideBarComponents/SideBar";
import GetAllPrEngagement from "./GetAllPrEngagement";
import EmployeeSalary from "./EmployeeSalary";
import HolidayCalender from "./HolidayCalender";
import EditHolidayCalender from "./EditHolidayCalender";
import EditAssets from "./EditAssets";
import GetAllAssets from "./GetAllAssets";
import CreateEmpAssets from "./CreateEmpAssets";
import CreateProjEng from "./CreateProjEng";
import EditprojEng from "./EditprojEng";
import SearchEmpAssets from "./SearchEmpAssets";
import SaveGstinvoice from "./SaveGstinvoice";
import HomePage from "./HomePage";
import MyProfileDetails from "./MyProfileDetails";
import Footer from "./Footer";
import EmpPersonalDetail from "./EmpPersonalDetail";
import GetGstDetails from './GetGstDetails'

const Approuter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const empId = localStorage.getItem("EmpID");
    setIsLoggedIn(empId !== null);
  }, []); // Runs only once on component mount

  return (
    <div>
      <AppNavbar />
      {isLoggedIn && (
        <div>
          <SideBar>
            <Routes>
              <Route path="/" element={<HomePage2 />} />
              <Route path="/Leave" element={<LeaveTest />} />
              <Route path="/empfunc" element={<Empfunc />} />
              <Route path="/positiondetails" element={<PositionDetails />} />
              <Route path="/Createposition" element={<CreatePosition />} />
              
              <Route
                path="/getinterviewdetails"
                element={<Getinterviewdetails />}
              />
              <Route path="/TimeSheet" element={<TimeSheet />} />
              {/* <Route path="/RegisterUser" element={<RegisterUser />} /> */}
              <Route path="/payslip" element={<Payslipdetails />} />
              <Route
                path="/GetAllEmpAttendance"
                element={<GetAllEmpAttendance />}
              />
              <Route
                path="/getallempattendence"
                element={<GetAllAttendance />}
              />
              <Route path="/createExpense" element={<CreateExpense />} />
              <Route path="/editexpenses/:id" element={<EditExpenses />} />
              <Route path="/EditCandidate/:id" element={<EditCandidate />} />
              <Route path="/EditEmployee/:id" element={<EditEmployee />} />
              <Route
                path="/EditInterviewDetails/:id/:id2"
                element={<EditInterviewDetails />}
              />
              <Route path="/EditClient/:id" element={<EditClient />} />
              <Route path="/createinterview" element={<CreateInterview />} />
              <Route path="/Getclientinfo" element={<ClientInfoTable />} />
              <Route path="/PostClientInfo" element={<Saveclientinfo />} />
              <Route
                path="/createClientformik"
                element={<SaveClientFormik />}
              />
              <Route path="/Capex" element={<Capex />} />
              {/* <Route path="/ForgotPassword" element={<ForgotPassword />} /> */}
              <Route path="/NewpassForm" element={<NewpassForm />} />
              <Route path="/Getallexpenses" element={<Getallexpenses />} />
              {/* <Route
                path="/ChangepasswordForm"
                element={<ChangepasswordForm />}
              /> */}
              <Route path="/getcandidate" element={<CandidateDetails />} />
              <Route path="/createCandidate" element={<InterviewCandidate />} />
              <Route
                path="/GetAllPrEngagement"
                element={<GetAllPrEngagement />}
              />
              <Route path="/EditprojEng/:id" element={<EditprojEng />} />
              <Route path="/CreateProjEng" element={<CreateProjEng />} />
              <Route path="/EmployeeSalary" element={<EmployeeSalary />} />
              <Route path="/HolidayCalender" element={<HolidayCalender />} />
              <Route
                path="/EditHolidayCalender"
                element={<EditHolidayCalender />}
              />
              <Route path="/GetAllAssets" element={<GetAllAssets />} />
              <Route path="/CreateEmpAssets" element={<CreateEmpAssets />} />
              <Route path="/EditAssets/:id" element={<EditAssets />} />
              <Route path="/SearchEmpAssets" element={<SearchEmpAssets />} />
              <Route path="/Gstinvoice" element={<SaveGstinvoice />} />
              <Route path="/personal-details/:id" element={<EmpPersonalDetail />} />
              <Route path="/MyProfileDetails" element={<MyProfileDetails />} />
              <Route path="/GetGstDetails" element={<GetGstDetails />} />
            </Routes>
          </SideBar>
        </div>

      )}
      {!isLoggedIn && (
        <Routes> 
          <Route path="/" element={<HomePage />} />
        </Routes>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/RegisterUser" element={<RegisterUser />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ChangepasswordForm" element={<ChangepasswordForm />}/>
        
      </Routes>
      {/* <Footer/> */}
    </div>
  );
};
export default Approuter;

// import React, { useState, useEffect } from "react";
// import { Route, Routes } from "react-router-dom";
// import SideBar from "./SideBarComponents/SideBar";
// import AppNavbar from "./Navbar2";
// import Empfunc from "./employeedetails";
// import EditEmployee from "./EditEmployee";
// import PositionDetails from "./Position";
// import Login from "./login";
// import CreatePosition from "./CreatePosition";
// import Getinterviewdetails from "./Getinterview";
// import HomePage2 from "./HomePage2";
// import TimeSheet from "./TimeSheet";
// import RegisterUser from "./RegisterUser";
// import Payslipdetails from "./Payslipdetails";
// import GetAllAttendance from "./GetAllAttendance";
// import CreateExpense from "./CreateExpense";
// import EditExpenses from "./EditExpenses";
// import CreateInterview from "./CreateInterviewDetails";
// import Capex from "./Capex";
// import ClientInfoTable from "./GetClientInfo";
// import Saveclientinfo from "./PostClientInfo";
// import EditClient from "./EditClient";
// import NewpassForm from "./NewpassForm";
// import ForgotPassword from "./Forgotpass";
// import SaveClientFormik from "./createclientformik";
// import Getallexpenses from "./GetAllExpenses";
// import ChangepasswordForm from "./ChangePassword";
// import CandidateDetails from "./GetCandidatedetails";
// import InterviewCandidate from "./CreateCandidatedetails";
// import GetAllEmpAttendance from "./GetAllEmpAttendance";
// import EditCandidate from "./EditCandidate";
// import EditInterviewDetails from "./EditInterviewDetails";
// import LeaveTest from "./Leave";
// import EmployeeSalary from "./EmployeeSalary";
// import HolidayCalender from "./HolidayCalender";
// import EditHolidayCalender from "./EditHolidayCalender";
// import EditAssets from "./EditAssets";
// import GetAllAssets from "./GetAllAssets";
// import CreateEmpAssets from "./CreateEmpAssets";
// import CreateProjEng from "./CreateProjEng";
// import EditprojEng from "./EditprojEng";
// import SearchEmpAssets from "./SearchEmpAssets";
// import Gstinvoice from "./Gstinvoice";
// import GetAllPrEngagement from "./GetAllPrEngagement";
// import Footer from "./Footer";

// const Approuter = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const empId = localStorage.getItem("EmpID");
//     setIsLoggedIn(empId !== null);
//   }, []); // Runs only once on component mount

//   return (
//     <div>
//       <AppNavbar></AppNavbar>
//       {isLoggedIn && <SideBar />}
//       <Routes>
//         <Route path="/" element={<HomePage2 />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="/Leave" element={<LeaveTest />} />
//         <Route path="/empfunc" element={<Empfunc />} />
//         <Route path="/positiondetails" element={<PositionDetails />} />
//         <Route path="/Createposition" element={<CreatePosition />} />
//         <Route path="/getinterviewdetails" element={<Getinterviewdetails />} />
//         <Route path="/TimeSheet" element={<TimeSheet />} />
//         <Route path="/RegisterUser" element={<RegisterUser />} />
//         <Route path="/payslip" element={<Payslipdetails />} />
//         <Route path="/GetAllEmpAttendance" element={<GetAllEmpAttendance />} />
//         <Route path="/getallempattendence" element={<GetAllAttendance />} />
//         <Route path="/createExpense" element={<CreateExpense />} />
//         <Route path="/editexpenses/:id" element={<EditExpenses />} />
//         <Route path="/EditCandidate/:id" element={<EditCandidate />} />
//         <Route path="/EditEmployee/:id" element={<EditEmployee />} />
//         <Route
//           path="/EditInterviewDetails/:id/:id2"
//           element={<EditInterviewDetails />}
//         />
//         <Route path="/EditClient/:id" element={<EditClient />} />
//         <Route path="/createinterview" element={<CreateInterview />} />
//         <Route path="/Getclientinfo" element={<ClientInfoTable />} />
//         <Route path="/PostClientInfo" element={<Saveclientinfo />} />
//         <Route path="/createClientformik" element={<SaveClientFormik />} />
//         <Route path="/Capex" element={<Capex />} />
//         <Route path="/ForgotPassword" element={<ForgotPassword />} />
//         <Route path="/NewpassForm" element={<NewpassForm />} />
//         <Route path="/Getallexpenses" element={<Getallexpenses />} />
//         <Route path="/ChangepasswordForm" element={<ChangepasswordForm />} />
//         <Route path="/getcandidate" element={<CandidateDetails />} />
//         <Route path="/createCandidate" element={<InterviewCandidate />} />
//         <Route path="/GetAllPrEngagement" element={<GetAllPrEngagement />} />
//         <Route path="/EditprojEng/:id" element={<EditprojEng />} />
//         <Route path="/CreateProjEng" element={<CreateProjEng />} />
//         <Route path="/EmployeeSalary" element={<EmployeeSalary />} />
//         <Route path="/HolidayCalender" element={<HolidayCalender />} />
//         <Route path="/EditHolidayCalender" element={<EditHolidayCalender />} />
//         <Route path="/GetAllAssets" element={<GetAllAssets />} />
//         <Route path="/CreateEmpAssets" element={<CreateEmpAssets />} />
//         <Route path="/EditAssets/:id" element={<EditAssets />} />
//         <Route path="/SearchEmpAssets" element={<SearchEmpAssets />} />
//         <Route path="/Gstinvoice" element={<Gstinvoice />} />
//       </Routes>
//     </div>
//   );
// };

// export default Approuter;
