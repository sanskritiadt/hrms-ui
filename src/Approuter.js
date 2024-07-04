// import React, { useState, useEffect } from "react";
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
// import AppNavbar from "./Navbar2";
// import ChangepasswordForm from "./ChangePassword";
// import CandidateDetails from "./GetCandidatedetails";
// import InterviewCandidate from "./CreateCandidatedetails";
// import GetAllEmpAttendance from "./GetAllEmpAttendance";
// import EditCandidate from "./EditCandidate";
// import EditInterviewDetails from "./EditInterviewDetails";
// import LeaveTest from "./Leave";
// import { Route, Routes } from "react-router-dom";
// import SideBar from "./SideBarComponents/SideBar";
// import GetAllPrEngagement from "./GetAllPrEngagement";
// import EmployeeSalary from "./EmployeeSalary";
// import HolidayCalender from "./HolidayCalender";
// import EditHolidayCalender from "./EditHolidayCalender";
// import EditAssets from "./EditAssets";
// import GetAllAssets from "./GetAllAssets";
// import CreateEmpAssets from "./CreateEmpAssets";
// import CreateProjEng from "./CreateProjEng";
// import EditprojEng from "./EditprojEng";
// import SearchEmpAssets from "./SearchEmpAssets";
// import SaveGstinvoice from "./SaveGstinvoice";
// import HomePage from "./HomePage";
// import MyProfileDetails from "./MyProfileDetails";
// import Footer from "./Footer";
// import EmpPersonalDetail from "./EmpPersonalDetail";
// import GetGstDetails from './GetGstDetails';
// import EditGstDetails from './EditGstDetails';
// import PriorTimeAdj from './PriorTimeAdj';
// import CreatePayslip from './CreatePayslip';
// import UpdatePayrollSalary from "./UpdatePayrollSalary";
// import ManageRoles from "./ManageRoles";
// import EditPosition from "./EditPosition";
// import { useSelector } from 'react-redux';
// const Approuter = () => {
//   const  empId = useSelector((state) => state.auth.empId);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   console.log("empId",empId)

//   useEffect(() => {
//     console.log("empId",empId)
//    // const empId = localStorage.getItem("EmpID");
//     setIsLoggedIn(empId !== null);
//   }, []); 

//   return (
//     <div>
//       <AppNavbar />
//       {isLoggedIn && (
//         <div>
//           <SideBar>
//             <Routes>
//               <Route path="/" element={<HomePage2 />} />
//               <Route path="/Leave" element={<LeaveTest />} />
//               <Route path="/empfunc" element={<Empfunc />} />
//               <Route path="/positiondetails" element={<PositionDetails />} />
//               <Route path="/Createposition" element={<CreatePosition />} />
              
