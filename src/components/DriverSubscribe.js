import { CircularProgress } from "@mui/material";
import { update } from "lodash";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import Button from "./Button";
import FormAlert from "./FormAlert";

const DriverSubscribe = (props) => {
  const [isLoading, setIsLoadin] = useState(false);
  const { rootFetchUrl, rootUrl } = props;
  const {
    companyData,
    driverData,
    questions,
    setQuestions,
    answers,
    setAnswers,
    driverLevelUpdate,
    companyDriversUpdate,
  } = useContext(AppContext);

  //form data
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    companyId: companyData.id,
    level: 0,
    startTime: 1,
    endTime: 1,
    mistakes: 0,
  });

  const { name, id, companyId, level } = formData;
  const [isValidSubscribe, setIsValidSubscribe] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidId, setIsValidId] = useState(true);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [idErrorMsg, setIdErrorMsg] = useState("");
  const [successfulRegistration, setSuccessfulRegistration] = useState(false);

  //contorled fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    formValidation();
  }, [name, id]);

  //validate form
  function formValidation() {
    //name validtaion
    if (name.length < 2) {
      setNameErrorMsg("השם צריך לכלול שתי אותיות לפחות");
      setIsValidName(false);
    } else {
      setNameErrorMsg("");
      setIsValidName(true);
    }

    //id validtaion
    if (!/^[0-9]+$/.test(id)) {
      setIdErrorMsg("יש להזין מספרים בלבד");
      setIsValidId(false);
    } else if (id.length !== 9) {
      setIdErrorMsg("יש להזין מספר תעודת זהות בעל 9 ספרות");
      setIsValidId(false);
    } else {
      setIdErrorMsg("");
      setIsValidId(true);
    }
  }

  //subscribe new driver
  const driverSubscribe = (e) => {
    //trim data
    setFormData({
      ...formData,
      name: formData.name.trim(),
      id: formData.id.trim(),
    });
    //add driver to drivers list
    e.preventDefault();
    let fetchUrl = `${rootFetchUrl}/drivers`;
    setIsLoadin(true);
    console.log(formData);
    fetch(fetchUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 500) {
          setIsLoadin(false);
          setIdErrorMsg("משתמש כבר קיים");
          // props.setIsSubscribed(true);

          setIsValidSubscribe(false);
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setIsLoadin(false);
        if (data) {
          props.setIsSubscribed(true);
          setSuccessfulRegistration(true);
          companyDriversUpdate();
        }
      });
  };

  return (
    <div>
      {successfulRegistration && (
        <div className="sucssess-alert">
          הרשמה הצליחה! כבר מעביר אותך לעמוד התחברות...
        </div>
      )}
      <form id="subscribe-form" className="login-form" action="">
        <b>
          <label className="label" htmlFor="">
            שם
          </label>
        </b>
        <input
          className="input-text"
          name="name"
          type="text"
          placeholder="שם מלא"
          onChange={handleChange}
          value={formData.name}
        />
        {!isValidName && <FormAlert text={nameErrorMsg} />}
        <b>
          <label className="label" htmlFor="">
            מספר זהות
          </label>
        </b>
        <input
          className="input-text"
          name="id"
          type="tel"
          placeholder="מספר תעודת זהות (9 ספרות)"
          onChange={handleChange}
          value={formData.id}
        />
        <FormAlert text={idErrorMsg} />
        {isLoading ? (
          <CircularProgress style={{ margin: "auto" }} />
        ) : (
          <Button
            className={isValidName && isValidId ? "" : "disabled-btn"}
            disabled={!(isValidName && isValidId)}
            text={isValidName && isValidId ? "הרשמה" : "הפרטים עדיין לא מלאים"}
            submitForm={driverSubscribe}
          />
        )}
      </form>
    </div>
  );
};

export default DriverSubscribe;
