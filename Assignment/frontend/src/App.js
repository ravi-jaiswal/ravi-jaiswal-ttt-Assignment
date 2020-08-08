import React, { useState } from "react";

import "./App.css";
import { useInput } from "./input-hook";
import Words from "./Words";

function App() {
  const { value, bind, reset } = useInput("");
  const [isVisible, setVisible] = useState(false);
  const [isErrorBlank, setErrorBlank] = useState(false);
  const [isNoError, setNoError] = useState(false);
  const [isErrorNeg, setErrorNeg] = useState(false);
  const [wordlist, setWordList] = useState([]);
  const [valuep, setvaluep] = useState();

  const handleSubmit = async (evt) => {
    setVisible(false);
    setNoError(false);
    setErrorBlank(false);
    setErrorNeg(false);
    evt.preventDefault();
    if (!value) {
      setErrorBlank(true);
      return null;
    }
    if (value <= 0) {
      setErrorNeg(true);
      return null;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("num", value);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://murmuring-earth-05108.herokuapp.com/num";

    var result = await fetch(proxyurl + url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        return result;
      })
      .catch((error) => console.log("error", error));
    setWordList(result);
    setVisible(true);

    setvaluep(value);
    setNoError(true);
  };
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Enter Number
        </a>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row justify-content-center">
              <div className="form-group col-6">
                <input
                  type="number"
                  className="form-control num_input"
                  placeholder="Enter number"
                  {...bind}
                />
              </div>
            </div>
            {isErrorBlank ? (
              <p>
                <code>Field cannot be left empty</code>
              </p>
            ) : (
              <p></p>
            )}
            {isErrorNeg ? (
              <p>
                <code>Number cannot be negative or 0</code>
              </p>
            ) : (
              <p></p>
            )}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        {isNoError ? (
          <p>
            <code className="valuep">Showing top {valuep} words</code>
          </p>
        ) : (
          <p></p>
        )}
      </header>
      {isVisible ? <Words wordlist={wordlist} /> : <p></p>}
    </div>
  );
}

export default App;
