import React, { Fragment, useState } from 'react';
import './App.css';
import { check } from "./logic/check";
import { sums } from "./logic/sums";

function App() {
  const [data, setData] = useState({ number: '2', sum: '3', results: [] })

  const handleChange = ({target: {name, value}}) => {
    setData((prev) => {
      const newData = {...prev, [name]: value}

      if (name === 'number') {
        newData.sum = Object.keys(sums[parseInt(newData.number)] || {})[0] || null
      }

      newData.results = check(newData)
      return newData
    })
  }

  const sumsOptions = sums[parseInt(data.number)] || {}

  return (
    <div className="App">
      <div className="Form-wrapper">
        <form>
          <fieldset onChange={handleChange} className="fieldset-number">
            <legend>Number of digits:</legend>

            {['2','3','4','5'].map((digit) => (
              <Fragment key={digit}>
                <input type="radio" id={digit} name="number" value={digit} defaultChecked={digit === 2} style={{display: "none"}}/>
                <label htmlFor={digit} className={`number-label ${data.number === digit ? '-selected' : ''}`}>{digit}</label>
              </Fragment>
            ))}
          </fieldset>
          <br/>

          <fieldset onChange={handleChange} className="fieldset-number -constant-height" key={data.number}>
            <legend>Sum of digits:</legend>

            {Object.keys(sumsOptions).map((digit) => (
              <Fragment key={digit}>
                <input type="radio" id={digit} name="sum" value={digit} style={{display: "none"}}/>
                <label htmlFor={digit} className={`number-label ${data.sum === digit ? '-selected' : ''}`}>{digit}</label>
              </Fragment>
            ))}
          </fieldset>
          <br/>

          <label htmlFor='included'>Required digits</label>
          <input onChange={handleChange} id='included' name='included' style={{width: '120px'}}/>
          <br/>
          <label htmlFor='excluded'>Prevented digits</label>
          <input onChange={handleChange} id='excluded' name='excluded' style={{width: '120px'}}/>
        </form>

        {!!data.results?.length && <div>Result: <ul>{data.results.map((result) =>
          <li><b>{result}</b></li>
        )}</ul></div>}
      </div>


      <iframe
        id="inlineFrameExample"
        title="Inline Frame Example"
        width="600"
        height="100%"
        src="https://sudoku.com/killer/expert/"
      />
    </div>
  );
}

export default App;
