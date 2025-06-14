import { useEffect, useReducer } from "react";
import Header from "./Header";
import { ManinC } from "./MainC";
import Loader from "./Loader";
import Error from "./Error";
import { StartScreen } from "./StartScreen";
import { Question } from "./Question";

const initialState = {
  questions: [],
  // 'loading','error','ready','active','finished'
  status: "Loading",
  index: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
      };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header></Header>

      <ManinC>
        {status === "Loading" && <Loader></Loader>}
        {status === "error" && <Error></Error>}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
          ></StartScreen>
        )}
        {status === "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          ></Question>
        )}
      </ManinC>
    </div>
  );
}

export default App;
