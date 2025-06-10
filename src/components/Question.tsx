import { Options } from "./Options";

export function Question({ question }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question}></Options>
    </div>
  );
}
