
import 'bootstrap/dist/css/bootstrap.css';
import './SideBar.css';

import {  BiSearch} from "react-icons/bi";
import { FaHome, FaUser,  FaUserPlus, FaClock,  FaFileInvoice } from 'react-icons/fa';
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
    path: "/",
    name: "Home",
    icon: <FaHome />,
  
  },
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
        path: "/empfunc",
        name: "Employee Details",
        icon: <FaUserAlt />,
      },
      {
        path: "/positiondetails",
        name: " Employee Position",
        icon: <FaBriefcase />,
      },
      {
        path: "/GetAllEmpAttendance",
        name: "Employee Attendence",
        icon: <FaClock />,
      },
      {
        path: "/GetAllAssets",
        name: "Employee Assets",
        icon: <AiOutlineLaptop />,
      },
      {
        path: "/CreateEmpAssets",
        name: "Create Employee Asset",
        icon: <FaLaptopMedical />,
      },
      {
        path: "/SearchEmpAssets",
        name: "Search  Employee Asset",
        icon: <FaLaptopMedical />,
      }
    ],
  },
  {
    path: "/",
    name: "Expense",
    icon: <FaDollarSign />,
    subRoutes: [
      {
        path: "/Capex",
        name: "Create Capital Expense  ",
        icon:  <FaList />,
      },
      {
        path: "/Getallexpenses",
        name: "Get Expense Details",
        icon: <FaLock />,
      },
      {
        path: "/createExpense",
        name: "Create Expense ",
        icon: <FaReceipt />,
      },
    ],
  },
  {
    path: "/file-manager",
    name: "Partner",
    icon: <FaHandshake />,
    subRoutes: [
      {
        path: "/Getclientinfo",
        name: "Get Client Info ",
        icon: <FaInfoCircle />,
      },
      {
        path: "/createClientformik",
        name: "Create Client",
        icon: <FaUserPlus />,
      },
      {
        path: "/GetAllPrEngagement",
        name: "Project Engagement",
        icon: <FaHandshake />,
      }, {
        path: "/CreateProjEng",
        name: " Create Project Engagement",
        icon: <MdCreateNewFolder />,
      }
    
    
    ],
  },
  {
    path: "/",
    name: "Employee Services",
    icon: <FaUserPlus />,
    subRoutes: [
      {
        path: "/payslip",
        name: "Pay Slip ",
        icon: <FaFileInvoice />,
      },
      {
        path: "/EmployeeSalary",
        name: "Employee Salary ",
        icon: <FaFileInvoice />,
      },
      {
        path: "/HolidayCalender",
        name: "Holiday Calender ",
        icon: <FaFileInvoice />,
      },
      {
        path: "/EditHolidayCalender",
        name: "Add Holiday ",
        icon: <FaFileInvoice />,
      }
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
        name: "Create Position ",
        icon: <FaClipboardList />,
      },
      {
        path: "/createinterview",
        name: "Create Interview",
        icon: <FaPlus />,
      },
      {
        path: "/getinterviewdetails",
        name: "Get Interview Details",
        icon: <FaList />,
      },
      {
        path: "/getcandidate",
        name: "Get Candidate Details ",
        icon: <FaUser />,
      },
      {
        path: "/createCandidate",
        name: "Create Candidate Details",
        icon:  <FaUserPlus />,
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
                  AlPHA.HRMS
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

