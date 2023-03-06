import React, { Fragment, useContext } from "react";
import { useState } from "react";
import { AppContext } from "../App";
const Quiz = (props) => {
  const { answersElement, isAnswerChosen, isEncorrectAnswerChosen } = props;
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
    isQuizTime,
    setIsQuizTime,
    driverMistakesUpdate,
  } = useContext(AppContext);

  //quiz
  const [feedBackMsg, setFeedBackMsg] = useState();
  const [isFeedBackOn, setIsFeedBackOn] = useState(true);
  const feedBackStyle = {
    fontSize: "25px",
    padding: "20px 10px",
    textAlign: "center",
    color: "white",
  };

  //questions
  const companyQuestions = questions.filter((question) =>
    companyData.questions.includes(question.id)
  );
  console.log(
    "🚀 ~ file: Quiz.js:34 ~ Quiz ~ companyQuestions",
    companyQuestions
  );
  const currentQuestion = companyQuestions[driverData.level];
  const questionsText = currentQuestion && currentQuestion.text;
  const questionStyle = {
    fontSize: "25px",
    padding: "20px 10px",
    textAlign: "center",
    color: "white",
  };

  //answers
  const answersContainerStyle = {
    maxWidth: "700px",
    backgroundColor: "white",
    margin: "auto",
  };
  const answersStyle = {
    fontSize: "15px",
    padding: "15px 10px",
    textAlign: "center",
    border: "1px grey solid",
    color: "black",
  };

  const companyAnswers = answers.filter((answer) =>
    companyData.questions.includes(answer.questionId)
  );

  const currentAnswers = companyAnswers.filter(
    (answer) => answer.questionId === currentQuestion.id
  );
  console.log("🚀 ~ file: Quiz.js:66 ~ Quiz ~ currentAnswers", currentAnswers);
  const answersElements = currentAnswers.map((answer) => (
    <div
      style={answersStyle}
      key={answer.id}
      onClick={answerClickHandle}
      id={answer.id}
    >
      {answer.text}
    </div>
  ));
  const correctAnswerId = currentAnswers.find(
    (answer) => answer.is_correct === true
  ).id;
  console.log("🚀 ~ file: Quiz.js:52 ~ Quiz ~ correctAnswer", correctAnswerId);

  function answerClickHandle(e) {
    setTimeout(() => {
      setIsQuizTime(false);
    }, 3000);
    const isCorrectAnswer = e.target.id == correctAnswerId;
    isCorrectAnswer ? correctAnswerHandle() : incorrectAnswerHandle();
  }

  function correctAnswerHandle() {
    setIsFeedBackOn(true);
    setFeedBackMsg("תשובה נכונה!");
    driverLevelUpdate();
  }

  function incorrectAnswerHandle() {
    driverMistakesUpdate();
    setIsFeedBackOn(true);
    setFeedBackMsg("תשובה לא נכונה... הנך מועבר לצפייה חוזרת בסרטון ההדרכה");
  }
  const alertText = isEncorrectAnswerChosen
    ? "תשובתך אינה נכונה... הנך מועבר לצפייה חוזרת בסרטון"
    : "תשובה נכונה! הנך מועבר לסרטון הבא";

  return (
    <div>
      {!isAnswerChosen && (
        <div>
          <div style={questionStyle}>שאלה: {questionsText}</div>
          <div style={answersContainerStyle}>{answersElements}</div>
          {isFeedBackOn && <div style={feedBackStyle}>{feedBackMsg}</div>}
        </div>
      )}
    </div>
  );
};

export default Quiz;
