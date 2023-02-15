import React, { useState } from 'react';
import StrengthMeter from './StrengthMeter';
import Background from './Background'
const PasswordForm = () => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(false);
  const [containsNumbers, setContainsNumbers] = useState(false);
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [containsSymbols, setContainsSymbols] = useState(false);


  const [poorPassword, setPoorPassword] = useState(false);
  const [weakPassword, setWeakPassword] = useState(false);
  const [strongPassword, setStrongPassword] = useState(false);
  const [passwordError, setPasswordErr] = useState("");

  const passwordStrength = (evnt) => {
    const passwordValue = evnt.target.value;
    const passwordLength = passwordValue.length;

    const poorRegExp = /[a-z]/;
    const weakRegExp = /(?=.*?[0-9])/;
    const strongRegExp = /(?=.*?[#?!@$%^&*-])/;
    const whitespaceRegExp = /^$|\s+/;

    const poorPassword = poorRegExp.test(passwordValue);
    const weakPassword = weakRegExp.test(passwordValue);
    const strongPassword = strongRegExp.test(passwordValue);
    const whiteSpace = whitespaceRegExp.test(passwordValue);

    if (passwordValue === "") {
      setPasswordErr("Password is Empty");
      setPoorPassword(false);
      setWeakPassword(false);
      setStrongPassword(false);
    } else {
      // to check whitespace
      if (whiteSpace) {
        setPasswordErr("Whitespaces are not allowed");
      }
      // to check poor password
      if (
        passwordLength <= 3 &&
        (poorPassword || weakPassword || strongPassword)
      ) {
        setPoorPassword(true);
        setPasswordErr("Password is Easy");
      }
      // to check weak password
      if (
        passwordLength >= 4 &&
        poorPassword &&
        (weakPassword || strongPassword)
      ) {
        setWeakPassword(true);
        setPasswordErr("Password is Average");
      } else {
        setWeakPassword(false);
      }
      // to check strong Password
      if (
        passwordLength >= 6 &&
        poorPassword &&
        weakPassword &&
        strongPassword
      ) {
        setStrongPassword(true);
        setPasswordErr("Password is Strong");
      } else {
        setStrongPassword(false);
      }
    }
  };
  // check to see if there is any number
  const checkForNumbers = (string) => {
    const matches = string.match(/\d+/g);
    setContainsNumbers(matches !== null);
  };

  // check for upper case
  const checkLetter = (string) => {
    const matches = string.match(/[\w]/);
    setIsUpperCase(matches !== null);
  };

  // check for symbols
  const checkForSymbols = (string) => {
    const symbols = new RegExp(/[!@#$%^&*(),.?":{}|<>]/u);
    setContainsSymbols(symbols.test(string));
  };

  // handle password
  const handleChange = (e) => {
    const targetValue = e.target.value.replace(/\s/g, '');
    checkForNumbers(targetValue);
    checkLetter(targetValue);
    checkForSymbols(targetValue);
    setPassword(targetValue);
    setPasswordLength(targetValue.length > 7);
  };

  // submit form
  const submitForm = (e) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  const btnStatus = passwordLength && containsNumbers && isUpperCase && containsSymbols;

  return (
    <>
      <div class="container">
        <div class="card">
          <form class="card_form">
            <div className="title">Login</div>
            <div className="content">
              <form>
                <input type="password" onInput={passwordStrength} onChange={handleChange} value={password} placeholder="Enter Password" passwordStrength={passwordStrength} />
                <StrengthMeter
                  poorPassword={poorPassword}
                  weakPassword={weakPassword}
                  strongPassword={strongPassword}
                  passwordError={passwordError}
                />
                <div>
                  <div className={passwordLength ? 'green' : null}>Minimum 8 characters</div>
                  <div className={containsNumbers ? 'green' : null}>Contains numbers</div>
                  <div className={isUpperCase ? 'green' : null}>Contains letter</div>
                  <div className={containsSymbols ? 'green' : null}>Contains Symbols(!@#$%^&*)</div>
                </div>
                <button className="Submit" disabled={!btnStatus} onClick={submitForm}>
                  Submit
                </button>
              </form>
            </div>
          </form>
        </div>
        <Background />
      </div>
    </>
  );
};

export default PasswordForm;
