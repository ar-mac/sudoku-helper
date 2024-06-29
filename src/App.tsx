import React, { Fragment, useState } from 'react';
import './App.css';
import { check as getResults } from "./logic/check";
import { sums } from "./logic/sums";

function App() {
  const [data, setData] = useState({ number: '2', sum: '3', results: getResults({number: '2', sum: '3'}) })

  const handleChange = ({target}) => {
    const {name, value} = target
    console.log(`target: `, target);
    setData((prev) => {
      const newData = {...prev, [name]: value}

      console.log({ name, value });
      if (name === 'number' && !sums[parseInt(newData.number)][parseInt(newData.sum)]) {
        newData.sum = Object.keys(sums[parseInt(newData.number)])[0]
      }

      newData.results = getResults(newData)
      return newData
    })
  }

  const sumsOptions = sums[parseInt(data.number)] || {}

  return (
    <div className="App">
      <div className="Form-wrapper">
        <fieldset onChange={handleChange} className="fieldset-number">
          <legend>Number of digits:</legend>

          {['2','3','4','5'].map((digit) => (
            <Fragment key={digit}>
              <input type="radio" id={`number-${digit}`} name="number" value={digit} defaultChecked={digit === 2} style={{display: "none"}}/>
              <label htmlFor={`number-${digit}`} className={`number-label ${data.number === digit ? '-selected' : ''}`}>{digit}</label>
            </Fragment>
          ))}
        </fieldset>

        <fieldset onChange={handleChange} className="fieldset-number -constant-height" key={data.number}>
          <legend>Sum of digits:</legend>

          {Object.keys(sumsOptions).map((digit) => (
            <Fragment key={digit}>
              <input type="radio" id={`sum-${digit}`} name="sum" value={digit} style={{display: "none"}}/>
              <label htmlFor={`sum-${digit}`} className={`number-label ${data.sum === digit ? '-selected' : ''}`}>{digit}</label>
            </Fragment>
          ))}
        </fieldset>

        <div>
          <label className="cluded-label" htmlFor='included'>Required digits: </label>
          <input onChange={handleChange} id='included' name='included' className="cluded-input" />
        </div>

        <div>
          <label className="cluded-label" htmlFor='excluded'>Prevented digits: </label>
          <input onChange={handleChange} id='excluded' name='excluded' className="cluded-input" />
        </div>

        <div>
          <span className="cluded-label">Result:</span>
          <div className="results-container">
            {!!data.results.combinations?.length
              ? data.results.combinations.map((result) => <span key={result}>{result}</span>)
              : <span>No results</span>
            }
          </div>
        </div>
        <div>
          <span className="cluded-label">Digits:</span>
          <div className="results-container">
            {!!data.results.digits?.length
              ? data.results.digits.map((result) => <span key={result}>{result}</span>)
              : <span>No allowed digits!</span>
            }
          </div>
        </div>
      </div>

      <Iframe />
    </div>
  );
}

export default App;
