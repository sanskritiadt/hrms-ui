// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import handleAuthError from "./CommonErrorHandling";
// import { Link } from "react-router-dom";
// const CreatePayslip = () => {
//   const token = localStorage.getItem("response-token");
//   const [data, setData] = useState({
//     empId: "",
//     basic: "",
//     houseRentAllowance: "",
//     employeeESICAmount: "",
//     employerESICAmount: "",
//     employeePFAmount: "",
//     employerPFAmount: "",
//     grossSalary: "",
//     netSalary: "",
//     medicalInsurance: "",
//   });

//   // {
//   //     "empId": 5,
//   //     "basic": 12000,
//   //     "houseRentAllowance": 12000,
//   //     "employeeESICAmount": 0,
//   //     "employerESICAmount": 0,
//   //     "employeePFAmount": 736.08,
//   //     "employerPFAmount": 845,
//   //     "grossSalary": 25000,
//   //     "netSalary": 11109.40,
//   //     "medicalInsurance": 0.0
//   // }

//   function submit(e) {
//     e.preventDefault();
//     axios
//       .post(
//         `/apigateway/hrms/engagement/saveProjectEngagement`,
//         {
//           empId: data.empId,
//           basic: data.basic,
//           houseRentAllowance: data.houseRentAllowance,
//           employeeESICAmount: data.employeeESICAmount,
//           employerESICAmount: data.employerESICAmount,
//           employeePFAmount: data.employeePFAmount,
//           employerPFAmount: data.employerPFAmount,
//           grossSalary: data.grossSalary,
//           netSalary: data.netSalary,
//           medicalInsurance: data.medicalInsurance,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         toast.success(response.data, {
//           position: "top-center",
//           theme: "colored",
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         handleAuthError(error);
//       });
//   }

//   function handle(e) {
//     const newData = { ...data };
//     newData[e.target.id] = e.target.value;
//     setData(newData);
//     console.log(newData);
//   }
//   return (
//     <div className=" mt-3">
//       <nav
//         aria-label="breadcrumb"
//         style={{ "--bs-breadcrumb-divider": "'>>'" }}
//       >
//         <ol
//           className="breadcrumb"
//           style={{ color: "white", marginLeft: "20px" }}
//         >
//           <li className="breadcrumb-item">
//             <Link to="/">Home</Link>{" "}
//           </li>
//           <li className="breadcrumb-item">
//             <a href="">Payslip</a>
//           </li>
//           <li className="breadcrumb-item active" aria-current="page">
//             Payslip Details
//           </li>
//         </ol>
//       </nav>
//       <div className="container pt-3">
//         <div className="row">
//           <div>
//             <h1 className="Heading1" style={{ textAlign: "center" }}>
//               Create Payslip Details
//             </h1>
//           </div>
//           <div className="col-md-8 mx-auto">
//             <div
//               className="card border-0 shadow"
//               style={{ marginRight: "100px", width: "700px", height: "550px" }}
//             >
//               <div className="card-body">
//                 <form
//                   className="container py-3  mb-3"
//                   onSubmit={(e) => {
//                     submit(e);
//                   }}
//                 >
//                   <div className="row mb-3">
//                     <label
//                       htmlFor="inputEmail3"
//                       className="col-sm-2 col-form-label"
//                       name="projectName"
//                     >
                     
//                     </label>
//                     <div className="col-sm-10">
//                       <input
//                         onChange={(e) => {
//                           handle(e);
//                         }}
//                         value={data.projectName || ""}
//                         type="text"
//                         id="projectName"
//                         placeholder="Enter project name"
//                         className="form-control"
//                       />
//                     </div>
//                   </div>

