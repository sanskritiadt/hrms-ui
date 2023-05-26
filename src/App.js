import React from "react";
import Approuter from "./Approuter";
import { ToastContainer } from "react-toastify";
export default function App() {
  return (
    <div className="App">
      <Approuter></Approuter>
      <ToastContainer/>
    </div>
  );
}
