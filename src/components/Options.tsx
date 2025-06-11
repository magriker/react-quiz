export function Options({ question, dispatch, answer }) {
  return (
    <div className="options">
      {question.options.map((op, index) => (
        <button
          className="btn btn-option"
          key={op}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {op}
        </button>
      ))}
    </div>
  );
}
