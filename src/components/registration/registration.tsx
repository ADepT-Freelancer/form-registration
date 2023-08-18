import { useNavigate } from "react-router-dom";
import { instance } from "../../Api/api";
import { login } from "../../store/slice/auth/store-auth";
import { useAppDispatch, useInput } from "../../utils/hook/customHooks";

export const Registration = () => {
  const name = useInput("", {
    minLength: 3,
    isEmpty: true,
    isWithoutSpaces: true,
  });
  const surname = useInput("", {
    minLength: 3,
    isEmpty: true,
    isWithoutSpaces: true,
  });
  const email = useInput("", {
    minLength: 3,
    isEmail: true,
    isEmpty: true,
    isWithoutSpaces: true,
    isMinL: false,
    isMaxL: false,
    isNumber: false,
    isSymbol: false,
  });
  const password = useInput("", {
    minLength: 5,
    maxLength: 16,
    isEmpty: true,
    isWithoutSpaces: true,
    isMinL: false,
    isMaxL: false,
    isNumber: false,
    isSymbol: false,
  });
  const repeatPassword = useInput("", {
    minLength: 5,
    maxLength: 16,
    isEmpty: true,
    isWithoutSpaces: true,
    isMinL: false,
    isMaxL: false,
    isNumber: false,
    isSymbol: false,
  });

  const rememberMe = true;
  // const captcha = false;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlerSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const userData = {
      firstName: name.value,
      surname: surname.value,
      email: email.value,
      password: password.value,
      rememberMe,
      // captcha,
    };
    // try {
    //   const user = await instance.post("auth/login", userData);
    //   dispatch(login(user.data));
    // } catch (e) {
    //   return e;
    // }
    if (password.value === repeatPassword.value) {
      try {
        const newUser = await instance.post("auth/registration", userData);
        await dispatch(login(newUser.data));
        navigate("/home");
      } catch (e) {
        console.log(e);
        return e;
      }
    } else {
      alert("Невірний повторний пароль");
    }
  };

  return (
    <div className="registration__wrapper">
      <div className="registration__form">
        <h1>Реєстрація </h1>
        <div>
          <div>
            <input
              onChange={(e) => name.onChange(e)}
              value={name.value}
              onBlur={(e) => name.onBlur(e)}
              type="text"
              name="name"
              placeholder="Enter your name..."
            />
          </div>
          <div>
            <input
              onChange={(e) => surname.onChange(e)}
              value={surname.value}
              onBlur={(e) => surname.onBlur(e)}
              type="text"
              name="surname"
              placeholder="Enter your surname..."
            />
          </div>
          {email.isDirty && email.isEmpty && (
            <div style={{ color: "red" }}>Поле Email не може бути порожнім </div>
          )}
          {email.isDirty && email.minLengthError && (
            <div style={{ color: "red" }}>
              Поле Email не може бути меншим ніж 3 символи
            </div>
          )}
          {email.isDirty && email.emailError && (
            <div style={{ color: "red" }}>Неккоректний емейл</div>
          )}
          {email.isDirty && !email.isWithoutSpaces && (
            <div style={{ color: "red" }}>Поле Email не має містити пробіли</div>
          )}
          <div>
            <input
              onChange={(e) => email.onChange(e)}
              value={email.value}
              onBlur={(e) => email.onBlur(e)}
              type="text"
              name="email"
              placeholder="Enter your email..."
            />
          </div>
        </div>
        <div>
          {password.isDirty && password.isEmpty && (
            <div style={{ color: "red" }}>Поле не може бути порожнім </div>
          )}

          <div>
            <input
              onChange={(e) => password.onChange(e)}
              value={password.value}
              onBlur={(e) => password.onBlur(e)}
              type="password"
              name="password"
              placeholder="Enter your password..."
            />
          </div>
          <div>
            <input
              onChange={(e) => repeatPassword.onChange(e)}
              value={repeatPassword.value}
              onBlur={(e) => repeatPassword.onBlur(e)}
              type="password"
              name="repeatPassword"
              placeholder="Repeat your password..."
            />
          </div>
          <br />
          <br />
          <div>
            Вимоги до паролю:
            <ul>
              <li>
                <span hidden={password.minLengthError}>✅</span> Не коротший 3
                символи
              </li>
              <li>
                <span hidden={password.maxLengthError}>✅</span> Не довше 16
                символів
              </li>
              <li>
                <span hidden={!password.isMaxL}>✅</span> Має містити великі
                літери
              </li>
              <li>
                <span hidden={!password.isNumber}>✅</span> Має містити цифри
              </li>
              <li>
                <span hidden={!password.isWithoutSpaces}>✅</span> Не має
                містити пробілів
              </li>
              <li>
                <span hidden={!password.isSymbol}>✅</span> Має містити
                спец.символи !, @, #, $, %, ^, &, *.
              </li>
            </ul>
          </div>
        </div>
        <button
          onClick={handlerSubmit}
          disabled={!email.inputValid || !password.inputValid}
          type="submit"
        >
          Registration
        </button>

        <div>
          <span>Забули пароль?</span>{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/forgetPassword")}
          >
            Відновити пароль
          </span>
        </div>
      </div>
    </div>
  );
};