//               <Route
//                 path="/getinterviewdetails"
//                 element={<Getinterviewdetails />}
//               />
//               <Route path="/TimeSheet" element={<TimeSheet />} />
//               {/* <Route path="/RegisterUser" element={<RegisterUser />} /> */}
//               <Route path="/payslip" element={<Payslipdetails />} />
//               <Route
//                 path="/GetAllEmpAttendance"
//                 element={<GetAllEmpAttendance />}
//               />
//               <Route
//                 path="/getallempattendence"
//                 element={<GetAllAttendance />}
//               />
//               <Route path="/createExpense" element={<CreateExpense />} />
//               <Route path="/editexpenses/:id" element={<EditExpenses />} />
//               <Route path="/EditCandidate/:id" element={<EditCandidate />} />
//               <Route path="/EditEmployee/:id" element={<EditEmployee />} />
//               <Route path="/EditGstDetails/:id" element={<EditGstDetails />} />
//               <Route
//                 path="/EditInterviewDetails/:id/:id2"
//                 element={<EditInterviewDetails />}
//               />
//               <Route path="/EditClient/:id" element={<EditClient />} />
//               <Route path="/createinterview" element={<CreateInterview />} />
//               <Route path="/Getclientinfo" element={<ClientInfoTable />} />
//               <Route path="/PostClientInfo" element={<Saveclientinfo />} />
//               <Route
//                 path="/createClientformik"
//                 element={<SaveClientFormik />}
//               />
//               <Route path="/Capex" element={<Capex />} />
//               {/* <Route path="/ForgotPassword" element={<ForgotPassword />} /> */}
//               <Route path="/NewpassForm" element={<NewpassForm />} />
//               <Route path="/Getallexpenses" element={<Getallexpenses />} />
//               <Route path="/ChangepasswordForm" element={<ChangepasswordForm />}/>
//               <Route path="/getcandidate" element={<CandidateDetails />} />
//               <Route path="/createCandidate" element={<InterviewCandidate />} />
//               <Route
//                 path="/GetAllPrEngagement"
//                 element={<GetAllPrEngagement />}
//               />
//               <Route path="/EditprojEng/:id" element={<EditprojEng />} />
//               <Route path="/CreateProjEng" element={<CreateProjEng />} />
//               <Route path="/EmployeeSalary" element={<EmployeeSalary />} />
//               <Route path="/HolidayCalender" element={<HolidayCalender />} />
//               <Route
//                 path="/EditHolidayCalender"
//                 element={<EditHolidayCalender />}
//               />
//               <Route path="/GetAllAssets" element={<GetAllAssets />} />
//               <Route path="/CreateEmpAssets" element={<CreateEmpAssets />} />
//               <Route path="/EditAssets/:id" element={<EditAssets />} />
//               <Route path="/SearchEmpAssets" element={<SearchEmpAssets />} />
//               <Route path="/Gstinvoice" element={<SaveGstinvoice />} />
//               <Route path="/personal-details/:id" element={<EmpPersonalDetail />} />
//               <Route path="/MyProfileDetails" element={<MyProfileDetails />} />
//               <Route path="/GetGstDetails" element={<GetGstDetails />} />
//               <Route path="/PriorTimeAdj" element={<PriorTimeAdj />} />
//               <Route path="/CreatePayslip" element={<CreatePayslip />} />
//               <Route path="/UpdatePayrollSalary/:id" element={<UpdatePayrollSalary />} />
//               <Route path="/ManageRoles" element={<ManageRoles />} />
//               <Route path="/EditPosition/:id" element={<EditPosition />} />
//             </Routes>
//           </SideBar>
//         </div>

//       )}
//       {!isLoggedIn && (
//         <Routes> 
//           <Route path="/" element={<HomePage />} />
//         </Routes>
//       )}
//       <Routes>
//         <Route path="/login" element={<Login/>} />
//         <Route path="/RegisterUser" element={<RegisterUser />} />
//         <Route path="/ForgotPassword" element={<ForgotPassword />} />
//         {/* <Route path="/EmployeeSalary" element={<EmployeeSalary />} /> */}
//       </Routes>
//       {!isLoggedIn && <Footer />}
//     </div>
//   );
// };
// export default Approuter;



import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
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
import GetGstDetails from './GetGstDetails';
import EditGstDetails from './EditGstDetails';
import PriorTimeAdj from './PriorTimeAdj';
import CreatePayslip from './CreatePayslip';
import UpdatePayrollSalary from "./UpdatePayrollSalary";
import ManageRoles from "./ManageRoles";
import EditPosition from "./EditPosition";
import AddAppraisalDetails from './AddAppraisalDetails';
import GetAllEmpAppraisalDetails from './GetAllEmpAppraisalDetails';
import ViewSalaryDetails from './ViewSalaryDetails'
const Approuter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const empId = useSelector((state) => state.auth.empId);

  useEffect(() => {
    setIsLoggedIn(empId !== null);
  }, [empId]);

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
              <Route path="/EditGstDetails/:id" element={<EditGstDetails />} />
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
              <Route path="/NewpassForm" element={<NewpassForm />} />
              <Route path="/Getallexpenses" element={<Getallexpenses />} />
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
              <Route path="/PriorTimeAdj" element={<PriorTimeAdj />} />
              <Route path="/CreatePayslip" element={<CreatePayslip />} />
              <Route path="/UpdatePayrollSalary/:id" element={<UpdatePayrollSalary />} />
              <Route path="/ManageRoles" element={<ManageRoles />} />
              <Route path="/EditPosition/:id" element={<EditPosition />} />
              <Route path="/RegisterUser" element={<RegisterUser />} />
              <Route path="/AddAppraisalDetails" element={<AddAppraisalDetails />} />
              <Route path="/GetAllEmpAppraisalDetails" element={<GetAllEmpAppraisalDetails />} />
              <Route path="/view-salary-details/:id" element={<ViewSalaryDetails />} />
              <Route path="/ChangepasswordForm" element={<ChangepasswordForm />} />
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
        {/* <Route path="/RegisterUser" element={<RegisterUser />} /> */}
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/NewpassForm" element={<NewpassForm />} />
      </Routes>
      {!isLoggedIn && <Footer />}
    </div>
  );
};

