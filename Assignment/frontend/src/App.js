import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useInput } from "./input-hook";
import Words from "./Words";

function App() {
  const { value, bind, reset } = useInput("");
  const [isVisible, setVisible] = useState(false);
  const [isError, setError] = useState(false);
  const [wordlist, setWordList] = useState([]);

  const handleSubmit = async (evt) => {
    setError(false);
    evt.preventDefault();
    if (!value) {
      setError(true);
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

    var result = await fetch("http://localhost:5000/num", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        return result;
      })
      .catch((error) => console.log("error", error));
    setWordList(result);
    setVisible(true);
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
            {isError ? (
              <p>
                <code>Field cannot be left empty</code>
              </p>
            ) : (
              <p></p>
            )}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </header>
      {isVisible ? <Words wordlist={wordlist} /> : <p></p>}
    </div>
  );
}

export default App;
