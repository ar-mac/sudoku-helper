import React, { Fragment, useMemo, useState } from 'react'
import './App.css'
import { check as getResults, CheckProps } from './logic/check'
import { sums } from './logic/sums'
import Iframe from './Iframe'

const DIGITS_IN_GROUP = [2, 3, 4, 5]
const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

interface ClusionType {
  [key: string]: string
}

const CLUSION_MAP: ClusionType = {
  included: 'excluded',
  excluded: 'included',
}
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
  }: React.FormEvent<HTMLInputElement | HTMLFieldSetElement>) => {
    const { name, value } = target as HTMLInputElement
    const newValue = parseInt(value)
    setData((prev) => {
      const inExClusionValues = prev[name as keyof CheckProps] as number[]
      const otherName = CLUSION_MAP[name as keyof CheckProps]
      const otherInExClusionValues = prev[
        otherName as keyof CheckProps
      ] as number[]

      const index = inExClusionValues.indexOf(newValue)
      const otherIndex = otherInExClusionValues.indexOf(newValue)
      const newValues =
        index === -1
          ? [...inExClusionValues, newValue]
          : [
              ...inExClusionValues.slice(0, index),
              ...inExClusionValues.slice(index + 1),
            ]
      const otherNewValues =
        otherIndex === -1
          ? otherInExClusionValues
          : [
              ...otherInExClusionValues.slice(0, otherIndex),
              ...otherInExClusionValues.slice(otherIndex + 1),
            ]

      return { ...prev, [name]: newValues, [otherName]: otherNewValues }
    })
  }

  const clearInExClusion = (name: string) => () => {
    setData((prevState) => ({ ...prevState, [name]: [] }))
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

        <fieldset
          onChange={handleInExclusionChange}
          className="fieldset-number"
        >
          <legend>Included</legend>

          {DIGITS.map((digit) => (
            <Fragment key={digit}>
              <input
                type="checkbox"
                id={`included-number-${digit}`}
                name="included"
                value={digit}
                style={{ display: 'none' }}
              />
              <label
                htmlFor={`included-number-${digit}`}
                className={`number-label -included ${data.included.includes(digit) ? '-selected' : ''}`}
              >
                {digit}
              </label>
            </Fragment>
          ))}
          <button
            className="cluded-clear"
            onClick={clearInExClusion('included')}
          >
            X
          </button>
        </fieldset>

        <fieldset
          onChange={handleInExclusionChange}
          className="fieldset-number"
        >
          <legend>Excluded</legend>

          {DIGITS.map((digit) => (
            <Fragment key={digit}>
              <input
                type="checkbox"
                id={`excluded-number-${digit}`}
                name="excluded"
                value={digit}
                style={{ display: 'none' }}
              />
              <label
                htmlFor={`excluded-number-${digit}`}
                className={`number-label -excluded ${data.excluded.includes(digit) ? '-selected' : ''}`}
              >
                {digit}
              </label>
            </Fragment>
          ))}
          <button
            className="cluded-clear"
            onClick={clearInExClusion('excluded')}
          >
            X
          </button>
        </fieldset>

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
              DIGITS.map((digit) => (
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