export default Approuter;


// import React, { useState, useEffect } from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import { useSelector } from 'react-redux';

// import AppNavbar from "./Navbar2";
// import Footer from "./Footer";
// import SideBar from "./SideBarComponents/SideBar";
// import HomePage from "./HomePage";
// import HomePage2 from "./HomePage2";
// import Login from "./login";
// import RegisterUser from "./RegisterUser";
// import ForgotPassword from "./Forgotpass";
// import ProtectedRoute from './ProtectedRoute';

// // Import your components here
// import Empfunc from "./employeedetails";
// import EditEmployee from "./EditEmployee";
// import PositionDetails from "./Position";
// import CreatePosition from "./CreatePosition";
// import Getinterviewdetails from "./Getinterview";
// import TimeSheet from "./TimeSheet";
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
// import SaveClientFormik from "./createclientformik";
// import Getallexpenses from "./GetAllExpenses";
// import ChangepasswordForm from "./ChangePassword";
// import CandidateDetails from "./GetCandidatedetails";
// import InterviewCandidate from "./CreateCandidatedetails";
// import GetAllEmpAttendance from "./GetAllEmpAttendance";
// import EditCandidate from "./EditCandidate";
// import EditInterviewDetails from "./EditInterviewDetails";
// import LeaveForm from "./Leave";
// import GetAllPrEngagement from "./GetAllPrEngagement";
// import EmployeeSalary from "./EmployeeSalary";
// import HolidayCalender from "./HolidayCalender";
// import EditHolidayCalender from "./EditHolidayCalender";
// import EditAssets from "./EditAssets";
// import GetAllAssets from "./GetAllAssets";
// import CreateEmpAssets from "./CreateEmpAssets";
// import CreateProjEng from "./CreateProjEng";
// import EditprojEng from "./EditprojEng";
// import SearchEmpAssets from "./SearchEmpAssets";
// import SaveGstinvoice from "./SaveGstinvoice";
// import MyProfileDetails from "./MyProfileDetails";
// import EmpPersonalDetail from "./EmpPersonalDetail";
// import GetGstDetails from './GetGstDetails';
// import EditGstDetails from './EditGstDetails';
// import PriorTimeAdj from './PriorTimeAdj';
// import CreatePayslip from './CreatePayslip';
// import UpdatePayrollSalary from "./UpdatePayrollSalary";
// import ManageRoles from "./ManageRoles";
// import EditPosition from "./EditPosition";

// const Approuter = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const empId = useSelector((state) => state.auth.empId);

//   useEffect(() => {
//     setIsLoggedIn(empId !== null);
//   }, [empId]);

