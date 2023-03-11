import React, { useEffect, useState, useContext, Fragment } from "react";
import Video from "./Video";
import Quiz from "./Quiz";
import { AppContext } from "../App";
import Space from "./Space";
const Question = (props) => {
  const {
    companyData,
    setCompanyData,
    driverData,
    setDriverData,
    questions,
    setQuestions,
    answers,
    setAnswers,
    isQuizTime,
    setIsQuizTime,
  } = useContext(AppContext);

  const levelDisplayed = driverData.level + 1;
  const title = questions[driverData.level].title;

  return (
    <div>
      <h4 style={{ color: "white", textAlign: "center" }}>
        {companyData.questions.length} / {levelDisplayed}
      </h4>
      <h2 style={{ color: "white", textAlign: "center" }}>{title}</h2>

      {isQuizTime ? (
        <Quiz setIsQuizTime={setIsQuizTime} />
      ) : (
        <Video setIsQuizTime={setIsQuizTime} />
      )}
    </div>
  );
};

export default Question;
