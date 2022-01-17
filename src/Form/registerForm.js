import { useState } from "react";
import "./loginForm.css";

export default function RegisterForm() {
  //Define a state for registration data
  const [RegisterData, setRegisterData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",

    //flags for validation
    isvalid: false,
    ispassvalid: false,
    ismatched: false,
  });

  //Define a state for errors handling
  const [errors, setErrors] = useState({
    nameErr: null,
    emailErr: null,
    usernameErr: null,
    passwordErr: null,
    confirmPasswordErr: null,
  });

  //state for toggling password state (show and hide)
  const [passwordShown, setPasswordShown] = useState(false);

  //Regular expression for password to contain at least one lowercase , one uppercase , at least one digit and special character
  const passRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  //Regular expression for email to contain @ and .com
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+.com$/;

  //Change Data function on Click
  const changeData = (e) => {
    //Set the new value of email and set previous values for other data
    if (e.target.name === "email") {
      setRegisterData({
        ...RegisterData,
        email: e.target.value,
      });

      //Check if the new email value matches the regular expression
      if (e.target.value.match(emailRegex)) {
        RegisterData.isvalid = true;
      }

      //Check if errors exist and set them so we can show them later to user
      setErrors({
        ...errors,
        emailErr:
          e.target.value.length === 0
            ? "This field is required"
            : e.target.value.length < 3
            ? "Minimum length is 3 characters"
            : RegisterData.isvalid == false
            ? "Invalid Email"
            : null,
      });
    }

    //Set the new value of password and set previous values for other data
    else if (e.target.name === "password") {
      setRegisterData({
        ...RegisterData,
        password: e.target.value,
      });

      //Check if the password value matches the regular expression
      if (e.target.value.match(passRegex)) {
        RegisterData.ispassvalid = true;
      }

      //Check if errors exist and set them so we can show them later to user
      setErrors({
        ...errors,
        passwordErr:
          e.target.value === 0
            ? "This field is required"
            : e.target.value.length < 8
            ? "Minimum length is 8 characters"
            : RegisterData.ispassvalid == false
            ? "The Password must contain at least one lowercase , one uppercase , at least one digit and special character"
            : null,
      });
    }

    //Set the new value of confirm password and set previous values for other data
    else if (e.target.name === "confirmPassword") {
      setRegisterData({
        ...RegisterData,
        confirmPassword: e.target.value,
      });

      //Check if errors exist and set them so we can show them later to user
      setErrors({
        ...errors,
        confirmPasswordErr:
          e.target.value === 0
            ? "This field is required"
            : e.target.value.length < 8
            ? "Minimum length is 8 characters"
            : e.target.value !== RegisterData.password
            ? "Passwords do not match"
            : null,
      });
    }

    //Set the new value of name and set previous values for other data
    else if (e.target.name === "name") {
      setRegisterData({
        ...RegisterData,
        name: e.target.value,
      });

      //Check if errors exist and set them so we can show them later to user
      setErrors({
        ...errors,
        nameErr:
          e.target.value.length === 0
            ? "This field is required"
            : e.target.value.length < 3
            ? "Minimum length is 3 characters"
            : null,
      });
    }

    //Set the new value of user name and set previous values for other data
    else if (e.target.name === "username") {
      setRegisterData({
        ...RegisterData,
        username: e.target.value,
      });

      //Regular expression for white spaces
      const spaceRegex = /\s/g;

      //Function to check for white spaces
      function hasWhiteSpace(s) {
        return spaceRegex.test(s);
      }

      //Variable holdes true or false (the return of hasWhiteSpace function)
      let checkSpace = hasWhiteSpace(RegisterData.username);

      //Check if errors exist and set them so we can show them later to user
      setErrors({
        ...errors,
        usernameErr:
          e.target.value.length === 0
            ? "This field is required"
            : e.target.value.length < 3
            ? "Minimum length is 3 characters"
            : checkSpace === true
            ? "Usernames can't have spaces"
            : null,
      });
    }
  };

  //Submit handler function to prevent the reload of page on submitting and handle the APIs
  const submitRegisterData = (e) => {
    e.preventDefault();
    if (!errors.emailErr && !errors.passwordErr) {
      console.log(RegisterData);
    }
  };

  //Function to toggle password type from text to password and vice versa on click
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="container py-6">
      <h1>Registration Form</h1>
      <div className="form-group">
        <form onSubmit={(e) => submitRegisterData(e)}>
          {/* Name Field */}
          <div className="mb-3">
            <label htmlFor="nameID" className="form-label">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.nameErr ? "border-danger" : ""
              }`}
              id="nameID"
              aria-describedby="name"
              value={RegisterData.name}
              onChange={(e) => changeData(e)}
              name="name"
            />
            <div id="name" className="form-text text-danger">
              {errors.nameErr}
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="emailID" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className={`form-control ${
                errors.emailErr ? "border-danger" : ""
              }`}
              id="emailID"
              aria-describedby="email"
              value={RegisterData.email}
              onChange={(e) => changeData(e)}
              name="email"
            />
            <div id="email" className="form-text text-danger">
              {errors.emailErr}
            </div>
          </div>

          {/* UserName Field */}

          <div className="mb-3">
            <label htmlFor="usernameID" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.usernameErr ? "border-danger" : ""
              }`}
              id="usernameID"
              aria-describedby="username"
              value={RegisterData.username}
              onChange={(e) => changeData(e)}
              name="username"
            />
            <div id="username" className="form-text text-danger">
              {errors.usernameErr}
            </div>
          </div>

          {/* Password Field */}

          <div className="mb-3">
            <label htmlFor="passwordID" className="form-label">
              Password
            </label>
            <div className="pass">
              <input
                type={passwordShown ? "text" : "password"}
                className={`form-control ${
                  errors.passwordErr ? "border-danger" : ""
                }`}
                id="passwordID"
                value={RegisterData.password}
                onChange={(e) => changeData(e)}
                name="password"
              />
              <span>
                <img
                  onClick={togglePassword}
                  className="eye-icon"
                  src="https://cdns.iconmonstr.com/wp-content/assets/preview/2017/240/iconmonstr-eye-9.png"
                  alt="eye-icon"
                />
              </span>
            </div>
            <div id="password" className="form-text text-danger">
              {errors.passwordErr}
            </div>
          </div>

          {/* Confirm Password Field */}

          <div className="mb-3">
            <label htmlFor="confirmPasswordID" className="form-label">
              Confirm Password
            </label>
            <div className="pass">
              <input
                type={passwordShown ? "text" : "password"}
                className={`form-control ${
                  errors.confirmPasswordErr ? "border-danger" : ""
                }`}
                id="confirmPasswordID"
                value={RegisterData.confirmPassword}
                onChange={(e) => changeData(e)}
                name="confirmPassword"
              />
              <span>
                <img
                  onClick={togglePassword}
                  className="eye-icon"
                  src="https://cdns.iconmonstr.com/wp-content/assets/preview/2017/240/iconmonstr-eye-9.png"
                  alt="eye-icon"
                />
              </span>
            </div>
            <div id="confirmPassword" className="form-text text-danger">
              {errors.confirmPasswordErr}
            </div>
          </div>

          {/* Submit*/}
          {/* Submit Button is disabled unless all fields have valid data (no errors) */}
          <button
            type="submit"
            disabled={
              errors.passwordErr ||
              errors.emailErr ||
              errors.nameErr ||
              errors.confirmPasswordErr ||
              errors.usernameErr
            }
            className="btn btn-dark"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
