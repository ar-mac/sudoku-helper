import { sums } from "./sums";

export interface CheckProps {
  sum: number,
  number: number,
  included: number[]
  excluded: number[]
}
export const check = ({sum, number, included, excluded}: CheckProps) => {
  console.log({sum, number, included, excluded })
  const combinations = sums?.[number]?.[sum]

  if (!combinations?.length) {
    return { combinations: [], digits: [] }
  }

  const filteredCombinations = combinations.filter((combination) => {
    const hasIncluded = !included.length || included.every((i) => combination.includes(i))
    const omitsExcluded = !excluded.length || excluded.every((i) => !combination.includes(i))
    return (hasIncluded && omitsExcluded)
  })

  const filteredDigits: number[] = []
  filteredCombinations.forEach((combination) => {
    combination.forEach((combinationDigit) => {
      if (filteredDigits.indexOf(combinationDigit) === -1) {
        filteredDigits.push(combinationDigit)
      }
    })
  })
  filteredDigits.sort()
  return { combinations: filteredCombinations, digits: filteredDigits }
}
