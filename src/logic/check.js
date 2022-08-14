import { sums } from "./sums";

export const check = ({sum, number, included = '', excluded = ''} = {}) => {
  const combinations = sums?.[parseInt(number)]?.[parseInt(sum)]

  if (!combinations?.length) {
    return []
  }

  const include = included.split('').map((d) => parseInt(d))
  const exclude = excluded.split('').map((d) => parseInt(d))

  const filteredCombinations = combinations.filter((combination) => {
    const hasIncluded = !included || include.every((i) => combination.includes(i))
    const omitsExcluded = !excluded || exclude.every((i) => !combination.includes(Math.abs(i)))
    return (hasIncluded && omitsExcluded)
  })

  const filteredDigits = []
  filteredCombinations.forEach((combination) => {
    combination.split(' ').forEach((combinationDigit) => {
      if (filteredDigits.indexOf(combinationDigit) === -1) {
        filteredDigits.push(combinationDigit)
      }
    })
  })
  filteredDigits.sort()
  console.log({ filteredCombinations, filteredDigits });
  return {combinations: filteredCombinations, digits: filteredDigits}
}
