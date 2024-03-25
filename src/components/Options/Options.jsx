const Options = ({ handleResetFeedback, handleLogFeedback, total }) => {
  return (
    <div>
      <button onClick={() => handleLogFeedback("good")}>Good</button>
      <button onClick={() => handleLogFeedback("neutral")}>Neutral</button>
      <button onClick={() => handleLogFeedback("bad")}>Bad</button>
      {total !== 0 && <button onClick={handleResetFeedback}>Reset</button>}
    </div>
  );
};

export default Options;