//                   <div className="row mb-3">
//                     <label
//                       htmlFor="inputPassword3"
//                       className="col-sm-2 col-form-label"
//                       name="projectDescription"
//                     >
//                       Project Description
//                     </label>
//                     <div className="col-sm-10">
//                       <input
//                         onChange={(e) => {
//                           handle(e);
//                         }}
//                         value={data.projectDescription || ""}
//                         type="text"
//                         className="form-control"
//                         id="projectDescription"
//                       />
//                     </div>
//                   </div>
//                   <div className="row mb-3">
//                     <label
//                       htmlFor="inputPassword3"
//                       className="col-sm-2 col-form-label"
//                       name="engagedEmployee"
//                     >
//                       Engaged Employee
//                     </label>
//                     <div className="col-sm-10">
//                       <input
//                         onChange={(e) => {
//                           handle(e);
//                         }}
//                         value={data.engagedEmployee || ""}
//                         type="text"
//                         className="form-control"
//                         id="engagedEmployee"
//                       />
//                     </div>
//                   </div>

//                   <div className="row mb-3">
//                     <label
//                       htmlFor="inputPassword3"
//                       className="col-sm-2 col-form-label"
//                       name="startDate"
//                     >
//                       Start Date
//                     </label>
//                     <div className="col-sm-10">
//                       <input
//                         onChange={(e) => {
//                           handle(e);
//                         }}
//                         value={data.startDate || ""}
//                         type="date"
//                         className="form-control"
//                         id="startDate"
//                       />
//                     </div>
//                   </div>
//                   <div className="row mb-3">
//                     <label
//                       htmlFor="inputPassword3"
//                       className="col-sm-2 col-form-label"
//                       name="endDate"
//                     >
//                       End Date
//                     </label>
//                     <div className="col-sm-10">
//                       <input
//                         onChange={(e) => {
//                           handle(e);
//                         }}
//                         value={data.endDate || ""}
//                         type="date"
//                         className="form-control"
//                         id="endDate"
//                       />
//                     </div>
//                   </div>
//                   <fieldset className="row mb-3">
//                     <legend className="col-form-label col-sm-2 pt-0">
//                       Status
//                     </legend>
//                     <div className="col-sm-10">
//                       <div className="form-check form-check-inline">
//                         <input
//                           onChange={radiobut}
//                           value="true"
//                           className="form-check-input"
//                           type="radio"
//                           name="inlineRadioOptions"
//                           id="status"
//                         />
//                         <label
//                           className="form-check-label"
//                           htmlFor="inlineRadio1"
//                         >
//                           Active
//                         </label>
//                       </div>
//                       <div className="form-check form-check-inline">
//                         <input
//                           onChange={radiobut}
//                           value="false"
//                           className="form-check-input"
//                           type="radio"
//                           name="inlineRadioOptions"
//                           id="status"
//                         />
//                         <label
//                           className="form-check-label"
//                           htmlFor="inlineRadio2"
//                         >
//                           InActive
//                         </label>
//                       </div>
//                     </div>
//                   </fieldset>
//                   <div className="d-grid gap-2 col-6 mx-auto">
//                     <button className="btn btn-outline-danger" type="submit">
//                       Submit
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatePayslip;

// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import handleAuthError from "./CommonErrorHandling";
// import { Link } from "react-router-dom";

// const CreatePayslip = () => {
//   const token = localStorage.getItem("response-token");
//   const empId=localStorage.getItem("EmpID");
//   const [data, setData] = useState({
//     empId: empId,
//     basic: "",
//     houseRentAllowance: "",
//     employeeESICAmount: "",
//     employerESICAmount: "",
//     employeePFAmount: "",
//     employerPFAmount: "",
//     grossSalary: "",
//     netSalary: "",
//     medicalInsurance: "",
//   });

//   function submit(e) {
//     e.preventDefault();
//     const parsedData = Object.fromEntries(
//         Object.entries(data).map(([key, value]) => [key, parseFloat(value)])
//       );
    
//     axios
//       .post(
//         `/apigateway/hrms/engagement/saveProjectEngagement`,
//         parsedData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         toast.success(response.data, {
//           position: "top-center",
//           theme: "colored",
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         handleAuthError(error);
//       });
//   }

//   function handle(e) {
//     setData({
//       ...data,
//       [e.target.id]: e.target.value,
//     });
//     console.log(data)
//   }

