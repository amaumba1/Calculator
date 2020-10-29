
import Big from "big.js";

import operate from "./operate";
import isNumber from "./isNumber";

/**
 * Given a button name and a calculator data object, return an updated
 * calculator data object.
 *
 * Calculator data object contains:
 *   total:String      the running total
 *   next:String       the next number to be operated on with the total
 *   operation:String  +, -, etc.
 */
export default function calculate(calcState, buttonName) {
  if (buttonName === "AC") {
    return {
      total: null,
      next: null,
      operation: null,
    };
  }

  if (isNumber(buttonName)) {
    if (buttonName === "0" && calcState.next === "0") {
      return {};
    }
    // If there is an operation, update next
    if (calcState.operation) {
      if (calcState.next) {
        return { next: calcState.next + buttonName };
      }
      return { next: buttonName };
    }
    // If there is no operation, update next and clear the value
    if (calcState.next) {
      const next = calcState.next === "0" ? buttonName : calcState.next + buttonName;
      return {
        next,
        total: null,
      };
    }
    return {
      next: buttonName,
      total: null,
    };
  }

  if (buttonName === "%") {
    if (calcState.operation && calcState.next) {
      const result = operate(calcState.total, calcState.next, calcState.operation);
      return {
        total: Big(result)
          .div(Big("100"))
          .toString(),
        next: null,
        operation: null,
      };
    }
    if (calcState.next) {
      return {
        next: Big(calcState.next)
          .div(Big("100"))
          .toString(),
      };
    }
    return {};
  }

  if (buttonName === ".") {
    if (calcState.next) {
      // ignore a . if the next number already has one
      if (calcState.next.includes(".")) {
        return {};
      }
      return { next: calcState.next + "." };
    }
    return { next: "0." };
  }

  if (buttonName === "=") {
    if (calcState.next && calcState.operation) {
      return {
        total: operate(calcState.total, calcState.next, calcState.operation),
        next: null,
        operation: null,
      };
    } else {
      // '=' with no operation, nothing to do
      return {};
    }
  }

  if (buttonName === "+/-") {
    if (calcState.next) {
      return { next: (-1 * parseFloat(calcState.next)).toString() };
    }
    if (calcState.total) {
      return { total: (-1 * parseFloat(calcState.total)).toString() };
    }
    return {};
  }

  // Button must be an operation

  // When the user presses an operation button without having entered
  // a number first, do nothing.
  // if (!calcState.next && !calcState.total) {
  //   return {};
  // }

  // User pressed an operation button and there is an existing operation
  if (calcState.operation) {
    return {
      total: operate(calcState.total, calcState.next, calcState.operation),
      next: null,
      operation: buttonName,
    };
  }

  // no operation yet, but the user typed one

  // The user hasn't typed a number yet, just save the operation
  if (!calcState.next) {
    return { operation: buttonName };
  }

  // save the operation and shift 'next' into 'total'
  return {
    total: calcState.next,
    next: null,
    operation: buttonName,
  };
}