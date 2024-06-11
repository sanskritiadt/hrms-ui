import React, { useState, useEffect } from "react";
import { Tabs, Tab, Container, Box } from "@mui/material";
import EmpPersonalDetail from "./EmpPersonalDetail";
import EmpPayrollDetail from "./EmpPayrollDetails";
import EmpDocuments from "./EmpDocuments";

export default function MyProfileDetails() {
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
