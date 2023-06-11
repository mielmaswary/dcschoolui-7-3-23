import "./styles/main.scss";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

import { Routes, Navigate, Route, redirect } from "react-router-dom";
import Course from "./pages/Course";
import Home from "./pages/Home";
import React, { useState, useContext, useEffect, Suspense } from "react";
import Ooops from "./components/Ooops";
import ReactLoading from "react-loading";
import { async } from "@firebase/util";
export const AppContext = React.createContext();

//url settings
const dev = false;
const rootFetchUrl = dev
  ? "http://localhost:8000/api"
  : "https://dcschooljsonserverexpress.onrender.com/api";
const rootUrl = dev
  ? "http://localhost:3000"
  : "https://dcschooluidev.onrender.com";

function App() {
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  const [isQuizTime, setIsQuizTime] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const email = process.env.REACT_APP_EMAIL;
  const psw = process.env.REACT_APP_PSW;
  //firebase auth
  const [token, setToken] = useState();
  const firebaseConfig = {
    apiKey: "AIzaSyAGyZC6leibVDbqSEnYH7L-jezGhk6pOwQ",
    authDomain: "dcschool-4238a.firebaseapp.com",
    projectId: "dcschool-4238a",
    storageBucket: "dcschool-4238a.appspot.com",
    messagingSenderId: "525759891280",
    appId: "1:525759891280:web:8f9823ab9eb13a2e290e55",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    const login = async () => {
      await signInWithEmailAndPassword(auth, email, psw);
      const tokenId = await auth.currentUser.accessToken;
      setToken(tokenId);
    };
    login();
  }, []);

  //get company data
  const companyId = params.get("companyId");
  const [companyData, setCompanyData] = useState({
    id: companyId,
    name: "שם",
    maxDrivers: 1,
    currentDrivers: 0,
    questions: [],
    link: "",
  });
  const [isValidCompany, setIsValidCompany] = useState(false);
  useEffect(() => {
    const fetchCompany = async () => {
      setIsLoading(true);
      const res = await fetch(`${rootFetchUrl}/companies/${companyId}`, {
        headers: {
          Authorization: token,
        },
      });

      if (!(companyId.trim() === "") && res.ok) {
        const data = await res.json();
        setIsValidCompany(true);
        setCompanyData({ ...data, endLevel: data.questions.length - 1 });
        setIsLoading(false);
      } else {
        setIsValidCompany(false);
        setIsLoading(false);
      }
    };
    fetchCompany();
  }, [companyId, token]);

  //get company drivers
  const [companyDrivers, setCompanyDrivers] = useState([]);
  useEffect(() => {
    const fetchCompanyDrivers = async () => {
      setIsLoading(true);
      const res = await fetch(
        `${rootFetchUrl}/companies/${companyId}/drivers`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await res.json();
      setCompanyDrivers(data);
    };
    fetchCompanyDrivers();
  }, [companyId, token]);

  //get driver data
  const driverId = params.get("driverId");

  const [driverData, setDriverData] = useState(false);
  useEffect(() => {
    fetch(`${rootFetchUrl}/drivers/${driverId}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDriverData(data);
      });
  }, [driverId, isQuizTime, token]);

  //get questions data
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch(
      `${rootFetchUrl}/questions?id=${companyData?.questions?.join("&id=")}`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      });
  }, [companyData.id, companyData.questions, token]);

  //get answers data
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    fetch(`${rootFetchUrl}/answers`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAnswers(data);
      });
  }, [companyData.id, driverData.id, driverData.level, token]);

  //update company drivers
  const companyDriversUpdate = () => {
    const fetchUrl = `${rootFetchUrl}/companies/${companyData.id}`;
    fetch(fetchUrl, {
      headers: {
        Authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        currentDrivers: companyData.currentDrivers + 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => setCompanyData(data));
  };

  //update driver level
  const driverLevelUpdate = () => {
    const fetchUrl = `${rootFetchUrl}/drivers/${driverData.id}`;
    fetch(fetchUrl, {
      headers: {
        Authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({ level: driverData.level + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDriverData(data);
      });
  };

  //update driver date and time
  const driverDateTimeUpdate = () => {
    const fetchUrl = `${rootFetchUrl}/drivers/${driverData.id}`;
    const startTime =
      driverData.startTime == 1
        ? new Date().toLocaleString()
        : driverData.startTime;
    const endTime = new Date().toLocaleString();
    fetch(fetchUrl, {
      headers: {
        Authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        startTime,
        endTime,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDriverData(data);
      });
  };

  //update driver mistakes
  const driverMistakesUpdate = () => {
    const fetchUrl = `${rootFetchUrl}/drivers/${driverData.id}`;

    fetch(fetchUrl, {
      headers: {
        Authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({ mistakes: driverData.mistakes + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDriverData(data);
      });
  };

  //validition
  const isFinishCourse = driverData?.level >= companyData?.questions?.length;
  const isValidDriver = (driverId) => {
    const currentDriver = companyDrivers.find(
      (driver) => driver.id === driverId
    );
    if (currentDriver) return true;
    return false;
  };
  const isFullData =
    answers.length > 0 &&
    questions.length >= companyData.questions.length &&
    driverData.id != undefined &&
    isValidCompany &&
    isValidDriver(driverId);

  //rendering
  return (
    <div>
      <Routes>
        <Route
          path="/home"
          element={
            <AppContext.Provider
              value={{
                companyData,
                setCompanyData,
                driverData,
                setDriverData,
                questions,
                setQuestions,
                answers,
                setAnswers,
                companyDriversUpdate,
                isQuizTime,
                setIsQuizTime,
                driverDateTimeUpdate,
                token,
              }}
            >
              {isLoading ? (
                <div
                  style={{
                    height: "50%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "300px",
                  }}
                >
                  {" "}
                  <ReactLoading height={200} width={100} type={"spokes"} />
                </div>
              ) : !isValidCompany ? (
                <Ooops
                  message={
                    isFinishCourse && isFullData
                      ? "כל הכבוד סיימת את הקורס. התוצאות יישלחו לבוחן"
                      : "Loading..."
                  }
                />
              ) : (
                <Home rootFetchUrl={rootFetchUrl} rootUrl={rootUrl} />
              )}
            </AppContext.Provider>
          }
        />
        <Route
          path="/course"
          element={
            <AppContext.Provider
              value={{
                companyData,
                setCompanyData,
                driverData,
                setDriverData,
                questions,
                setQuestions,
                answers,
                setAnswers,
                driverLevelUpdate,
                companyDriversUpdate,
                isQuizTime,
                setIsQuizTime,
                driverDateTimeUpdate,
                driverMistakesUpdate,
                token,
              }}
            >
              {!isFullData || isFinishCourse ? (
                <Ooops
                  message={
                    isFinishCourse && isFullData
                      ? "כל הכבוד סיימת את הקורס. התוצאות יישלחו לבוחן"
                      : "מייבא נתונים..."
                  }
                />
              ) : (
                <Course rootFetchUrl={rootFetchUrl} rootUrl={rootUrl} />
              )}
            </AppContext.Provider>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
