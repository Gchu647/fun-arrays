"use strict";
var dataset = require('./dataset.json');
const balances = dataset.bankBalances;

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
function greaterThan100k(arr) {
  
  function test100k(element, index, array) {
    return parseFloat(element.amount) > 100000;
  } 
  
  return arr.filter(test100k);
}

var hundredThousandairs = greaterThan100k(balances);

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `rounded`

  `rounded` value is `amount` rounded to the nearest dollar

  Example:
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting new array to `datasetWithRoundedDollar`
*/
function roundedDollars(arr) {

  function addRounded(element, index, array) {
    let num = Math.round(parseFloat(element.amount));

    return {
      amount: element.amount,
      state: element.state,
      rounded: num
    }
  }

  return arr.map(addRounded);
}

var datasetWithRoundedDollar = roundedDollars(balances);

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `roundedDime`

  `roundedDime` value is `amount` rounded to the nearest 10th of a cent

  Example 1
    {
      "amount": "134758.46",
      "state": "HI"
      "roundedDime": 134758.5
    }
  Example 2
    {
      "amount": "134758.44",
      "state": "HI"
      "roundedDime": 134758.4
    }
  assign the resulting new array to `roundedDime`
*/
function roundedToDimes(arr) {

  function nearestDime(element, index, array) {
    //Rounding it to the nearest 10th decimal
    let num = parseFloat(Math.round(element.amount * 10)/10);
 
    return {
      amount: element.amount,
      state: element.state,
      roundedDime: num
    };
  }

  return arr.map(nearestDime);
}


var datasetWithRoundedDime = roundedToDimes(balances);

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
function sumOfAllAccounts(arr) {

  function objToNum(element, index, arr) {
    element = element.amount;
    return element;
  }
  
  function add(accum, currentVal, index, arr) {
    let total = parseFloat(accum) + parseFloat(currentVal);
    total = parseFloat(total.toFixed(2));
    return total;
  }

  return arr.map(objToNum).reduce(add, 0);
}

var sumOfBankBalances = sumOfAllAccounts(balances);

/*
  from each of the following states:
    Wisconsin, WI
    Illinois, IL
    Wyoming, WY
    Ohio, OH
    Georgia, GA
    Delaware DE
  take each `amount` and add 18.9% interest to it rounded to the nearest cent
  and then sum it all up into one value saved to `sumOfInterests`
 */
function interestOfStates(arr) {

  function filterTheStates(element, index, array) {
    if(element.state === "WI" || element.state === "IL" || element.state === "WY" || element.state === "OH" || element.state === "GA" || element.state === "DE") {
      return true;
    } else {
      return false;
    }
  }

  function mapTheAmounts(element, index, array) {
    let interest = (parseFloat(element.amount) * .189).toFixed(2);
    return parseFloat(interest);
  }

  function add(accum, currentVal, index, array) {
    return accum + currentVal;
  }

  return parseFloat(arr.filter(filterTheStates).map(mapTheAmounts).reduce(add).toFixed(2));
}

var sumOfInterests = interestOfStates(balances);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest cent

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
function objStateSums(balances) {
  let obj = {};

  function addingToObj(accum, currentVal, index, array) {
    if(!obj[currentVal.state]) {
      obj[currentVal.state] = 0;
    }

    // console.log("index: ", index);
    // console.log(obj);
    return obj[currentVal.state] += parseFloat(currentVal.amount);
  }

  console.log(balances.reduce(addingToObj, obj));
  return balances.reduce(addingToObj, obj);
}

var stateSums = objStateSums(balances);

/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var sumOfHighInterests = null;

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = null;

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = null;

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  datasetWithRoundedDollar : datasetWithRoundedDollar,
  datasetWithRoundedDime : datasetWithRoundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
