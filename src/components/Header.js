import { display } from "@mui/system";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
const Header = (props) => {
  const { driverId, rootFetchUrl } = props;
  const {
    companyData,
    setCompanyData,
    driverData,
    setDriverData,
    questions,
    setQuestions,
    answers,
    setAnswers,
    driverLevelUpdate,
  } = useContext(AppContext);

  return (
    <>
      <nav className="header-nav">
        <div className="main-logo"></div>
        <div className="user-name">שלום, {driverData.name}</div>
      </nav>
    </>
  );
};

export default Header;
