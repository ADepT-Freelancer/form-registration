import { useEffect, useState } from "react";
import { Space, message, Button } from "antd";

export const AnswersColumns = () => {
  const initialQuestions = [
    { id: 1, text: "Question 1", active: false },
    { id: 2, text: "Question 2", active: false },
    { id: 3, text: "Question 3", active: false },
    { id: 4, text: "Question 4", active: false },
    { id: 5, text: "Question 5", active: false },
  ];
  const initialAnswers = [
    { id: 1, text: "Answer 1", active: false },
    { id: 2, text: "Answer 2", active: false },
    { id: 3, text: "Answer 3", active: false },
    { id: 4, text: "Answer 4", active: false },
    { id: 5, text: "Answer 5", active: false },
  ];
  const [questionActive, setQuestionActive] = useState(0);
  const [answerActive, setAnswerActive] = useState(0);
  const [questions, setQuestions] = useState(
    initialQuestions.sort(() => Math.random() - 0.5)
  );
  const [answers, setAnswers] = useState(
    initialAnswers.sort(() => Math.random() - 0.5)
  );

  function refreshActive() {
    setTimeout(() => {
      setQuestionActive(0);
      setAnswerActive(0);
    }, 400);
  }
  useEffect(() => {
    if (
      questionActive !== 0 &&
      answerActive !== 0 &&
      questionActive === answerActive
    ) {
      const updateAnswers = questions.map((item) =>
        item.id === questionActive ? { ...item, active: true } : { ...item }
      );
      setQuestions(updateAnswers);
      const updateRespons = answers.map((item) =>
        item.id === questionActive ? { ...item, active: true } : { ...item }
      );
      setAnswers(updateRespons);
      refreshActive();
    } else if (questionActive !== 0 && answerActive !== 0) {
      refreshActive();
    }
  }, [questionActive, answerActive]);
  useEffect(() => {
    let isTaskКesolved = false;

    if (questions.length === answers.length) {
      for (let i = 0; i < answers.length; i++) {
        if (answers[i].active === false) {
          isTaskКesolved = false;
          break;
        } else {
          isTaskКesolved = true;
        }
      }
    }
    isTaskКesolved && success();
  }, [questions, answers]);

  const answerElement = questions.map((el) => (
    <Button
      onClick={() => setQuestionActive(el.id)}
      key={el.id}
      type={el.active || el.id === questionActive ? "primary" : "default"}
    >
      {el.text}
    </Button>
  ));
  const respondElement = answers.map((el) => (
    <Button
      onClick={() => setAnswerActive(el.id)}
      key={el.id}
      type={el.active || el.id === answerActive ? "primary" : "default"}
    >
      {el.text}
    </Button>
  ));
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Все вірно, ти молодець!",
    });
  };

  return (
    <div className="test__answers-columns">
      {contextHolder}
      <div> Виберіть правильні відповіді на запитання:</div>
      <br />
      <Space  >
        <Space.Compact  direction="vertical">{answerElement}</Space.Compact>
        <Space.Compact direction="vertical">{respondElement}</Space.Compact>
      </Space>
    </div>
  );
};
