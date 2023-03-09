import React, { Fragment, useState } from "react";

import DriverLogin from "../components/DriverLogin";
import DriverSubscribe from "../components/DriverSubscribe";
import Ooops from "../components/Ooops";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";

const Home = (props) => {
  const {
    companyData,
    setCompanyData,
    driverData,
    setDriverData,
    questions,
    setQuestions,
    answers,
    setAnswers,
    token
  } = useContext(AppContext);

  const { rootFetchUrl, rootUrl } = props;
  const [isOverLoadDrivers, setIsOverLoadDrivers] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(true);

  const h2Text = isSubscribed ? "כניסה לקורס" : "רישום נהג חדש";
  const switchBtnText = isSubscribed
    ? "עדיין לא רשום? הוספת נהג חדש"
    : "נהג רשום? לכניסה לקורס";
  const handleSwitchForms = () => {
    setIsSubscribed((prev) => !isSubscribed);
  };

  //check if over loading drivers
  useEffect(() => {
    if (companyData.currentDrivers >= companyData.maxDrivers) {
      setIsOverLoadDrivers(true);
    }
  }, [companyData.currentDrivers]);

  return (
    <>
      <div className="home-bg-img">
        <div>
          <h2>{h2Text}</h2>
        </div>
        {isSubscribed ? (
          <DriverLogin
            handleSwitchForms={handleSwitchForms}
            rootFetchUrl={rootFetchUrl}
            rootUrl={rootUrl}
          />
        ) : !isOverLoadDrivers ? (
          <DriverSubscribe
            handleSwitchForms={handleSwitchForms}
            setIsSubscribed={setIsSubscribed}
            rootFetchUrl={rootFetchUrl}
            rootUrl={rootUrl}
            companyId={companyData.id}
            currentDrivers={companyData.currentDrivers}
            setCompanyData={setCompanyData}
          />
        ) : (
          <Ooops
            switchBtnText={switchBtnText}
            handleSwitchForms={handleSwitchForms}
            message="הגעתם למספר המקסימלי של נהגים שניתן לרשום לקורס."
          />
        )}

        {!isOverLoadDrivers && (
          <div onClick={handleSwitchForms} className="white-link">
            {switchBtnText}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