//   const formFields = [
//     { id: "basic", label: "Basic" },
//     { id: "houseRentAllowance", label: "HRA" },
//     { id: "employeeESICAmount", label: "Employee ESIC" },
//     { id: "employerESICAmount", label: "Employer ESIC" },
//     { id: "employeePFAmount", label: "Employee PF" },
//     { id: "employerPFAmount", label: "Employer PF" },
//     { id: "grossSalary", label: "Gross Salary" },
//     { id: "netSalary", label: "Net Salary" },
//     { id: "medicalInsurance", label: "Medical Insurance" },
//   ];

//   return (
//     <div className="mt-3">
//       {/* Breadcrumb */}
//       <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
//         <ol className="breadcrumb" style={{ color: "white", marginLeft: "20px" }}>
//           <li className="breadcrumb-item">
//             <Link to="/">Home</Link>{" "}
//           </li>
//           <li className="breadcrumb-item">
//             <a href="">Payslip</a>
//           </li>
//           <li className="breadcrumb-item active" aria-current="page">
//            Salary Details
//           </li>
//         </ol>
//       </nav>

//       <div className="container pt-3">
//         <h1 className="Heading1" style={{ textAlign: "center" }}>
//            Salary Details
//         </h1>
//         <div className="col-md-8 mx-auto">
//           <div className="card border-0 shadow" style={{ marginRight: "100px", width: "700px", height: "800px" }}>
//             <div className="card-body">
//               <form className="container py-3  mb-3" onSubmit={submit}>
//                 {formFields.map(field => (
//                   <div className="row mb-3" key={field.id}>
//                     <label htmlFor={field.id} className="col-sm-2 col-form-label">{field.label}</label>
//                     <div className="col-sm-10">
//                       <input
//                         onChange={handle}
//                         value={data[field.id] || ""}
//                         type="text"
//                         id={field.id}
//                         placeholder={`Enter ${field.label}`}
//                         className="form-control"
//                       />
//                     </div>
//                   </div>
//                 ))}
//                 <div className="d-grid gap-2 col-6 mx-auto">
//                   <button className="btn btn-outline-danger" type="submit">
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatePayslip;
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import handleAuthError from "./CommonErrorHandling";
import { Link } from "react-router-dom";

