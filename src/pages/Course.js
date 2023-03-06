import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../App";
import Header from "../components/Header";
// import Question from "../components/Question";
import Question from "../components/Question";
import CourseEnd from "../components/CourseEnd";
import Space from "../components/Space";

const Course = (props) => {
  const { rootFetchUrl, rootUrl } = props;
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
    driverDateTimeUpdate,
  } = useContext(AppContext);

  const courseMainContainerStyle = {
    height: "100%",
  };
  useEffect(() => {
    driverDateTimeUpdate();
  },[]);
  return (
    <div style={courseMainContainerStyle} className="course-main-container">
      <Header rootFetchUrl={rootFetchUrl}></Header>
      {questions.length > 0 && <Question rootFetchUrl={rootFetchUrl} />}
    </div>
  );
};

export default Course;
