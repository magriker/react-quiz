export function Options({ question }) {
  return (
    <div className="options">
      {question.options.map((op) => (
        <button className="btn btn-option" key={op}>
          {op}
        </button>
      ))}
    </div>
  );
}
