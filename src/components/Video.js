import React, { Fragment, useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import { AppContext } from "../App";
import { width } from "@mui/system";
const Video = (props) => {
  const { handleVideoEnds, handleVideoPlays, isVideoPlay } = props;
  const {
    companyData,
    driverData,
    questions,
    setQuestions,
    answers,
    setAnswers,
    driverLevelUpdate,
    companyDriversUpdate,
    isQuizTime,
    setIsQuizTime,
  } = useContext(AppContext);

  const [videoUrl, setVideoUrl] = useState(
    questions[driverData.level].video_url
  );
  console.log(
    "🚀 ~ file: Video.js:21 ~ Video ~ driverData.level:",
    driverData.level
  );
  console.log("🚀 ~ file: Video.js:23 ~ Video ~ videoUrl:", videoUrl);

  useEffect(() => {
    setVideoUrl(questions[driverData.level].video_url);
  }, [driverData.level]);

  const playVideo = () => {
    document.getElementById("video").play();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video
        id="video"
        onPlay={() => setIsQuizTime(false)}
        onEnded={() => setIsQuizTime(true)}
        controls={false}
        className="course-video"
      >
        <source src={videoUrl} />
      </video>
      {isVideoPlay ? (
        <div className="question-text"> שאלת מבחן בסוף הסרטון</div>
      ) : (
        <Button
          className="playVideoBtn"
          submitForm={playVideo}
          text={"הפעל סרטון"}
        ></Button>
      )}
    </div>
  );
};

export default Video;
