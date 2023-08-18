import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  const { isLogged } = useAppSelector((state) => state.auth);
  return isLogged;
};

export const useValidation = (value: string, validations: any) => {
  const [isEmpty, setEmpty] = useState(true);
  const [isWithoutSpaces, setWithoutSpaces] = useState(true);
  const [isMinL, setMinL] = useState(true);
  const [isMaxL, setMaxL] = useState(true);
  const [isNumber, setNumber] = useState(true);
  const [isSymbol, setSymbol] = useState(false);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;

        case "maxLength":
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;
        case "isEmail":
          const re =
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

          re.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "isWithoutSpaces":
          const isSpaces = /(?=.*[\s])/;
          !isSpaces.test(value)
            ? setWithoutSpaces(true)
            : setWithoutSpaces(false);
          break;
        case "isMinL":
          const isMinL = /(?=.*[a-z])/;
          isMinL.test(value) ? setMinL(true) : setMinL(false);
          break;
        case "isMaxL":
          const isMaxL = /(?=.*[A-Z])/;
          isMaxL.test(value) ? setMaxL(true) : setMaxL(false);
          break;
        case "isNumber":
          const isNumber = /(?=.*[0-9])/;
          isNumber.test(value) ? setNumber(true) : setNumber(false);
          break;
        case "isSymbol":
          const isSymbol = /(?=.*[!@#$%^&*])/;
          isSymbol.test(value) ? setSymbol(true) : setSymbol(false);
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (
      isEmpty ||
      minLengthError ||
      maxLengthError ||
      emailError ||
      isWithoutSpaces ||
      isMinL ||
      isMaxL ||
      isNumber ||
      isSymbol
    ) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
    isWithoutSpaces,
    isMinL,
    isMaxL,
    isNumber,
    isSymbol,
  ]);

  return {
    isEmpty,
    isWithoutSpaces,
    minLengthError,
    maxLengthError,
    emailError,
    isMinL,
    isMaxL,
    isNumber,
    isSymbol,
    inputValid,
  };
};

export const useInput = (initialValue: string, validations: any) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};





