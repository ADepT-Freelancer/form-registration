import { useNavigate } from "react-router-dom";
import { instance } from "../../Api/api";
import { login } from "../../store/slice/auth/store-auth";
import { useAppDispatch, useInput } from "../../utils/hook/customHooks";

export const Authorization = () => {
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const rememberMe = true;
  // const captcha = false;

  const handlerSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const userData = {
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
      const user = await instance.post("auth/login", userData);
      await dispatch(login(user.data));
      navigate("/home");
      if (user.data.resultCode !== 0) {
        alert("Користувача не знайдено");
      }
    } else {
      alert("Невірний повторний пароль");
    }
  };

  return (
    <div className="authorization__wrapper">
      <div className="authorization__form">
        <h1>Авторизація </h1>
        <div>
          {email.isDirty && email.isEmpty && (
            <div style={{ color: "red" }}>Поле не може бути порожнім </div>
          )}
          {email.isDirty && email.minLengthError && (
            <div style={{ color: "red" }}>
              Поле не може бути меншим ніж 3 символи
            </div>
          )}
          {email.isDirty && email.emailError && (
            <div style={{ color: "red" }}>Неккоректний емейл</div>
          )}
          {email.isDirty && !email.isWithoutSpaces && (
            <div style={{ color: "red" }}>Поле не має містити пробіли</div>
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
          {/* {password.isDirty && password.minLengthError && (
            <div style={{ color: "red" }}>
              Поле не може бути меншим ніж 5 символи
            </div>
          )}
          {password.isDirty && password.maxLengthError && (
            <div style={{ color: "red" }}>
              Поле не може бути довшим ніж 16 символів
            </div>
          )}
          {password.isDirty && !password.isWithoutSpaces && (
            <div style={{ color: "red" }}>Поле не має містити пробіли</div>
          )} */}
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
        </div>
        <button
          onClick={handlerSubmit}
          // disabled={!email.inputValid || !password.inputValid}
          type="submit"
        >
          Authorization
        </button>
        <div>
          <span>У Вас немає аккаунта?</span>{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/registration")}
          >
            Реєстрація
          </span>
        </div>
      </div>
    </div>
  );
};