//   return (
//     <div>
//       <AppNavbar />
//       {isLoggedIn && (
//         <div>
//           <SideBar>
//             <Routes>
//               <Route path="/" element={<HomePage2 />} />
//               <Route path="/Leave" element={<LeaveForm />} />
//               <Route path="/empfunc" element={<Empfunc />} />
//               <Route path="/positiondetails" element={<PositionDetails />} />
//               <Route path="/Createposition" element={<ProtectedRoute requiredPermissions={['SAVE_NEW_INTERVIEW_POSITION']}><CreatePosition /></ProtectedRoute>} />
//               <Route path="/getinterviewdetails" element={<Getinterviewdetails />} />
//               <Route path="/TimeSheet" element={<TimeSheet />} />
//               <Route path="/payslip" element={<Payslipdetails />} />
//               <Route path="/GetAllEmpAttendance" element={<GetAllEmpAttendance />} />
//               <Route path="/getallempattendence" element={<GetAllAttendance />} />
//               <Route path="/createExpense" element={<ProtectedRoute requiredPermissions={['CREATE_EXPENSES']}><CreateExpense /></ProtectedRoute>} />
//               <Route path="/editexpenses/:id" element={<ProtectedRoute requiredPermissions={['UPDATE_EXPENSE']}><EditExpenses /></ProtectedRoute>} />
//               <Route path="/EditCandidate/:id" element={<EditCandidate />} />
//               <Route path="/EditEmployee/:id" element={<EditEmployee />} />
//               <Route path="/EditGstDetails/:id" element={<EditGstDetails />} />
//               <Route path="/EditInterviewDetails/:id/:id2" element={<EditInterviewDetails />} />
//               <Route path="/EditClient/:id" element={<EditClient />} />
//               <Route path="/createinterview" element={<CreateInterview />} />
//               <Route path="/Getclientinfo" element={<ClientInfoTable />} />
//               <Route path="/PostClientInfo" element={<Saveclientinfo />} />
//               <Route path="/createClientformik" element={<SaveClientFormik />} />
//               <Route path="/Capex" element={<Capex />} />
//               <Route path="/NewpassForm" element={<NewpassForm />} />
//               <Route path="/Getallexpenses" element={<ProtectedRoute requiredPermissions={['GET_ALL_EXPENSES']}><Getallexpenses /></ProtectedRoute>} />
//               <Route path="/ChangepasswordForm" element={<ChangepasswordForm />} />
//               <Route path="/getcandidate" element={<CandidateDetails />} />
//               <Route path="/createCandidate" element={<InterviewCandidate />} />
//               <Route path="/GetAllPrEngagement" element={<GetAllPrEngagement />} />
//               <Route path="/EditprojEng/:id" element={<EditprojEng />} />
//               <Route path="/CreateProjEng" element={<CreateProjEng />} />
//               <Route path="/EmployeeSalary" element={<EmployeeSalary />} />
//               <Route path="/HolidayCalender" element={<HolidayCalender />} />
//               <Route path="/EditHolidayCalender" element={<EditHolidayCalender />} />
//               <Route path="/GetAllAssets" element={<GetAllAssets />} />
//               <Route path="/CreateEmpAssets" element={<CreateEmpAssets />} />
//               <Route path="/EditAssets/:id" element={<EditAssets />} />
//               <Route path="/SearchEmpAssets" element={<SearchEmpAssets />} />
//               <Route path="/Gstinvoice" element={<SaveGstinvoice />} />
//               <Route path="/personal-details/:id" element={<EmpPersonalDetail />} />
//               <Route path="/MyProfileDetails" element={<MyProfileDetails />} />
//               <Route path="/GetGstDetails" element={<GetGstDetails />} />
//               <Route path="/PriorTimeAdj" element={<PriorTimeAdj />} />
//               <Route path="/CreatePayslip" element={<CreatePayslip />} />
//               <Route path="/UpdatePayrollSalary/:id" element={<UpdatePayrollSalary />} />
//               <Route path="/ManageRoles" element={<ManageRoles />} />
//               <Route path="/EditPosition/:id" element={<EditPosition />} />
//             </Routes>
//           </SideBar>
//         </div>
//       )}
//       {!isLoggedIn && (
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//         </Routes>
//       )}
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/RegisterUser" element={<RegisterUser />} />
//         <Route path="/ForgotPassword" element={<ForgotPassword />} />
//       </Routes>
//       {!isLoggedIn && <Footer />}
//     </div>
//   );
// };

// export default Approuter;