const CreatePayslip = () => {
  const token = localStorage.getItem("response-token");
  const empId = localStorage.getItem("EmpID");
  const [data, setData] = useState({
    empId: 57,
    basic: "",
    houseRentAllowance: "",
    employeeESICAmount: "",
    employerESICAmount: "",
    employeePFAmount: "",
    employerPFAmount: "",
    grossSalary: "",
    netSalary: "",
    medicalInsurance: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    Object.keys(data).forEach((key) => {
      if (!data[key]) {
        newErrors[key] = `${key} is required`;
        isValid = false;
      } else if (isNaN(data[key])) {
        newErrors[key] = `${key} should be a number`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const submit = (e) => {
    e.preventDefault();
      axios
        .post(
          `/payroll/salaryDetails/saveSalaryDetails`,
          data,
        )
        .then((response) => {
          console.log(response.data);
          toast.success(response.data, {
            position: "top-center",
            theme: "colored",
          });
        })
        .catch((error) => {
          console.log(error);
          handleAuthError(error);
        });
    
  };

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;           
    setData(newdata);
    console.log(newdata);
  }
  return (
    <div className="mt-3">
      <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
        <ol className="breadcrumb" style={{ color: "white", marginLeft: "20px" }}>
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>{" "}
          </li>
          <li className="breadcrumb-item">
            <a href="">Payslip</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Salary Details
          </li>
        </ol>
      </nav>

      <div className="container pt-3">
        <h1 className="Heading1" style={{ textAlign: "center" }}>
          Salary Details
        </h1>
        <div className="col-md-8 mx-auto">
          <div className="card border-0 shadow" style={{ marginRight: "100px", width: "700px", height: "800px" }}>
            <div className="card-body">
              <form className="container py-3  mb-3" >
                <div className="row mb-3">
                  <label htmlFor="basic" className="col-sm-2 col-form-label">Basic</label>
                  <div className="col-sm-10">
                    <input
                      onChange={handle}
                      value={data.basic}
                      type="text"
                      id="basic"
                      placeholder="Enter Basic"
                      className="form-control"
                    />
                    {errors.basic && <div className="text-danger">{errors.basic}</div>}
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="houseRentAllowance" className="col-sm-2 col-form-label">House Rent Allowance</label>
                  <div className="col-sm-10">
                    <input
                      onChange={handle}
                      value={data.houseRentAllowance}
                      type="text"
                      id="houseRentAllowance"
                      placeholder="Enter House Rent Allowance"
                      className="form-control"
                    />
                    {errors.houseRentAllowance && <div className="text-danger">{errors.houseRentAllowance}</div>}
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="employeeESICAmount" className="col-sm-2 col-form-label">Employee ESIC Amount</label>
                  <div className="col-sm-10">
                    <input
                      onChange={handle}
                      value={data.employeeESICAmount}
                      type="text"
                      id="employeeESICAmount"
                      placeholder="Enter Employee ESIC Amount"
                      className="form-control"
                    />
                    {errors.employeeESICAmount && <div className="text-danger">{errors.employeeESICAmount}</div>}
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="employerESICAmount" className="col-sm-2 col-form-label">Employer ESIC Amount</label>
                  <div className="col-sm-10">
                    <input
                      onChange={handle}
                      value={data.employerESICAmount}
                      type="text"
                      id="employerESICAmount"
                      placeholder="Enter Employer ESIC Amount"
                      className="form-control"
                    />
                    {errors.employerESICAmount && <div className="text-danger">{errors.employerESICAmount}</div>}
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="employeePFAmount" className="col-sm-2 col-form-label">Employee PF Amount</label>
                  <div className="col-sm-10">
                    <input
                      onChange={handle}
                      value={data.employeePFAmount}
                      type="text"
                      id="employeePFAmount"
                      placeholder="Enter Employee PF Amount"
                      className="form-control"
                    />
                    {errors.employeePFAmount && <div className="text-danger">{errors.employeePFAmount}</div>}
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="employerPFAmount" className="col-sm-2 col-form-label">Employer PF Amount</label>
                  <div className="col-sm-10">
                    <input
                      onChange={handle}
                      value={data.employerPFAmount}
                      type="text"
                      id="employerPFAmount"
                      placeholder="Enter Employer PF Amount"
                      className="form-control"
                    />
                    {errors.employerPFAmount && <div className="text-danger">{errors.employerPFAmount}</div>}
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="grossSalary" className="col-sm-2 col-form-label">Gross Salary</label>
                  <div className="col-sm-10">
                    <input
                      onChange={handle}
                      value={data.grossSalary}
                      type="text"
                      id="grossSalary"
                      placeholder="Enter Gross Salary"
                      className="form-control"
                    />
                    {errors.grossSalary && <div className="text-danger">{errors.grossSalary}</div>}
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="netSalary" className="col-sm-2 col-form-label">Net Salary</label>
                  <div className="col-sm-10">
                    <input
                      onChange={handle}
                      value={data.netSalary}
                      type="text"
                      id="netSalary"
                      placeholder="Enter Net Salary"
                      className="form-control"
                    />
                    {errors.netSalary && <div className="text-danger">{errors.netSalary}</div>}
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="medicalInsurance" className="col-sm-2 col-form-label">Medical Insurance</label>
                  <div className="col-sm-10">
                    <input
                      onChange={handle}
                      value={data.medicalInsurance}
                      type="text"
                      id="medicalInsurance"
                      placeholder="Enter Medical Insurance"
                      className="form-control"
                    />
                    {errors.medicalInsurance && <div className="text-danger">{errors.medicalInsurance}</div>}
                  </div>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button  onClick={(e) => submit(e)}className="btn btn-outline-danger" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePayslip;
