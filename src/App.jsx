import React, { useRef, useState } from 'react';
import './App.css';
import { check } from "./logic/check";
import { sums } from "./logic/sums";

const prepareData = (data) => ({
  sum: data.sum.value,
  length: data.number.value,
  included: data.included.value,
  excluded: data.excluded.value
})

function App() {
  const formRef = useRef()
  const numberRef = useRef()
  const [results, setResult] = useState([])

  const handleChange = () => {
    const prepared = prepareData(formRef.current.elements);
    setResult(check(prepared))
  }

  const sumsOptions = sums?.[parseInt(numberRef.current?.value || '2')]

  return (
    <div className="App">
      <div className="Form-wrapper">
        <form ref={formRef}>
          <label htmlFor='number'>Number of digits</label>
          <select ref={numberRef} onChange={handleChange} id='number' name='number' style={{width: '120px'}}>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          <br/>
          <label htmlFor='sum'>Sum of digits</label>
          <select onChange={handleChange} id='sum' name='sum' required style={{width: '120px'}}>
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

        {!!results?.length && <p>Result: <ul>{results.map((result) =>
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
