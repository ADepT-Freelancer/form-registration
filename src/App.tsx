import React, { useEffect, useState } from "react";
import "./App.css";

// компонента з використанням state внутри компоненти
// function App() {

//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [emailDirty, setEmailDirty] = useState(false);
//   const [passwordDirty, setPasswordDirty] = useState(false);
//   const [emailError, setEmailError] = useState(
//     "Це поле не може  бути порожнім"
//   );
//   const [passwordError, setPasswordError] = useState(
//     "Це поле не може  бути порожнім"
//   );

//   // const [typeOfPasswordError, setTypeOfPasswordError] = useState({
//   //   fewCharactersError: true,
//   //   manyCharactersError: true,
//   //   bigLettersError: true,
//   //   specialSymbolsError: true,
//   // });
//   // console.log(typeOfPasswordError.fewCharactersError);
//   // if(typeOfPasswordError.fewCharactersError){setTypeOfPasswordError((actual) => {
//   //   actual.fewCharactersError = false;
//   //   return actual;
//   // });}
//   // console.log(typeOfPasswordError.fewCharactersError);

//   const [formValid, setFormValid] = useState(false);

//   useEffect(() => {
//     if (emailError || passwordError) {
//       setFormValid(false);
//     } else {
//       setFormValid(true);
//     }
//   }, [emailError, passwordError]);

//   const emailHandler = (e: any) => {
//     setEmail(e.target.value);
//     const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     if (!re.test(String(e.target.value).toLowerCase())) {
//       return setEmailError("Невірний Email");
//     } else {
//       setEmailError("");
//     }
//   };

//   const passwordHandler = (e: any) => {
//     setPassword(e.target.value);
//     if (e.target.value.length < 3) {
//       setPasswordError("Пароль має бути більшим ніж 3 символи");
//       if (e.target.value.length === 0) {
//         setPasswordError("Це поле не може  бути порожнім");
//       }
//     } else if (e.target.value.length > 16) {
//       setPasswordError("Пароль має бути коротшим ніж 16 символів");
//     } else {
//       setPasswordError("");
//     }
//   };

//   const bluerHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
//     switch (e.target.name) {
//       case "email":
//         setEmailDirty(true);
//         break;
//       case "password":
//         setPasswordDirty(true);
//         break;
//     }
//   };

//   return (
//     <div className="app">
//       <form>
//         <h1>Реєстрація </h1>
//         <div>
//           {emailDirty && emailError && (
//             <div style={{ color: "red" }}>{emailError}</div>
//           )}
//           <input
//             onChange={(e) => emailHandler(e)}
//             value={email}
//             onBlur={(e) => bluerHandler(e)}
//             type="text"
//             name="email"
//             placeholder="Enter your email..."
//           />
//         </div>
//         <div>
//           {passwordDirty && passwordError && (
//             <div style={{ color: "red" }}>{passwordError}</div>
//           )}
//           <input
//             onChange={(e) => passwordHandler(e)}
//             value={password}
//             onBlur={(e) => bluerHandler(e)}
//             type="password"
//             name="password"
//             placeholder="Enter your password..."
//           />
//           <div>
//             Вимоги до паролю:
//             <ol>
//               <li>
//                 <span hidden={true}>✅</span> Не коротший 3 симовлів
//               </li>
//               <li>
//                 <span hidden={true}>✅</span> Не довши 16 симовлів
//               </li>
//               <li>
//                 <span hidden={true}>✅</span> Має містити великі літери
//               </li>
//               <li>
//                 <span hidden={true}>✅</span> Має містити спец.символи !, #, $,
//                 % і т.д.
//               </li>
//             </ol>
//           </div>
//         </div>
//         <button disabled={!formValid} type="submit">
//           Registration
//         </button>
//       </form>
//     </div>
//   );
// }

// компонента з виористанням кастомного хука для input

const useValidation = (value: string, validations: any) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "maxLength":
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;
        case "isEmail":
          const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!re.test(String(value).toLowerCase())) {
            return setEmailError(true);
          } else {
            setEmailError(false);
          }
          break;
      }
    }
  }, [value]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
  };
};

const useInput = (initialValue: string, validations: any) => {
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

function App() {
  const email = useInput("", { isEmpty: true, minLength: 3 });
  const password = useInput("", { isEmpty: true, minLength: 5 });

  return (
    <div className="app">
      <form>
        <h1>Реєстрація </h1>
        <div>
          {email.isDirty && email.isEmpty && (
            <div style={{ color: "red" }}>Поле не може бути порожнім </div>
          )}{" "}
          {email.isDirty && email.minLengthError && (
            <div style={{ color: "red" }}>
              Поле не може бути меншим ніж 3 символи
            </div>
          )}
          {email.isDirty && email.emailError && (
            <div style={{ color: "red" }}>Неккоректний емейл</div>
          )}
          <input
            onChange={(e) => email.onChange(e)}
            value={email.value}
            onBlur={(e) => email.onBlur(e)}
            type="text"
            name="email"
            placeholder="Enter your email..."
          />
        </div>
        <div>
          {password.isDirty && password.isEmpty && (
            <div style={{ color: "red" }}>Поле не може бути порожнім </div>
          )}
          {password.isDirty && password.minLengthError && (
            <div style={{ color: "red" }}>
              Поле не може бути меншим ніж 5 символи
            </div>
          )}
          {password.isDirty && password.maxLengthError && (
            <div style={{ color: "red" }}>
              Поле не може бути довшим ніж 16 символів
            </div>
          )}
          <input
            onChange={(e) => password.onChange(e)}
            value={password.value}
            onBlur={(e) => password.onBlur(e)}
            type="password"
            name="password"
            placeholder="Enter your password..."
          />
          <div>
            Вимоги до паролю:
            <ul>
              <li>
                <span hidden={true}>✅</span> Не коротший 3 симовлів
              </li>
              <li>
                <span hidden={true}>✅</span> Не довши 16 симовлів
              </li>
              <li>
                <span hidden={true}>✅</span> Має містити великі літери
              </li>
              <li>
                <span hidden={true}>✅</span> Має містити цифри
              </li>
              <li>
                <span hidden={true}>✅</span> Має містити спец.символи !, #, $,
                % і т.д.
              </li>
            </ul>
          </div>
        </div>
        <button type="submit">Registration</button>
      </form>
    </div>
  );
}

export default App;
