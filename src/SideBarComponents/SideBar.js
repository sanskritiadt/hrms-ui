
import 'bootstrap/dist/css/bootstrap.css';
import './SideBar.css';

import {  BiSearch} from "react-icons/bi";
import { FaHome, FaUser,  FaUserPlus, FaClock,  FaFileInvoice,FaAward } from 'react-icons/fa';
import { FaList, FaClipboardList } from 'react-icons/fa';
import {  FaInfoCircle } from 'react-icons/fa';
import {AiOutlineLaptop} from 'react-icons/ai';
import {FaLaptopMedical} from 'react-icons/fa'
import {  FaDollarSign  } from 'react-icons/fa';
import { FaUserAlt, FaBriefcase,  } from 'react-icons/fa';
import { FaPlus,  FaReceipt,FaLock,FaBars } from 'react-icons/fa';
import { FaHandshake } from 'react-icons/fa';
import { FaUserFriends } from 'react-icons/fa';
 import {MdCreateNewFolder} from 'react-icons/md'

import { NavLink } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
const routes = [
  {
    path: "/TimeSheet",
    name: "Time Sheet",
    icon: <FaClock />,
  
  },
  {
    path: "/messages",
    name: "Employee Management",
    icon: <FaUserAlt />,
    subRoutes: [
      {
        path: "/RegisterUser",
        name: "Add Employee",
        icon: <FaUserAlt />,
      },
      {
        path: "/empfunc",
        name: "View Employee Details",
        icon: <FaUserAlt />,
      },
      {
        path: "/GetAllEmpAttendance",
        name: "View Employee Attendence",
        icon: <FaClock />,
      },
      {
        path: "/CreateEmpAssets",
        name: "Add Employee Asset",
        icon: <FaLaptopMedical />,
      },
      {
        path: "/GetAllAssets",
        name: "View Employee Assets",
        icon: <AiOutlineLaptop />,
      },
      {
        path: "/SearchEmpAssets",
        name: "Search Employee Asset",
        icon: <FaLaptopMedical />,
      }
    ],
  },
  {
    path: "/",
    name: "Expense Management",
    icon: <FaDollarSign />,
    subRoutes: [
      {
        path: "/Capex",
        name: "Add Capital Expense",
        icon:  <FaList />,
      },
      {
        path: "/createExpense",
        name: "Add Expense",
        icon: <FaReceipt />,
      },
      {
        path: "/Getallexpenses",
        name: "View Expense",
        icon: <FaLock />,
      },
      {
        path: "/Gstinvoice",
        name: "Add GST Invoice",
        icon: <FaReceipt />,
      },
      {
        path: "/GetGstDetails",
        name: "View GST Invoice",
        icon: <FaList />,
      },
    ],
  },
  {
    path: "/file-manager",
    name: "Partner",
    icon: <FaHandshake />,
    subRoutes: [
      {
        path: "/createClientformik",
        name: "Add Client Info",
        icon: <FaUserPlus />,
      },
      {
        path: "/Getclientinfo",
        name: "View Client Info ",
        icon: <FaInfoCircle />,
      },
      {
        path: "/CreateProjEng",
        name: "Add Project Engagement",
        icon: <MdCreateNewFolder />,
      },
      {
        path: "/GetAllPrEngagement",
        name: "View Project Engagement",
        icon: <FaHandshake />,
      }, 
      {
        path: "/add-proj-revenue",
        name: "Add Project Revenue",
        icon: <MdCreateNewFolder />,
      },
      ],
  },
  {
    path: "/",
    name: "Employee Services",
    icon: <FaUserPlus />,
    subRoutes: [
      {
        path: "/CreatePayslip",
        name: "Add Salary Details",
        icon: <FaFileInvoice />,
      },
      {
        path: "/payslip",
        name: "View Payslip ",
        icon: <FaFileInvoice />,
      },
      {
        path: "/EmployeeSalary",
        name: "Employee Salary",
        icon: <FaFileInvoice />,
      },
      {
        path: "/EditHolidayCalender",
        name: "Add Holiday ",
        icon: <FaFileInvoice />,
      },
      {
        path: "/HolidayCalender",
        name: "View Holiday",
        icon: <FaFileInvoice />,
      },
    ],
  },
  {
    path: "/",
    name: "Performance & Rewards",
    icon: <FaAward />,
    subRoutes: [
      {
        path: "/AddAppraisalDetails",
        name: "Add Appraisal Details",
        icon: <FaFileInvoice />,
      },
      {
        path: "/GetAllEmpAppraisalDetails",
        name: "View Appraisal Details",
        icon: <FaFileInvoice />,
      },
    ],
  },
  {
    path: "/",
    name: "Hiring",
    icon: <FaUserFriends />,
    exact: true,
    subRoutes: [
      {
        path: "/createposition",
        name: "Add Position ",
        icon: <FaClipboardList />,
      },
      {
        path: "/positiondetails",
        name: " View Position",
        icon: <FaBriefcase />,
      },
      {
        path: "/createCandidate",
        name: "Add Candidate Details",
        icon:  <FaUserPlus />,
      },
      {
        path: "/getcandidate",
        name: "View Candidate Details ",
        icon: <FaUser />,
      },
      {
        path: "/createinterview",
        name: "Add Interview Details",
        icon: <FaPlus />,
      },
      {
        path: "/getinterviewdetails",
        name: "View Interview Details",
        icon: <FaList />,
      },
    ],
  },
 
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>

      <div className=" main-container1">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar1 `}
        >
          <div className="top_section1">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo1"
                >
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars1">
              <FaBars onClick={toggle} />
            </div>
          </div>
          {/* <div className="search1">
            <div className="search_icon1">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
          <section className="routes1">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link1"
                  activeClassName="active1"
                >
                  <div className="icon1">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text1"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;