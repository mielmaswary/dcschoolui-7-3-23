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
    "馃殌 ~ file: Video.js:21 ~ Video ~ driverData.level:",
    driverData.level
  );
  console.log("馃殌 ~ file: Video.js:23 ~ Video ~ videoUrl:", videoUrl);

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
        <div className="question-text"> 砖讗诇转 诪讘讞谉 讘住讜祝 讛住专讟讜谉</div>
      ) : (
        <Button
          className="playVideoBtn"
          submitForm={playVideo}
          text={"讛驻注诇 住专讟讜谉"}
        ></Button>
      )}
    </div>
  );
};

export default Video;
