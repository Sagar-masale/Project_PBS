import React, { useState } from 'react';
import './SignUpUser.css';
import axios from 'axios';

function SignUpUser() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pbsCondition, setPbsCondition] = useState(false);

  const registerUser = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/v1/users/register', {
      fullName,
      phoneNumber,
      email,
      password,
      pbsCondition,
    })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
  };

  const toggleClass = (selector, className) => {
    document.querySelector(selector).classList.toggle(className);
  };

  const CloseLoginBox = () => {
    toggleClass('.SignUpBox', 'SignUpBoxShow');
  };

  const ShowLoginBox = () => {
    toggleClass('.LoginOtpBox', 'LoginOtpBoxShow');
    toggleClass('.SignUpBox', 'SignUpBoxShow');
  };

  return (
    <div className="Login-Main-Container">
      <div className="Login-Pass-Container">
        <div className="LeftSide-Block-Login rounded-l-lg bg-white h-auto">
          <span
            className="material-symbols-outlined Close-Login-Box-Arrow-Phn relative cursor-pointer"
            onClick={CloseLoginBox}
          >
            close
          </span>
          <h1 className="LoginName text-3xl text-red-800 mt-5">Sign Up</h1>

          <div className="Input-Username flex justify-center mt-5">
            <form onSubmit={registerUser} className="FormUser">
              <div className="SetInput-Position w-full flex flex-col gap-8">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter Full Name*"
                  required
                  className="Input-User focus:ring-0"
                  onChange={(e) => setFullName(e.target.value)}
                />
                <div className="Set-Position-With-Country-Code-Box flex flex-row gap-5 w-full">
                  <div className="Country-Code-Box rounded-md flex justify-center items-center">
                    +91
                  </div>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter Mobile Number*"
                    required
                    className="Input-User focus:ring-0"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email ID*"
                  required
                  className="Input-User focus:ring-0"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password*"
                  required
                  className="Input-User focus:ring-0"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="CheckBoxes mt-10 flex flex-col gap-2">
                <span className="CheckBox-Gap flex items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    className="checkbox text-red-900 focus:ring-0 w-5 h-5"
                    onChange={(e) => setPbsCondition(e.target.checked)}
                  />
                  <span className="Remember text-wrap text focus:ring-0">
                    By continuing, I agree to{' '}
                    <span className="Conditions text-red-800 font-bold border-b-2 cursor-pointer">
                      Terms & Conditions
                    </span>{' '}
                    &{' '}
                    <span className="Policy text-red-800 font-bold border-b-2 cursor-pointer">
                      Privacy Policy
                    </span>
                  </span>
                </span>
              </div>

              <input
                type="submit"
                value="Continue"
                className="mt-10 text-white bg-red-800 w-44 h-12 rounded-md cursor-pointer hover:bg-red-950 duration-200 Button-Submit"
              />
            </form>
          </div>

          <span className="NewUser mt-10">
            Already a User?{' '}
            <span
              onClick={ShowLoginBox}
              className="New-SignUp underline cursor-pointer text-red-900"
            >
              Login
            </span>
          </span>
        </div>

        <div className="RightSide-Block-Login justify-center align-middle w-64">
          <span
            className="material-symbols-outlined Close-Login-Box-Arrow absolute cursor-pointer"
            onClick={CloseLoginBox}
          >
            close
          </span>
          <img
            src="./LoginImgs/LoginImg1.png"
            alt="Login visual"
            className="w-full h-full rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUpUser;
