import { CircularProgress } from "@mui/material";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import FormAlert from "./FormAlert";
import { AppContext } from "../App";
const DriverLogin = (props) => {
  const [isLoading, setIsLoading] = useState(false);
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
    driverDateTimeUpdate,
    token,
  } = useContext(AppContext);
 
  //form data
  const [formData, setFormData] = useState({
    companyId: companyData.id,
    name: "",
    id: "",
  });

  const [isValidLogin, setIsValidLogin] = useState(true);
  const navigate = useNavigate();

  //handle change
  const handleChange = (e) => {
    setIsValidLogin(true);
    const { name, value, type, checked, id } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  //login the driver
  const driverLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchUrl = `${rootFetchUrl}/drivers/${formData.id}`;
    fetch(fetchUrl, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status === 404 || formData.id === "") {
          setIsLoading(false);
          setIsValidLogin(false);
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setIsLoading(false);
          const url = `${rootUrl}/course?companyId=${formData.companyId}&driverId=${formData.id}`;
          window.location.href = url;
        }
      });
  };
  return (
    <div>
      {" "}
      <form id="login-form" className="login-form" action="">
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
        {!isValidLogin && (
          <FormAlert text="המשתמש לא קיים במערכת. ודא כי הפרטים שהקלדת נכונים" />
        )}
        {isLoading ? (
          <CircularProgress style={{ margin: "auto" }} />
        ) : (
          <Button text={"התחברות"} submitForm={driverLogin} />
        )}
      </form>
    </div>
  );
};

export default DriverLogin;
