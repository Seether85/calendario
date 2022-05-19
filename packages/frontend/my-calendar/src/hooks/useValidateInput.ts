import React, { useState } from 'react'

export const useValidateInput = (
  validateFunction: (input: string) => boolean,
  initialInputValue: string = ''
) => {
  const [inputValue, setInputValue] = useState(initialInputValue)
  const [isTouched, setIsTouched] = useState(false)

  const isValid = validateFunction(inputValue)
  const hasError = !isValid && isTouched

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onBlurHandler = (_: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true)
  }

  return {
    value: inputValue,
    isValid,
    hasError,
    onChangeHandler,
    onBlurHandler,
  }
}
