import React, { Fragment, useMemo, useState } from 'react'
import './App.css'
import { check as getResults, CheckProps } from './logic/check'
import { sums } from './logic/sums'
import Iframe from './Iframe'

const DIGITS_IN_GROUP = [2, 3, 4, 5]
const GROUP_SUM = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function App() {
  const [data, setData] = useState<CheckProps>({
    number: 2,
    sum: 3,
    included: [],
    excluded: [],
  })
  const results = useMemo(() => {
    return getResults(data)
  }, [data])

  const handleChange = ({ target }: React.FormEvent<HTMLFieldSetElement>) => {
    const { name, value } = target as HTMLInputElement
    setData((prev) => {
      const newData = { ...prev, [name]: parseInt(value) }

      const noSumForChangedNumber = !sums[newData.number][newData.sum]
      if (name === 'number' && noSumForChangedNumber) {
        newData.sum = parseInt(Object.keys(sums[newData.number])[0])
      }

      return newData
    })
  }

  const handleInExclusionChange = ({
    target,
  }: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = target as HTMLInputElement
    setData((prev) => ({
      ...prev,
      [name]: value.split('').map((d) => parseInt(d)),
    }))
  }

  const sumsOptions = sums[data.number] || {}

  return (
    <div className="App">
      <div className="Form-wrapper">
        <fieldset onChange={handleChange} className="fieldset-number">
          <legend>Group size</legend>

          {DIGITS_IN_GROUP.map((digit) => (
            <Fragment key={digit}>
              <input
                type="radio"
                id={`number-${digit}`}
                name="number"
                value={digit}
                defaultChecked={digit === 2}
                style={{ display: 'none' }}
              />
              <label
                htmlFor={`number-${digit}`}
                className={`number-label ${data.number === digit ? '-selected' : ''}`}
              >
                {digit}
              </label>
            </Fragment>
          ))}
        </fieldset>

        <fieldset
          onChange={handleChange}
          className="fieldset-number -constant-height"
          key={data.number}
        >
          <legend>Group sum</legend>

          {Object.keys(sumsOptions).map((digit) => (
            <Fragment key={digit}>
              <input
                type="radio"
                id={`sum-${digit}`}
                name="sum"
                value={digit}
                style={{ display: 'none' }}
              />
              <label
                htmlFor={`sum-${digit}`}
                className={`number-label ${data.sum === parseInt(digit) ? '-selected' : ''}`}
              >
                {digit}
              </label>
            </Fragment>
          ))}
        </fieldset>

        <div className="cluded-input-wrapper">
          <label className="cluded-label" htmlFor="included">
            Required
          </label>
          <input
            onChange={handleInExclusionChange}
            id="included"
            name="included"
            className="cluded-input"
          />
        </div>

        <div className="cluded-input-wrapper">
          <label className="cluded-label" htmlFor="excluded">
            Prevented
          </label>
          <input
            onChange={handleInExclusionChange}
            id="excluded"
            name="excluded"
            className="cluded-input"
          />
        </div>

        <div>
          <span className="results-label">Result:</span>
          <div className="results-container">
            {results.combinations?.length ? (
              results.combinations.map((result) => (
                <span key={result.join('')}>{result}</span>
              ))
            ) : (
              <span>No results</span>
            )}
          </div>
        </div>
        <div>
          <span className="results-label">Digits:</span>
          <div className="results-container">
            {results.digits?.length ? (
              GROUP_SUM.map((digit) => (
                <span
                  key={digit}
                  className={
                    results.digits.includes(digit) ? '' : 'inactive-result'
                  }
                >
                  {digit}
                </span>
              ))
            ) : (
              <span>No allowed digits!</span>
            )}
          </div>
        </div>
      </div>

      <Iframe />
    </div>
  )
}
