import React from "react";
import { useOutsideClick } from "../../utils/hook/useOutsideClick";
import { TimerType, UserDetailsType } from "../types/types";

export const UserDetails: React.FC<UserDetailsType> = (props) => {
  const isTimerFinished = () => (
    (document.title = "Search page"), props.setUserDetails(null)
  );

  const elementRef = React.useRef(null);

  useOutsideClick(elementRef, isTimerFinished, !!props.userDetails);

  return (
    <div
      ref={elementRef}
      className={props.userDetails ? "search-form__selected-user" : " "}
    >
      {props.userDetails && (
        <div className="about-user__details">
          <Timer
            selectUsersChanged={props.selectUsersChanged}
            initialTimeSeconds={props.initialTimeSeconds}
            setSelectUsersChanged={props.setSelectUsersChanged}
            setSelectedUser={props.setSelectedUser}
            setSeconds={props.setSeconds}
            seconds={props.seconds}
            isTimerFinished={isTimerFinished}
          />

          <h2 className="about-user__name">
            {" "}
            {props.userDetails.login} {props.userDetails.id}
          </h2>

          <div className="details__avatar-box-ibg">
            <img
              className="details__avatar"
              src={props.userDetails.avatar_url}
              alt="avatar"
            />
          </div>
        </div>
      )}
    </div>
  );
};
const Timer: React.FC<TimerType> = (props) => {
  let [seconds, setSeconds] = React.useState(props.seconds);

  React.useEffect(() => {
    setSeconds(props.seconds);
  }, [props.seconds]);

  React.useEffect(() => {
    props.seconds === 0 && props.isTimerFinished();
    props.setSeconds(seconds);
    props.seconds === 0 && props.setSeconds(props.initialTimeSeconds);
  }, [seconds]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev - 1); // or we can use: (--seconds)
    }, 1000);

    return () => {
      clearInterval(intervalId);
      props.setSelectUsersChanged("");
      props.setSelectedUser(null);
    };
  }, [props.selectUsersChanged]);

  return (
    <div className="timer__wrapper">
      <div className="timer__content">Time left: {seconds}</div>
    </div>
  );
};
