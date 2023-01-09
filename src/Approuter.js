import React from "react";
import Empfunc from './employeedetails'
import PositionDetails from './Position'
import Login from "./login"
import { Route, Routes } from "react-router-dom";
function Approuter() {
    return (
        <div>
            <div className="main">
                <Routes>
                    <Route path='/Login' element={<Login/>} />
                    <Route path='/empfunc' element={<Empfunc/>} />
                    <Route path='/positiondetails' element={<PositionDetails/>} />
                </Routes>
            </div>

        </div>
    )
}
export default Approuter;