import React, { Fragment, useState } from 'react';
import './App.css';
import { check } from "./logic/check";
import { sums } from "./logic/sums";

function App() {
  const [data, setData] = useState({ number: 2, results: [] })

  const handleChange = (e) => {
    setData((prev) => {
      const newData = {...prev, [e.target.name]: e.target.value}

      return { ...newData, results: check(newData) }
    })
  }

  const sumsOptions = sums[parseInt(data.number)]

  return (
    <div className="App">
      <div className="Form-wrapper">
        <form>
          <fieldset onChange={handleChange} className="fieldset-number">
            <legend>Number of digits:</legend>

            {[2,3,4,5].map((digit) => (
              <Fragment key={digit}>
                <input type="radio" id={digit} name="number" value={digit} defaultChecked={digit === 2} style={{display: "none"}}/>
                <label htmlFor={digit} className={`number-label ${parseInt(data.number) === digit ? '-selected' : ''}`}>{digit}</label>
              </Fragment>
            ))}
          </fieldset>
          <br/>
          <label htmlFor='sum'>Sum of digits</label>
          <select onChange={handleChange} id='sum' name='sum' required style={{width: '120px'}}>
            <option value=''>Select</option>
            {sumsOptions && Object.keys(sumsOptions).map((sum) => (
              <option key={sum} value={sum}>{sum}</option>
            ))}
          </select>
          <br/>

          <label htmlFor='included'>Required digits</label>
          <input onChange={handleChange} id='included' name='included' style={{width: '120px'}}/>
          <br/>
          <label htmlFor='excluded'>Prevented digits</label>
          <input onChange={handleChange} id='excluded' name='excluded' style={{width: '120px'}}/>
        </form>

        {!!data.results?.length && <p>Result: <ul>{data.results.map((result) =>
          <li><b>{result}</b></li>
        )}</ul></p>}
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
