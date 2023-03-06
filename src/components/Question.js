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
      <h2 style={{ color: "white", textAlign: "center" }}>
        {levelDisplayed}- {title}
      </h2>
      {isQuizTime ? (
        <Quiz setIsQuizTime={setIsQuizTime} />
      ) : (
        <Video setIsQuizTime={setIsQuizTime} />
      )}
    </div>
  );
};

export default Question;
