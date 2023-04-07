import React from "react";
import Empfunc from './EmployeeDetails'
import PositionDetails from './Position'
import Login from "./Login"
import CreatePosition from './CreatePosition'
import Getinterviewdetails from './Getinterview'
import HomePage2 from "./HomePage";
import TimeSheet from './TimeSheet'
import RegisterUser from './RegisterUser'
import Payslipdetails from './Payslipdetails'
import CreateExpense from "./CreateExpense";
import EditExpenses from "./EditExpenses";
import CreateInterview from "./CreateInterviewDetails";
import Capex from './Capex'
import ClientInfoTable from "./GetClientInfo";
import Saveclientinfo from "./PostClientInfo";
import Editclient from "./EditClientInfo";
import NewpassForm from './NewpassForm'
import ForgotPassword from './ForgotPassword'
import SaveClientFormik from './CreateClient';
import DateSelector from './Leaverequest'
import CreatePositionformik from './CreatePositionformik'
import Getallexpenses from "./GetAllExpenses";
import AppNavbar from './Navbar'
import ChangepasswordForm from './ChangePassword';
import CandidateDetails from './GetCandidatedetails'
import InterviewCandidate from './CreateCandidatedetails'
import { Route, Routes } from "react-router-dom";

function Approuter() {
    return (
        <div>
            <AppNavbar></AppNavbar>
            <Routes>
                <Route path="/" element={<HomePage2 />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/empfunc' element={<Empfunc />} />
                <Route path='/positiondetails' element={<PositionDetails />} />
                <Route path='/createposition' element={<CreatePosition />} />
                <Route path='/getinterviewdetails' element={<Getinterviewdetails />} />
                <Route path="/TimeSheet" element={<TimeSheet />} />
                <Route path="/RegisterUser" element={<RegisterUser />} />
                <Route path="/payslip" element={<Payslipdetails />} />
                <Route path="/Leaverequest" element={<DateSelector />} />
                <Route path="/createExpense" element={<CreateExpense />} />
                <Route path="/editexpenses/:id" element={<EditExpenses />} />
                <Route path="/createinterview" element={<CreateInterview />} />
                <Route path="/Getclientinfo" element={<ClientInfoTable />} />
                <Route path="/PostClientInfo" element={<Saveclientinfo />} />
                <Route path="/createClientformik" element={<SaveClientFormik />} />
                <Route path="/Editclientinfo" element={<Editclient />} />
                <Route path="/Capex" element={<Capex />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="/NewpassForm" element={<NewpassForm />} />
                <Route path="/Getallexpenses" element={<Getallexpenses />} />
                <Route path="/ChangepasswordForm" element={<ChangepasswordForm />} />
                <Route path='/getcandidate' element={<CandidateDetails />} />
                <Route path='/createCandidate' element={<InterviewCandidate />} />
            </Routes>
        </div>

    )
}
export default Approuter;