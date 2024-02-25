import { useState } from "react";
import * as yup from "yup";
import "./App.css";

function App() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    dateOfBirth: "",
    interest: [],
  });
  const [validationErrors, setValidationErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const schema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .matches(emailRegex, "Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    gender: yup.string().required("Gender is required"),
    dateOfBirth: yup.date().required("Date of Birth is required"),
    interest: yup
      .array()
      .min(1, "Select at least one interest")
      .required("Select at least one interest"),
  });
  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    const nonParsed = {
      username: "sivaganesh",
      email: "sivaganesh@example.com",
      password: "sivaganesh",
      confirmPassword: "sivaganesh*",
      gender: "male",
      interest: ["coding"],
      dateOfBirth: "06-02-2016",
    };

    const parsedUser = schema.cast(nonParsed);

    try {
      await schema.validate(userDetails, { abortEarly: false });
      console.log("Form is valid. Submitting...", userDetails);
      // Add your form submission logic here
      setValidationErrors({});
    } catch (error) {
      const errors = {};
      if (error.inner) {
        error.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
      }
      setValidationErrors(errors);
    }
  };
  const handleChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleCheckboxHandler = (e) => {
    const { name, checked } = e.target;
    let updatedInterest = [...userDetails.interest];

    if (checked) {
      updatedInterest.push(name);
    } else {
      updatedInterest = updatedInterest.filter((interest) => interest !== name);
    }

    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      interest: updatedInterest,
    }));
  };

  return (
    <>
      <h2>User Details Form</h2>
      <form className="formContainer" onSubmit={(e) => handleSubmitHandler(e)}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userDetails.username}
            onChange={(e) => handleChangeHandler(e)}
          />
          {validationErrors.username && (
            <div className="error">{validationErrors.username}</div>
          )}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={(e) => handleChangeHandler(e)}
          />
          {validationErrors.email && (
            <div className="error">{validationErrors.email}</div>
          )}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userDetails.password}
            onChange={(e) => handleChangeHandler(e)}
          />
          {validationErrors.password && (
            <div className="error">{validationErrors.password}</div>
          )}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={userDetails.confirmPassword}
            onChange={(e) => handleChangeHandler(e)}
          />
          {validationErrors.confirmPassword && (
            <div className="error">{validationErrors.confirmPassword}</div>
          )}
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={userDetails.gender}
            onChange={(e) => handleChangeHandler(e)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          {validationErrors.gender && (
            <div className="error">{validationErrors.gender}</div>
          )}
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={userDetails.dateOfBirth}
            onChange={(e) => handleChangeHandler(e)}
          />
          {validationErrors.dateOfBirth && (
            <div className="error">{validationErrors.dateOfBirth}</div>
          )}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="coding"
              checked={userDetails.interest.includes("coding")}
              onChange={handleCheckboxHandler}
            />
            Coding
          </label>
          <label>
            <input
              type="checkbox"
              name="gaming"
              checked={userDetails.interest.includes("gaming")}
              onChange={handleCheckboxHandler}
            />
            Gaming
          </label>
          <label>
            <input
              type="checkbox"
              name="cricket"
              checked={userDetails.interest.includes("cricket")}
              onChange={handleCheckboxHandler}
            />
            Cricket
          </label>
          {validationErrors.interest && (
            <div className="error">{validationErrors.interest}</div>
          )}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}

export default App;
