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
  const phone = useInput("", {
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

  const registValid =
    !name.inputValid ||
    !surname.inputValid ||
    !email.inputValid ||
    !password.inputValid ||
    !repeatPassword.inputValid;

  return (
    <div className="registration__wrapper">
      <div className="registration__form">
        <h1>Реєстрація </h1>
        <div
          className={
            " registration__field " +
            (name.isDirty &&
            (name.isEmpty || name.minLengthError || !name.isWithoutSpaces)
              ? "registration__field-errors"
              : " ")
          }
        >
          <input
            onChange={(e) => name.onChange(e)}
            value={name.value}
            onBlur={(e) => name.onBlur(e)}
            type="text"
            name="name"
            placeholder="Enter your name..."
          />
          {name.isDirty && name.isEmpty && (
            <div>Поле name не може бути порожнім </div>
          )}
          {name.isDirty && name.minLengthError && (
            <div>Поле name не може бути меншим ніж 3 символи</div>
          )}
          {name.isDirty && !name.isWithoutSpaces && (
            <div>Поле name не має містити пробіли</div>
          )}
        </div>
        <div
          className={
            " registration__field " +
            (surname.isDirty &&
            (surname.isEmpty ||
              surname.minLengthError ||
              !surname.isWithoutSpaces)
              ? "registration__field-errors"
              : " ")
          }
        >
          <input
            onChange={(e) => surname.onChange(e)}
            value={surname.value}
            onBlur={(e) => surname.onBlur(e)}
            type="text"
            name="surname"
            placeholder="Enter your surname..."
          />
          {surname.isDirty && surname.isEmpty && (
            <div>Поле surname не може бути порожнім </div>
          )}
          {surname.isDirty && surname.minLengthError && (
            <div>Поле surname не може бути меншим ніж 3 символи</div>
          )}
          {surname.isDirty && !surname.isWithoutSpaces && (
            <div>Поле Email не має містити пробіли</div>
          )}
        </div>
        <div
          className={
            " registration__field " +
            (email.isDirty &&
            (email.isEmpty ||
              email.minLengthError ||
              email.emailError ||
              !email.isWithoutSpaces)
              ? "registration__field-errors"
              : " ")
          }
        >
          <input
            onChange={(e) => email.onChange(e)}
            value={email.value}
            onBlur={(e) => email.onBlur(e)}
            type="text"
            name="email"
            placeholder="Enter your email..."
          />
          {email.isDirty && email.isEmpty && (
            <div>Поле Email не може бути порожнім </div>
          )}
          {email.isDirty && email.minLengthError && (
            <div>Поле Email не може бути меншим ніж 5 символів</div>
          )}
          {email.isDirty && email.emailError && <div>Неккоректний емейл</div>}
          {email.isDirty && !email.isWithoutSpaces && (
            <div>Поле Email не має містити пробіли</div>
          )}
        </div>
        <div
          className={
            " registration__field " +
            (phone.isDirty &&
            (phone.isEmpty || phone.minLengthError || !phone.isWithoutSpaces)
              ? "registration__field-errors"
              : " ")
          }
        >
          <input
            onChange={(e) => phone.onChange(e)}
            value={phone.value}
            onBlur={(e) => phone.onBlur(e)}
            type="text"
            name="phone"
            placeholder="Enter your phone..."
          />
          {phone.isDirty && phone.isEmpty && (
            <div>Поле phone не може бути порожнім </div>
          )}
          {phone.isDirty && phone.minLengthError && (
            <div>Поле phone не може бути меншим ніж 5 символів</div>
          )}
          {phone.isDirty && !phone.isWithoutSpaces && (
            <div>Поле phone не має містити пробіли</div>
          )}
        </div>
        <div
          className={
            " registration__field " +
            (password.isDirty &&
            (password.isEmpty ||
              password.minLengthError ||
              !password.isWithoutSpaces)
              ? "registration__field-errors"
              : " ")
          }
        >
          <input
            onChange={(e) => password.onChange(e)}
            value={password.value}
            onBlur={(e) => password.onBlur(e)}
            type="password"
            name="password"
            placeholder="Enter your password..."
          />
          {password.isDirty && password.isEmpty && (
            <div>Поле не може бути порожнім </div>
          )}
        </div>
        <div
          className={
            " registration__field " +
            (repeatPassword.isDirty &&
            password.isDirty &&
            (repeatPassword.isEmpty ||
              repeatPassword.minLengthError ||
              !repeatPassword.isWithoutSpaces)
              ? "registration__field-errors"
              : " ")
          }
        >
          <input
            onChange={(e) => repeatPassword.onChange(e)}
            value={repeatPassword.value}
            onBlur={(e) => repeatPassword.onBlur(e)}
            type="password"
            name="repeatPassword"
            placeholder="Repeat your password..."
          />
          {repeatPassword.isDirty &&
            password.isDirty &&
            repeatPassword.isEmpty && <div>Поле не може бути порожнім </div>}
          {repeatPassword.isDirty &&
            password.isDirty &&
            repeatPassword.value === password.value && (
              <div>Паролі не співпадають </div>
            )}
        </div>
        <br />
        <div>
          Вимоги до паролю:
          <ul className="registration__list-password">
            <li
              className={
                password.minLengthError
                  ? "registration__list-password-false"
                  : "registration__list-password-true"
              }
            >
              Не коротший 5 символи
            </li>
            <li
              className={
                password.maxLengthError
                  ? "registration__list-password-false"
                  : "registration__list-password-true"
              }
            >
              Не довше 16 символів
            </li>
            <li
              className={
                !password.isMaxL
                  ? "registration__list-password-false"
                  : "registration__list-password-true"
              }
            >
              Має містити великі літери
            </li>
            <li
              className={
                !password.isNumber
                  ? "registration__list-password-false"
                  : "registration__list-password-true"
              }
            >
              Має містити цифри
            </li>
            <li
              className={
                !password.isWithoutSpaces
                  ? "registration__list-password-false"
                  : "registration__list-password-true"
              }
            >
              Не має містити пробілів
            </li>
            <li
              className={
                !password.isSymbol
                  ? "registration__list-password-false"
                  : "registration__list-password-true"
              }
            >
              Має містити спец.символи !, @, #, $, %, ^, &, *.
            </li>
          </ul>
        </div>
        <div
          className={
            " registration__field " +
            (registValid ? "registration__field-errors" : " ")
          }
        >
          <button onClick={handlerSubmit} disabled={registValid} type="submit">
            Registration
          </button>
          {registValid && <div>Заповніть будь-ласка всі поля</div>}
        </div>
        <div>
          <span>Забули пароль?</span>
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
